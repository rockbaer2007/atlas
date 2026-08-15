using System.Text;
using System.Text.RegularExpressions;
using System.Configuration;
using System.Diagnostics;
using System.Windows.Forms;

if (args.Length >= 2)
{
    return AutomationExporter.RunCli(args[0], args[1], args.Length >= 3 ? args[2] : null);
}

ApplicationConfiguration.Initialize();
Application.Run(new ExporterForm());
return 0;

internal sealed class ExporterForm : Form
{
    private readonly TextBox sourceTextBox = new();
    private readonly TextBox outputTextBox = new();
    private readonly TextBox filterTextBox = new();
    private readonly DataGridView automationGrid = new();
    private readonly Label statusLabel = new();
    private readonly Button detailsButton = new();
    private readonly Button exportButton = new();
    private readonly Button openExportFolderButton = new();
    private List<AutomationEntry> automations = [];
    private readonly Dictionary<int, bool> checkedAutomations = [];

    public ExporterForm()
    {
        Text = "Home Assistant Automationen exportieren";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(920, 560);
        Size = new Size(1060, 680);

        var defaultSource = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            "Downloads",
            "automations.yaml");
        var defaultOutput = Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.UserProfile),
            "Downloads",
            "automations-export-selected");

        sourceTextBox.Text = File.Exists(defaultSource) ? defaultSource : string.Empty;
        outputTextBox.Text = AppSettings.Default.ExportFolder;

        if (string.IsNullOrWhiteSpace(outputTextBox.Text))
        {
            outputTextBox.Text = defaultOutput;
        }

        var root = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 5,
            Padding = new Padding(12)
        };
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        Controls.Add(root);

        root.Controls.Add(CreatePathRow("automations.yaml", sourceTextBox, "Datei wählen...", SelectSourceFile), 0, 0);
        root.Controls.Add(CreatePathRow("Export-Ordner", outputTextBox, "Ordner wählen...", SelectOutputFolder, () => SaveSettings()), 0, 1);
        root.Controls.Add(CreateFilterRow(), 0, 2);

        ConfigureGrid();
        root.Controls.Add(automationGrid, 0, 3);

        var footer = new TableLayoutPanel
        {
            AutoSize = true,
            Dock = DockStyle.Fill,
            ColumnCount = 7,
            Padding = new Padding(0, 10, 0, 0)
        };
        footer.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        footer.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        footer.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        footer.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        footer.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        footer.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        footer.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        root.Controls.Add(footer, 0, 4);

        var loadButton = new Button { Text = "Laden", AutoSize = true };
        loadButton.Click += (_, _) => LoadAutomations();

        var selectAllButton = new Button { Text = "Alle auswählen", AutoSize = true };
        selectAllButton.Click += (_, _) => SetAllChecked(true);

        var selectNoneButton = new Button { Text = "Keine auswählen", AutoSize = true };
        selectNoneButton.Click += (_, _) => SetAllChecked(false);

        detailsButton.Text = "Details";
        detailsButton.AutoSize = true;
        detailsButton.Enabled = false;
        detailsButton.Click += (_, _) => ShowSelectedAutomationDetails();

        exportButton.Text = "Ausgewählte exportieren";
        exportButton.AutoSize = true;
        exportButton.Enabled = false;
        exportButton.Click += (_, _) => ExportSelected();

        openExportFolderButton.Text = "Export im Explorer öffnen";
        openExportFolderButton.AutoSize = true;
        openExportFolderButton.Click += (_, _) => OpenExportFolder();

        statusLabel.AutoSize = true;
        statusLabel.Anchor = AnchorStyles.Left;

        footer.Controls.Add(loadButton, 0, 0);
        footer.Controls.Add(selectAllButton, 1, 0);
        footer.Controls.Add(detailsButton, 2, 0);
        footer.Controls.Add(statusLabel, 3, 0);
        footer.Controls.Add(selectNoneButton, 4, 0);
        footer.Controls.Add(exportButton, 5, 0);
        footer.Controls.Add(openExportFolderButton, 6, 0);

        if (!string.IsNullOrWhiteSpace(sourceTextBox.Text))
        {
            Load += (_, _) => LoadAutomations();
        }
    }

    private Control CreateFilterRow()
    {
        var panel = new TableLayoutPanel
        {
            AutoSize = true,
            Dock = DockStyle.Fill,
            ColumnCount = 3,
            Padding = new Padding(0, 0, 0, 8)
        };
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 120));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));

        var label = new Label
        {
            Text = "Suche",
            AutoSize = true,
            Anchor = AnchorStyles.Left,
            TextAlign = ContentAlignment.MiddleLeft
        };

        filterTextBox.Dock = DockStyle.Fill;
        filterTextBox.PlaceholderText = "Alias, ID, Dateiname oder YAML durchsuchen, z.B. pool";
        filterTextBox.TextChanged += (_, _) => ApplyFilter();

        var clearButton = new Button { Text = "Zurücksetzen", AutoSize = true };
        clearButton.Click += (_, _) => filterTextBox.Clear();

        panel.Controls.Add(label, 0, 0);
        panel.Controls.Add(filterTextBox, 1, 0);
        panel.Controls.Add(clearButton, 2, 0);
        return panel;
    }

    private static Control CreatePathRow(
        string labelText,
        TextBox textBox,
        string buttonText,
        Action browseAction,
        Action? saveAction = null)
    {
        var panel = new TableLayoutPanel
        {
            AutoSize = true,
            Dock = DockStyle.Fill,
            ColumnCount = saveAction is null ? 3 : 4,
            Padding = new Padding(0, 0, 0, 8)
        };
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 120));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
        panel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        if (saveAction is not null)
        {
            panel.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        }

        var label = new Label
        {
            Text = labelText,
            AutoSize = true,
            Anchor = AnchorStyles.Left,
            TextAlign = ContentAlignment.MiddleLeft
        };

        textBox.Dock = DockStyle.Fill;

        var button = new Button { Text = buttonText, AutoSize = true };
        button.Click += (_, _) => browseAction();

        panel.Controls.Add(label, 0, 0);
        panel.Controls.Add(textBox, 1, 0);
        panel.Controls.Add(button, 2, 0);

        if (saveAction is not null)
        {
            var saveButton = new Button { Text = "Einstellung speichern", AutoSize = true };
            saveButton.Click += (_, _) => saveAction();
            panel.Controls.Add(saveButton, 3, 0);
        }

        return panel;
    }

    private void ConfigureGrid()
    {
        automationGrid.Dock = DockStyle.Fill;
        automationGrid.AllowUserToAddRows = false;
        automationGrid.AllowUserToDeleteRows = false;
        automationGrid.AllowUserToResizeRows = false;
        automationGrid.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
        automationGrid.BackgroundColor = SystemColors.Window;
        automationGrid.BorderStyle = BorderStyle.FixedSingle;
        automationGrid.MultiSelect = false;
        automationGrid.RowHeadersVisible = false;
        automationGrid.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
        automationGrid.CellDoubleClick += (_, args) =>
        {
            if (args.RowIndex >= 0)
            {
                ShowSelectedAutomationDetails();
            }
        };
        automationGrid.SelectionChanged += (_, _) => UpdateDetailsButtonState();

        automationGrid.Columns.Add(new DataGridViewCheckBoxColumn
        {
            HeaderText = "",
            Width = 42,
            FillWeight = 8,
            TrueValue = true,
            FalseValue = false
        });
        automationGrid.Columns.Add(new DataGridViewTextBoxColumn
        {
            HeaderText = "Alias",
            ReadOnly = true,
            FillWeight = 42
        });
        automationGrid.Columns.Add(new DataGridViewTextBoxColumn
        {
            HeaderText = "ID",
            ReadOnly = true,
            FillWeight = 22
        });
        automationGrid.Columns.Add(new DataGridViewTextBoxColumn
        {
            HeaderText = "Dateiname",
            ReadOnly = true,
            FillWeight = 36
        });
    }

    private void SelectSourceFile()
    {
        using var dialog = new OpenFileDialog
        {
            Filter = "YAML-Dateien (*.yaml;*.yml)|*.yaml;*.yml|Alle Dateien (*.*)|*.*",
            FileName = string.IsNullOrWhiteSpace(sourceTextBox.Text) ? "automations.yaml" : sourceTextBox.Text
        };

        if (dialog.ShowDialog(this) == DialogResult.OK)
        {
            sourceTextBox.Text = dialog.FileName;
            LoadAutomations();
        }
    }

    private void SelectOutputFolder()
    {
        using var dialog = new FolderBrowserDialog
        {
            SelectedPath = Directory.Exists(outputTextBox.Text) ? outputTextBox.Text : string.Empty
        };

        if (dialog.ShowDialog(this) == DialogResult.OK)
        {
            outputTextBox.Text = dialog.SelectedPath;
            SaveSettings(showMessage: false);
        }
    }

    private void LoadAutomations()
    {
        try
        {
            automations = AutomationExporter.Load(sourceTextBox.Text).ToList();
            checkedAutomations.Clear();

            foreach (var automation in automations)
            {
                checkedAutomations[automation.Index] = true;
            }

            PopulateGrid(AutomationExporter.Filter(automations, filterTextBox.Text).ToList());
            UpdateDetailsButtonState();
            UpdateStatus();
        }
        catch (Exception exception)
        {
            automationGrid.Rows.Clear();
            exportButton.Enabled = false;
            detailsButton.Enabled = false;
            statusLabel.Text = "Laden fehlgeschlagen.";
            MessageBox.Show(this, exception.Message, "Fehler beim Laden", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private void ApplyFilter()
    {
        StoreCurrentChecks();
        PopulateGrid(AutomationExporter.Filter(automations, filterTextBox.Text).ToList());
        UpdateStatus();
    }

    private void PopulateGrid(IReadOnlyCollection<AutomationEntry> entries)
    {
        automationGrid.Rows.Clear();

        foreach (var automation in entries)
        {
            var isChecked = checkedAutomations.TryGetValue(automation.Index, out var savedChecked)
                ? savedChecked
                : true;
            var rowIndex = automationGrid.Rows.Add(isChecked, automation.Alias, automation.Id, automation.FileName);
            automationGrid.Rows[rowIndex].Tag = automation;
        }

        exportButton.Enabled = automationGrid.Rows.Count > 0;
        UpdateDetailsButtonState();
    }

    private void StoreCurrentChecks()
    {
        automationGrid.EndEdit();

        foreach (DataGridViewRow row in automationGrid.Rows)
        {
            if (row.Tag is AutomationEntry automation)
            {
                checkedAutomations[automation.Index] = Convert.ToBoolean(row.Cells[0].Value);
            }
        }
    }

    private void UpdateStatus()
    {
        var filter = filterTextBox.Text.Trim();

        statusLabel.Text = string.IsNullOrWhiteSpace(filter)
            ? $"{automations.Count} Automation(en) geladen."
            : $"{automationGrid.Rows.Count} von {automations.Count} Automation(en) gefunden.";
    }

    private void UpdateDetailsButtonState()
    {
        detailsButton.Enabled = automationGrid.CurrentRow?.Tag is AutomationEntry;
    }

    private void ShowSelectedAutomationDetails()
    {
        if (automationGrid.CurrentRow?.Tag is not AutomationEntry automation)
        {
            MessageBox.Show(this, "Bitte zuerst eine Automation auswählen.", "Keine Automation ausgewählt", MessageBoxButtons.OK, MessageBoxIcon.Information);
            return;
        }

        using var dialog = new AutomationDetailsDialog(automation);
        dialog.ShowDialog(this);
    }

    private void SetAllChecked(bool isChecked)
    {
        foreach (DataGridViewRow row in automationGrid.Rows)
        {
            row.Cells[0].Value = isChecked;

            if (row.Tag is AutomationEntry automation)
            {
                checkedAutomations[automation.Index] = isChecked;
            }
        }
    }

    private void ExportSelected()
    {
        StoreCurrentChecks();

        var selected = automationGrid.Rows
            .Cast<DataGridViewRow>()
            .Where(row => row.Tag is AutomationEntry && Convert.ToBoolean(row.Cells[0].Value))
            .Select(row => (AutomationEntry)row.Tag!)
            .ToList();

        if (selected.Count == 0)
        {
            MessageBox.Show(this, "Bitte mindestens eine Automation auswählen.", "Nichts ausgewählt", MessageBoxButtons.OK, MessageBoxIcon.Information);
            return;
        }

        try
        {
            var exported = AutomationExporter.Export(selected, outputTextBox.Text).ToList();
            SaveSettings(showMessage: false);
            statusLabel.Text = $"{exported.Count} Automation(en) exportiert.";
            MessageBox.Show(
                this,
                $"{exported.Count} Automation(en) exportiert nach:{Environment.NewLine}{Path.GetFullPath(outputTextBox.Text)}",
                "Export abgeschlossen",
                MessageBoxButtons.OK,
                MessageBoxIcon.Information);
        }
        catch (Exception exception)
        {
            statusLabel.Text = "Export fehlgeschlagen.";
            MessageBox.Show(this, exception.Message, "Fehler beim Export", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private void OpenExportFolder()
    {
        try
        {
            if (string.IsNullOrWhiteSpace(outputTextBox.Text))
            {
                MessageBox.Show(this, "Bitte zuerst einen Export-Ordner auswählen.", "Kein Export-Ordner", MessageBoxButtons.OK, MessageBoxIcon.Information);
                return;
            }

            var outputFolder = Path.GetFullPath(outputTextBox.Text.Trim());
            Directory.CreateDirectory(outputFolder);
            var startInfo = new ProcessStartInfo
            {
                FileName = "explorer.exe",
                UseShellExecute = true
            };
            startInfo.ArgumentList.Add(outputFolder);
            Process.Start(startInfo);
            SaveSettings(showMessage: false);
            statusLabel.Text = "Export-Ordner im Explorer geöffnet.";
        }
        catch (Exception exception)
        {
            statusLabel.Text = "Explorer konnte nicht geöffnet werden.";
            MessageBox.Show(this, exception.Message, "Fehler beim Öffnen", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }

    private void SaveSettings(bool showMessage = true)
    {
        try
        {
            AppSettings.Default.ExportFolder = outputTextBox.Text.Trim();
            AppSettings.Default.Save();
            statusLabel.Text = "Einstellung gespeichert.";

            if (showMessage)
            {
                MessageBox.Show(this, "Export-Ordner wurde in user.config gespeichert.", "Einstellung gespeichert", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
        catch (Exception exception)
        {
            statusLabel.Text = "Speichern fehlgeschlagen.";
            MessageBox.Show(this, exception.Message, "Fehler beim Speichern", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}

internal sealed class AppSettings : ApplicationSettingsBase
{
    private static readonly AppSettings SettingsInstance = (AppSettings)Synchronized(new AppSettings());

    public static AppSettings Default => SettingsInstance;

    [UserScopedSetting]
    [DefaultSettingValue("")]
    public string ExportFolder
    {
        get => (string)this[nameof(ExportFolder)];
        set => this[nameof(ExportFolder)] = value;
    }
}

internal sealed class AutomationDetailsDialog : Form
{
    public AutomationDetailsDialog(AutomationEntry automation)
    {
        Text = $"Automation: {automation.Alias}";
        StartPosition = FormStartPosition.CenterParent;
        MinimumSize = new Size(760, 520);
        Size = new Size(900, 640);

        var root = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 2,
            Padding = new Padding(12)
        };
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        root.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        Controls.Add(root);

        var title = new Label
        {
            Text = string.IsNullOrWhiteSpace(automation.Id)
                ? automation.Alias
                : $"{automation.Alias} ({automation.Id})",
            AutoSize = true,
            Font = new Font(Font, FontStyle.Bold),
            Padding = new Padding(0, 0, 0, 8)
        };
        root.Controls.Add(title, 0, 0);

        var tabs = new TabControl { Dock = DockStyle.Fill };
        root.Controls.Add(tabs, 0, 1);

        tabs.TabPages.Add(CreateEntitiesTab(automation));
        tabs.TabPages.Add(CreateYamlTab(automation));
    }

    private static TabPage CreateEntitiesTab(AutomationEntry automation)
    {
        var tab = new TabPage("Entitäten");
        var entities = AutomationExporter.ExtractEntities(automation).ToList();

        var root = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 2,
            Padding = new Padding(8)
        };
        root.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        tab.Controls.Add(root);

        var grid = new DataGridView
        {
            Dock = DockStyle.Fill,
            AllowUserToAddRows = false,
            AllowUserToDeleteRows = false,
            AllowUserToResizeRows = false,
            AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill,
            BackgroundColor = SystemColors.Window,
            BorderStyle = BorderStyle.FixedSingle,
            MultiSelect = false,
            ReadOnly = true,
            RowHeadersVisible = false,
            SelectionMode = DataGridViewSelectionMode.FullRowSelect
        };

        grid.Columns.Add(new DataGridViewTextBoxColumn
        {
            HeaderText = "Entität",
            FillWeight = 46
        });
        grid.Columns.Add(new DataGridViewTextBoxColumn
        {
            HeaderText = "Quelle",
            FillWeight = 20
        });
        grid.Columns.Add(new DataGridViewTextBoxColumn
        {
            HeaderText = "Zeile",
            FillWeight = 10
        });
        grid.Columns.Add(new DataGridViewTextBoxColumn
        {
            HeaderText = "Kontext",
            FillWeight = 60
        });

        foreach (var entity in entities)
        {
            grid.Rows.Add(entity.EntityId, entity.Source, entity.LineNumber, entity.Context);
        }

        var footer = new Label
        {
            AutoSize = true,
            Padding = new Padding(0, 8, 0, 0),
            Text = entities.Count == 0
                ? "Keine Entitäten erkannt."
                : $"{entities.Count} Entität(en) erkannt. Template-Treffer sind heuristisch erkannt."
        };

        root.Controls.Add(grid, 0, 0);
        root.Controls.Add(footer, 0, 1);
        return tab;
    }

    private static TabPage CreateYamlTab(AutomationEntry automation)
    {
        var tab = new TabPage("YAML");
        var root = new TableLayoutPanel
        {
            Dock = DockStyle.Fill,
            ColumnCount = 1,
            RowCount = 2,
            Padding = new Padding(8)
        };
        root.RowStyles.Add(new RowStyle(SizeType.Percent, 100));
        root.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        tab.Controls.Add(root);

        var yamlTextBox = new TextBox
        {
            Dock = DockStyle.Fill,
            Multiline = true,
            ReadOnly = true,
            ScrollBars = ScrollBars.Both,
            WordWrap = false,
            Font = new Font(FontFamily.GenericMonospace, 9F),
            Text = automation.Yaml.TrimEnd()
        };

        var copyButton = new Button
        {
            Text = "YAML kopieren",
            AutoSize = true,
            Anchor = AnchorStyles.Right,
            Margin = new Padding(0, 8, 0, 0)
        };
        copyButton.Click += (_, _) => Clipboard.SetText(yamlTextBox.Text);

        root.Controls.Add(yamlTextBox, 0, 0);
        root.Controls.Add(copyButton, 0, 1);
        return tab;
    }
}

internal static class AutomationExporter
{
    private static readonly Regex EntityIdRegex = new(
        @"\b(?:alarm_control_panel|automation|binary_sensor|button|calendar|camera|climate|cover|device_tracker|event|fan|humidifier|input_boolean|input_button|input_datetime|input_number|input_select|input_text|light|lock|media_player|number|person|remote|scene|script|select|sensor|siren|sun|switch|text|timer|update|vacuum|valve|water_heater|weather|zone)\.[A-Za-z0-9_]+\b",
        RegexOptions.CultureInvariant | RegexOptions.IgnoreCase);

    public static int RunCli(string sourcePath, string outputPath, string? filter = null)
    {
        try
        {
            var loaded = Load(sourcePath).ToList();
            var automations = Filter(loaded, filter).ToList();

            if (loaded.Count == 0)
            {
                Console.Error.WriteLine("No top-level automation entries found. Expected a YAML list starting with '- ...'.");
                return 1;
            }

            if (automations.Count == 0)
            {
                Console.Error.WriteLine($"No automation entries match the filter: {filter}");
                return 1;
            }

            var exported = Export(automations, outputPath).ToList();

            foreach (var export in exported)
            {
                Console.WriteLine($"{export.Index,3}: {export.FileName}");
            }

            Console.WriteLine();
            Console.WriteLine(string.IsNullOrWhiteSpace(filter)
                ? $"Exported {exported.Count} automation(s) to:"
                : $"Exported {exported.Count} of {loaded.Count} automation(s) matching \"{filter}\" to:");
            Console.WriteLine(Path.GetFullPath(outputPath));
            return 0;
        }
        catch (Exception exception)
        {
            Console.Error.WriteLine(exception.Message);
            return 1;
        }
    }

    public static IEnumerable<AutomationEntry> Filter(IEnumerable<AutomationEntry> automations, string? filter)
    {
        var normalizedFilter = filter?.Trim();

        if (string.IsNullOrWhiteSpace(normalizedFilter))
        {
            return automations;
        }

        return automations.Where(automation =>
            automation.Alias.Contains(normalizedFilter, StringComparison.OrdinalIgnoreCase) ||
            automation.Id.Contains(normalizedFilter, StringComparison.OrdinalIgnoreCase) ||
            automation.FileName.Contains(normalizedFilter, StringComparison.OrdinalIgnoreCase) ||
            automation.Yaml.Contains(normalizedFilter, StringComparison.OrdinalIgnoreCase));
    }

    public static IEnumerable<AutomationEntry> Load(string sourcePath)
    {
        if (string.IsNullOrWhiteSpace(sourcePath))
        {
            throw new InvalidOperationException("Bitte eine automations.yaml auswählen.");
        }

        var sourceFile = Path.GetFullPath(sourcePath);

        if (!File.Exists(sourceFile))
        {
            throw new FileNotFoundException($"Input file not found: {sourceFile}");
        }

        var lines = File.ReadAllLines(sourceFile, Encoding.UTF8);
        var index = 0;
        var usedNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        foreach (var block in SplitTopLevelAutomationBlocks(lines))
        {
            index++;

            var yaml = ConvertListItemToStandaloneYaml(block);
            var alias = ReadScalarValue(yaml, "alias");
            var id = ReadScalarValue(yaml, "id");
            var fileName = MakeUniqueFileName(CreateBaseFileName(alias, id, index), usedNames);

            yield return new AutomationEntry(
                Index: index,
                Id: id ?? string.Empty,
                Alias: alias ?? $"Automation {index:000}",
                FileName: fileName,
                Yaml: yaml);
        }
    }

    public static IEnumerable<AutomationExport> Export(IEnumerable<AutomationEntry> automations, string outputPath)
    {
        if (string.IsNullOrWhiteSpace(outputPath))
        {
            throw new InvalidOperationException("Bitte einen Export-Ordner auswählen.");
        }

        var outputFolder = Path.GetFullPath(outputPath);
        Directory.CreateDirectory(outputFolder);

        var exported = 0;
        var usedNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

        foreach (var automation in automations)
        {
            exported++;

            var fileName = MakeUniqueFileName(automation.FileName, usedNames);
            var targetFile = Path.Combine(outputFolder, fileName);

            File.WriteAllText(targetFile, CreateImportReadyYaml(automation).TrimEnd() + Environment.NewLine, new UTF8Encoding(false));
            yield return new AutomationExport(exported, fileName, targetFile);
        }
    }

    public static string CreateImportReadyYaml(AutomationEntry automation)
    {
        var lines = automation.Yaml.ReplaceLineEndings("\n").Split('\n').ToList();

        while (lines.Count > 0 && string.IsNullOrWhiteSpace(lines[0]))
        {
            lines.RemoveAt(0);
        }

        if (lines.Count > 0 && Regex.IsMatch(lines[0], @"^id:\s*.*$", RegexOptions.CultureInvariant))
        {
            lines.RemoveAt(0);
        }

        for (var index = 0; index < lines.Count; index++)
        {
            lines[index] = ConvertToImportReadyLine(lines[index]);
        }

        return string.Join(Environment.NewLine, lines);
    }

    private static string ConvertToImportReadyLine(string line)
    {
        return line switch
        {
            "triggers:" => "trigger:",
            "conditions:" => "condition:",
            "actions:" => "action:",
            _ => ConvertAutomationListItemLine(line)
        };
    }

    private static string ConvertAutomationListItemLine(string line)
    {
        var triggerMatch = Regex.Match(line, @"^(?<indent>\s*)-\s+trigger:\s*(?<value>.+?)\s*$", RegexOptions.CultureInvariant);

        if (triggerMatch.Success)
        {
            return $"{triggerMatch.Groups["indent"].Value}- platform: {triggerMatch.Groups["value"].Value}";
        }

        var actionMatch = Regex.Match(line, @"^(?<indent>\s*)-\s+action:\s*(?<value>[A-Za-z0-9_]+\.[A-Za-z0-9_]+)\s*$", RegexOptions.CultureInvariant);

        if (actionMatch.Success)
        {
            return $"{actionMatch.Groups["indent"].Value}- service: {actionMatch.Groups["value"].Value}";
        }

        return line;
    }

    public static IEnumerable<AutomationEntityReference> ExtractEntities(AutomationEntry automation)
    {
        var seen = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        var lines = automation.Yaml.ReplaceLineEndings("\n").Split('\n');

        for (var index = 0; index < lines.Length; index++)
        {
            var line = lines[index];
            var isTemplateLike =
                line.Contains("{{", StringComparison.Ordinal) ||
                line.Contains("{%", StringComparison.Ordinal) ||
                line.Contains("states(", StringComparison.OrdinalIgnoreCase) ||
                line.Contains("state_attr(", StringComparison.OrdinalIgnoreCase) ||
                line.Contains("is_state(", StringComparison.OrdinalIgnoreCase);

            foreach (Match match in EntityIdRegex.Matches(line))
            {
                var entityId = match.Value;
                var key = $"{entityId}|{index + 1}";

                if (!seen.Add(key))
                {
                    continue;
                }

                yield return new AutomationEntityReference(
                    EntityId: entityId,
                    Source: isTemplateLike ? "Template" : "YAML",
                    LineNumber: index + 1,
                    Context: line.Trim());
            }
        }
    }

    private static IEnumerable<List<string>> SplitTopLevelAutomationBlocks(string[] lines)
    {
        List<string>? current = null;

        foreach (var line in lines)
        {
            if (line.StartsWith("- ", StringComparison.Ordinal))
            {
                if (current is { Count: > 0 })
                {
                    yield return current;
                }

                current = new List<string> { line };
                continue;
            }

            current?.Add(line);
        }

        if (current is { Count: > 0 })
        {
            yield return current;
        }
    }

    private static string ConvertListItemToStandaloneYaml(List<string> block)
    {
        var output = new StringBuilder();

        for (var index = 0; index < block.Count; index++)
        {
            var line = block[index];

            if (index == 0)
            {
                output.AppendLine(line.Length >= 2 ? line[2..] : string.Empty);
                continue;
            }

            output.AppendLine(line.StartsWith("  ", StringComparison.Ordinal) ? line[2..] : line);
        }

        return output.ToString();
    }

    private static string? ReadScalarValue(string yaml, string key)
    {
        var match = Regex.Match(
            yaml,
            $@"(?m)^{Regex.Escape(key)}:\s*(?<value>.*)\s*$",
            RegexOptions.CultureInvariant);

        if (!match.Success)
        {
            return null;
        }

        var value = match.Groups["value"].Value.Trim();

        if (value.Length >= 2 &&
            ((value.StartsWith('\'') && value.EndsWith('\'')) ||
             (value.StartsWith('"') && value.EndsWith('"'))))
        {
            value = value[1..^1];
        }

        return string.IsNullOrWhiteSpace(value) ? null : value;
    }

    private static string CreateBaseFileName(string? alias, string? id, int index)
    {
        var name = !string.IsNullOrWhiteSpace(alias)
            ? alias
            : !string.IsNullOrWhiteSpace(id)
                ? $"automation-{id}"
                : $"automation-{index:000}";

        return Slugify(name) + ".yaml";
    }

    private static string MakeUniqueFileName(string fileName, HashSet<string> usedNames)
    {
        if (usedNames.Add(fileName))
        {
            return fileName;
        }

        var name = Path.GetFileNameWithoutExtension(fileName);
        var extension = Path.GetExtension(fileName);

        for (var suffix = 2; ; suffix++)
        {
            var candidate = $"{name}-{suffix}{extension}";
            if (usedNames.Add(candidate))
            {
                return candidate;
            }
        }
    }

    private static string Slugify(string value)
    {
        var normalized = value
            .Normalize(NormalizationForm.FormD)
            .ToLowerInvariant();

        var output = new StringBuilder();
        var previousWasDash = false;

        foreach (var character in normalized)
        {
            var category = System.Globalization.CharUnicodeInfo.GetUnicodeCategory(character);

            if (category == System.Globalization.UnicodeCategory.NonSpacingMark)
            {
                continue;
            }

            if (char.IsLetterOrDigit(character))
            {
                output.Append(character);
                previousWasDash = false;
                continue;
            }

            if (!previousWasDash)
            {
                output.Append('-');
                previousWasDash = true;
            }
        }

        var slug = output.ToString().Trim('-');
        return string.IsNullOrWhiteSpace(slug) ? "automation" : slug;
    }
}

internal sealed record AutomationEntry(int Index, string Id, string Alias, string FileName, string Yaml);

internal sealed record AutomationEntityReference(string EntityId, string Source, int LineNumber, string Context);

internal sealed record AutomationExport(int Index, string FileName, string TargetFile);

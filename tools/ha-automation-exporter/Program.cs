using System.Text;
using System.Text.RegularExpressions;

if (args.Length < 2)
{
    Console.Error.WriteLine("Usage:");
    Console.Error.WriteLine("  HaAutomationExporter <automations.yaml> <output-folder>");
    Console.Error.WriteLine();
    Console.Error.WriteLine("Example:");
    Console.Error.WriteLine(@"  HaAutomationExporter C:\Users\rockb\Downloads\automations.yaml C:\Users\rockb\Downloads\automations-export");
    return 1;
}

var sourceFile = Path.GetFullPath(args[0]);
var outputFolder = Path.GetFullPath(args[1]);

if (!File.Exists(sourceFile))
{
    Console.Error.WriteLine($"Input file not found: {sourceFile}");
    return 1;
}

Directory.CreateDirectory(outputFolder);

var lines = File.ReadAllLines(sourceFile, Encoding.UTF8);
var blocks = SplitTopLevelAutomationBlocks(lines).ToList();

if (blocks.Count == 0)
{
    Console.Error.WriteLine("No top-level automation entries found. Expected a YAML list starting with '- ...'.");
    return 1;
}

var usedNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
var exported = 0;

foreach (var block in blocks)
{
    var automationYaml = ConvertListItemToStandaloneYaml(block);
    var alias = ReadScalarValue(automationYaml, "alias");
    var id = ReadScalarValue(automationYaml, "id");
    var baseName = CreateBaseFileName(alias, id, exported + 1);
    var fileName = MakeUniqueFileName(baseName, usedNames);
    var targetFile = Path.Combine(outputFolder, fileName);

    File.WriteAllText(targetFile, automationYaml.TrimEnd() + Environment.NewLine, new UTF8Encoding(false));
    exported++;

    Console.WriteLine($"{exported,3}: {fileName}");
}

Console.WriteLine();
Console.WriteLine($"Exported {exported} automation(s) to:");
Console.WriteLine(outputFolder);
return 0;

static IEnumerable<List<string>> SplitTopLevelAutomationBlocks(string[] lines)
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

static string ConvertListItemToStandaloneYaml(List<string> block)
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

static string? ReadScalarValue(string yaml, string key)
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

static string CreateBaseFileName(string? alias, string? id, int index)
{
    var name = !string.IsNullOrWhiteSpace(alias)
        ? alias
        : !string.IsNullOrWhiteSpace(id)
            ? $"automation-{id}"
            : $"automation-{index:000}";

    return Slugify(name) + ".yaml";
}

static string MakeUniqueFileName(string fileName, HashSet<string> usedNames)
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

static string Slugify(string value)
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

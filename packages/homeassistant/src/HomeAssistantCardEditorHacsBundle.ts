import {
  summarizeHomeAssistantCardImport,
  type HomeAssistantCardExportPackage,
  type HomeAssistantCardImportSummary,
} from "./HomeAssistantCardConfiguration";
import { createHomeAssistantCardEditorScriptExport } from "./HomeAssistantCardEditorPlan";

export interface HomeAssistantCardEditorHacsBundleFile {
  readonly path: string;
  readonly mimeType: "application/json" | "text/javascript" | "text/markdown";
  readonly content: string;
}

export interface HomeAssistantCardEditorHacsBundle {
  readonly version: 1;
  readonly kind: "atlas.homeassistant.hacs-card-bundle";
  readonly cardName: string;
  readonly scriptFilename: string;
  readonly customElementName: string;
  readonly cardType: `custom:${string}`;
  readonly resourcePath: string;
  readonly files: readonly HomeAssistantCardEditorHacsBundleFile[];
  readonly installSteps: readonly string[];
}

export interface HomeAssistantCardEditorHacsBundleArchive {
  readonly filename: string;
  readonly mimeType: "application/zip";
  readonly content: Uint8Array;
}

export interface HomeAssistantCardEditorHacsBundleArchiveEntry {
  readonly path: string;
  readonly compressionMethod: "store" | "deflate" | "unsupported";
  readonly compressedSize: number;
  readonly uncompressedSize: number;
}

export type HomeAssistantCardEditorHacsBundleArchiveIssueCode =
  | "missing-required-file"
  | "missing-locale-file"
  | "unsafe-path"
  | "duplicate-path";

export interface HomeAssistantCardEditorHacsBundleArchiveIssue {
  readonly code: HomeAssistantCardEditorHacsBundleArchiveIssueCode;
  readonly severity: "error";
  readonly paths: readonly string[];
  readonly message: string;
}

export interface HomeAssistantCardEditorHacsBundleArchiveInspection {
  readonly kind: "atlas.homeassistant.hacs-card-bundle-archive";
  readonly importable: boolean;
  readonly fileCount: number;
  readonly files: readonly HomeAssistantCardEditorHacsBundleArchiveEntry[];
  readonly requiredFiles: readonly string[];
  readonly missingFiles: readonly string[];
  readonly unsafePaths: readonly string[];
  readonly duplicatePaths: readonly string[];
  readonly issues: readonly HomeAssistantCardEditorHacsBundleArchiveIssue[];
  readonly scriptFiles: readonly string[];
  readonly atlasPackageFiles: readonly string[];
  readonly localeFiles: readonly string[];
  readonly missingLocaleFiles: readonly string[];
  readonly reason: string;
}

export interface HomeAssistantCardEditorHacsBundleArchivePackageRead {
  readonly kind: "atlas.homeassistant.hacs-card-bundle-package";
  readonly importable: boolean;
  readonly inspection: HomeAssistantCardEditorHacsBundleArchiveInspection;
  readonly hacsMetadata?: HomeAssistantCardEditorHacsBundleArchiveMetadata;
  readonly localeReadiness?: HomeAssistantCardEditorHacsBundleArchiveLocaleReadiness;
  readonly scriptReadiness?: HomeAssistantCardEditorHacsBundleArchiveScriptReadiness;
  readonly exampleReadiness?: HomeAssistantCardEditorHacsBundleArchiveExampleReadiness;
  readonly readmeReadiness?: HomeAssistantCardEditorHacsBundleArchiveReadmeReadiness;
  readonly packageFile?: string;
  readonly packageContent?: string;
  readonly summary?: HomeAssistantCardImportSummary;
  readonly reason: string;
}

export type HomeAssistantCardEditorHacsBundleReadinessCheckStatus = "pass" | "fail" | "pending";

export type HomeAssistantCardEditorHacsBundleReadinessCheckCode =
  | "zip-readable"
  | "safe-paths"
  | "unique-paths"
  | "has-hacs-manifest"
  | "has-readme"
  | "has-example-card"
  | "has-root-script"
  | "has-atlas-package"
  | "has-english-locale"
  | "hacs-filename-declared"
  | "hacs-script-in-archive"
  | "atlas-package-readable"
  | "declared-locales-present"
  | "locale-json-readable"
  | "locale-meta-language-present"
  | "locale-language-matches-path"
  | "hacs-name-declared"
  | "hacs-name-matches-package"
  | "hacs-filename-matches-package"
  | "script-custom-element-known"
  | "script-file-readable"
  | "script-defines-custom-element"
  | "example-json-readable"
  | "example-type-present"
  | "example-type-matches-package"
  | "readme-mentions-resource-path"
  | "readme-mentions-card-type"
  | "package-contains-entities"
  | "package-is-atlas-export"
  | "bundle-importable";

export interface HomeAssistantCardEditorHacsBundleReadinessCheck {
  readonly code: HomeAssistantCardEditorHacsBundleReadinessCheckCode;
  readonly status: HomeAssistantCardEditorHacsBundleReadinessCheckStatus;
  readonly label: string;
  readonly detail: string;
}

export interface HomeAssistantCardEditorHacsBundleReadinessReport {
  readonly ready: boolean;
  readonly passed: number;
  readonly failed: number;
  readonly pending: number;
  readonly checks: readonly HomeAssistantCardEditorHacsBundleReadinessCheck[];
}

export interface HomeAssistantCardEditorHacsBundleArchiveMetadata {
  readonly name?: string;
  readonly filename?: string;
  readonly nameMatchesPackage: boolean;
  readonly scriptMatchesArchive: boolean;
  readonly scriptMatchesPackage: boolean;
}

export interface HomeAssistantCardEditorHacsBundleArchiveLocaleReadiness {
  readonly manifestLanguages: readonly string[];
  readonly fallbackLanguages: readonly string[];
  readonly archiveLocaleFiles: readonly string[];
  readonly requiredLocaleFiles: readonly string[];
  readonly missingArchiveLocaleFiles: readonly string[];
  readonly invalidArchiveLocaleFiles: readonly string[];
  readonly invalidArchiveLocales: readonly HomeAssistantCardEditorHacsBundleArchiveInvalidLocale[];
}

export interface HomeAssistantCardEditorHacsBundleArchiveInvalidLocale {
  readonly path: string;
  readonly expectedLanguage: string;
  readonly actualLanguage?: string;
  readonly reason: "invalid-json" | "missing-meta-language" | "language-mismatch";
}

export interface HomeAssistantCardEditorHacsBundleArchiveScriptReadiness {
  readonly path?: string;
  readonly expectedCustomElementName?: string;
  readonly definesCustomElement: boolean;
  readonly valid: boolean;
  readonly reason: "ok" | "missing-script" | "missing-custom-element-name" | "custom-element-mismatch";
}

export interface HomeAssistantCardEditorHacsBundleArchiveExampleReadiness {
  readonly path: "examples/lovelace-card.json";
  readonly expectedType?: string;
  readonly actualType?: string;
  readonly valid: boolean;
  readonly reason: "ok" | "invalid-json" | "missing-type" | "type-mismatch";
}

export interface HomeAssistantCardEditorHacsBundleArchiveReadmeReadiness {
  readonly path: "README.md";
  readonly expectedResourcePath?: string;
  readonly expectedCardType?: string;
  readonly mentionsResourcePath: boolean;
  readonly mentionsCardType: boolean;
  readonly valid: boolean;
  readonly reason: "ok" | "missing-resource-path" | "missing-card-type";
}

export function createHomeAssistantCardEditorHacsBundle(
  cardPackage: HomeAssistantCardExportPackage,
): HomeAssistantCardEditorHacsBundle {
  const script = cardPackage.script
    ?? (cardPackage.editorPlan ? createHomeAssistantCardEditorScriptExport(cardPackage.editorPlan) : undefined);
  if (!script) {
    throw new Error("A HACS card bundle requires an editor plan or script export.");
  }

  const packagedCard = {
    ...cardPackage,
    script,
  };
  const bundleName = script.filename.replace(/\.js$/i, "");
  const defaultConfig = JSON.stringify(script.defaultConfig, null, 2);
  const localeFiles = cardPackage.locales.map(locale => ({
    path: locale.path,
    mimeType: "application/json" as const,
    content: `${JSON.stringify(locale.content, null, 2)}\n`,
  }));

  return {
    version: 1,
    kind: "atlas.homeassistant.hacs-card-bundle",
    cardName: script.defaultConfig.title,
    scriptFilename: script.filename,
    customElementName: script.customElementName,
    cardType: script.cardType,
    resourcePath: script.resourcePath,
    files: [
      {
        path: "hacs.json",
        mimeType: "application/json",
        content: JSON.stringify({
          name: script.defaultConfig.title,
          render_readme: true,
          filename: script.filename,
        }, null, 2),
      },
      {
        path: script.filename,
        mimeType: "text/javascript",
        content: script.source,
      },
      {
        path: "README.md",
        mimeType: "text/markdown",
        content: createHomeAssistantCardEditorBundleReadme(
          script.defaultConfig.title,
          script.resourcePath,
          defaultConfig,
          cardPackage.manifest.languages,
          cardPackage.manifest.fallbackLanguages,
        ),
      },
      {
        path: "examples/lovelace-card.json",
        mimeType: "application/json",
        content: defaultConfig,
      },
      {
        path: `atlas/${bundleName}.atlas-card.json`,
        mimeType: "application/json",
        content: JSON.stringify(packagedCard, null, 2),
      },
      ...localeFiles,
    ],
    installSteps: [
      "Create a HACS frontend repository with these files.",
      `Install the generated script as ${script.filename}.`,
      `Register the Lovelace resource ${script.resourcePath} as a JavaScript module.`,
      `Add ${script.cardType} to a dashboard view.`,
      "Replace the demo entities with your own Home Assistant entities.",
    ],
  };
}

export function inspectHomeAssistantCardEditorHacsBundleArchive(
  content: Uint8Array,
): HomeAssistantCardEditorHacsBundleArchiveInspection {
  const requiredFiles = [
    "hacs.json",
    "README.md",
    "examples/lovelace-card.json",
  ];

  try {
    const files = readZipCentralDirectoryEntries(content);
    const paths = files.map(file => file.path);
    const unsafePaths = paths.filter(path => !isSafeHacsBundleArchivePath(path));
    const duplicatePaths = listDuplicateStrings(paths);
    const scriptFiles = paths.filter(path => !path.includes("/") && path.endsWith(".js"));
    const atlasPackageFiles = paths.filter(path => path.startsWith("atlas/") && path.endsWith(".atlas-card.json"));
    const localeFiles = paths.filter(path => path.startsWith("locales/") && path.endsWith(".json"));
    const missingLocaleFiles = paths.includes("locales/en.json") ? [] : ["locales/en.json"];
    const missingFiles = [
      ...requiredFiles.filter(path => !paths.includes(path)),
      ...(scriptFiles.length > 0 ? [] : ["*.js"]),
      ...(atlasPackageFiles.length > 0 ? [] : ["atlas/*.atlas-card.json"]),
    ];
    const issues = createHacsBundleArchiveIssues({
      missingFiles,
      missingLocaleFiles,
      unsafePaths,
      duplicatePaths,
    });

    return {
      kind: "atlas.homeassistant.hacs-card-bundle-archive",
      importable: issues.length === 0,
      fileCount: files.length,
      files: files.map(file => ({
        path: file.path,
        compressionMethod: file.compressionMethod,
        compressedSize: file.compressedSize,
        uncompressedSize: file.uncompressedSize,
      })),
      requiredFiles,
      missingFiles,
      unsafePaths,
      duplicatePaths,
      issues,
      scriptFiles,
      atlasPackageFiles,
      localeFiles,
      missingLocaleFiles,
      reason: issues.length === 0
        ? "The archive contains the required ATLAS HACS card bundle files."
        : `The archive is not a safe ATLAS HACS card bundle: ${issues.map(issue => issue.message).join("; ")}.`,
    };
  } catch {
    return {
      kind: "atlas.homeassistant.hacs-card-bundle-archive",
      importable: false,
      fileCount: 0,
      files: [],
      requiredFiles,
      missingFiles: requiredFiles,
      unsafePaths: [],
      duplicatePaths: [],
      issues: createHacsBundleArchiveIssues({
        missingFiles: requiredFiles,
        missingLocaleFiles: ["locales/en.json"],
        unsafePaths: [],
        duplicatePaths: [],
      }),
      scriptFiles: [],
      atlasPackageFiles: [],
      localeFiles: [],
      missingLocaleFiles: ["locales/en.json"],
      reason: "The archive is not a readable ZIP file.",
    };
  }
}

export function readHomeAssistantCardEditorHacsBundleArchivePackage(
  content: Uint8Array,
): HomeAssistantCardEditorHacsBundleArchivePackageRead {
  const inspection = inspectHomeAssistantCardEditorHacsBundleArchive(content);
  if (!inspection.importable) {
    return {
      kind: "atlas.homeassistant.hacs-card-bundle-package",
      importable: false,
      inspection,
      reason: inspection.reason,
    };
  }

  try {
    const entries = readZipCentralDirectoryEntries(content);
    const hacsEntry = entries.find(entry => entry.path === "hacs.json");
    const packageEntry = entries.find(entry => entry.path === inspection.atlasPackageFiles[0]);
    if (!hacsEntry) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        reason: "The archive does not contain a readable HACS manifest file.",
      };
    }
    if (hacsEntry.compressionMethod !== "store") {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        reason: `The HACS manifest file uses unsupported ZIP compression: ${hacsEntry.compressionMethod}.`,
      };
    }
    if (!packageEntry) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        reason: "The archive does not contain a readable ATLAS card package file.",
      };
    }
    if (packageEntry.compressionMethod !== "store") {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        packageFile: packageEntry.path,
        reason: `The ATLAS card package file uses unsupported ZIP compression: ${packageEntry.compressionMethod}.`,
      };
    }

    const hacsMetadata = readHacsBundleArchiveMetadata(content, hacsEntry, inspection.scriptFiles);
    if (!hacsMetadata.filename) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata,
        packageFile: packageEntry.path,
        reason: "The HACS manifest file does not declare a card script filename.",
      };
    }
    if (!hacsMetadata.scriptMatchesArchive) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata,
        packageFile: packageEntry.path,
        reason: `The HACS manifest filename ${hacsMetadata.filename} does not match a root script file in the archive.`,
      };
    }

    const packageContent = readStoredZipEntryText(content, packageEntry);
    const summary = summarizeHomeAssistantCardImport(packageContent);
    const localeReadiness = readHacsBundleArchiveLocaleReadiness(content, entries, packageContent, inspection);
    if (localeReadiness.missingArchiveLocaleFiles.length > 0) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata,
        localeReadiness,
        packageFile: packageEntry.path,
        packageContent,
        summary,
        reason: `The archive is missing locale files declared by the embedded ATLAS card package: ${localeReadiness.missingArchiveLocaleFiles.join(", ")}.`,
      };
    }
    if (localeReadiness.invalidArchiveLocaleFiles.length > 0) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata,
        localeReadiness,
        packageFile: packageEntry.path,
        packageContent,
        summary,
        reason: `The archive contains invalid locale files declared by the embedded ATLAS card package: ${localeReadiness.invalidArchiveLocaleFiles.join(", ")}.`,
      };
    }

    const packageScriptFilename = summary.script?.filename ?? summary.editorPlan?.scriptFilename;
    const packageName = summary.title;
    const checkedHacsMetadata = {
      ...hacsMetadata,
      nameMatchesPackage: hacsMetadata.name === packageName,
      scriptMatchesPackage: packageScriptFilename === hacsMetadata.filename,
    };
    if (!checkedHacsMetadata.nameMatchesPackage) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata: checkedHacsMetadata,
        packageFile: packageEntry.path,
        packageContent,
        summary,
        reason: `The HACS manifest name ${hacsMetadata.name ?? "unknown"} does not match the embedded ATLAS card package name ${packageName}.`,
      };
    }
    if (!checkedHacsMetadata.scriptMatchesPackage) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata: checkedHacsMetadata,
        packageFile: packageEntry.path,
        packageContent,
        summary,
        reason: `The HACS manifest filename ${hacsMetadata.filename} does not match the embedded ATLAS card package script filename ${packageScriptFilename ?? "unknown"}.`,
      };
    }
    const scriptReadiness = readHacsBundleArchiveScriptReadiness(
      content,
      entries,
      hacsMetadata.filename,
      summary.script?.customElementName,
    );
    if (!scriptReadiness.valid) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata: checkedHacsMetadata,
        localeReadiness,
        scriptReadiness,
        packageFile: packageEntry.path,
        packageContent,
        summary,
        reason: `The generated script does not define the embedded ATLAS custom element: ${scriptReadiness.reason}.`,
      };
    }
    const exampleReadiness = readHacsBundleArchiveExampleReadiness(content, entries, summary.script?.cardType);
    if (!exampleReadiness.valid) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata: checkedHacsMetadata,
        localeReadiness,
        scriptReadiness,
        exampleReadiness,
        packageFile: packageEntry.path,
        packageContent,
        summary,
        reason: `The Lovelace example card does not match the embedded ATLAS card package: ${exampleReadiness.reason}.`,
      };
    }
    const readmeReadiness = readHacsBundleArchiveReadmeReadiness(
      content,
      entries,
      summary.script?.resourcePath,
      summary.script?.cardType,
    );
    if (!readmeReadiness.valid) {
      return {
        kind: "atlas.homeassistant.hacs-card-bundle-package",
        importable: false,
        inspection,
        hacsMetadata: checkedHacsMetadata,
        localeReadiness,
        scriptReadiness,
        exampleReadiness,
        readmeReadiness,
        packageFile: packageEntry.path,
        packageContent,
        summary,
        reason: `The README does not document the embedded ATLAS card package correctly: ${readmeReadiness.reason}.`,
      };
    }

    return {
      kind: "atlas.homeassistant.hacs-card-bundle-package",
      importable: true,
      inspection,
      hacsMetadata: checkedHacsMetadata,
      localeReadiness,
      scriptReadiness,
      exampleReadiness,
      readmeReadiness,
      packageFile: packageEntry.path,
      packageContent,
      summary,
      reason: "The archive contains a readable ATLAS card package file.",
    };
  } catch {
    return {
      kind: "atlas.homeassistant.hacs-card-bundle-package",
      importable: false,
      inspection,
      reason: "The ATLAS card package file could not be read from the archive.",
    };
  }
}

export function createHomeAssistantCardEditorHacsBundleArchive(
  input: HomeAssistantCardEditorHacsBundle | HomeAssistantCardExportPackage,
): HomeAssistantCardEditorHacsBundleArchive {
  const bundle = "files" in input ? input : createHomeAssistantCardEditorHacsBundle(input);
  const filename = `${bundle.scriptFilename.replace(/\.js$/i, "")}.hacs.zip`;
  return {
    filename,
    mimeType: "application/zip",
    content: createStoredZipArchive(bundle.files),
  };
}

export function formatHomeAssistantCardEditorHacsBundlePackageReadReviewLines(
  packageRead: HomeAssistantCardEditorHacsBundleArchivePackageRead,
): readonly string[] {
  const lines = [packageRead.reason];
  if (packageRead.hacsMetadata?.name) {
    lines.push(`HACS name: ${packageRead.hacsMetadata.name}`);
  }
  if (packageRead.hacsMetadata?.filename) {
    lines.push(`HACS script: ${packageRead.hacsMetadata.filename}`);
  }
  if (packageRead.localeReadiness) {
    lines.push(`Required locales: ${packageRead.localeReadiness.requiredLocaleFiles.join(", ")}`);
    lines.push(`Archive locales: ${packageRead.localeReadiness.archiveLocaleFiles.join(", ") || "none"}`);
    if (packageRead.localeReadiness.missingArchiveLocaleFiles.length > 0) {
      lines.push(`Missing locales: ${packageRead.localeReadiness.missingArchiveLocaleFiles.join(", ")}`);
    }
    for (const locale of packageRead.localeReadiness.invalidArchiveLocales) {
      lines.push(formatInvalidLocaleReviewLine(locale));
    }
  }
  if (packageRead.scriptReadiness) {
    lines.push(formatScriptReadinessReviewLine(packageRead.scriptReadiness));
  }
  if (packageRead.exampleReadiness) {
    lines.push(formatExampleReadinessReviewLine(packageRead.exampleReadiness));
  }
  if (packageRead.readmeReadiness) {
    lines.push(formatReadmeReadinessReviewLine(packageRead.readmeReadiness));
  }
  for (const issue of packageRead.inspection.issues) {
    lines.push(`${issue.code}: ${issue.paths.join(", ")}`);
  }
  return lines;
}

export function createHomeAssistantCardEditorHacsBundleReadinessReport(
  packageRead: HomeAssistantCardEditorHacsBundleArchivePackageRead,
): HomeAssistantCardEditorHacsBundleReadinessReport {
  const checks: HomeAssistantCardEditorHacsBundleReadinessCheck[] = [];
  const add = (
    code: HomeAssistantCardEditorHacsBundleReadinessCheckCode,
    status: HomeAssistantCardEditorHacsBundleReadinessCheckStatus,
    label: string,
    detail: string,
  ) => {
    checks.push({ code, status, label, detail });
  };
  const inspection = packageRead.inspection;
  const localeReadiness = packageRead.localeReadiness;
  const invalidLocaleReasons = new Set(localeReadiness?.invalidArchiveLocales.map(locale => locale.reason) ?? []);
  const exampleReadiness = packageRead.exampleReadiness;
  const readmeReadiness = packageRead.readmeReadiness;
  const scriptReadiness = packageRead.scriptReadiness;
  const hacsMetadata = packageRead.hacsMetadata;
  const summary = packageRead.summary;
  const zipReadable = inspection.reason !== "The archive is not a readable ZIP file.";
  const hasRequiredFile = (path: string) => !inspection.missingFiles.includes(path);
  const hasRootScript = !inspection.missingFiles.includes("*.js") && inspection.scriptFiles.length > 0;
  const hasAtlasPackage = !inspection.missingFiles.includes("atlas/*.atlas-card.json") && inspection.atlasPackageFiles.length > 0;

  add("zip-readable", zipReadable ? "pass" : "fail", "ZIP readable", zipReadable ? "The archive central directory can be read." : inspection.reason);
  add("safe-paths", inspection.unsafePaths.length === 0 ? "pass" : "fail", "Safe archive paths", inspection.unsafePaths.length === 0 ? "No unsafe archive paths detected." : `Unsafe paths: ${inspection.unsafePaths.join(", ")}`);
  add("unique-paths", inspection.duplicatePaths.length === 0 ? "pass" : "fail", "Unique archive paths", inspection.duplicatePaths.length === 0 ? "No duplicate archive paths detected." : `Duplicate paths: ${inspection.duplicatePaths.join(", ")}`);
  add("has-hacs-manifest", hasRequiredFile("hacs.json") ? "pass" : "fail", "HACS manifest present", hasRequiredFile("hacs.json") ? "hacs.json is present." : "hacs.json is missing.");
  add("has-readme", hasRequiredFile("README.md") ? "pass" : "fail", "README present", hasRequiredFile("README.md") ? "README.md is present." : "README.md is missing.");
  add("has-example-card", hasRequiredFile("examples/lovelace-card.json") ? "pass" : "fail", "Example card present", hasRequiredFile("examples/lovelace-card.json") ? "examples/lovelace-card.json is present." : "examples/lovelace-card.json is missing.");
  add("has-root-script", hasRootScript ? "pass" : "fail", "Root script present", hasRootScript ? `Root scripts: ${inspection.scriptFiles.join(", ")}` : "No root JavaScript file found.");
  add("has-atlas-package", hasAtlasPackage ? "pass" : "fail", "ATLAS package present", hasAtlasPackage ? `ATLAS packages: ${inspection.atlasPackageFiles.join(", ")}` : "No atlas/*.atlas-card.json file found.");
  add("has-english-locale", inspection.missingLocaleFiles.length === 0 ? "pass" : "fail", "English locale present", inspection.missingLocaleFiles.length === 0 ? "locales/en.json is present." : "locales/en.json is missing.");
  add("hacs-filename-declared", hacsMetadata ? (hacsMetadata.filename ? "pass" : "fail") : "pending", "HACS filename declared", hacsMetadata?.filename ? `Manifest filename: ${hacsMetadata.filename}` : "Manifest filename has not been read.");
  add("hacs-script-in-archive", hacsMetadata ? (hacsMetadata.scriptMatchesArchive ? "pass" : "fail") : "pending", "HACS script in archive", hacsMetadata?.scriptMatchesArchive ? "Manifest filename matches a root script file." : "Manifest script was not matched to a root script file.");
  add("atlas-package-readable", summary ? "pass" : (hasAtlasPackage ? "fail" : "pending"), "ATLAS package readable", summary ? "Embedded ATLAS package was parsed." : packageRead.packageFile ? "Embedded ATLAS package could not be parsed." : "Embedded ATLAS package has not been read.");
  add("declared-locales-present", localeReadiness ? (localeReadiness.missingArchiveLocaleFiles.length === 0 ? "pass" : "fail") : "pending", "Declared locales present", localeReadiness?.missingArchiveLocaleFiles.length ? `Missing locales: ${localeReadiness.missingArchiveLocaleFiles.join(", ")}` : localeReadiness ? "All declared locales are present." : "Locale declarations have not been read.");
  add("locale-json-readable", localeReadiness ? (invalidLocaleReasons.has("invalid-json") ? "fail" : "pass") : "pending", "Locale JSON readable", invalidLocaleReasons.has("invalid-json") ? "At least one declared locale is invalid JSON." : localeReadiness ? "Declared locale JSON files are readable." : "Locale JSON has not been read.");
  add("locale-meta-language-present", localeReadiness ? (invalidLocaleReasons.has("missing-meta-language") ? "fail" : "pass") : "pending", "Locale metadata language present", invalidLocaleReasons.has("missing-meta-language") ? "At least one locale is missing _meta.language." : localeReadiness ? "Declared locales include _meta.language." : "Locale metadata has not been read.");
  add("locale-language-matches-path", localeReadiness ? (invalidLocaleReasons.has("language-mismatch") ? "fail" : "pass") : "pending", "Locale language matches path", invalidLocaleReasons.has("language-mismatch") ? "At least one locale _meta.language does not match its path." : localeReadiness ? "Locale metadata matches file paths." : "Locale metadata has not been checked.");
  add("hacs-name-declared", hacsMetadata ? (hacsMetadata.name ? "pass" : "fail") : "pending", "HACS name declared", hacsMetadata?.name ? `Manifest name: ${hacsMetadata.name}` : "Manifest name has not been read.");
  add("hacs-name-matches-package", hacsMetadata && summary ? (hacsMetadata.nameMatchesPackage ? "pass" : "fail") : "pending", "HACS name matches package", hacsMetadata?.nameMatchesPackage ? "Manifest name matches the package title." : summary ? "Manifest name does not match the package title." : "Package title has not been read.");
  add("hacs-filename-matches-package", hacsMetadata && summary ? (hacsMetadata.scriptMatchesPackage ? "pass" : "fail") : "pending", "HACS filename matches package", hacsMetadata?.scriptMatchesPackage ? "Manifest filename matches the package script filename." : summary ? "Manifest filename does not match the package script filename." : "Package script filename has not been read.");
  add("script-custom-element-known", scriptReadiness ? (scriptReadiness.expectedCustomElementName ? "pass" : "fail") : "pending", "Script custom element known", scriptReadiness?.expectedCustomElementName ? `Expected element: ${scriptReadiness.expectedCustomElementName}` : "Expected custom element has not been read.");
  add("script-file-readable", scriptReadiness ? (scriptReadiness.path ? "pass" : "fail") : "pending", "Script file readable", scriptReadiness?.path ? `Script file: ${scriptReadiness.path}` : "Script file has not been read.");
  add("script-defines-custom-element", scriptReadiness ? (scriptReadiness.definesCustomElement ? "pass" : "fail") : "pending", "Script defines custom element", scriptReadiness?.definesCustomElement ? "Script defines the expected custom element." : "Script definition has not been verified.");
  add("example-json-readable", exampleReadiness ? (exampleReadiness.reason === "invalid-json" ? "fail" : "pass") : "pending", "Example JSON readable", exampleReadiness?.reason === "invalid-json" ? "Example card is invalid JSON." : exampleReadiness ? "Example card JSON is readable." : "Example card has not been read.");
  add("example-type-present", exampleReadiness ? (exampleReadiness.actualType ? "pass" : "fail") : "pending", "Example type present", exampleReadiness?.actualType ? `Example type: ${exampleReadiness.actualType}` : "Example type has not been read.");
  add("example-type-matches-package", exampleReadiness ? (exampleReadiness.reason === "ok" ? "pass" : "fail") : "pending", "Example type matches package", exampleReadiness?.reason === "ok" ? "Example type matches the package card type." : "Example type has not been verified.");
  add("readme-mentions-resource-path", readmeReadiness ? (readmeReadiness.mentionsResourcePath ? "pass" : "fail") : "pending", "README mentions resource path", readmeReadiness?.mentionsResourcePath ? `README mentions ${readmeReadiness.expectedResourcePath}.` : "README resource path has not been verified.");
  add("readme-mentions-card-type", readmeReadiness ? (readmeReadiness.mentionsCardType ? "pass" : "fail") : "pending", "README mentions card type", readmeReadiness?.mentionsCardType ? `README mentions ${readmeReadiness.expectedCardType}.` : "README card type has not been verified.");
  add("package-contains-entities", summary ? (summary.entityIds.length > 0 ? "pass" : "fail") : "pending", "Package contains entities", summary?.entityIds.length ? `Entities: ${summary.entityIds.join(", ")}` : "No package entities have been read.");
  add("package-is-atlas-export", summary ? (summary.packaged ? "pass" : "fail") : "pending", "Package is ATLAS export", summary?.packaged ? "Embedded package is an ATLAS card export." : "Embedded package has not been confirmed as an ATLAS export.");
  add("bundle-importable", packageRead.importable ? "pass" : "fail", "Bundle importable", packageRead.reason);

  const passed = checks.filter(check => check.status === "pass").length;
  const failed = checks.filter(check => check.status === "fail").length;
  const pending = checks.filter(check => check.status === "pending").length;
  return {
    ready: packageRead.importable && failed === 0 && pending === 0,
    passed,
    failed,
    pending,
    checks,
  };
}

function readHacsBundleArchiveMetadata(
  content: Uint8Array,
  entry: ReadableZipArchiveEntry,
  scriptFiles: readonly string[],
): HomeAssistantCardEditorHacsBundleArchiveMetadata {
  const manifest = parseJsonRecord(readStoredZipEntryText(content, entry));
  const filename = typeof manifest.filename === "string" ? manifest.filename.trim() : undefined;
  return {
    name: typeof manifest.name === "string" ? manifest.name.trim() : undefined,
    filename,
    nameMatchesPackage: false,
    scriptMatchesArchive: filename ? scriptFiles.includes(filename) : false,
    scriptMatchesPackage: false,
  };
}

function readHacsBundleArchiveScriptReadiness(
  content: Uint8Array,
  entries: readonly ReadableZipArchiveEntry[],
  scriptFilename: string | undefined,
  expectedCustomElementName: string | undefined,
): HomeAssistantCardEditorHacsBundleArchiveScriptReadiness {
  if (!expectedCustomElementName) {
    return {
      path: scriptFilename,
      expectedCustomElementName,
      definesCustomElement: false,
      valid: false,
      reason: "missing-custom-element-name",
    };
  }
  const entry = scriptFilename ? entries.find(candidate => candidate.path === scriptFilename) : undefined;
  if (!entry) {
    return {
      path: scriptFilename,
      expectedCustomElementName,
      definesCustomElement: false,
      valid: false,
      reason: "missing-script",
    };
  }

  const script = readStoredZipEntryText(content, entry);
  const definesCustomElement = [
    `customElements.define("${expectedCustomElementName}"`,
    `customElements.define('${expectedCustomElementName}'`,
  ].some(fragment => script.includes(fragment));

  return {
    path: entry.path,
    expectedCustomElementName,
    definesCustomElement,
    valid: definesCustomElement,
    reason: definesCustomElement ? "ok" : "custom-element-mismatch",
  };
}

function readHacsBundleArchiveExampleReadiness(
  content: Uint8Array,
  entries: readonly ReadableZipArchiveEntry[],
  expectedType: string | undefined,
): HomeAssistantCardEditorHacsBundleArchiveExampleReadiness {
  const path = "examples/lovelace-card.json";
  const entry = entries.find(candidate => candidate.path === path);
  try {
    const example = entry ? parseJsonRecord(readStoredZipEntryText(content, entry)) : {};
    const actualType = typeof example.type === "string" ? example.type : undefined;
    if (!actualType) {
      return {
        path,
        expectedType,
        valid: false,
        reason: "missing-type",
      };
    }
    if (expectedType && actualType !== expectedType) {
      return {
        path,
        expectedType,
        actualType,
        valid: false,
        reason: "type-mismatch",
      };
    }
    return {
      path,
      expectedType,
      actualType,
      valid: true,
      reason: "ok",
    };
  } catch {
    return {
      path,
      expectedType,
      valid: false,
      reason: "invalid-json",
    };
  }
}

function readHacsBundleArchiveReadmeReadiness(
  content: Uint8Array,
  entries: readonly ReadableZipArchiveEntry[],
  expectedResourcePath: string | undefined,
  expectedCardType: string | undefined,
): HomeAssistantCardEditorHacsBundleArchiveReadmeReadiness {
  const path = "README.md";
  const entry = entries.find(candidate => candidate.path === path);
  const readme = entry ? readStoredZipEntryText(content, entry) : "";
  const mentionsResourcePath = expectedResourcePath ? readme.includes(expectedResourcePath) : false;
  const mentionsCardType = expectedCardType ? readme.includes(expectedCardType) : false;
  const valid = mentionsResourcePath && mentionsCardType;

  return {
    path,
    expectedResourcePath,
    expectedCardType,
    mentionsResourcePath,
    mentionsCardType,
    valid,
    reason: valid ? "ok" : !mentionsResourcePath ? "missing-resource-path" : "missing-card-type",
  };
}

function readHacsBundleArchiveLocaleReadiness(
  content: Uint8Array,
  entries: readonly ReadableZipArchiveEntry[],
  packageContent: string,
  inspection: HomeAssistantCardEditorHacsBundleArchiveInspection,
): HomeAssistantCardEditorHacsBundleArchiveLocaleReadiness {
  const packageJson = parseJsonRecord(packageContent);
  const manifest = isRecord(packageJson.manifest) ? packageJson.manifest : {};
  const manifestLanguages = normalizeLanguageCodes(readStringArray(manifest.languages));
  const fallbackLanguages = normalizeLanguageCodes(readStringArray(manifest.fallbackLanguages));
  const requiredLocaleFiles = normalizeLanguageCodes(manifestLanguages.length ? manifestLanguages : ["en"])
    .map(language => `locales/${language}.json`);
  const localeEntries = new Map(entries
    .filter(entry => inspection.localeFiles.includes(entry.path))
    .map(entry => [entry.path, entry]));
  const missingArchiveLocaleFiles = requiredLocaleFiles.filter(path => !localeEntries.has(path));
  const invalidArchiveLocales = requiredLocaleFiles
    .filter(path => localeEntries.has(path))
    .map(path => inspectLocaleArchiveEntry(content, localeEntries.get(path)!, path))
    .filter((result): result is HomeAssistantCardEditorHacsBundleArchiveInvalidLocale => result !== undefined);

  return {
    manifestLanguages: manifestLanguages.length ? manifestLanguages : ["en"],
    fallbackLanguages,
    archiveLocaleFiles: inspection.localeFiles,
    requiredLocaleFiles,
    missingArchiveLocaleFiles,
    invalidArchiveLocaleFiles: invalidArchiveLocales.map(locale => locale.path),
    invalidArchiveLocales,
  };
}

function createHacsBundleArchiveIssues(input: {
  readonly missingFiles: readonly string[];
  readonly missingLocaleFiles: readonly string[];
  readonly unsafePaths: readonly string[];
  readonly duplicatePaths: readonly string[];
}): HomeAssistantCardEditorHacsBundleArchiveIssue[] {
  return [
    ...(input.missingFiles.length > 0
      ? [{
          code: "missing-required-file" as const,
          severity: "error" as const,
          paths: input.missingFiles,
          message: `missing required files: ${input.missingFiles.join(", ")}`,
        }]
      : []),
    ...(input.missingLocaleFiles.length > 0
      ? [{
          code: "missing-locale-file" as const,
          severity: "error" as const,
          paths: input.missingLocaleFiles,
          message: `missing required locale files: ${input.missingLocaleFiles.join(", ")}`,
        }]
      : []),
    ...(input.unsafePaths.length > 0
      ? [{
          code: "unsafe-path" as const,
          severity: "error" as const,
          paths: input.unsafePaths,
          message: `unsafe archive paths: ${input.unsafePaths.join(", ")}`,
        }]
      : []),
    ...(input.duplicatePaths.length > 0
      ? [{
          code: "duplicate-path" as const,
          severity: "error" as const,
          paths: input.duplicatePaths,
          message: `duplicate archive paths: ${input.duplicatePaths.join(", ")}`,
        }]
      : []),
  ];
}

function createHomeAssistantCardEditorBundleReadme(
  cardName: string,
  resourcePath: string,
  defaultConfig: string,
  languages: readonly string[],
  fallbackLanguages: readonly string[],
): string {
  return [
    `# ${cardName}`,
    "",
    "Generated by ATLAS Home Assistant Card Editor.",
    "",
    "## Lovelace resource",
    "",
    "```yaml",
    `- url: ${JSON.stringify(resourcePath)}`,
    "  type: module",
    "```",
    "",
    "## Example card",
    "",
    "```json",
    defaultConfig,
    "```",
    "",
    "Replace the demo entities with your own Home Assistant entities before using this card in production.",
    "",
    "## Languages",
    "",
    `Included language files: ${languages.join(", ")}.`,
    ...(fallbackLanguages.length > 0
      ? [
          "",
          `Fallback language files: ${fallbackLanguages.join(", ")}.`,
          "These files contain English fallback text. Please translate and review the corresponding files in `locales/` before publishing.",
        ]
      : []),
    "",
  ].join("\n");
}

interface ZipEndOfCentralDirectory {
  readonly fileCount: number;
  readonly centralDirectoryOffset: number;
}

interface ZipCentralDirectoryRecord {
  readonly fileName: Uint8Array;
  readonly crc32: number;
  readonly size: number;
  readonly localHeaderOffset: number;
}

interface ReadableZipArchiveEntry extends HomeAssistantCardEditorHacsBundleArchiveEntry {
  readonly localHeaderOffset: number;
}

function readZipCentralDirectoryEntries(content: Uint8Array): ReadableZipArchiveEntry[] {
  const endOfCentralDirectory = readZipEndOfCentralDirectory(content);
  const entries: ReadableZipArchiveEntry[] = [];
  let offset = endOfCentralDirectory.centralDirectoryOffset;
  const decoder = new TextDecoder();

  for (let index = 0; index < endOfCentralDirectory.fileCount; index += 1) {
    const view = new DataView(content.buffer, content.byteOffset + offset);
    if (view.getUint32(0, true) !== 0x02014b50) {
      throw new Error("Invalid ZIP central directory.");
    }

    const compressionMethod = view.getUint16(10, true);
    const compressedSize = view.getUint32(20, true);
    const uncompressedSize = view.getUint32(24, true);
    const fileNameLength = view.getUint16(28, true);
    const extraFieldLength = view.getUint16(30, true);
    const commentLength = view.getUint16(32, true);
    const localHeaderOffset = view.getUint32(42, true);
    const fileName = content.slice(offset + 46, offset + 46 + fileNameLength);
    entries.push({
      path: decoder.decode(fileName),
      compressionMethod: normalizeZipCompressionMethod(compressionMethod),
      compressedSize,
      uncompressedSize,
      localHeaderOffset,
    });
    offset += 46 + fileNameLength + extraFieldLength + commentLength;
  }

  return entries;
}

function readStoredZipEntryText(content: Uint8Array, entry: ReadableZipArchiveEntry): string {
  const offset = entry.localHeaderOffset;
  const view = new DataView(content.buffer, content.byteOffset + offset);
  if (view.getUint32(0, true) !== 0x04034b50) {
    throw new Error("Invalid ZIP local file header.");
  }
  const fileNameLength = view.getUint16(26, true);
  const extraFieldLength = view.getUint16(28, true);
  const dataOffset = offset + 30 + fileNameLength + extraFieldLength;
  const dataEnd = dataOffset + entry.uncompressedSize;
  if (dataOffset < 0 || dataEnd > content.length) {
    throw new Error("ZIP local file content is out of bounds.");
  }
  return new TextDecoder().decode(content.slice(dataOffset, dataEnd));
}

function readZipEndOfCentralDirectory(content: Uint8Array): ZipEndOfCentralDirectory {
  const minimumSize = 22;
  const maximumCommentSize = 0xffff;
  const searchStart = Math.max(0, content.length - minimumSize - maximumCommentSize);
  for (let offset = content.length - minimumSize; offset >= searchStart; offset -= 1) {
    const view = new DataView(content.buffer, content.byteOffset + offset, minimumSize);
    if (view.getUint32(0, true) === 0x06054b50) {
      return {
        fileCount: view.getUint16(10, true),
        centralDirectoryOffset: view.getUint32(16, true),
      };
    }
  }
  throw new Error("ZIP end of central directory not found.");
}

function normalizeZipCompressionMethod(value: number): HomeAssistantCardEditorHacsBundleArchiveEntry["compressionMethod"] {
  if (value === 0) return "store";
  if (value === 8) return "deflate";
  return "unsupported";
}

function createStoredZipArchive(files: readonly HomeAssistantCardEditorHacsBundleFile[]): Uint8Array {
  const chunks: Uint8Array[] = [];
  const centralDirectoryRecords: ZipCentralDirectoryRecord[] = [];
  let offset = 0;

  for (const file of files) {
    const fileName = encodeUtf8(file.path);
    const content = encodeUtf8(file.content);
    const crc32 = calculateCrc32(content);
    const localHeader = createZipLocalFileHeader(fileName, crc32, content.length);
    chunks.push(localHeader, content);
    centralDirectoryRecords.push({
      fileName,
      crc32,
      size: content.length,
      localHeaderOffset: offset,
    });
    offset += localHeader.length + content.length;
  }

  const centralDirectoryOffset = offset;
  for (const record of centralDirectoryRecords) {
    const centralDirectoryHeader = createZipCentralDirectoryHeader(record);
    chunks.push(centralDirectoryHeader);
    offset += centralDirectoryHeader.length;
  }

  const centralDirectorySize = offset - centralDirectoryOffset;
  chunks.push(createZipEndOfCentralDirectoryRecord(
    centralDirectoryRecords.length,
    centralDirectorySize,
    centralDirectoryOffset,
  ));

  return concatUint8Arrays(chunks);
}

function createZipLocalFileHeader(fileName: Uint8Array, crc32: number, size: number): Uint8Array {
  const header = new Uint8Array(30 + fileName.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x04034b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 0x0800, true);
  view.setUint16(8, 0, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0x0021, true);
  view.setUint32(14, crc32, true);
  view.setUint32(18, size, true);
  view.setUint32(22, size, true);
  view.setUint16(26, fileName.length, true);
  view.setUint16(28, 0, true);
  header.set(fileName, 30);
  return header;
}

function createZipCentralDirectoryHeader(record: ZipCentralDirectoryRecord): Uint8Array {
  const header = new Uint8Array(46 + record.fileName.length);
  const view = new DataView(header.buffer);
  view.setUint32(0, 0x02014b50, true);
  view.setUint16(4, 20, true);
  view.setUint16(6, 20, true);
  view.setUint16(8, 0x0800, true);
  view.setUint16(10, 0, true);
  view.setUint16(12, 0, true);
  view.setUint16(14, 0x0021, true);
  view.setUint32(16, record.crc32, true);
  view.setUint32(20, record.size, true);
  view.setUint32(24, record.size, true);
  view.setUint16(28, record.fileName.length, true);
  view.setUint16(30, 0, true);
  view.setUint16(32, 0, true);
  view.setUint16(34, 0, true);
  view.setUint16(36, 0, true);
  view.setUint32(38, 0, true);
  view.setUint32(42, record.localHeaderOffset, true);
  header.set(record.fileName, 46);
  return header;
}

function createZipEndOfCentralDirectoryRecord(
  fileCount: number,
  centralDirectorySize: number,
  centralDirectoryOffset: number,
): Uint8Array {
  const record = new Uint8Array(22);
  const view = new DataView(record.buffer);
  view.setUint32(0, 0x06054b50, true);
  view.setUint16(4, 0, true);
  view.setUint16(6, 0, true);
  view.setUint16(8, fileCount, true);
  view.setUint16(10, fileCount, true);
  view.setUint32(12, centralDirectorySize, true);
  view.setUint32(16, centralDirectoryOffset, true);
  view.setUint16(20, 0, true);
  return record;
}

function calculateCrc32(content: Uint8Array): number {
  let crc = 0xffffffff;
  for (const byte of content) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function concatUint8Arrays(chunks: readonly Uint8Array[]): Uint8Array {
  const totalLength = chunks.reduce((length, chunk) => length + chunk.length, 0);
  const output = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    output.set(chunk, offset);
    offset += chunk.length;
  }
  return output;
}

function encodeUtf8(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function formatInvalidLocaleReviewLine(
  locale: HomeAssistantCardEditorHacsBundleArchiveInvalidLocale,
): string {
  const actual = locale.actualLanguage ? `, actual ${locale.actualLanguage}` : "";
  return `Invalid locale ${locale.path}: expected ${locale.expectedLanguage}${actual} (${locale.reason})`;
}

function formatScriptReadinessReviewLine(
  readiness: HomeAssistantCardEditorHacsBundleArchiveScriptReadiness,
): string {
  if (readiness.valid) {
    return `Script: ${readiness.path ?? "unknown script"} defines ${readiness.expectedCustomElementName ?? "unknown element"} (${readiness.reason})`;
  }
  const expected = readiness.expectedCustomElementName ? `expected ${readiness.expectedCustomElementName}` : "expected custom element unknown";
  return `Invalid script ${readiness.path ?? "unknown script"}: ${expected} (${readiness.reason})`;
}

function formatExampleReadinessReviewLine(
  readiness: HomeAssistantCardEditorHacsBundleArchiveExampleReadiness,
): string {
  if (readiness.valid) {
    return `Example card: ${readiness.actualType ?? "unknown"} (${readiness.reason})`;
  }
  const expected = readiness.expectedType ? `expected ${readiness.expectedType}` : "expected card type unknown";
  const actual = readiness.actualType ? `, actual ${readiness.actualType}` : "";
  return `Invalid example card ${readiness.path}: ${expected}${actual} (${readiness.reason})`;
}

function formatReadmeReadinessReviewLine(
  readiness: HomeAssistantCardEditorHacsBundleArchiveReadmeReadiness,
): string {
  if (readiness.valid) {
    return `README: ${readiness.expectedResourcePath ?? "unknown resource"} / ${readiness.expectedCardType ?? "unknown card"} (${readiness.reason})`;
  }
  const missing = !readiness.mentionsResourcePath
    ? readiness.expectedResourcePath ?? "resource path"
    : readiness.expectedCardType ?? "card type";
  return `Invalid README ${readiness.path}: missing ${missing} (${readiness.reason})`;
}

function inspectLocaleArchiveEntry(
  content: Uint8Array,
  entry: ReadableZipArchiveEntry,
  path: string,
): HomeAssistantCardEditorHacsBundleArchiveInvalidLocale | undefined {
  const expectedLanguage = path.match(/^locales\/([a-z]{2})\.json$/)?.[1] ?? "";
  try {
    const parsed = parseJsonRecord(readStoredZipEntryText(content, entry));
    const actualLanguage = isRecord(parsed._meta) && typeof parsed._meta.language === "string"
      ? parsed._meta.language
      : undefined;
    if (!actualLanguage) {
      return {
        path,
        expectedLanguage,
        reason: "missing-meta-language",
      };
    }
    if (actualLanguage !== expectedLanguage) {
      return {
        path,
        expectedLanguage,
        actualLanguage,
        reason: "language-mismatch",
      };
    }
    return undefined;
  } catch {
    return {
      path,
      expectedLanguage,
      reason: "invalid-json",
    };
  }
}

function isSafeHacsBundleArchivePath(path: string): boolean {
  const trimmed = path.trim();
  if (!trimmed || trimmed !== path) return false;
  if (trimmed.includes("\\") || trimmed.startsWith("/") || /^[a-zA-Z]:/.test(trimmed)) return false;
  return trimmed.split("/").every(segment => segment && segment !== "." && segment !== "..");
}

function listDuplicateStrings(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      duplicates.add(value);
      continue;
    }
    seen.add(value);
  }
  return [...duplicates];
}

function normalizeLanguageCodes(values: readonly string[]): string[] {
  return [...new Set(values
    .map(value => value.trim().toLowerCase())
    .filter(value => /^[a-z]{2}$/.test(value)))].sort((left, right) => {
      if (left === "en") return -1;
      if (right === "en") return 1;
      return left.localeCompare(right);
    });
}

function readStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function parseJsonRecord(text: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(text);
  if (typeof parsed === "object" && parsed !== null) {
    return parsed as Record<string, unknown>;
  }
  return {};
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

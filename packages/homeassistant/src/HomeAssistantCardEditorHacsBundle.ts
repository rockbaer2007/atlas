import type { HomeAssistantCardExportPackage } from "./HomeAssistantCardConfiguration";
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

export interface HomeAssistantCardEditorHacsBundleArchiveInspection {
  readonly kind: "atlas.homeassistant.hacs-card-bundle-archive";
  readonly importable: boolean;
  readonly fileCount: number;
  readonly files: readonly HomeAssistantCardEditorHacsBundleArchiveEntry[];
  readonly requiredFiles: readonly string[];
  readonly missingFiles: readonly string[];
  readonly scriptFiles: readonly string[];
  readonly atlasPackageFiles: readonly string[];
  readonly reason: string;
}

export interface HomeAssistantCardEditorHacsBundleArchivePackageRead {
  readonly kind: "atlas.homeassistant.hacs-card-bundle-package";
  readonly importable: boolean;
  readonly inspection: HomeAssistantCardEditorHacsBundleArchiveInspection;
  readonly packageFile?: string;
  readonly packageContent?: string;
  readonly reason: string;
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
        content: createHomeAssistantCardEditorBundleReadme(script.defaultConfig.title, script.resourcePath, defaultConfig),
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
    const scriptFiles = paths.filter(path => !path.includes("/") && path.endsWith(".js"));
    const atlasPackageFiles = paths.filter(path => path.startsWith("atlas/") && path.endsWith(".atlas-card.json"));
    const missingFiles = [
      ...requiredFiles.filter(path => !paths.includes(path)),
      ...(scriptFiles.length > 0 ? [] : ["*.js"]),
      ...(atlasPackageFiles.length > 0 ? [] : ["atlas/*.atlas-card.json"]),
    ];

    return {
      kind: "atlas.homeassistant.hacs-card-bundle-archive",
      importable: missingFiles.length === 0,
      fileCount: files.length,
      files: files.map(file => ({
        path: file.path,
        compressionMethod: file.compressionMethod,
        compressedSize: file.compressedSize,
        uncompressedSize: file.uncompressedSize,
      })),
      requiredFiles,
      missingFiles,
      scriptFiles,
      atlasPackageFiles,
      reason: missingFiles.length === 0
        ? "The archive contains the required ATLAS HACS card bundle files."
        : `The archive is missing required ATLAS HACS card bundle files: ${missingFiles.join(", ")}.`,
    };
  } catch {
    return {
      kind: "atlas.homeassistant.hacs-card-bundle-archive",
      importable: false,
      fileCount: 0,
      files: [],
      requiredFiles,
      missingFiles: requiredFiles,
      scriptFiles: [],
      atlasPackageFiles: [],
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
    const packageEntry = entries.find(entry => entry.path === inspection.atlasPackageFiles[0]);
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

    return {
      kind: "atlas.homeassistant.hacs-card-bundle-package",
      importable: true,
      inspection,
      packageFile: packageEntry.path,
      packageContent: readStoredZipEntryText(content, packageEntry),
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

function createHomeAssistantCardEditorBundleReadme(
  cardName: string,
  resourcePath: string,
  defaultConfig: string,
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

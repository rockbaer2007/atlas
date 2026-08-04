import type { RuntimePluginDescriptor } from "./RuntimePluginCatalog";

export type RuntimePluginInstallPackageFile = Readonly<{
  path: string;
  mediaType: string;
  content: string;
}>;

export type RuntimePluginInstallPackage = Readonly<{
  kind: "atlas.runtime.plugin.install-package";
  filename: string;
  plugin: RuntimePluginDescriptor;
  files: readonly RuntimePluginInstallPackageFile[];
}>;

export type RuntimePluginInstallPackageInput = Readonly<{
  plugin: RuntimePluginDescriptor;
  readme?: string;
  files?: readonly RuntimePluginInstallPackageFile[];
}>;

export function createRuntimePluginInstallPackage(
  input: RuntimePluginInstallPackageInput,
): RuntimePluginInstallPackage {
  return {
    kind: "atlas.runtime.plugin.install-package",
    filename: `${normalizeRuntimePluginPackageName(input.plugin.id)}.atlas-plugin.json`,
    plugin: input.plugin,
    files: [
      {
        path: "atlas-plugin.json",
        mediaType: "application/json",
        content: serializeRuntimePluginInstallManifest(input.plugin),
      },
      {
        path: "README.md",
        mediaType: "text/markdown",
        content: input.readme ?? defaultRuntimePluginReadme(input.plugin),
      },
      ...(input.files ?? []),
    ],
  };
}

export function serializeRuntimePluginInstallManifest(
  plugin: RuntimePluginDescriptor,
): string {
  return `${JSON.stringify({
    id: plugin.id,
    name: plugin.name,
    version: plugin.version,
    description: plugin.description,
    dependencies: plugin.dependencies,
    extensionPoints: plugin.extensionPoints,
    provides: plugin.provides,
  }, null, 2)}\n`;
}

export function normalizeRuntimePluginPackageName(value: string): string {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "atlas-plugin";
}

function defaultRuntimePluginReadme(plugin: RuntimePluginDescriptor): string {
  return [
    `# ${plugin.name}`,
    "",
    `Plugin ID: \`${plugin.id}\``,
    `Version: \`${plugin.version}\``,
    "",
    "This package was generated from an ATLAS plugin descriptor.",
    "",
  ].join("\n");
}

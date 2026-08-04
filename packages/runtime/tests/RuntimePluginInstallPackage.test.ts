import { describe, expect, it } from "vitest";

import {
  createRuntimePluginInstallPackage,
  normalizeRuntimePluginPackageName,
  serializeRuntimePluginInstallManifest,
  type RuntimePluginDescriptor,
} from "../src";

const plugin: RuntimePluginDescriptor = {
  id: "atlas.plugin.homeassistant-card-editor",
  name: "ATLAS Home Assistant Card Editor",
  version: "0.2.0-alpha.1",
  description: "Reference plugin",
  dependencies: [],
  extensionPoints: ["homeassistant.card-editor"],
  provides: ["homeassistant.expert-editor"],
};

describe("RuntimePluginInstallPackage", () => {
  it("serializes a plugin install manifest", () => {
    expect(JSON.parse(serializeRuntimePluginInstallManifest(plugin))).toEqual({
      id: "atlas.plugin.homeassistant-card-editor",
      name: "ATLAS Home Assistant Card Editor",
      version: "0.2.0-alpha.1",
      description: "Reference plugin",
      dependencies: [],
      extensionPoints: ["homeassistant.card-editor"],
      provides: ["homeassistant.expert-editor"],
    });
  });

  it("creates a package with manifest, README and custom files", () => {
    const installPackage = createRuntimePluginInstallPackage({
      plugin,
      files: [{
        path: "examples/card.yaml",
        mediaType: "application/yaml",
        content: "type: entities\n",
      }],
    });

    expect(installPackage).toMatchObject({
      kind: "atlas.runtime.plugin.install-package",
      filename: "atlas-plugin-homeassistant-card-editor.atlas-plugin.json",
      plugin,
    });
    expect(installPackage.files.map(file => file.path)).toEqual([
      "atlas-plugin.json",
      "README.md",
      "examples/card.yaml",
    ]);
    expect(installPackage.files[1]?.content).toContain("# ATLAS Home Assistant Card Editor");
  });

  it("normalizes package names", () => {
    expect(normalizeRuntimePluginPackageName(" ATLAS Plugin: Home Assistant Card Editor! "))
      .toBe("atlas-plugin-home-assistant-card-editor");
    expect(normalizeRuntimePluginPackageName(" ")).toBe("atlas-plugin");
  });
});

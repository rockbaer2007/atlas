import { describe, expect, it } from "vitest";

import {
  createRuntimeModuleFromPlugin,
  RuntimeHost,
  RuntimePluginCatalog,
} from "@atlas/runtime";

import {
  createHomeAssistantCardEditorPlugin,
  HomeAssistantCardEditorExtensionPoints,
  HomeAssistantCardEditorPluginCapabilities,
  HomeAssistantCardEditorPluginId,
  HomeAssistantCardEditorPluginServiceKey,
  type HomeAssistantCardEditorPluginService,
} from "../src";

describe("Home Assistant card editor plugin", () => {
  it("describes the Home Assistant card editor as the first reference plugin", () => {
    const plugin = createHomeAssistantCardEditorPlugin();

    expect(plugin.manifest).toMatchObject({
      id: HomeAssistantCardEditorPluginId,
      name: "ATLAS Home Assistant Card Editor",
      version: "0.2.0-alpha.1",
      extensionPoints: [
        HomeAssistantCardEditorExtensionPoints.cardEditor,
        HomeAssistantCardEditorExtensionPoints.cardTarget,
        HomeAssistantCardEditorExtensionPoints.entityPicker,
        HomeAssistantCardEditorExtensionPoints.exporter,
        HomeAssistantCardEditorExtensionPoints.packageBuilder,
      ],
      provides: HomeAssistantCardEditorPluginCapabilities,
    });
  });

  it("can be discovered by extension point and provided capability", () => {
    const catalog = new RuntimePluginCatalog();

    catalog.register(createHomeAssistantCardEditorPlugin());

    expect(catalog.findByExtensionPoint("homeassistant.card-editor").map(plugin => plugin.id))
      .toEqual([HomeAssistantCardEditorPluginId]);
    expect(catalog.findProviding("homeassistant.hacs-package-export").map(plugin => plugin.id))
      .toEqual([HomeAssistantCardEditorPluginId]);
  });

  it("registers card editor service metadata during runtime activation", async () => {
    const host = new RuntimeHost({
      application: {
        name: "homeassistant-card-editor-plugin",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [createRuntimeModuleFromPlugin(createHomeAssistantCardEditorPlugin())],
    });

    await host.start();

    const service = host.services.resolve<HomeAssistantCardEditorPluginService>(
      HomeAssistantCardEditorPluginServiceKey,
    );

    expect(service.pluginId).toBe(HomeAssistantCardEditorPluginId);
    expect(service.extensionPoints).toContain("homeassistant.entity-picker");
    expect(service.capabilities).toContain("homeassistant.expert-editor");
    expect(service.cardTargets.map(target => target.target)).toContain("entities");
    expect(service.cardTargets.map(target => target.target)).toContain("mushroom-template");
    expect(service.cardTargets.map(target => target.target)).toContain("bubble");
    expect(service.templates.map(template => template.id)).toContain("vertical-stack");
    expect(service.bubbleButtonTypes).toEqual([
      "state",
      "switch",
      "slider",
      "name",
    ]);
  });
});

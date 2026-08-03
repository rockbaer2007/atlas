export type HomeAssistantCardEditorReferenceUsage =
  | "inspiration"
  | "interop-candidate"
  | "fork-candidate";

export interface HomeAssistantCardEditorReference {
  readonly name: string;
  readonly repositoryUrl: string;
  readonly license: string;
  readonly usage: readonly HomeAssistantCardEditorReferenceUsage[];
  readonly attributionRequired: boolean;
  readonly cloneRecommended: boolean;
  readonly notes: readonly string[];
}

export function createHomeAssistantCardBuilderReference(): HomeAssistantCardEditorReference {
  return {
    name: "studiobts/home-assistant-card-builder",
    repositoryUrl: "https://github.com/studiobts/home-assistant-card-builder",
    license: "AGPL-3.0",
    usage: ["inspiration", "interop-candidate", "fork-candidate"],
    attributionRequired: true,
    cloneRecommended: false,
    notes: [
      "Use as an external product and architecture reference for the ATLAS Home Assistant editor.",
      "Do not copy source code into ATLAS without explicitly accepting AGPL-3.0 obligations.",
      "If ATLAS ever becomes a fork or derivative, keep original copyright notices and publish source according to AGPL-3.0.",
      "Prefer independent ATLAS contracts, import/export compatibility and clear documentation references.",
    ],
  };
}

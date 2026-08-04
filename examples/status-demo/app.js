import {
  createThemeTokens,
} from "@atlas/theme";
import {
  createHomeAssistantStatusPanel,
  createHomeAssistantCardExportPackage,
  createHomeAssistantCardExportPayload,
  createHomeAssistantEntityState,
  createHomeAssistantConnectionConfiguration,
  createBrowserHomeAssistantWebSocket,
  createHomeAssistantRuntimeConnection,
  analyzeHomeAssistantCardEditorSurface,
  arrangeHomeAssistantCardEditorSurfaceFields,
  createHomeAssistantCardEditorConfiguration,
  createHomeAssistantCardEditorHacsBundle,
  createHomeAssistantCardEditorHacsBundleArchive,
  createHomeAssistantCardEditorPackagePlan,
  createHomeAssistantCardEditorScriptExport,
  createHomeAssistantCardEditorFieldFromTemplate,
  createHomeAssistantAtlasFrontendIntegrationPlan,
  decideHomeAssistantCardArtifactImport,
  formatHomeAssistantCardArtifactReviewLines,
  serializeHomeAssistantAtlasFrontendResourceReferences,
  createHomeAssistantEntityPresentation,
  createHomeAssistantEntityCatalog,
  createHomeAssistantCardConfiguration,
  createHomeAssistantPanelGroup,
  createHomeAssistantServiceCommand,
  createHomeAssistantStatusPanelRegistry,
  filterHomeAssistantEntityCatalog,
  listHomeAssistantEntityCatalogDomains,
  listHomeAssistantEntityDomainShortcuts,
  listHomeAssistantBubbleButtonTypes,
  normalizeHomeAssistantCardEditorScriptFilename,
  createInMemoryHomeAssistantEntityStateTransport,
  inspectHomeAssistantCardDependency,
  inspectHomeAssistantCardDependencyAvailability,
  listHomeAssistantCardEditorTemplates,
  listHomeAssistantCardTargets,
  serializeHomeAssistantEntitiesCardConfiguration,
  summarizeHomeAssistantCardImport,
  deriveHomeAssistantWebSocketUrl,
  findHomeAssistantStatusPanel,
  inspectHomeAssistantConnectionReadiness,
  bindHomeAssistantEntityStatusPanel,
} from "@atlas/homeassistant";

const statusRoot = document.querySelector("#atlas-status-root");
const statusMessage = document.querySelector("#status-message");
const buttons = Array.from(document.querySelectorAll("[data-entity-state]"));
const languageButtons = Array.from(document.querySelectorAll("[data-language]"));
const homeAssistantUrl = document.querySelector("#home-assistant-url");
const connectionReadiness = document.querySelector("#connection-readiness");
const connectionState = document.querySelector("#connection-state");
const homeAssistantToken = document.querySelector("#home-assistant-token");
const rememberHomeAssistantToken = document.querySelector("#remember-home-assistant-token");
const connectButton = document.querySelector("#connect-home-assistant");
const disconnectButton = document.querySelector("#disconnect-home-assistant");
const homeAssistantEntity = document.querySelector("#home-assistant-entity");
const homeAssistantEntityDomain = document.querySelector("#home-assistant-entity-domain");
const homeAssistantEntityDomainShortcuts = document.querySelector("#home-assistant-entity-domain-shortcuts");
const homeAssistantEntitySearch = document.querySelector("#home-assistant-entity-search");
const clearHomeAssistantEntitySearch = document.querySelector("#clear-home-assistant-entity-search");
const homeAssistantEntityPicker = document.querySelector("#home-assistant-entity-picker");
const homeAssistantEntityPickerStatus = document.querySelector("#home-assistant-entity-picker-status");
const addHomeAssistantEntity = document.querySelector("#add-home-assistant-entity");
const refreshHomeAssistantEntities = document.querySelector("#refresh-home-assistant-entities");
const homeAssistantGroup = document.querySelector("#home-assistant-group");
const homeAssistantGroupName = document.querySelector("#home-assistant-group-name");
const haCardTarget = document.querySelector("#ha-card-target");
const haCardLayout = document.querySelector("#ha-card-layout");
const haCardFormat = document.querySelector("#ha-card-format");
const haCardScriptFilename = document.querySelector("#ha-card-script-filename");
const saveHomeAssistantGroup = document.querySelector("#save-home-assistant-group");
const deleteHomeAssistantGroup = document.querySelector("#delete-home-assistant-group");
const duplicateHomeAssistantGroup = document.querySelector("#duplicate-home-assistant-group");
const exportHomeAssistantConfig = document.querySelector("#export-home-assistant-config");
const exportHaCardConfig = document.querySelector("#export-ha-card-config");
const exportHaCardPackage = document.querySelector("#export-ha-card-package");
const exportHaCardScript = document.querySelector("#export-ha-card-script");
const exportHaCardBundle = document.querySelector("#export-ha-card-bundle");
const copyHaCardConfig = document.querySelector("#copy-ha-card-config");
const copyHaCardResources = document.querySelector("#copy-ha-card-resources");
const checkHaCardResources = document.querySelector("#check-ha-card-resources");
const importHomeAssistantConfig = document.querySelector("#import-home-assistant-config");
const importHaCardConfig = document.querySelector("#import-ha-card-config");
const haCardPreview = document.querySelector("#ha-card-preview");
const haCardDependency = document.querySelector("#ha-card-dependency");
const haCardImportReview = document.querySelector("#ha-card-import-review");
const diagnosticsPanel = document.querySelector("#diagnostics-panel");
const selectedEntity = document.querySelector("#selected-entity");
const editorModeButtons = document.querySelectorAll("[data-editor-mode]");
const panelGroupControl = document.querySelector("#panel-group-control");
const groupNameControl = document.querySelector("#group-name-control");
const cardTargetControl = document.querySelector("#card-target-control");
const cardLayoutControl = document.querySelector("#card-layout-control");
const simpleCardSection = document.querySelector("#simple-card-section");
const expertEditorSection = document.querySelector("#expert-editor-section");
const expertCardName = document.querySelector("#expert-card-name");
const expertTemplate = document.querySelector("#expert-template");
const expertTarget = document.querySelector("#expert-target");
const expertBubbleTypeControl = document.querySelector("#expert-bubble-type-control");
const expertBubbleButtonType = document.querySelector("#expert-bubble-button-type");
const expertTitle = document.querySelector("#expert-title");
const applyExpertTitle = document.querySelector("#apply-expert-title");
const useEntityNameAsTitle = document.querySelector("#use-entity-name-as-title");
const expertEntity = document.querySelector("#expert-entity");
const expertColumn = document.querySelector("#expert-column");
const expertRow = document.querySelector("#expert-row");
const expertWidth = document.querySelector("#expert-width");
const expertHeight = document.querySelector("#expert-height");
const addExpertField = document.querySelector("#add-expert-field");
const editExpertField = document.querySelector("#edit-expert-field");
const arrangeExpertFields = document.querySelector("#arrange-expert-fields");
const resetExpertSurfaceSize = document.querySelector("#reset-expert-surface-size");
const clearExpertFields = document.querySelector("#clear-expert-fields");
const expertTemplatePalette = document.querySelector("#expert-template-palette");
const saveExpertPaletteFavorites = document.querySelector("#save-expert-palette-favorites");
const showAllExpertPaletteCards = document.querySelector("#show-all-expert-palette-cards");
const scanExpertPaletteCards = document.querySelector("#scan-expert-palette-cards");
const resetExpertTemplateSizing = document.querySelector("#reset-expert-template-sizing");
const resetExpertPaletteFavorites = document.querySelector("#reset-expert-palette-favorites");
const expertEditorDropzone = document.querySelector("#expert-editor-dropzone");
const expertEditorSummary = document.querySelector("#expert-editor-summary");
const expertFieldList = document.querySelector("#expert-field-list");
const expertEditorPreview = document.querySelector("#expert-editor-preview");
const entityList = document.querySelector("#atlas-entity-list");
const stackSelectionSummary = document.querySelector("#stack-selection-summary");
const groupSummary = document.querySelector("#group-summary");
const groupIssues = document.querySelector("#group-issues");
const configurationStorageKey = "atlas.homeassistant.demo.configuration";
const cardTargets = listHomeAssistantCardTargets();
const cardEditorTemplates = listHomeAssistantCardEditorTemplates();
const bubbleButtonTypes = listHomeAssistantBubbleButtonTypes();
let currentLanguage = "en";
const translations = {
  en: {
    "page.title": "ATLAS Home Assistant Card Editor",
    "page.subtitle": "Build Simple or Expert Home Assistant cards from live or local entities.",
    "label.haUrl": "Home Assistant URL",
    "label.accessToken": "Access token",
    "label.rememberToken": "Remember token locally",
    "label.panelGroup": "Panel group",
    "label.groupName": "Group name",
    "label.cardTarget": "Card target",
    "label.cardLayout": "Card layout",
    "label.cardFormat": "Card format",
    "label.scriptFilename": "HACS script filename",
    "label.entityIds": "Entity IDs",
    "label.entityType": "Entity type",
    "label.entitySearch": "Entity search",
    "label.entityPicker": "Entity picker",
    "label.haCardCode": "HA card code",
    "label.expertHaCardCode": "Expert HA card code",
    "label.expertCardName": "Expert card name",
    "label.template": "Template",
    "label.cardFamily": "Card family",
    "label.bubbleButtonType": "Bubble button type",
    "label.title": "Title",
    "label.entity": "Entity",
    "label.column": "Column",
    "label.row": "Row",
    "label.width": "Width",
    "label.height": "Height",
    "button.connect": "Connect",
    "button.disconnect": "Disconnect",
    "button.saveGroup": "Save group",
    "button.deleteGroup": "Delete group",
    "button.duplicateGroup": "Duplicate group",
    "button.export": "Export",
    "button.exportHaCard": "Export HA card",
    "button.exportExpertHaCard": "Export Expert HA card",
    "button.exportCardPackage": "Export card package",
    "button.exportCardScript": "Export card script",
    "button.exportCardBundle": "Export HACS bundle",
    "button.copyHaCard": "Copy HA card",
    "button.copyExpertHaCard": "Copy Expert HA card",
    "button.copyResources": "Copy resources",
    "button.copyExpertResources": "Copy Expert resources",
    "button.checkResources": "Check resources",
    "button.import": "Import",
    "button.importHaCard": "Import HA card",
    "button.addEntity": "Add entity",
    "button.refreshEntities": "Refresh entities",
    "button.saveFavorites": "Save favorites",
    "button.showAllCards": "Show all cards",
    "button.showFavorites": "Show favorites",
    "button.scanHaCards": "Scan HA cards",
    "button.resetSizes": "Reset sizes",
    "button.resetFavorites": "Reset favorites",
    "button.addTemplate": "Add template",
    "button.editSelected": "Edit selected",
    "button.stopEditing": "Stop editing",
    "button.autoArrange": "Auto arrange",
    "button.resetSize": "Reset size",
    "button.clearPreview": "Clear preview",
    "button.applyTitle": "Apply title",
    "button.useEntityName": "Use entity name",
    "button.off": "Off",
    "button.on": "On",
    "button.unavailable": "Unavailable",
    "button.simpleMode": "Simple",
    "button.expertMode": "Expert",
    "button.turnOn": "Turn on",
    "button.turnOff": "Turn off",
    "heading.expertEditor": "Expert editor preview",
    "heading.cardList": "Card list",
    "heading.diagnostics": "Diagnostics",
    "heading.statusPreview": "ATLAS Status Preview",
    "heading.selectedEntities": "Selected entities",
    "group.overview": "Overview",
    "group.energy": "Energy",
    "group.safety": "Safety",
    "group.custom": "Custom",
    "layout.single": "Simple",
    "layout.horizontal": "Horizontal stack",
    "layout.vertical": "Vertical stack",
    "placeholder.entitySearch": "Filter by name or entity ID",
    "placeholder.scriptFilename": "energy-kitchen.js",
    "placeholder.expertCardName": "ATLAS Expert card",
    "placeholder.expertTitle": "Use template title when empty",
    "placeholder.expertEntity": "Use current entity when empty",
    "aria.entityTypeShortcuts": "Entity type shortcuts",
    "aria.clearEntitySearch": "Clear entity search",
    "aria.language": "Language",
    "aria.cardEditorMode": "Card editor mode",
    "aria.availableCards": "Available Home Assistant cards",
    "aria.expertTemplates": "Expert editor templates",
    "aria.expertSurface": "Expert editor surface",
    "aria.resizeExpertSurface": "Resize Expert editor surface",
    "aria.showStatusPreview": "Show {entityId} in the ATLAS Status Preview",
    "aria.moveEntityUp": "Move {entityId} up",
    "aria.moveEntityDown": "Move {entityId} down",
    "aria.removeEntity": "Remove {entityId}",
    "aria.useEntityInStack": "Use {entityId} in stack export",
    "aria.entityState": "Entity state",
    "message.emptySelection": "Select at least one entity.",
    "message.noExpertFields": "No expert fields added.",
    "message.dragCard": "Drag a card from the left into this editor surface.",
    "message.addTemplatePreview": "Add a template field to preview the Expert editor output.",
    "message.addTemplateBeforeExport": "Add a template field before exporting an Expert HA card.",
    "message.statusPanelNotRegistered": "Status panel is not registered.",
    "message.connectionUrlReady": "Connection URL ready: {url}",
    "message.connectionState": "Connection: {state}",
    "message.connectionStateWithReason": "Connection: {state} ({reason})",
    "message.connectionStateWithSubscription": "Connection: {state}, subscription {subscription}",
    "message.reconnecting": "Reconnecting in {seconds}s ({attempt}/3).",
    "message.stackSelectedEntities": "Stack-selected entities: {selected}/{total}{entities}",
    "message.stackEntitySuffix": " - {entities}",
    "message.simpleUsesFirstEntity": "Simple uses the first entity: {entityId}",
    "message.simpleUsesFirstEntityEmpty": "Simple uses the first entity.",
    "message.noEntitiesFound": "No entities found for {domain}{search}.",
    "message.entitySearchSuffix": " and \"{search}\"",
    "message.entitiesFound": "{count} {entityLabel} found for {domain}.",
    "message.entitySingular": "entity",
    "message.entityPlural": "entities",
    "message.allTypes": "all types",
    "message.selectEntityFirst": "Select an entity first.",
    "message.entityListRequested": "Entity list requested from Home Assistant ({requestId}).",
    "message.connectBeforeRefreshingEntities": "Connect to Home Assistant before refreshing entities.",
    "message.resourcesRequested": "Lovelace resources requested ({requestId}).",
    "message.connectBeforeCheckingResources": "Connect to Home Assistant before checking resources.",
    "message.paletteEntriesDetected": "{total} palette entries detected from loaded HA resources, including {hacs} /hacsfiles resources.",
    "message.noPaletteEntriesDetected": "No additional scan-only palette entries detected from loaded HA resources.",
    "message.refreshingResources": "{message} Refreshing Lovelace resources from Home Assistant.",
    "message.connectAndScanAgain": "{message} Connect to Home Assistant and scan again to refresh the list.",
    "message.templateSizeSet": "{template} size set to {columns} columns and {rows} rows.",
    "message.surfaceResized": "Expert editor surface resized: +{columns} columns, +{rows} rows.",
    "message.surfaceSizeReset": "Expert editor surface size reset to the default.",
    "message.arrangeNeedsFields": "Add Expert fields before arranging the editor surface.",
    "message.fieldsArranged": "Expert fields arranged. Overlaps: {previous} -> {next}.",
    "message.selectFieldBeforeResize": "Select an Expert field before changing its size.",
    "message.fieldResized": "{field} resized to {width}x{height}.",
    "message.fieldMoved": "{field} moved on the Expert editor surface.",
    "message.groupStatus": "Group status: {ready} ready, {pending} pending, {blocked} blocked.",
    "message.needsAttention": "Needs attention: {entities}.",
    "message.selectedForHaPreview": "{entityId} selected for the HA card preview.",
    "message.selectedForDiagnosticsPreview": "{entityId} selected for the Diagnostics status preview.",
    "message.selectedForDiagnosticsWithStack": "{entityId} selected for Diagnostics. Use the checkbox to include it in the stack export.",
    "message.stackNeedsEntity": "{entityId} remains selected; stack export needs at least one entity.",
    "message.addedToStackPreview": "{entityId} added to the stack preview.",
    "message.removedFromStackPreview": "{entityId} removed from the stack preview.",
    "message.entityRemoved": "{entityId} removed.",
    "message.justNow": "just now",
    "message.minutesAgo": "{count} min ago",
    "message.hoursAgo": "{count} h ago",
    "message.sendServiceConfirm": "Send {service} to {entityId}?",
    "message.commandSent": "Command sent for {entityId}.",
    "message.noActiveConnection": "No active Home Assistant connection.",
    "message.commandCompleted": "Command completed for {entityId}.",
    "message.commandFailed": "Command failed for {entityId}: {reason}",
    "message.unknownError": "Unknown error.",
    "message.loadedEntities": "Loaded {count} entities from Home Assistant.",
    "message.entityListFailed": "Entity list failed: {reason}",
    "message.loadedResources": "Loaded {count} Lovelace resources from Home Assistant. {total} palette entries detected, including {hacs} /hacsfiles resources.",
    "message.lovelaceFailed": "Lovelace resources failed: {reason}",
    "message.liveEntity": "Live entity: {entityId}",
    "message.demoEntityTarget": "Demo entity: {entityId}",
    "message.waitingForUpdates": "Waiting for updates from {entityId}.",
    "message.demoControlsTarget": "Demo controls target {entityId}.",
    "message.tokenRequired": "An access token is required to connect.",
    "message.entityStateUpdated": "Entity state updated: {state}.",
    "message.titleCopied": "{title} copied from the selected entity.",
    "message.expertPreviewCleared": "Expert editor preview cleared.",
    "message.groupRequiresNameAndEntity": "A group name and at least one entity are required.",
    "message.groupSaved": "Group {title} saved.",
    "message.builtInGroupsCannotDelete": "Built-in groups cannot be deleted.",
    "message.groupDeleted": "Group deleted.",
    "message.selectGroupToDuplicate": "Select a group to duplicate.",
    "message.groupCreated": "Group {title} created.",
    "message.haCardCopied": "HA card {format} copied to clipboard.",
    "message.copyPreviewFailed": "Copy failed: use the preview text instead.",
    "message.resourcesCopiedWithDependency": "ATLAS and {dependency} Lovelace resources {format} copied to clipboard.",
    "message.atlasResourceCopied": "ATLAS Lovelace resource {format} copied to clipboard.",
    "message.copyDependencyFailed": "Copy failed: use the dependency path instead.",
    "message.importConfigurationConfirm": "Import {name}: {groups} groups and {entities} entities?",
    "message.unnamedConfiguration": "Unnamed configuration",
    "message.configurationImported": "Configuration imported: {groups} groups and {entities} entities.",
    "message.importConfigurationFailed": "Import failed: invalid configuration.",
    "message.importPaused": "Import paused: review the compatibility details before mapping this artifact.",
    "message.importRejected": "Import rejected: unsupported Home Assistant card artifact.",
    "message.haCardImported": "{type} {format} imported: {title} with {entities} entities.",
    "message.importHaCardFailed": "Import failed: invalid Home Assistant entities card JSON or YAML.",
    "message.packageExported": "Card package exported with HACS script {scriptFilename}.",
    "message.scriptExported": "Card script exported as {scriptFilename}.",
    "message.bundleExported": "HACS bundle exported as {filename} with {count} files.",
    "message.scriptFilenameNormalized": "HACS script filename will be exported as {scriptFilename}.",
    "message.atlasPackage": "ATLAS card package",
    "message.haCard": "HA card",
    "dependency.resource": " Resource: {paths}.",
    "dependency.installPath": " Install path: {paths}.",
    "dependency.atlasFrontend": " ATLAS frontend: {paths}.",
    "dependency.builtIn": "Uses built-in Home Assistant card.{atlasHint}",
    "dependency.requiresUnchecked": "Requires {dependency}.{resourceHint}{installHint}{atlasHint} Connect to Home Assistant or check resources.",
    "dependency.ready": "{dependency} and ATLAS frontend resources found.{resourceHint}{atlasHint}",
    "dependency.cardFoundAtlasMissing": "{dependency} resource found.{resourceHint}{atlasHint} Missing ATLAS frontend: {missing}.",
    "dependency.missing": "Requires {dependency}.{resourceHint}{installHint}{atlasHint} Missing: {missing}.",
    "text.allEntityTypes": "All entity types",
    "text.all": "All",
    "text.favorite": "Favorite",
    "text.scannedOnly": "Scanned only",
    "text.builtIn": "Built-in",
    "text.resourceUnchecked": "Resource unchecked",
    "text.resourceInstalled": "Resource installed",
    "text.resourceMissing": "Resource missing",
    "text.demoEntity": "demo entity",
    "text.waiting": "Waiting",
    "text.col": "col",
    "text.row": "row",
    "text.full": "full",
    "text.auto": "auto",
    "text.categoryCore": "Core",
    "text.categoryCommunity": "Community",
    "text.registeredNotMapped": "{category} registered, not mapped yet",
    "text.paletteDetail": "{layout}, {size}, {target}",
    "text.scannedCardUnavailable": "{label} is registered in Home Assistant, but ATLAS does not map this custom card yet.",
    "text.paletteCardSelected": "{label} selected from the card list.",
    "text.paletteSelectionChanged": "Favorite selection changed. Use Save favorites to apply it.",
    "text.fullCardListVisible": "Full Core and Community card list is visible for favorite selection.",
    "text.savedFavoritesVisible": "Saved favorites are visible.",
    "text.favoritesSaved": "{count} favorite cards saved.",
    "text.allCardsRemainVisible": "Favorite selection saved. All cards remain visible.",
    "text.allCardsVisibleAgain": "All Core and Community cards are visible again.",
    "text.templateSizesReset": "Template sizes reset to their defaults.",
    "text.removeField": "Remove {field}",
    "text.fieldRemoved": "{field} removed from the Expert editor preview.",
    "text.enterTitle": "Enter a title before applying it.",
    "text.titlePrepared": "{title} prepared for the next Expert field.",
    "text.titleApplied": "{title} set as Expert field title.",
    "text.targetUpdated": "{field} card family updated to {target}.",
    "text.bubbleTypeUpdated": "{field} Bubble button type set to {type}.",
    "text.entityPrepared": "{entityId} prepared for the next Expert field.",
    "text.entityAssigned": "{entityId} assigned to {title}.",
    "text.fieldSelected": "{field} selected on the Expert editor surface.",
    "text.selectFieldBeforeEditing": "Select an Expert field before editing.",
    "text.editHandlesEnabled": "{field} editing handles enabled.",
    "text.editHandlesHidden": "{field} editing handles hidden.",
    "text.overlappingField": "overlapping another field",
    "text.expertFieldsSummary": "Expert fields: {count} ({populated} populated{empty})",
    "text.emptyFieldsSummary": ", {count} empty",
    "text.rowsSummary": "Rows: {count}",
    "text.surfaceSummary": "Surface: {columns}x{rows}",
    "text.overlapsSummary": "Overlaps: {count}",
    "text.targetsSummary": "Targets: {targets}",
    "text.layoutsSummary": "Layouts: {layouts}",
    "text.expertFieldsZero": "Expert fields: 0.",
    "text.fieldAdded": "{field} added to the Expert editor preview.",
    "text.fieldPlaced": "{field} placed on the Expert editor surface.",
    "palette.core-entity": "Entity",
    "palette.core-entities": "Entities",
    "palette.core-button": "Button",
    "palette.core-grid": "Grid",
    "palette.core-sensor": "Sensor",
    "palette.core-horizontal-stack": "Horizontal stack",
    "palette.core-vertical-stack": "Vertical stack",
    "palette.core-thermostat": "Thermostat",
    "palette.core-link": "Link",
    "palette.core-webpage": "Webpage",
    "palette.community-mushroom-template": "Mushroom template",
    "palette.community-bubble-state": "Bubble state",
    "palette.community-bubble-switch": "Bubble switch",
    "palette.community-bubble-slider": "Bubble slider",
    "palette.community-bubble-name": "Bubble name",
    "target.entities": "Entities",
    "target.entity": "Entity",
    "target.button": "Button",
    "target.sensor": "Sensor",
    "target.thermostat": "Thermostat",
    "target.link": "Link",
    "target.webpage": "Webpage",
    "target.mushroom-template": "Mushroom template",
    "target.bubble": "Bubble",
    "template.entity-list": "Entity list",
    "template.entity-card": "Entity",
    "template.button-card": "Button",
    "template.grid": "Grid",
    "template.sensor-card": "Sensor",
    "template.horizontal-stack": "Horizontal stack",
    "template.vertical-stack": "Vertical stack",
    "template.thermostat-card": "Thermostat",
    "template.link-card": "Link",
    "template.webpage-card": "Webpage",
    "template.state-button": "State button",
    "template.switch-button": "Switch button",
  },
  de: {
    "page.title": "ATLAS Home Assistant Card Editor",
    "page.subtitle": "Erstelle Simple- oder Expert-Home-Assistant-Cards aus Live- oder lokalen Entitaeten.",
    "label.haUrl": "Home Assistant URL",
    "label.accessToken": "Access Token",
    "label.rememberToken": "Token lokal merken",
    "label.panelGroup": "Panel-Gruppe",
    "label.groupName": "Gruppenname",
    "label.cardTarget": "Card-Ziel",
    "label.cardLayout": "Card-Layout",
    "label.cardFormat": "Card-Format",
    "label.scriptFilename": "HACS-Script-Dateiname",
    "label.entityIds": "Entitaets-IDs",
    "label.entityType": "Entitaetstyp",
    "label.entitySearch": "Entitaet suchen",
    "label.entityPicker": "Entitaetsauswahl",
    "label.haCardCode": "HA-Card-Code",
    "label.expertHaCardCode": "Expert-HA-Card-Code",
    "label.expertCardName": "Expert-Card-Name",
    "label.template": "Template",
    "label.cardFamily": "Card-Familie",
    "label.bubbleButtonType": "Bubble-Button-Typ",
    "label.title": "Titel",
    "label.entity": "Entitaet",
    "label.column": "Spalte",
    "label.row": "Zeile",
    "label.width": "Breite",
    "label.height": "Hoehe",
    "button.connect": "Verbinden",
    "button.disconnect": "Trennen",
    "button.saveGroup": "Gruppe speichern",
    "button.deleteGroup": "Gruppe loeschen",
    "button.duplicateGroup": "Gruppe duplizieren",
    "button.export": "Export",
    "button.exportHaCard": "HA-Card exportieren",
    "button.exportExpertHaCard": "Expert-HA-Card exportieren",
    "button.exportCardPackage": "Card-Paket exportieren",
    "button.exportCardScript": "Card-Script exportieren",
    "button.exportCardBundle": "HACS-Bundle exportieren",
    "button.copyHaCard": "HA-Card kopieren",
    "button.copyExpertHaCard": "Expert-HA-Card kopieren",
    "button.copyResources": "Ressourcen kopieren",
    "button.copyExpertResources": "Expert-Ressourcen kopieren",
    "button.checkResources": "Ressourcen pruefen",
    "button.import": "Import",
    "button.importHaCard": "HA-Card importieren",
    "button.addEntity": "Entitaet hinzufuegen",
    "button.refreshEntities": "Entitaeten aktualisieren",
    "button.saveFavorites": "Favoriten speichern",
    "button.showAllCards": "Alle Cards anzeigen",
    "button.showFavorites": "Favoriten anzeigen",
    "button.scanHaCards": "HA-Cards scannen",
    "button.resetSizes": "Groessen zuruecksetzen",
    "button.resetFavorites": "Favoriten zuruecksetzen",
    "button.addTemplate": "Template hinzufuegen",
    "button.editSelected": "Auswahl bearbeiten",
    "button.stopEditing": "Bearbeitung beenden",
    "button.autoArrange": "Automatisch anordnen",
    "button.resetSize": "Groesse zuruecksetzen",
    "button.clearPreview": "Vorschau leeren",
    "button.applyTitle": "Titel uebernehmen",
    "button.useEntityName": "Entitaetsname nutzen",
    "button.off": "Aus",
    "button.on": "Ein",
    "button.unavailable": "Nicht verfuegbar",
    "button.simpleMode": "Simple",
    "button.expertMode": "Expert",
    "button.turnOn": "Einschalten",
    "button.turnOff": "Ausschalten",
    "heading.expertEditor": "Expert-Editor-Vorschau",
    "heading.cardList": "Card-Liste",
    "heading.diagnostics": "Diagnose",
    "heading.statusPreview": "ATLAS Status Vorschau",
    "heading.selectedEntities": "Ausgewaehlte Entitaeten",
    "group.overview": "Uebersicht",
    "group.energy": "Energie",
    "group.safety": "Sicherheit",
    "group.custom": "Benutzerdefiniert",
    "layout.single": "Einfach",
    "layout.horizontal": "Horizontaler Stapel",
    "layout.vertical": "Vertikaler Stapel",
    "placeholder.entitySearch": "Nach Name oder Entitaets-ID filtern",
    "placeholder.scriptFilename": "energie-kueche.js",
    "placeholder.expertCardName": "ATLAS Expert Card",
    "placeholder.expertTitle": "Template-Titel nutzen, wenn leer",
    "placeholder.expertEntity": "Aktuelle Entitaet nutzen, wenn leer",
    "aria.entityTypeShortcuts": "Entitaetstyp-Schnellauswahl",
    "aria.clearEntitySearch": "Entitaetssuche loeschen",
    "aria.language": "Sprache",
    "aria.cardEditorMode": "Card-Editor-Modus",
    "aria.availableCards": "Verfuegbare Home Assistant Cards",
    "aria.expertTemplates": "Expert-Editor-Templates",
    "aria.expertSurface": "Expert-Editor-Flaeche",
    "aria.resizeExpertSurface": "Expert-Editor-Flaeche vergroessern",
    "aria.showStatusPreview": "{entityId} in der ATLAS Status Vorschau anzeigen",
    "aria.moveEntityUp": "{entityId} nach oben verschieben",
    "aria.moveEntityDown": "{entityId} nach unten verschieben",
    "aria.removeEntity": "{entityId} entfernen",
    "aria.useEntityInStack": "{entityId} im Stapel-Export nutzen",
    "aria.entityState": "Entitaetsstatus",
    "message.emptySelection": "Waehle mindestens eine Entitaet aus.",
    "message.noExpertFields": "Keine Expert-Felder hinzugefuegt.",
    "message.dragCard": "Ziehe eine Card von links in diese Editor-Flaeche.",
    "message.addTemplatePreview": "Fuege ein Template-Feld hinzu, um die Expert-Ausgabe zu sehen.",
    "message.addTemplateBeforeExport": "Fuege vor dem Export einer Expert-HA-Card ein Template-Feld hinzu.",
    "message.statusPanelNotRegistered": "Status-Panel ist nicht registriert.",
    "message.connectionUrlReady": "Connection-URL bereit: {url}",
    "message.connectionState": "Verbindung: {state}",
    "message.connectionStateWithReason": "Verbindung: {state} ({reason})",
    "message.connectionStateWithSubscription": "Verbindung: {state}, Subscription {subscription}",
    "message.reconnecting": "Verbinde erneut in {seconds}s ({attempt}/3).",
    "message.stackSelectedEntities": "Fuer Stapel ausgewaehlte Entitaeten: {selected}/{total}{entities}",
    "message.stackEntitySuffix": " - {entities}",
    "message.simpleUsesFirstEntity": "Simple nutzt die erste Entitaet: {entityId}",
    "message.simpleUsesFirstEntityEmpty": "Simple nutzt die erste Entitaet.",
    "message.noEntitiesFound": "Keine Entitaeten gefunden fuer {domain}{search}.",
    "message.entitySearchSuffix": " und \"{search}\"",
    "message.entitiesFound": "{count} {entityLabel} gefunden fuer {domain}.",
    "message.entitySingular": "Entitaet",
    "message.entityPlural": "Entitaeten",
    "message.allTypes": "alle Typen",
    "message.selectEntityFirst": "Waehle zuerst eine Entitaet aus.",
    "message.entityListRequested": "Entitaetsliste von Home Assistant angefordert ({requestId}).",
    "message.connectBeforeRefreshingEntities": "Verbinde zuerst Home Assistant, bevor du Entitaeten aktualisierst.",
    "message.resourcesRequested": "Lovelace-Ressourcen angefordert ({requestId}).",
    "message.connectBeforeCheckingResources": "Verbinde zuerst Home Assistant, bevor du Ressourcen pruefst.",
    "message.paletteEntriesDetected": "{total} Palette-Eintraege aus geladenen HA-Ressourcen erkannt, davon {hacs} /hacsfiles-Ressourcen.",
    "message.noPaletteEntriesDetected": "Keine zusaetzlichen Scan-only-Palette-Eintraege aus geladenen HA-Ressourcen erkannt.",
    "message.refreshingResources": "{message} Lovelace-Ressourcen werden von Home Assistant aktualisiert.",
    "message.connectAndScanAgain": "{message} Verbinde Home Assistant und scanne erneut, um die Liste zu aktualisieren.",
    "message.templateSizeSet": "{template} Groesse auf {columns} Spalten und {rows} Zeilen gesetzt.",
    "message.surfaceResized": "Expert-Editor-Flaeche geaendert: +{columns} Spalten, +{rows} Zeilen.",
    "message.surfaceSizeReset": "Expert-Editor-Flaeche auf Standardgroesse zurueckgesetzt.",
    "message.arrangeNeedsFields": "Fuege Expert-Felder hinzu, bevor du die Editor-Flaeche anordnest.",
    "message.fieldsArranged": "Expert-Felder angeordnet. Ueberlappungen: {previous} -> {next}.",
    "message.selectFieldBeforeResize": "Waehle ein Expert-Feld aus, bevor du seine Groesse aenderst.",
    "message.fieldResized": "{field} auf {width}x{height} geaendert.",
    "message.fieldMoved": "{field} auf der Expert-Editor-Flaeche verschoben.",
    "message.groupStatus": "Gruppenstatus: {ready} bereit, {pending} wartend, {blocked} blockiert.",
    "message.needsAttention": "Braucht Aufmerksamkeit: {entities}.",
    "message.selectedForHaPreview": "{entityId} fuer die HA-Card-Vorschau ausgewaehlt.",
    "message.selectedForDiagnosticsPreview": "{entityId} fuer die Diagnose-Statusvorschau ausgewaehlt.",
    "message.selectedForDiagnosticsWithStack": "{entityId} fuer Diagnose ausgewaehlt. Nutze die Checkbox, um sie in den Stapel-Export aufzunehmen.",
    "message.stackNeedsEntity": "{entityId} bleibt ausgewaehlt; der Stapel-Export braucht mindestens eine Entitaet.",
    "message.addedToStackPreview": "{entityId} zur Stapel-Vorschau hinzugefuegt.",
    "message.removedFromStackPreview": "{entityId} aus der Stapel-Vorschau entfernt.",
    "message.entityRemoved": "{entityId} entfernt.",
    "message.justNow": "gerade eben",
    "message.minutesAgo": "vor {count} Min.",
    "message.hoursAgo": "vor {count} Std.",
    "message.sendServiceConfirm": "{service} an {entityId} senden?",
    "message.commandSent": "Befehl fuer {entityId} gesendet.",
    "message.noActiveConnection": "Keine aktive Home-Assistant-Verbindung.",
    "message.commandCompleted": "Befehl fuer {entityId} abgeschlossen.",
    "message.commandFailed": "Befehl fuer {entityId} fehlgeschlagen: {reason}",
    "message.unknownError": "Unbekannter Fehler.",
    "message.loadedEntities": "{count} Entitaeten aus Home Assistant geladen.",
    "message.entityListFailed": "Entitaetsliste fehlgeschlagen: {reason}",
    "message.loadedResources": "{count} Lovelace-Ressourcen aus Home Assistant geladen. {total} Palette-Eintraege erkannt, davon {hacs} /hacsfiles-Ressourcen.",
    "message.lovelaceFailed": "Lovelace-Ressourcen fehlgeschlagen: {reason}",
    "message.liveEntity": "Live-Entitaet: {entityId}",
    "message.demoEntityTarget": "Demo-Entitaet: {entityId}",
    "message.waitingForUpdates": "Warte auf Updates von {entityId}.",
    "message.demoControlsTarget": "Demo-Controls steuern {entityId}.",
    "message.tokenRequired": "Zum Verbinden wird ein Access Token benoetigt.",
    "message.entityStateUpdated": "Entitaetsstatus aktualisiert: {state}.",
    "message.titleCopied": "{title} aus der ausgewaehlten Entitaet kopiert.",
    "message.expertPreviewCleared": "Expert-Editor-Vorschau geleert.",
    "message.groupRequiresNameAndEntity": "Gruppenname und mindestens eine Entitaet werden benoetigt.",
    "message.groupSaved": "Gruppe {title} gespeichert.",
    "message.builtInGroupsCannotDelete": "Eingebaute Gruppen koennen nicht geloescht werden.",
    "message.groupDeleted": "Gruppe geloescht.",
    "message.selectGroupToDuplicate": "Waehle eine Gruppe zum Duplizieren aus.",
    "message.groupCreated": "Gruppe {title} erstellt.",
    "message.haCardCopied": "HA-Card {format} in die Zwischenablage kopiert.",
    "message.copyPreviewFailed": "Kopieren fehlgeschlagen: Nutze stattdessen den Vorschautext.",
    "message.resourcesCopiedWithDependency": "ATLAS- und {dependency}-Lovelace-Ressourcen {format} in die Zwischenablage kopiert.",
    "message.atlasResourceCopied": "ATLAS-Lovelace-Ressource {format} in die Zwischenablage kopiert.",
    "message.copyDependencyFailed": "Kopieren fehlgeschlagen: Nutze stattdessen den Abhaengigkeitspfad.",
    "message.importConfigurationConfirm": "{name} importieren: {groups} Gruppen und {entities} Entitaeten?",
    "message.unnamedConfiguration": "Unbenannte Konfiguration",
    "message.configurationImported": "Konfiguration importiert: {groups} Gruppen und {entities} Entitaeten.",
    "message.importConfigurationFailed": "Import fehlgeschlagen: ungueltige Konfiguration.",
    "message.importPaused": "Import pausiert: Pruefe die Kompatibilitaetsdetails, bevor dieses Artefakt gemappt wird.",
    "message.importRejected": "Import abgelehnt: nicht unterstuetztes Home-Assistant-Card-Artefakt.",
    "message.haCardImported": "{type} {format} importiert: {title} mit {entities} Entitaeten.",
    "message.importHaCardFailed": "Import fehlgeschlagen: ungueltige Home-Assistant-Entities-Card als JSON oder YAML.",
    "message.packageExported": "Card-Paket mit HACS-Script {scriptFilename} exportiert.",
    "message.scriptExported": "Card-Script als {scriptFilename} exportiert.",
    "message.bundleExported": "HACS-Bundle als {filename} mit {count} Dateien exportiert.",
    "message.scriptFilenameNormalized": "HACS-Script-Dateiname wird als {scriptFilename} exportiert.",
    "message.atlasPackage": "ATLAS-Card-Paket",
    "message.haCard": "HA-Card",
    "dependency.resource": " Ressource: {paths}.",
    "dependency.installPath": " Installationspfad: {paths}.",
    "dependency.atlasFrontend": " ATLAS-Frontend: {paths}.",
    "dependency.builtIn": "Nutzt eine eingebaute Home-Assistant-Card.{atlasHint}",
    "dependency.requiresUnchecked": "Benoetigt {dependency}.{resourceHint}{installHint}{atlasHint} Verbinde Home Assistant oder pruefe die Ressourcen.",
    "dependency.ready": "{dependency}- und ATLAS-Frontend-Ressourcen gefunden.{resourceHint}{atlasHint}",
    "dependency.cardFoundAtlasMissing": "{dependency}-Ressource gefunden.{resourceHint}{atlasHint} ATLAS-Frontend fehlt: {missing}.",
    "dependency.missing": "Benoetigt {dependency}.{resourceHint}{installHint}{atlasHint} Fehlt: {missing}.",
    "text.allEntityTypes": "Alle Entitaetstypen",
    "text.all": "Alle",
    "text.favorite": "Favorit",
    "text.scannedOnly": "Nur Scan",
    "text.builtIn": "Eingebaut",
    "text.resourceUnchecked": "Ressource ungeprueft",
    "text.resourceInstalled": "Ressource installiert",
    "text.resourceMissing": "Ressource fehlt",
    "text.demoEntity": "Demo-Entitaet",
    "text.waiting": "Wartet",
    "text.col": "Sp.",
    "text.row": "Zeile",
    "text.full": "voll",
    "text.auto": "auto",
    "text.categoryCore": "Core",
    "text.categoryCommunity": "Community",
    "text.registeredNotMapped": "{category} registriert, noch nicht gemappt",
    "text.paletteDetail": "{layout}, {size}, {target}",
    "text.scannedCardUnavailable": "{label} ist in Home Assistant registriert, aber ATLAS mappt diese Custom Card noch nicht.",
    "text.paletteCardSelected": "{label} aus der Card-Liste ausgewaehlt.",
    "text.paletteSelectionChanged": "Favoritenauswahl geaendert. Nutze Favoriten speichern, um sie anzuwenden.",
    "text.fullCardListVisible": "Die volle Core- und Community-Card-Liste ist zur Favoritenauswahl sichtbar.",
    "text.savedFavoritesVisible": "Gespeicherte Favoriten sind sichtbar.",
    "text.favoritesSaved": "{count} Favoriten-Cards gespeichert.",
    "text.allCardsRemainVisible": "Favoritenauswahl gespeichert. Alle Cards bleiben sichtbar.",
    "text.allCardsVisibleAgain": "Alle Core- und Community-Cards sind wieder sichtbar.",
    "text.templateSizesReset": "Template-Groessen auf Standard zurueckgesetzt.",
    "text.removeField": "{field} entfernen",
    "text.fieldRemoved": "{field} aus der Expert-Editor-Vorschau entfernt.",
    "text.enterTitle": "Gib einen Titel ein, bevor du ihn uebernimmst.",
    "text.titlePrepared": "{title} fuer das naechste Expert-Feld vorbereitet.",
    "text.titleApplied": "{title} als Expert-Feld-Titel gesetzt.",
    "text.targetUpdated": "{field} Card-Familie auf {target} geaendert.",
    "text.bubbleTypeUpdated": "{field} Bubble-Button-Typ auf {type} gesetzt.",
    "text.entityPrepared": "{entityId} fuer das naechste Expert-Feld vorbereitet.",
    "text.entityAssigned": "{entityId} {title} zugewiesen.",
    "text.fieldSelected": "{field} auf der Expert-Editor-Flaeche ausgewaehlt.",
    "text.selectFieldBeforeEditing": "Waehle ein Expert-Feld aus, bevor du es bearbeitest.",
    "text.editHandlesEnabled": "{field} Bearbeitungsanfasser aktiviert.",
    "text.editHandlesHidden": "{field} Bearbeitungsanfasser ausgeblendet.",
    "text.overlappingField": "ueberlappt ein anderes Feld",
    "text.expertFieldsSummary": "Expert-Felder: {count} ({populated} belegt{empty})",
    "text.emptyFieldsSummary": ", {count} leer",
    "text.rowsSummary": "Zeilen: {count}",
    "text.surfaceSummary": "Flaeche: {columns}x{rows}",
    "text.overlapsSummary": "Ueberlappungen: {count}",
    "text.targetsSummary": "Ziele: {targets}",
    "text.layoutsSummary": "Layouts: {layouts}",
    "text.expertFieldsZero": "Expert-Felder: 0.",
    "text.fieldAdded": "{field} zur Expert-Editor-Vorschau hinzugefuegt.",
    "text.fieldPlaced": "{field} auf der Expert-Editor-Flaeche platziert.",
    "palette.core-entity": "Entitaet",
    "palette.core-entities": "Entitaeten",
    "palette.core-button": "Button",
    "palette.core-grid": "Raster",
    "palette.core-sensor": "Sensor",
    "palette.core-horizontal-stack": "Horizontaler Stapel",
    "palette.core-vertical-stack": "Vertikaler Stapel",
    "palette.core-thermostat": "Thermostat",
    "palette.core-link": "Verknuepfung",
    "palette.core-webpage": "Webseite",
    "palette.community-mushroom-template": "Mushroom Template",
    "palette.community-bubble-state": "Bubble Status",
    "palette.community-bubble-switch": "Bubble Switch",
    "palette.community-bubble-slider": "Bubble Slider",
    "palette.community-bubble-name": "Bubble Name",
    "target.entities": "Entitaeten",
    "target.entity": "Entitaet",
    "target.button": "Button",
    "target.sensor": "Sensor",
    "target.thermostat": "Thermostat",
    "target.link": "Verknuepfung",
    "target.webpage": "Webseite",
    "target.mushroom-template": "Mushroom Template",
    "target.bubble": "Bubble",
    "template.entity-list": "Entitaetenliste",
    "template.entity-card": "Entitaet",
    "template.button-card": "Button",
    "template.grid": "Raster",
    "template.sensor-card": "Sensor",
    "template.horizontal-stack": "Horizontaler Stapel",
    "template.vertical-stack": "Vertikaler Stapel",
    "template.thermostat-card": "Thermostat",
    "template.link-card": "Verknuepfung",
    "template.webpage-card": "Webseite",
    "template.state-button": "Status-Button",
    "template.switch-button": "Switch-Button",
  },
};
let emptyEntitySelectionMessage = translations.en["message.emptySelection"];

function t(key, values = {}) {
  let text = translations[currentLanguage]?.[key] ?? translations.en[key] ?? key;
  for (const [name, value] of Object.entries(values)) {
    text = text.replaceAll(`{${name}}`, String(value));
  }
  return text;
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("page.title");
  emptyEntitySelectionMessage = t("message.emptySelection");
  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = t(element.dataset.i18n);
  }
  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  }
  for (const element of document.querySelectorAll("[data-i18n-aria-label]")) {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  }
  for (const element of document.querySelectorAll("[data-i18n-title]")) {
    element.title = t(element.dataset.i18nTitle);
  }
  for (const button of languageButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  }
}

function setLanguage(language) {
  currentLanguage = language === "de" ? "de" : "en";
  applyTranslations();
  renderCardTargetOptions(haCardTarget.value);
  renderExpertEditorOptions();
  renderGroupOptions(homeAssistantGroup.value);
  renderEntityDomainOptions();
  renderExpertTemplatePalette();
  renderEditorMode(activeEditorMode);
  renderEntityList();
  renderConnectionReadiness();
  persistConfiguration();
}

function maybeTranslate(key, fallback) {
  return translations[currentLanguage]?.[key] ?? translations.en[key] ?? fallback;
}

function translateCardTarget(target, fallback = target) {
  return maybeTranslate(`target.${target}`, fallback);
}

function translateTemplateLabel(templateId, fallback = templateId) {
  return maybeTranslate(`template.${templateId}`, fallback);
}

function translatePaletteCardLabel(card) {
  return maybeTranslate(`palette.${card.id}`, translateTemplateLabel(card.templateId, card.label));
}

function translatePaletteCategory(category) {
  if (category === "Core") return t("text.categoryCore");
  if (category === "Community") return t("text.categoryCommunity");
  return category;
}
let expertPaletteCards = [
  { id: "core-entity", category: "Core", label: "Entity", templateId: "entity-card", target: "entity", preview: ["type: entity"] },
  { id: "core-entities", category: "Core", label: "Entities", templateId: "entity-list", target: "entities", preview: ["Entity list"] },
  { id: "core-button", category: "Core", label: "Button", templateId: "button-card", target: "button", preview: ["type: button"] },
  { id: "core-grid", category: "Core", label: "Grid", templateId: "grid", target: "entities", preview: ["type: grid"] },
  { id: "core-sensor", category: "Core", label: "Sensor", templateId: "sensor-card", target: "sensor", preview: ["type: sensor"] },
  { id: "core-horizontal-stack", category: "Core", label: "Horizontal stack", templateId: "horizontal-stack", target: "entities", preview: ["Cards in a row"] },
  { id: "core-vertical-stack", category: "Core", label: "Vertical stack", templateId: "vertical-stack", target: "entities", preview: ["Cards in a column"] },
  { id: "core-thermostat", category: "Core", label: "Thermostat", templateId: "thermostat-card", target: "thermostat", preview: ["type: thermostat"] },
  { id: "core-link", category: "Core", label: "Link", templateId: "link-card", target: "link", preview: ["navigate"] },
  { id: "core-webpage", category: "Core", label: "Webpage", templateId: "webpage-card", target: "webpage", preview: ["type: iframe"] },
  { id: "community-mushroom-template", category: "Community", label: "Mushroom template", templateId: "state-button", target: "mushroom-template", preview: ["Primary / secondary"] },
  { id: "community-bubble-state", category: "Community", label: "Bubble state", templateId: "state-button", target: "bubble", bubbleButtonType: "state", preview: ["button_type: state"] },
  { id: "community-bubble-switch", category: "Community", label: "Bubble switch", templateId: "switch-button", target: "bubble", bubbleButtonType: "switch", preview: ["button_type: switch"] },
  { id: "community-bubble-slider", category: "Community", label: "Bubble slider", templateId: "state-button", target: "bubble", bubbleButtonType: "slider", preview: ["button_type: slider"] },
  { id: "community-bubble-name", category: "Community", label: "Bubble name", templateId: "state-button", target: "bubble", bubbleButtonType: "name", preview: ["button_type: name"] },
];
const expertEditorFields = [];
const expertPaletteFavoriteIds = new Set();
const expertPaletteDraftFavoriteIds = new Set();
const expertTemplateSizing = new Map(cardEditorTemplates.map(template => [
  template.id,
  {
    columns: String(template.defaultWidth),
    rows: "auto",
  },
]));
const expertGridColumns = 12;
const expertGridRows = 12;
const expertFieldMaxResizeDelta = 5;
const expertEditorSurfaceMaxResizeDelta = 5;
const expertEditorSurfaceHeightStep = 40;
let expertEditorSurfaceSize = { columns: 0, rows: 0 };
let expertDragFieldOffset = { column: 0, row: 0 };
let connection;
let removeLifecycleListener;
let removeServiceResultListener;
let removeEntityStateListListener;
let removeLovelaceResourceListener;
let panelBinding;
let activeTransport;
let removeEntityListListener;
let reconnectToken;
let reconnectTimer;
let reconnectAttempts = 0;
let lovelaceResources = [];
let lovelaceResourcesChecked = false;
let activeEditorMode = "simple";
let expertPaletteShowAllCards = false;
let selectedExpertFieldIndex = -1;
let expertFieldEditing = false;
const entitySnapshots = new Map();
const knownEntityIds = new Set();
const stackSelectedEntityIds = new Set();
let statusPreviewEntityId;
let pendingImport;
let initialEditorMode = "simple";
let initialGroupSelection = "overview";
let initialCardTarget = "entities";
let panelGroups = [
  createHomeAssistantPanelGroup({ id: "overview", title: "Overview", entityIds: ["binary_sensor.atlas_status", "sensor.atlas_temperature"] }),
  createHomeAssistantPanelGroup({ id: "energy", title: "Energy", entityIds: ["sensor.atlas_power", "sensor.atlas_energy"] }),
  createHomeAssistantPanelGroup({ id: "safety", title: "Safety", entityIds: ["binary_sensor.atlas_status", "binary_sensor.atlas_door"] }),
];
for (const group of panelGroups) {
  for (const entityId of group.entityIds) {
    knownEntityIds.add(entityId);
  }
}

try {
  const savedConfiguration = JSON.parse(localStorage.getItem(configurationStorageKey) ?? "null");
  if (savedConfiguration?.language === "de" || savedConfiguration?.language === "en") {
    currentLanguage = savedConfiguration.language;
  }
  if (typeof savedConfiguration?.url === "string") {
    homeAssistantUrl.value = savedConfiguration.url;
  }
  if (savedConfiguration?.rememberToken === true) {
    rememberHomeAssistantToken.checked = true;
    if (typeof savedConfiguration?.token === "string") {
      homeAssistantToken.value = savedConfiguration.token;
    }
  }
  if (typeof savedConfiguration?.entities === "string") {
    homeAssistantEntity.value = savedConfiguration.entities;
    initialGroupSelection = "custom";
  }
  if (typeof savedConfiguration?.entityDomain === "string") {
    homeAssistantEntityDomain.value = savedConfiguration.entityDomain;
  }
  if (typeof savedConfiguration?.entitySearch === "string") {
    homeAssistantEntitySearch.value = savedConfiguration.entitySearch;
  }
  if (Array.isArray(savedConfiguration?.stackEntityIds)) {
    for (const entityId of savedConfiguration.stackEntityIds) {
      if (typeof entityId === "string" && entityId.trim()) {
        stackSelectedEntityIds.add(entityId.trim());
      }
    }
  }
  if (Array.isArray(savedConfiguration?.expertPaletteFavoriteIds)) {
    for (const paletteId of savedConfiguration.expertPaletteFavoriteIds) {
      if (typeof paletteId === "string" && paletteId.trim()) {
        expertPaletteFavoriteIds.add(paletteId);
        expertPaletteDraftFavoriteIds.add(paletteId);
      }
    }
  }
  if (Array.isArray(savedConfiguration?.expertTemplateSizing)) {
    for (const entry of savedConfiguration.expertTemplateSizing) {
      if (typeof entry?.templateId === "string" && cardEditorTemplates.some(template => template.id === entry.templateId)) {
        expertTemplateSizing.set(entry.templateId, normalizeExpertTemplateSizing(entry));
      }
    }
  }
  if (savedConfiguration?.expertEditorSurfaceSize && typeof savedConfiguration.expertEditorSurfaceSize === "object") {
    expertEditorSurfaceSize = {
      columns: clampExpertEditorSurfaceDelta(savedConfiguration.expertEditorSurfaceSize.columns),
      rows: clampExpertEditorSurfaceDelta(savedConfiguration.expertEditorSurfaceSize.rows),
    };
  }
  if (Array.isArray(savedConfiguration?.expertEditorFields)) {
    expertEditorFields.push(...createHomeAssistantCardEditorPackagePlan({
      editorMode: "expert",
      fields: savedConfiguration.expertEditorFields,
    }).fields);
  }
  if (Number.isInteger(savedConfiguration?.selectedExpertFieldIndex)) {
    selectedExpertFieldIndex = Math.max(-1, Math.min(expertEditorFields.length - 1, savedConfiguration.selectedExpertFieldIndex));
  }
  if (savedConfiguration?.editorMode === "expert") {
    initialEditorMode = "expert";
  }
  if (typeof savedConfiguration?.expertCardName === "string") {
    expertCardName.value = savedConfiguration.expertCardName;
  }
  if (savedConfiguration?.diagnosticsOpen === true) {
    diagnosticsPanel.open = true;
  }
  if (Array.isArray(savedConfiguration?.groups)) {
    panelGroups = savedConfiguration.groups.map(createHomeAssistantPanelGroup);
  }
  if (typeof savedConfiguration?.cardTarget === "string" && cardTargets.some(descriptor => descriptor.target === savedConfiguration.cardTarget)) {
    initialCardTarget = savedConfiguration.cardTarget;
  }
  if (savedConfiguration?.cardLayout === "single" || savedConfiguration?.cardLayout === "horizontal-stack" || savedConfiguration?.cardLayout === "vertical-stack") {
    haCardLayout.value = savedConfiguration.cardLayout;
  }
  if (savedConfiguration?.cardFormat === "json" || savedConfiguration?.cardFormat === "yaml") {
    haCardFormat.value = savedConfiguration.cardFormat;
  }
  if (typeof savedConfiguration?.cardScriptFilename === "string") {
    haCardScriptFilename.value = savedConfiguration.cardScriptFilename;
  }
  if (typeof savedConfiguration?.selectedGroup === "string") {
    initialGroupSelection = savedConfiguration.selectedGroup;
  }
} catch {
  // The demo remains usable when browser storage is unavailable or malformed.
}

const tokens = createThemeTokens({
  colorBackground: "#f5f7fb",
  colorSurface: "#ffffff",
  colorText: "#172033",
  colorAccent: "#0f766e",
  spacing: "20px",
});
const panel = createHomeAssistantStatusPanel({
  id: "atlas-status-demo",
  title: "ATLAS status",
  targetIdentifier: "atlas-status-root",
});
const panelRegistry = createHomeAssistantStatusPanelRegistry([panel]);
const transport = createInMemoryHomeAssistantEntityStateTransport();

function renderCardTargetOptions(selectedTarget = haCardTarget.value || "entities") {
  haCardTarget.replaceChildren();
  for (const descriptor of cardTargets) {
    const option = document.createElement("option");
    option.value = descriptor.target;
    option.textContent = translateCardTarget(descriptor.target, descriptor.label);
    haCardTarget.append(option);
  }
  haCardTarget.value = cardTargets.some(descriptor => descriptor.target === selectedTarget) ? selectedTarget : "entities";
  syncCardLayoutState();
}

function renderEditorMode(mode = "simple") {
  const expert = mode === "expert";
  activeEditorMode = expert ? "expert" : "simple";
  panelGroupControl.hidden = expert;
  groupNameControl.hidden = expert;
  cardTargetControl.hidden = expert;
  cardLayoutControl.hidden = expert;
  saveHomeAssistantGroup.hidden = expert;
  deleteHomeAssistantGroup.hidden = expert;
  duplicateHomeAssistantGroup.hidden = expert;
  simpleCardSection.hidden = expert;
  expertEditorSection.hidden = !expert;
  for (const button of editorModeButtons) {
    button.setAttribute("aria-pressed", String(button.dataset.editorMode === activeEditorMode));
  }
  exportHaCardConfig.textContent = expert ? t("button.exportExpertHaCard") : t("button.exportHaCard");
  copyHaCardConfig.textContent = expert ? t("button.copyExpertHaCard") : t("button.copyHaCard");
  copyHaCardResources.textContent = expert ? t("button.copyExpertResources") : t("button.copyResources");
  renderHaCardPreview();
  renderExpertEditorPreview();
}

function renderExpertEditorOptions() {
  const selectedTemplate = expertTemplate.value || cardEditorTemplates[0]?.id || "";
  const selectedTarget = expertTarget.value || "bubble";
  const selectedBubbleButtonType = expertBubbleButtonType.value || "state";

  expertTemplate.replaceChildren();
  for (const template of cardEditorTemplates) {
    const option = document.createElement("option");
    option.value = template.id;
    option.textContent = translateTemplateLabel(template.id, template.label);
    expertTemplate.append(option);
  }
  expertTemplate.value = cardEditorTemplates.some(template => template.id === selectedTemplate)
    ? selectedTemplate
    : cardEditorTemplates[0]?.id || "";

  expertTarget.replaceChildren();
  for (const descriptor of cardTargets) {
    const option = document.createElement("option");
    option.value = descriptor.target;
    option.textContent = translateCardTarget(descriptor.target, descriptor.label);
    expertTarget.append(option);
  }
  expertTarget.value = cardTargets.some(descriptor => descriptor.target === selectedTarget) ? selectedTarget : "bubble";
  expertBubbleButtonType.replaceChildren();
  for (const type of bubbleButtonTypes) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    expertBubbleButtonType.append(option);
  }
  expertBubbleButtonType.value = bubbleButtonTypes.includes(selectedBubbleButtonType) ? selectedBubbleButtonType : "state";
  syncExpertBubbleTypeControl();
}

function syncExpertBubbleTypeControl() {
  const isBubble = expertTarget.value === "bubble";
  expertBubbleTypeControl.hidden = !isBubble;
  expertBubbleButtonType.disabled = !isBubble;
}

function syncCardLayoutState() {
  const supportsStackLayout = haCardTarget.value === "mushroom-template" || haCardTarget.value === "bubble";
  haCardLayout.disabled = !supportsStackLayout;
  if (!supportsStackLayout) {
    haCardLayout.value = "single";
  }
}

async function renderEntityState(state) {
  const registeredPanel = findHomeAssistantStatusPanel(panelRegistry, panel.id);
  if (!registeredPanel) {
    statusMessage.textContent = t("message.statusPanelNotRegistered");
    return;
  }
  if (trackedEntityIds().length === 0) {
    renderEmptyStatusPreview();
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  await transport.publish(createHomeAssistantEntityState({
    entityId: currentEntityId(),
    state,
  }));
}

function renderConnectionReadiness() {
  const configuration = createHomeAssistantConnectionConfiguration({ url: homeAssistantUrl.value });
  const readiness = inspectHomeAssistantConnectionReadiness(configuration);
  connectionReadiness.textContent = readiness.ready
    ? t("message.connectionUrlReady", { url: deriveHomeAssistantWebSocketUrl(configuration) })
    : readiness.reason;
}

function renderConnectionLifecycle(lifecycle) {
  connectionState.dataset.state = lifecycle.state;
  connectionState.textContent = lifecycle.reason
    ? t("message.connectionStateWithReason", { state: lifecycle.state, reason: lifecycle.reason })
    : lifecycle.subscription
      ? t("message.connectionStateWithSubscription", { state: lifecycle.state, subscription: lifecycle.subscription })
      : t("message.connectionState", { state: lifecycle.state });
  connectButton.disabled = lifecycle.state === "connecting" || lifecycle.state === "authenticating" || lifecycle.state === "connected";
  disconnectButton.disabled = lifecycle.state === "closed" || lifecycle.state === "failed";
  checkHaCardResources.disabled = lifecycle.state !== "connected";

  if (lifecycle.state === "connected") {
    reconnectAttempts = 0;
    clearTimeout(reconnectTimer);
    bindSelectedEntity(connection?.getClient()?.transport);
  } else if (lifecycle.state === "closed" || lifecycle.state === "failed") {
    bindSelectedEntity(transport);
    if (lifecycle.state === "closed") {
      scheduleReconnect();
    }
  }
  refreshHomeAssistantEntities.disabled = lifecycle.state !== "connected";
}

function scheduleReconnect() {
  if (!connection || !reconnectToken || reconnectTimer || reconnectAttempts >= 3) {
    return;
  }

  reconnectAttempts += 1;
  const delay = reconnectAttempts * 1000;
  statusMessage.textContent = t("message.reconnecting", { seconds: delay / 1000, attempt: reconnectAttempts });
  reconnectTimer = window.setTimeout(() => {
    reconnectTimer = undefined;
    connection?.reconnect(reconnectToken);
  }, delay);
}

function persistConfiguration() {
  try {
    localStorage.setItem(configurationStorageKey, JSON.stringify({
      language: currentLanguage,
      url: homeAssistantUrl.value,
      rememberToken: rememberHomeAssistantToken.checked,
      token: rememberHomeAssistantToken.checked ? homeAssistantToken.value : undefined,
      entities: homeAssistantEntity.value,
      entityDomain: homeAssistantEntityDomain.value,
      entitySearch: homeAssistantEntitySearch.value,
      selectedGroup: homeAssistantGroup.value,
      cardTarget: haCardTarget.value,
      cardLayout: haCardLayout.value,
      cardFormat: haCardFormat.value,
      cardScriptFilename: haCardScriptFilename.value,
      stackEntityIds: selectedStackEntityIds(),
      expertPaletteFavoriteIds: [...expertPaletteFavoriteIds],
      expertTemplateSizing: serializedExpertTemplateSizing(),
      expertEditorSurfaceSize,
      expertEditorFields,
      selectedExpertFieldIndex,
      expertCardName: expertCardName.value,
      diagnosticsOpen: diagnosticsPanel.open,
      editorMode: activeEditorMode,
      groups: panelGroups,
    }));
  } catch {
    // Connection configuration remains session-only when storage is unavailable.
  }
}

function renderGroupOptions(selectedId = homeAssistantGroup.value) {
  homeAssistantGroup.replaceChildren();
  for (const group of panelGroups) {
    const option = document.createElement("option");
    option.value = group.id;
    option.textContent = maybeTranslate(`group.${group.id}`, group.title);
    homeAssistantGroup.append(option);
  }
  const custom = document.createElement("option");
  custom.value = "custom";
  custom.textContent = t("group.custom");
  homeAssistantGroup.append(custom);
  homeAssistantGroup.value = [...homeAssistantGroup.options].some(option => option.value === selectedId) ? selectedId : "custom";
}

function currentEntityId() {
  const entityIds = trackedEntityIds();
  if (statusPreviewEntityId && entityIds.includes(statusPreviewEntityId)) {
    return statusPreviewEntityId;
  }
  return entityIds[0] ?? "binary_sensor.atlas_status";
}

function trackedEntityIds() {
  const entityIds = [...new Set(homeAssistantEntity.value.split(",").map(entityId => entityId.trim()).filter(Boolean))];
  for (const entityId of entityIds) {
    knownEntityIds.add(entityId);
  }
  return entityIds;
}

function renderEmptyStatusPreview() {
  const emptyState = document.createElement("div");
  emptyState.className = "empty-selection-state";
  emptyState.textContent = emptyEntitySelectionMessage;
  statusRoot.replaceChildren(emptyState);
}

function knownEntityPickerIds() {
  return [...new Set([
    ...knownEntityIds,
    ...trackedEntityIds(),
    ...panelGroups.flatMap(group => group.entityIds),
    ...entitySnapshots.keys(),
  ])].sort((left, right) => left.localeCompare(right));
}

function createEntityPickerCatalog() {
  return createHomeAssistantEntityCatalog({
    entityIds: knownEntityPickerIds(),
    entities: [...entitySnapshots.values()],
  });
}

function renderEntityDomainOptions() {
  const selected = homeAssistantEntityDomain.value || "all";
  const domains = listHomeAssistantEntityCatalogDomains(createEntityPickerCatalog());

  homeAssistantEntityDomain.replaceChildren();
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = t("text.allEntityTypes");
  homeAssistantEntityDomain.append(allOption);
  for (const domain of domains) {
    const option = document.createElement("option");
    option.value = domain;
    option.textContent = domain;
    homeAssistantEntityDomain.append(option);
  }
  homeAssistantEntityDomain.value = selected === "all" || domains.includes(selected) ? selected : "all";
  renderEntityDomainShortcuts(domains);
}

function renderEntityDomainShortcuts(domains) {
  const selected = homeAssistantEntityDomain.value || "all";
  const shortcutDomains = listHomeAssistantEntityDomainShortcuts(domains);

  homeAssistantEntityDomainShortcuts.replaceChildren();
  for (const domain of shortcutDomains) {
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.entityDomain = domain;
    button.textContent = domain === "all" ? t("text.all") : domain;
    button.setAttribute("aria-pressed", String(domain === selected));
    button.title = domain === "all" ? t("text.allEntityTypes") : `${domain}`;
    homeAssistantEntityDomainShortcuts.append(button);
  }
}

function usesStackEntitySelection() {
  return activeEditorMode === "simple"
    && haCardTarget.value !== "entities"
    && (haCardLayout.value === "horizontal-stack" || haCardLayout.value === "vertical-stack");
}

function reconcileStackEntitySelection() {
  const entityIds = trackedEntityIds();
  for (const entityId of [...stackSelectedEntityIds]) {
    if (!entityIds.includes(entityId)) {
      stackSelectedEntityIds.delete(entityId);
    }
  }
  if (stackSelectedEntityIds.size === 0) {
    for (const entityId of entityIds) {
      stackSelectedEntityIds.add(entityId);
    }
  }
}

function selectedStackEntityIds() {
  reconcileStackEntitySelection();
  return trackedEntityIds().filter(entityId => stackSelectedEntityIds.has(entityId));
}

function cardPreviewEntityIds() {
  return usesStackEntitySelection() ? selectedStackEntityIds() : trackedEntityIds();
}

function renderStackSelectionSummary() {
  const entityIds = trackedEntityIds();
  if (entityIds.length === 0) {
    stackSelectionSummary.textContent = emptyEntitySelectionMessage;
    return;
  }

  if (usesStackEntitySelection()) {
    const selectedIds = selectedStackEntityIds();
    stackSelectionSummary.textContent = t("message.stackSelectedEntities", {
      selected: selectedIds.length,
      total: entityIds.length,
      entities: selectedIds.length ? t("message.stackEntitySuffix", { entities: selectedIds.join(", ") }) : "",
    });
    return;
  }

  stackSelectionSummary.textContent = entityIds[0]
    ? t("message.simpleUsesFirstEntity", { entityId: entityIds[0] })
    : t("message.simpleUsesFirstEntityEmpty");
}

function renderEntityPickerOptions() {
  const selected = homeAssistantEntityPicker.value;
  renderEntityDomainOptions();
  const selectedDomain = homeAssistantEntityDomain.value;
  const searchTerm = homeAssistantEntitySearch.value;
  clearHomeAssistantEntitySearch.disabled = searchTerm.trim().length === 0;
  const entityEntries = filterHomeAssistantEntityCatalog(createEntityPickerCatalog(), {
    domain: selectedDomain,
    search: searchTerm,
  });
  const entityIds = entityEntries.map(entry => entry.entityId);

  homeAssistantEntityPicker.replaceChildren();
  for (const entry of entityEntries) {
    const option = document.createElement("option");
    option.value = entry.entityId;
    option.textContent = entry.label !== entry.entityId
      ? `${entry.label} (${entry.entityId})`
      : entry.entityId;
    homeAssistantEntityPicker.append(option);
  }
  homeAssistantEntityPicker.value = entityIds.includes(selected) ? selected : entityIds[0] ?? "";
  addHomeAssistantEntity.disabled = !homeAssistantEntityPicker.value;
  homeAssistantEntityPicker.disabled = entityIds.length === 0;
  const domainLabel = selectedDomain === "all" ? t("message.allTypes") : selectedDomain;
  const searchSuffix = searchTerm.trim() ? t("message.entitySearchSuffix", { search: searchTerm.trim() }) : "";
  homeAssistantEntityPickerStatus.textContent = entityIds.length === 0
    ? t("message.noEntitiesFound", { domain: domainLabel, search: searchSuffix })
    : t("message.entitiesFound", {
      count: entityIds.length,
      entityLabel: entityIds.length === 1 ? t("message.entitySingular") : t("message.entityPlural"),
      domain: domainLabel,
    });
}

function addSelectedEntityFromPicker() {
  const entityId = homeAssistantEntityPicker.value.trim();
  if (!entityId) {
    statusMessage.textContent = t("message.selectEntityFirst");
    return;
  }
  if (usesStackEntitySelection()) {
    addEntityForStatusPreview(entityId);
    return;
  }
  if (activeEditorMode === "expert") {
    applyEntityToSelectedExpertField(entityId);
    return;
  }
  selectPrimaryEntity(entityId);
}

function refreshLiveEntityStates() {
  const client = connection?.getClient();
  const entityResult = client?.requestEntityStates();
  statusMessage.textContent = entityResult?.accepted
    ? t("message.entityListRequested", { requestId: entityResult.requestId })
    : entityResult?.reason ?? t("message.connectBeforeRefreshingEntities");
  checkLiveLovelaceResources({ appendStatus: true });
}

function checkLiveLovelaceResources(options = {}) {
  const result = connection?.getClient()?.requestLovelaceResources();
  const message = result?.accepted
    ? t("message.resourcesRequested", { requestId: result.requestId })
    : result?.reason ?? t("message.connectBeforeCheckingResources");
  statusMessage.textContent = options.appendStatus
    ? `${statusMessage.textContent} ${message}`
    : message;
  if (result?.accepted) {
    lovelaceResourcesChecked = false;
    renderHaCardPreview();
  }
}

function normalizeLovelaceResourceUrl(resource) {
  const url = typeof resource === "string" ? resource : resource?.url;
  return typeof url === "string" ? url.split("?")[0].toLowerCase() : "";
}

function formatLovelaceResourceLabel(url) {
  const fileName = url.split("/").filter(Boolean).pop() ?? url;
  return fileName.replace(/\.js$/i, "").replace(/[-_]+/g, " ");
}

function createLovelaceResourcePaletteId(url, index) {
  const slug = url.replace(/^https?:\/\//, "").replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
  return `ha-resource-${slug || index}`;
}

function isHacsLovelaceResourceUrl(url) {
  return url.includes("/hacsfiles/");
}

const ignoredLovelaceResourceTerms = [
  "card-mad",
  "card-tools",
  "wallpanel",
  "lovelace-buuble-room",
  "lovelace-bubble-room",
  "mushroom-strategy",
  "ha-dashboard",
  "swipe-navigation",
  "auto-entities",
  "floorplan",
  "view-assistant",
  "sidebar-card",
  "cardbuilder.zip",
  "icon",
  "andy",
];

function normalizeLovelaceResourceSearchText(url) {
  return url.replace(/[^a-z0-9.]+/g, "-");
}

function shouldIgnoreLovelaceResourceUrl(url) {
  const normalizedUrl = normalizeLovelaceResourceSearchText(url);
  return ignoredLovelaceResourceTerms.some(term => normalizedUrl.includes(term));
}

function isMappedLovelaceResourceUrl(url) {
  return url.includes("/bubble-card/")
    || url.includes("bubble-card.js")
    || url.includes("/lovelace-mushroom/")
    || url.includes("mushroom.js");
}

function createScannedExpertPaletteCards(resources) {
  const urls = [...new Set(resources.map(normalizeLovelaceResourceUrl).filter(Boolean))]
    .filter(url => !shouldIgnoreLovelaceResourceUrl(url));

  const resourceCards = urls
    .filter(url => !url.includes("/atlas/") && !url.includes("atlas-card") && !isMappedLovelaceResourceUrl(url))
    .map((url, index) => ({
      id: createLovelaceResourcePaletteId(url, index),
      category: isHacsLovelaceResourceUrl(url) ? "HACS resource" : "HA resource",
      label: formatLovelaceResourceLabel(url),
      templateId: "entity-list",
      target: "entities",
      preview: [url],
      resourceUrl: url,
      disabled: true,
      scanned: true,
    }));

  return dedupeExpertPaletteCards(resourceCards);
}

function dedupeExpertPaletteCards(cards) {
  const seen = new Set();
  return cards.filter(card => {
    const key = card.resourceUrl
      ? `resource:${normalizeLovelaceResourceSearchText(card.resourceUrl)}`
      : `${card.category}:${card.label}:${card.templateId}:${card.target}:${card.bubbleButtonType ?? ""}`.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function refreshScannedExpertPaletteCards() {
  const staticCards = expertPaletteCards.filter(card => !card.scanned);
  const scannedCards = createScannedExpertPaletteCards(lovelaceResources);
  expertPaletteCards = dedupeExpertPaletteCards([...staticCards, ...scannedCards]);
  return {
    total: scannedCards.length,
    hacs: scannedCards.filter(card => card.resourceUrl && isHacsLovelaceResourceUrl(card.resourceUrl)).length,
  };
}

function scanExpertPaletteCardsFromHomeAssistant() {
  const detectedCards = refreshScannedExpertPaletteCards();
  expertPaletteShowAllCards = true;
  renderExpertTemplatePalette();
  const clientReady = Boolean(connection?.getClient());
  if (clientReady) {
    checkLiveLovelaceResources({ appendStatus: true });
  }
  const scanMessage = detectedCards.total
    ? t("message.paletteEntriesDetected", { total: detectedCards.total, hacs: detectedCards.hacs })
    : t("message.noPaletteEntriesDetected");
  statusMessage.textContent = clientReady
    ? t("message.refreshingResources", { message: scanMessage })
    : t("message.connectAndScanAgain", { message: scanMessage });
}

function createHaCardConfig() {
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  return createHomeAssistantCardConfiguration({
    target: haCardTarget.value,
    layout: haCardLayout.value,
    title: group?.title ?? (homeAssistantGroupName.value.trim() || "ATLAS panel"),
    entityIds: cardPreviewEntityIds(),
  });
}

function createExpertHaCardConfig() {
  return createHomeAssistantCardEditorConfiguration({
    cardName: currentExpertCardName(),
    editorMode: "expert",
    fields: expertEditorFields,
  });
}

function createActiveHaCardConfig() {
  return activeEditorMode === "expert" ? createExpertHaCardConfig() : createHaCardConfig();
}

function createActiveCardEditorPlan() {
  return createHomeAssistantCardEditorPackagePlan({
    cardName: currentHaCardExportName(),
    scriptFilename: currentHaCardScriptFilename(),
    editorMode: activeEditorMode,
    simpleTarget: haCardTarget.value,
    defaultEntityIds: cardPreviewEntityIds(),
    fields: activeEditorMode === "expert" ? expertEditorFields : [],
  });
}

function currentExpertCardName() {
  return expertCardName.value.trim() || "ATLAS Expert card";
}

function currentHaCardExportName() {
  if (activeEditorMode === "expert") {
    return currentExpertCardName();
  }
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  return group?.title ?? (homeAssistantGroupName.value.trim() || "ATLAS Home Assistant card");
}

function currentHaCardScriptFilename() {
  return normalizeHomeAssistantCardEditorScriptFilename(haCardScriptFilename.value.trim() || currentHaCardExportName());
}

function renderHaCardPreview() {
  if (cardPreviewEntityIds().length === 0) {
    haCardPreview.textContent = emptyEntitySelectionMessage;
    haCardDependency.dataset.required = "false";
    haCardDependency.dataset.status = "not-required";
    haCardDependency.textContent = emptyEntitySelectionMessage;
    copyHaCardResources.disabled = true;
    return;
  }

  const card = createHaCardConfig();
  haCardPreview.textContent = serializeHomeAssistantEntitiesCardConfiguration(card, haCardFormat.value);
  renderHaCardDependency(card);
}

function renderHaCardDependency(card) {
  const dependency = inspectHomeAssistantCardDependency(card);
  const availability = inspectHomeAssistantCardDependencyAvailability(card, lovelaceResources);
  const integrationPlan = createHomeAssistantAtlasFrontendIntegrationPlan({
    mode: "server",
    card,
    resources: lovelaceResources,
  });
  haCardDependency.dataset.required = String(dependency.required);
  haCardDependency.dataset.status = lovelaceResourcesChecked
    ? integrationPlan.ready ? "installed" : "missing"
    : dependency.required ? "unchecked" : "not-required";
  copyHaCardResources.disabled = false;
  const resourceHint = dependency.resourcePaths.length
    ? t("dependency.resource", { paths: dependency.resourcePaths.join(", ") })
    : "";
  const installHint = dependency.installPaths.length
    ? t("dependency.installPath", { paths: dependency.installPaths.join(", ") })
    : "";
  const atlasHint = t("dependency.atlasFrontend", { paths: integrationPlan.atlasResource.resourcePaths.join(", ") });
  if (!dependency.required) {
    haCardDependency.textContent = t("dependency.builtIn", { atlasHint });
  } else if (!lovelaceResourcesChecked) {
    haCardDependency.textContent = t("dependency.requiresUnchecked", {
      dependency: dependency.label,
      resourceHint,
      installHint,
      atlasHint,
    });
  } else if (integrationPlan.ready) {
    haCardDependency.textContent = t("dependency.ready", {
      dependency: dependency.label,
      resourceHint,
      atlasHint,
    });
  } else if (availability.status === "installed") {
    haCardDependency.textContent = t("dependency.cardFoundAtlasMissing", {
      dependency: dependency.label,
      resourceHint,
      atlasHint,
      missing: integrationPlan.atlasAvailability.missingResourcePaths.join(", "),
    });
  } else {
    haCardDependency.textContent = t("dependency.missing", {
      dependency: dependency.label,
      resourceHint,
      installHint,
      atlasHint,
      missing: [
        ...integrationPlan.atlasAvailability.missingResourcePaths,
        ...availability.missingResourcePaths,
      ].join(", "),
    });
  }
}

function renderHaCardImportDecision(text) {
  const decision = decideHomeAssistantCardArtifactImport(text);
  haCardImportReview.dataset.action = decision.action;

  if (decision.action === "import") {
    haCardImportReview.textContent = decision.message;
    return decision;
  }

  if (decision.action === "review") {
    haCardImportReview.textContent = formatHomeAssistantCardArtifactReviewLines(text).join("\n");
    return decision;
  }

  haCardImportReview.textContent = `${decision.message} ${decision.inspection.reason}`;
  return decision;
}

function renderExpertTemplatePalette() {
  expertTemplatePalette.replaceChildren();
  const visibleCards = expertPaletteFavoriteIds.size && !expertPaletteShowAllCards
    ? expertPaletteCards.filter(card => expertPaletteFavoriteIds.has(card.id))
    : expertPaletteCards;
  saveExpertPaletteFavorites.disabled = !isExpertPaletteFavoriteDraftDirty();
  showAllExpertPaletteCards.disabled = expertPaletteFavoriteIds.size === 0;
  showAllExpertPaletteCards.textContent = expertPaletteShowAllCards ? t("button.showFavorites") : t("button.showAllCards");
  resetExpertTemplateSizing.disabled = !isExpertTemplateSizingDirty();
  resetExpertPaletteFavorites.disabled = expertPaletteFavoriteIds.size === 0;
  for (const card of visibleCards) {
    const template = cardEditorTemplates.find(candidate => candidate.id === card.templateId);
    if (!template) continue;
    const cardLabel = translatePaletteCardLabel(card);
    const cardCategory = translatePaletteCategory(card.category);
    const item = document.createElement("article");
    item.className = "expert-template-card";
    item.classList.toggle("selected", isExpertPaletteCardSelected(card));
    item.classList.toggle("disabled", card.disabled === true);
    item.draggable = card.disabled !== true;
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    item.setAttribute("aria-disabled", String(card.disabled === true));
    item.dataset.paletteCard = card.id;

    const main = document.createElement("div");
    main.className = "expert-template-main";
    const meta = document.createElement("div");
    meta.className = "expert-template-meta";
    const category = document.createElement("span");
    category.className = "palette-category";
    category.textContent = cardCategory;
    const title = document.createElement("strong");
    title.textContent = cardLabel;
    const detail = document.createElement("small");
    const bubbleType = card.target === "bubble" ? `, ${card.bubbleButtonType}` : "";
    detail.textContent = card.disabled === true
      ? t("text.registeredNotMapped", { category: cardCategory })
      : t("text.paletteDetail", {
        layout: translateTemplateLabel(template.id, template.layout),
        size: `${template.defaultWidth}x${template.defaultHeight}`,
        target: `${translateCardTarget(card.target, card.target)}${bubbleType}`,
      });
    const preview = document.createElement("span");
    preview.textContent = card.preview.join(" / ");
    const availability = document.createElement("span");
    availability.textContent = card.disabled === true ? t("text.scannedOnly") : formatExpertTemplateAvailability(card.target);

    main.append(category, title);
    meta.append(detail, preview, availability);
    const favorite = document.createElement("label");
    favorite.className = "favorite-toggle";
    const favoriteCheckbox = document.createElement("input");
    favoriteCheckbox.type = "checkbox";
    favoriteCheckbox.checked = expertPaletteDraftFavoriteIds.has(card.id);
    favorite.append(favoriteCheckbox, t("text.favorite"));
    main.append(favorite);
    favorite.addEventListener("click", event => event.stopPropagation());
    favoriteCheckbox.addEventListener("change", event => {
      event.stopPropagation();
      setExpertPaletteFavoriteDraft(card.id, favoriteCheckbox.checked);
    });

    if (card.disabled !== true) {
      const sizing = createExpertTemplateSizingControls(template);
      meta.append(sizing);
    }
    item.append(main, meta);

    item.addEventListener("click", () => {
      if (card.disabled === true) {
        statusMessage.textContent = t("text.scannedCardUnavailable", { label: cardLabel });
        return;
      }
      selectExpertPaletteCard(card.id);
    });
    item.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (card.disabled === true) {
          statusMessage.textContent = t("text.scannedCardUnavailable", { label: cardLabel });
          return;
        }
        selectExpertPaletteCard(card.id);
      }
    });
    item.addEventListener("dragstart", event => {
      if (card.disabled === true) {
        event.preventDefault();
        return;
      }
      event.dataTransfer?.setData("text/plain", card.templateId);
      event.dataTransfer?.setData("application/x-atlas-template", card.templateId);
      event.dataTransfer?.setData("application/x-atlas-palette-card", card.id);
      event.dataTransfer?.setDragImage(item, 12, 12);
      expertDragFieldOffset = { column: 0, row: 0 };
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
    expertTemplatePalette.append(item);
  }
}

function isExpertPaletteFavoriteDraftDirty() {
  if (expertPaletteDraftFavoriteIds.size !== expertPaletteFavoriteIds.size) return true;
  for (const cardId of expertPaletteDraftFavoriteIds) {
    if (!expertPaletteFavoriteIds.has(cardId)) return true;
  }
  return false;
}

function isExpertTemplateSizingDirty() {
  return cardEditorTemplates.some(template => {
    const sizing = expertTemplateSizing.get(template.id) ?? { columns: String(template.defaultWidth), rows: "auto" };
    return sizing.columns !== String(template.defaultWidth) || sizing.rows !== "auto";
  });
}

function isExpertPaletteCardSelected(card) {
  return expertTemplate.value === card.templateId
    && expertTarget.value === card.target
    && (card.target !== "bubble" || expertBubbleButtonType.value === (card.bubbleButtonType ?? "state"));
}

function setExpertPaletteFavoriteDraft(cardId, favorite) {
  if (favorite) {
    expertPaletteDraftFavoriteIds.add(cardId);
  } else {
    expertPaletteDraftFavoriteIds.delete(cardId);
  }
  renderExpertTemplatePalette();
  statusMessage.textContent = t("text.paletteSelectionChanged");
}

function toggleExpertPaletteAllCards() {
  expertPaletteShowAllCards = !expertPaletteShowAllCards;
  renderExpertTemplatePalette();
  statusMessage.textContent = expertPaletteShowAllCards
    ? t("text.fullCardListVisible")
    : t("text.savedFavoritesVisible");
}

function saveExpertPaletteFavoriteSelection() {
  expertPaletteFavoriteIds.clear();
  for (const cardId of expertPaletteDraftFavoriteIds) {
    expertPaletteFavoriteIds.add(cardId);
  }
  expertPaletteShowAllCards = false;
  persistConfiguration();
  renderExpertTemplatePalette();
  statusMessage.textContent = expertPaletteFavoriteIds.size
    ? t("text.favoritesSaved", { count: expertPaletteFavoriteIds.size })
    : t("text.allCardsRemainVisible");
}

function resetExpertPaletteFavoriteSelection() {
  expertPaletteFavoriteIds.clear();
  expertPaletteDraftFavoriteIds.clear();
  expertPaletteShowAllCards = false;
  persistConfiguration();
  renderExpertTemplatePalette();
  statusMessage.textContent = t("text.allCardsVisibleAgain");
}

function normalizeExpertTemplateSizing(input) {
  const columns = input?.columns === "full" ? "full" : String(Math.max(1, Math.min(expertGridColumns, Number(input?.columns) || 1)));
  const rows = input?.rows === "auto" ? "auto" : String(Math.max(1, Math.min(8, Number(input?.rows) || 1)));
  return { columns, rows };
}

function serializedExpertTemplateSizing() {
  return [...expertTemplateSizing.entries()].map(([templateId, sizing]) => ({
    templateId,
    ...normalizeExpertTemplateSizing(sizing),
  }));
}

function resetExpertTemplateSizingDefaults() {
  expertTemplateSizing.clear();
  for (const template of cardEditorTemplates) {
    expertTemplateSizing.set(template.id, {
      columns: String(template.defaultWidth),
      rows: "auto",
    });
  }
}

function resetExpertTemplateSizingSelection() {
  resetExpertTemplateSizingDefaults();
  syncExpertInputsFromTemplateSizing(expertTemplate.value);
  persistConfiguration();
  renderExpertTemplatePalette();
  statusMessage.textContent = t("text.templateSizesReset");
}

function createExpertTemplateSizingControls(template) {
  const sizing = expertTemplateSizing.get(template.id) ?? { columns: String(template.defaultWidth), rows: "auto" };
  const controls = document.createElement("span");
  controls.className = "expert-template-sizing";

  const columns = document.createElement("select");
  columns.setAttribute("aria-label", `${translateTemplateLabel(template.id, template.label)} ${t("label.column")}`);
  for (let index = 1; index <= expertGridColumns; index += 1) {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index} ${t("text.col")}`;
    columns.append(option);
  }
  const full = document.createElement("option");
  full.value = "full";
  full.textContent = t("text.full");
  columns.append(full);
  columns.value = sizing.columns;

  const rows = document.createElement("select");
  rows.setAttribute("aria-label", `${translateTemplateLabel(template.id, template.label)} ${t("label.row")}`);
  const auto = document.createElement("option");
  auto.value = "auto";
  auto.textContent = t("text.auto");
  rows.append(auto);
  for (let index = 1; index <= 8; index += 1) {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${index} ${t("text.row")}`;
    rows.append(option);
  }
  rows.value = sizing.rows;

  const update = () => {
    expertTemplateSizing.set(template.id, {
      columns: columns.value,
      rows: rows.value,
    });
    if (expertTemplate.value === template.id) {
      syncExpertInputsFromTemplateSizing(template.id);
    }
    persistConfiguration();
    renderExpertTemplatePalette();
    statusMessage.textContent = t("message.templateSizeSet", {
      template: translateTemplateLabel(template.id, template.label),
      columns: columns.value,
      rows: rows.value,
    });
  };
  for (const control of [columns, rows]) {
    control.addEventListener("click", event => event.stopPropagation());
    control.addEventListener("mousedown", event => event.stopPropagation());
    control.addEventListener("dragstart", event => event.stopPropagation());
    control.addEventListener("change", update);
  }

  controls.append(columns, rows);
  return controls;
}

function formatExpertTemplateAvailability(target) {
  const dependency = inspectHomeAssistantCardDependency(target);
  if (!dependency.required) return t("text.builtIn");
  if (!lovelaceResourcesChecked) return t("text.resourceUnchecked");
  const availability = inspectHomeAssistantCardDependencyAvailability(target, lovelaceResources);
  return availability.status === "installed" ? t("text.resourceInstalled") : t("text.resourceMissing");
}

function selectExpertTemplate(templateId) {
  const template = cardEditorTemplates.find(candidate => candidate.id === templateId);
  if (!template) return;
  expertTemplate.value = template.id;
  syncExpertInputsFromTemplateSizing(template.id);
  expertTarget.value = template.target;
  syncExpertBubbleTypeControl();
  renderExpertTemplatePalette();
}

function selectExpertPaletteCard(cardId) {
  const card = expertPaletteCards.find(candidate => candidate.id === cardId);
  const template = cardEditorTemplates.find(candidate => candidate.id === card?.templateId);
  if (!card || !template) return undefined;
  if (card.disabled === true) {
    statusMessage.textContent = t("text.scannedCardUnavailable", { label: translatePaletteCardLabel(card) });
    return undefined;
  }
  expertTemplate.value = template.id;
  syncExpertInputsFromTemplateSizing(template.id);
  expertTarget.value = card.target;
  expertBubbleButtonType.value = card.bubbleButtonType ?? "state";
  syncExpertBubbleTypeControl();
  renderExpertTemplatePalette();
  statusMessage.textContent = t("text.paletteCardSelected", { label: translatePaletteCardLabel(card) });
  return card;
}

function syncExpertInputsFromTemplateSizing(templateId) {
  const template = cardEditorTemplates.find(candidate => candidate.id === templateId);
  if (!template) return;
  const sizing = expertTemplateSizing.get(templateId) ?? { columns: String(template.defaultWidth), rows: "auto" };
  expertWidth.value = sizing.columns === "full" ? String(expertGridColumns) : sizing.columns;
  expertHeight.value = sizing.rows === "auto" ? String(template.defaultHeight) : sizing.rows;
}

function renderExpertFieldList() {
  expertFieldList.replaceChildren();
  renderExpertEditButton();
  arrangeExpertFields.disabled = expertEditorFields.length === 0;
  if (expertEditorFields.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = t("message.noExpertFields");
    expertFieldList.append(empty);
    return;
  }

  expertEditorFields.forEach((field, index) => {
    const item = document.createElement("div");
    item.className = "expert-field-row";
    item.classList.toggle("selected", index === selectedExpertFieldIndex);
    const text = document.createElement("span");
    const bubbleType = field.target === "bubble" ? `, ${field.bubbleButtonType ?? "state"}` : "";
    text.textContent = `${field.id}: ${translateCardTarget(field.target, field.target)}${bubbleType}, ${field.layout ?? "card"}, ${field.width}x${field.height}, ${field.entityId || t("text.demoEntity")}, c${field.column + 1}/r${field.row + 1}`;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-button";
    remove.textContent = "🗑";
    remove.title = t("text.removeField", { field: field.id });
    remove.setAttribute("aria-label", t("text.removeField", { field: field.id }));
    remove.addEventListener("click", event => {
      event.stopPropagation();
      expertEditorFields.splice(index, 1);
      if (selectedExpertFieldIndex === index) {
        selectedExpertFieldIndex = -1;
        expertFieldEditing = false;
      } else if (selectedExpertFieldIndex > index) {
        selectedExpertFieldIndex -= 1;
      }
      persistConfiguration();
      renderExpertEditorPreview();
      statusMessage.textContent = t("text.fieldRemoved", { field: field.id });
    });
    item.addEventListener("click", () => {
      selectExpertEditorField(index);
    });
    item.append(text, remove);
    expertFieldList.append(item);
  });
}

function formatEntityIdAsTitle(entityId) {
  const localName = entityId.includes(".") ? entityId.split(".").slice(1).join(".") : entityId;
  return localName
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, character => character.toUpperCase());
}

function currentExpertEntityTitle(entityId = expertEntity.value.trim() || currentEntityId()) {
  const entity = entitySnapshots.get(entityId);
  if (entity) {
    return createHomeAssistantEntityPresentation(entity).label;
  }
  return formatEntityIdAsTitle(entityId) || entityId;
}

function updateSelectedExpertFieldTitle(title) {
  const field = expertEditorFields[selectedExpertFieldIndex];
  const nextTitle = title.trim();
  if (!nextTitle) {
    statusMessage.textContent = t("text.enterTitle");
    return false;
  }
  if (!field) {
    statusMessage.textContent = t("text.titlePrepared", { title: nextTitle });
    return false;
  }
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    id: nextTitle,
    entries: renameExpertFieldEntries(field, nextTitle),
  };
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("text.titleApplied", { title: nextTitle });
  return true;
}

function renameExpertFieldEntries(field, title) {
  if ((field.layout ?? "card") === "card" || !field.entries?.length) return field.entries;
  return field.entries.map((entry, index) => ({
    ...entry,
    id: field.entries.length === 1 ? title : `${title} ${index + 1}`,
    ...(entry.target === "bubble" ? { bubbleButtonType: entry.bubbleButtonType ?? "state" } : {}),
  }));
}

function updateSelectedExpertFieldTarget() {
  syncExpertBubbleTypeControl();
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) return;
  const nextTarget = expertTarget.value;
  const nextBubbleButtonType = nextTarget === "bubble" ? expertBubbleButtonType.value : undefined;
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    target: nextTarget,
    ...(nextBubbleButtonType ? { bubbleButtonType: nextBubbleButtonType } : { bubbleButtonType: undefined }),
    entries: (field.entries ?? []).map(entry => ({
      ...entry,
      target: nextTarget,
      ...(nextBubbleButtonType ? { bubbleButtonType: nextBubbleButtonType } : { bubbleButtonType: undefined }),
    })),
  };
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("text.targetUpdated", { field: field.id, target: translateCardTarget(nextTarget, nextTarget) });
}

function updateSelectedExpertFieldBubbleType() {
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field || expertTarget.value !== "bubble") return;
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    bubbleButtonType: expertBubbleButtonType.value,
    entries: (field.entries ?? []).map(entry => ({
      ...entry,
      bubbleButtonType: expertBubbleButtonType.value,
    })),
  };
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("text.bubbleTypeUpdated", { field: field.id, type: expertBubbleButtonType.value });
}

function getExpertFieldResizeBase(field) {
  return {
    width: Math.max(1, Math.floor(Number(field.resizeBaseWidth ?? field.width))),
    height: Math.max(1, Math.floor(Number(field.resizeBaseHeight ?? field.height))),
  };
}

function getExpertFieldResizeLimit(field) {
  const base = getExpertFieldResizeBase(field);
  return {
    width: Math.min(expertGridColumns, base.width + expertFieldMaxResizeDelta),
    height: Math.min(expertGridRows, base.height + expertFieldMaxResizeDelta),
  };
}

function clampExpertFieldSpan(value, fallback, limit) {
  const numericValue = Number(value);
  const nextValue = Number.isFinite(numericValue) ? Math.floor(numericValue) : fallback;
  return Math.max(1, Math.min(limit, nextValue));
}

function clampExpertFieldOffset(value, fallback, max) {
  const numericValue = Number(value);
  const nextValue = Number.isFinite(numericValue) ? Math.floor(numericValue) : fallback;
  return Math.max(0, Math.min(max, nextValue));
}

function clampExpertEditorSurfaceDelta(value) {
  const numericValue = Number(value);
  const nextValue = Number.isFinite(numericValue) ? Math.floor(numericValue) : 0;
  return Math.max(0, Math.min(expertEditorSurfaceMaxResizeDelta, nextValue));
}

function expertEditorSurfaceWidthStep() {
  const containerWidth = expertEditorDropzone.parentElement?.clientWidth || expertEditorDropzone.clientWidth || 672;
  return Math.max(48, Math.round(containerWidth / expertGridColumns));
}

function applyExpertEditorSurfaceSize() {
  expertEditorDropzone.style.setProperty(
    "--expert-editor-extra-width",
    `${expertEditorSurfaceSize.columns * expertEditorSurfaceWidthStep()}px`,
  );
  expertEditorDropzone.style.setProperty(
    "--expert-editor-extra-height",
    `${expertEditorSurfaceSize.rows * expertEditorSurfaceHeightStep}px`,
  );
}

function appendExpertEditorSurfaceResizeHandle() {
  const handle = document.createElement("button");
  handle.type = "button";
  handle.className = "expert-editor-surface-resize-handle";
  handle.setAttribute("aria-label", t("aria.resizeExpertSurface"));
  handle.title = t("aria.resizeExpertSurface");
  handle.addEventListener("pointerdown", startExpertEditorSurfaceResize);
  handle.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();
  });
  expertEditorDropzone.append(handle);
}

function startExpertEditorSurfaceResize(event) {
  event.preventDefault();
  event.stopPropagation();
  const starting = { ...expertEditorSurfaceSize };
  const startX = event.clientX;
  const startY = event.clientY;
  const widthStep = expertEditorSurfaceWidthStep();
  const heightStep = expertEditorSurfaceHeightStep;
  document.body.style.cursor = "nwse-resize";

  const applyResize = pointerEvent => {
    expertEditorSurfaceSize = {
      columns: clampExpertEditorSurfaceDelta(starting.columns + Math.round((pointerEvent.clientX - startX) / widthStep)),
      rows: clampExpertEditorSurfaceDelta(starting.rows + Math.round((pointerEvent.clientY - startY) / heightStep)),
    };
    applyExpertEditorSurfaceSize();
  };

  const finishResize = () => {
    window.removeEventListener("pointermove", applyResize);
    window.removeEventListener("pointerup", finishResize);
    document.body.style.cursor = "";
    persistConfiguration();
    statusMessage.textContent = t("message.surfaceResized", {
      columns: expertEditorSurfaceSize.columns,
      rows: expertEditorSurfaceSize.rows,
    });
  };

  window.addEventListener("pointermove", applyResize);
  window.addEventListener("pointerup", finishResize, { once: true });
}

function resetExpertEditorSurfaceSize() {
  expertEditorSurfaceSize = { columns: 0, rows: 0 };
  applyExpertEditorSurfaceSize();
  persistConfiguration();
  statusMessage.textContent = t("message.surfaceSizeReset");
}

function arrangeExpertEditorFields() {
  if (expertEditorFields.length === 0) {
    statusMessage.textContent = t("message.arrangeNeedsFields");
    return;
  }

  const previousOverlapCount = analyzeHomeAssistantCardEditorSurface(expertEditorFields).overlapCount;
  const arrangedFields = arrangeHomeAssistantCardEditorSurfaceFields(expertEditorFields, {
    columns: expertGridColumns,
    rows: expertGridRows,
  });
  expertEditorFields.splice(0, expertEditorFields.length, ...arrangedFields);
  selectedExpertFieldIndex = Math.min(Math.max(0, selectedExpertFieldIndex), expertEditorFields.length - 1);
  persistConfiguration();
  renderExpertEditorPreview();
  const nextOverlapCount = analyzeHomeAssistantCardEditorSurface(expertEditorFields).overlapCount;
  statusMessage.textContent = t("message.fieldsArranged", { previous: previousOverlapCount, next: nextOverlapCount });
}

function updateSelectedExpertFieldGeometry() {
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) {
    statusMessage.textContent = t("message.selectFieldBeforeResize");
    return false;
  }

  const base = getExpertFieldResizeBase(field);
  const limit = getExpertFieldResizeLimit(field);
  const width = clampExpertFieldSpan(expertWidth.value, field.width, limit.width);
  const height = clampExpertFieldSpan(expertHeight.value, field.height, limit.height);
  const column = clampExpertFieldOffset(expertColumn.value, field.column, expertGridColumns - width);
  const row = clampExpertFieldOffset(expertRow.value, field.row, expertGridRows - height);
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    column,
    row,
    width,
    height,
    resizeBaseWidth: base.width,
    resizeBaseHeight: base.height,
  };
  expertColumn.value = String(column);
  expertRow.value = String(row);
  expertWidth.value = String(width);
  expertHeight.value = String(height);
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("message.fieldResized", { field: field.id, width, height });
  return true;
}

function applyEntityToSelectedExpertField(entityId) {
  const title = currentExpertEntityTitle(entityId);
  expertEntity.value = entityId;
  expertTitle.value = title;
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) {
    statusMessage.textContent = t("text.entityPrepared", { entityId });
    return false;
  }

  const entries = (field.layout ?? "card") === "card"
    ? field.entries
    : [{ id: title, target: field.target, bubbleButtonType: field.bubbleButtonType, entityId }];
  expertEditorFields[selectedExpertFieldIndex] = {
    ...field,
    id: title,
    entityId,
    entries,
  };
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("text.entityAssigned", { entityId, title });
  return true;
}

function renderExpertEditButton() {
  if (selectedExpertFieldIndex < 0 || !expertEditorFields[selectedExpertFieldIndex]) {
    editExpertField.disabled = true;
    editExpertField.textContent = t("button.editSelected");
    editExpertField.setAttribute("aria-pressed", "false");
    return;
  }

  editExpertField.disabled = false;
  editExpertField.textContent = expertFieldEditing ? t("button.stopEditing") : t("button.editSelected");
  editExpertField.setAttribute("aria-pressed", String(expertFieldEditing));
}

function selectExpertEditorField(index) {
  const field = expertEditorFields[index];
  if (!field) return;
  selectedExpertFieldIndex = index;
  const limit = getExpertFieldResizeLimit(field);
  expertColumn.value = String(field.column);
  expertRow.value = String(field.row);
  expertWidth.value = String(field.width);
  expertHeight.value = String(field.height);
  expertWidth.max = String(limit.width);
  expertHeight.max = String(limit.height);
  expertTarget.value = field.target;
  expertBubbleButtonType.value = field.bubbleButtonType ?? "state";
  syncExpertBubbleTypeControl();
  expertTitle.value = field.id;
  expertEntity.value = field.entityId;
  persistConfiguration();
  renderExpertFieldList();
  renderExpertEditorSurface();
  statusMessage.textContent = t("text.fieldSelected", { field: field.id });
}

function toggleExpertFieldEditing() {
  const field = expertEditorFields[selectedExpertFieldIndex];
  if (!field) {
    expertFieldEditing = false;
    renderExpertEditButton();
    statusMessage.textContent = t("text.selectFieldBeforeEditing");
    return;
  }

  expertFieldEditing = !expertFieldEditing;
  renderExpertEditButton();
  renderExpertEditorSurface();
  statusMessage.textContent = expertFieldEditing
    ? t("text.editHandlesEnabled", { field: field.id })
    : t("text.editHandlesHidden", { field: field.id });
}

function renderExpertEditorSurface() {
  expertEditorDropzone.replaceChildren();
  applyExpertEditorSurfaceSize();
  const grid = document.createElement("div");
  grid.className = "expert-surface-grid";
  const surfaceAnalysis = analyzeHomeAssistantCardEditorSurface(expertEditorFields);
  const overlappingFieldIds = new Set(surfaceAnalysis.overlappingFieldIds);
  if (expertEditorFields.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = t("message.dragCard");
    grid.append(empty);
    expertEditorDropzone.append(grid);
    appendExpertEditorSurfaceResizeHandle();
    return;
  }

  expertEditorFields.forEach((field, index) => {
    const tile = document.createElement("div");
    tile.tabIndex = 0;
    tile.className = "expert-surface-field";
    tile.classList.toggle("selected", index === selectedExpertFieldIndex);
    tile.classList.toggle("editing", index === selectedExpertFieldIndex && expertFieldEditing);
    tile.classList.toggle("conflict", overlappingFieldIds.has(field.id));
    tile.dataset.expertFieldIndex = String(index);
    tile.setAttribute("role", "button");
    const conflictLabel = overlappingFieldIds.has(field.id) ? `, ${t("text.overlappingField")}` : "";
    tile.setAttribute("aria-label", `${field.id} on column ${field.column + 1}, row ${field.row + 1}${conflictLabel}`);
    tile.setAttribute("aria-pressed", String(index === selectedExpertFieldIndex));
    tile.draggable = true;
    tile.style.gridColumn = `${field.column + 1} / span ${Math.min(expertGridColumns, field.width)}`;
    tile.style.gridRow = `${field.row + 1} / span ${Math.min(expertGridRows, field.height)}`;
    const title = document.createElement("strong");
    title.textContent = field.id;
    const target = document.createElement("span");
    target.textContent = translateCardTarget(field.target, field.target);
    const entity = document.createElement("small");
    entity.textContent = field.entityId || t("text.demoEntity");
    tile.append(title, target, entity);
    tile.addEventListener("click", () => {
      selectExpertEditorField(index);
    });
    tile.addEventListener("keydown", event => {
      handleExpertSurfaceFieldKeydown(event, index);
    });
    tile.addEventListener("pointerdown", event => {
      expertDragFieldOffset = calculateExpertFieldPointerOffset(event, tile, field);
    });
    tile.addEventListener("dragstart", event => {
      event.dataTransfer?.setData("application/x-atlas-field-index", String(index));
      tile.classList.add("dragging");
    });
    tile.addEventListener("dragend", () => {
      tile.classList.remove("dragging");
      expertDragFieldOffset = { column: 0, row: 0 };
    });
    if (index === selectedExpertFieldIndex && expertFieldEditing) {
      const handle = document.createElement("span");
      handle.className = "expert-resize-handle";
      handle.dataset.corner = "se";
      handle.setAttribute("aria-hidden", "true");
      handle.addEventListener("pointerdown", event => {
        startExpertFieldResize(event, index, "se", tile);
      });
      tile.append(handle);
    }
    grid.append(tile);
  });
  expertEditorDropzone.append(grid);
  appendExpertEditorSurfaceResizeHandle();
}

function calculateExpertFieldPointerOffset(event, tile, field) {
  const tileBounds = tile.getBoundingClientRect();
  const gridBounds = expertEditorGridBounds();
  const cellWidth = Math.max(1, gridBounds.width / expertGridColumns);
  const cellHeight = Math.max(1, gridBounds.height / expertGridRows);
  return {
    column: Math.max(0, Math.min(field.width - 1, Math.floor((event.clientX - tileBounds.left) / cellWidth))),
    row: Math.max(0, Math.min(field.height - 1, Math.floor((event.clientY - tileBounds.top) / cellHeight))),
  };
}

function expertEditorGridBounds() {
  const grid = expertEditorDropzone.querySelector(".expert-surface-grid");
  return (grid ?? expertEditorDropzone).getBoundingClientRect();
}

function handleExpertSurfaceFieldKeydown(event, index) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectExpertEditorField(index);
    focusExpertSurfaceField(index);
    return;
  }

  const deltas = {
    ArrowLeft: { column: -1, row: 0 },
    ArrowRight: { column: 1, row: 0 },
    ArrowUp: { column: 0, row: -1 },
    ArrowDown: { column: 0, row: 1 },
  };
  const delta = deltas[event.key];
  if (!delta) return;

  event.preventDefault();
  selectExpertEditorField(index);
  if (event.shiftKey && expertFieldEditing) {
    resizeExpertEditorFieldBy(index, delta);
    return;
  }
  nudgeExpertEditorField(index, delta);
}

function focusExpertSurfaceField(index) {
  const tile = expertEditorDropzone.querySelector(`[data-expert-field-index="${index}"]`);
  tile?.focus();
}

function nudgeExpertEditorField(index, delta) {
  const field = expertEditorFields[index];
  if (!field) return;
  moveExpertEditorField(index, {
    column: field.column + delta.column,
    row: field.row + delta.row,
  });
  focusExpertSurfaceField(index);
}

function resizeExpertEditorFieldBy(index, delta) {
  const field = expertEditorFields[index];
  if (!field) return;
  const base = getExpertFieldResizeBase(field);
  const limit = getExpertFieldResizeLimit(field);
  const nextWidth = clampExpertFieldSpan(field.width + delta.column, field.width, Math.min(limit.width, expertGridColumns - field.column));
  const nextHeight = clampExpertFieldSpan(field.height + delta.row, field.height, Math.min(limit.height, expertGridRows - field.row));
  expertEditorFields[index] = {
    ...field,
    width: nextWidth,
    height: nextHeight,
    resizeBaseWidth: base.width,
    resizeBaseHeight: base.height,
  };
  expertWidth.value = String(nextWidth);
  expertHeight.value = String(nextHeight);
  selectedExpertFieldIndex = index;
  persistConfiguration();
  renderExpertEditorPreview();
  focusExpertSurfaceField(index);
  statusMessage.textContent = t("message.fieldResized", { field: field.id, width: nextWidth, height: nextHeight });
}

function startExpertFieldResize(event, index, corner, tile) {
  const field = expertEditorFields[index];
  if (!field) return;
  event.preventDefault();
  event.stopPropagation();
  tile.draggable = false;
  const grid = tile.closest(".expert-surface-grid");
  const gridBounds = grid.getBoundingClientRect();
  const starting = {
    column: field.column,
    row: field.row,
    width: field.width,
    height: field.height,
  };
  const base = getExpertFieldResizeBase(field);
  const limit = getExpertFieldResizeLimit(field);

  const pointerToGridCell = pointerEvent => ({
    column: Math.max(0, Math.min(expertGridColumns - 1, Math.floor(((pointerEvent.clientX - gridBounds.left) / gridBounds.width) * expertGridColumns))),
    row: Math.max(0, Math.min(expertGridRows - 1, Math.floor(((pointerEvent.clientY - gridBounds.top) / gridBounds.height) * expertGridRows))),
  });

  const applyResize = pointerEvent => {
    const pointer = pointerToGridCell(pointerEvent);
    const next = { ...starting };
    if (corner.includes("e")) {
      const right = Math.max(starting.column + 1, Math.min(expertGridColumns, pointer.column + 1));
      next.width = right - starting.column;
    }
    if (corner.includes("s")) {
      const bottom = Math.max(starting.row + 1, Math.min(expertGridRows, pointer.row + 1));
      next.height = bottom - starting.row;
    }
    if (corner.includes("w")) {
      next.column = Math.max(0, Math.min(starting.column + starting.width - 1, pointer.column));
      next.width = starting.column + starting.width - next.column;
    }
    if (corner.includes("n")) {
      next.row = Math.max(0, Math.min(starting.row + starting.height - 1, pointer.row));
      next.height = starting.row + starting.height - next.row;
    }
    if (next.width > limit.width) {
      if (corner.includes("w")) {
        next.column = Math.max(0, starting.column + starting.width - limit.width);
      }
      next.width = limit.width;
    }
    if (next.height > limit.height) {
      if (corner.includes("n")) {
        next.row = Math.max(0, starting.row + starting.height - limit.height);
      }
      next.height = limit.height;
    }
    next.column = Math.max(0, Math.min(expertGridColumns - next.width, next.column));
    next.row = Math.max(0, Math.min(expertGridRows - next.height, next.row));

    expertEditorFields[index] = {
      ...field,
      column: next.column,
      row: next.row,
      width: next.width,
      height: next.height,
      resizeBaseWidth: base.width,
      resizeBaseHeight: base.height,
    };
    expertColumn.value = String(next.column);
    expertRow.value = String(next.row);
    expertWidth.value = String(next.width);
    expertHeight.value = String(next.height);
    tile.style.gridColumn = `${next.column + 1} / span ${next.width}`;
    tile.style.gridRow = `${next.row + 1} / span ${next.height}`;
  };

  const finishResize = () => {
    window.removeEventListener("pointermove", applyResize);
    window.removeEventListener("pointerup", finishResize);
    tile.draggable = true;
    persistConfiguration();
    renderExpertEditorPreview();
    const resizedField = expertEditorFields[index];
    statusMessage.textContent = t("message.fieldResized", {
      field: resizedField.id,
      width: resizedField.width,
      height: resizedField.height,
    });
  };

  window.addEventListener("pointermove", applyResize);
  window.addEventListener("pointerup", finishResize, { once: true });
}

function renderExpertEditorPreview() {
  if (expertEditorFields.length === 0) {
    expertEditorSummary.textContent = t("text.expertFieldsZero");
    expertEditorPreview.textContent = t("message.addTemplatePreview");
    if (activeEditorMode === "expert") {
      haCardDependency.textContent = t("message.addTemplateBeforeExport");
      haCardDependency.dataset.required = "false";
      haCardDependency.dataset.status = "not-required";
      copyHaCardResources.disabled = true;
    }
    renderExpertFieldList();
    renderExpertEditorSurface();
    return;
  }

  const card = createExpertHaCardConfig();
  const surfaceAnalysis = analyzeHomeAssistantCardEditorSurface(expertEditorFields);
  const emptyText = surfaceAnalysis.emptyFieldCount
    ? t("text.emptyFieldsSummary", { count: surfaceAnalysis.emptyFieldCount })
    : "";
  expertEditorSummary.textContent = [
    t("text.expertFieldsSummary", {
      count: surfaceAnalysis.fieldCount,
      populated: surfaceAnalysis.populatedFieldCount,
      empty: emptyText,
    }),
    t("text.rowsSummary", { count: surfaceAnalysis.rowCount }),
    t("text.surfaceSummary", { columns: surfaceAnalysis.usedColumns, rows: surfaceAnalysis.usedRows }),
    t("text.overlapsSummary", { count: surfaceAnalysis.overlapCount }),
    t("text.targetsSummary", { targets: surfaceAnalysis.usedTargets.map(target => translateCardTarget(target, target)).join(", ") }),
    t("text.layoutsSummary", { layouts: surfaceAnalysis.layouts.join(", ") }),
  ].join(". ");
  expertEditorPreview.textContent = serializeHomeAssistantEntitiesCardConfiguration(card, haCardFormat.value);
  if (activeEditorMode === "expert") renderHaCardDependency(card);
  renderExpertFieldList();
  renderExpertEditorSurface();
}

function addExpertEditorField() {
  const entityId = expertEntity.value.trim() || currentEntityId();
  const sizing = resolveExpertTemplateSizing(expertTemplate.value);
  const fieldTitle = expertTitle.value.trim() || undefined;
  const field = createExpertEditorField({
    templateId: expertTemplate.value,
    entityId,
    title: fieldTitle,
    column: Number(expertColumn.value),
    row: Number(expertRow.value),
    width: sizing.width,
    height: sizing.height,
  });
  expertEditorFields.push(field);
  selectedExpertFieldIndex = expertEditorFields.length - 1;
  expertFieldEditing = false;
  expertTitle.value = field.id;
  expertEntity.value = "";
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("text.fieldAdded", { field: field.id });
}

function createExpertEditorField(input) {
  const template = cardEditorTemplates.find(candidate => candidate.id === input.templateId);
  const supportsMultipleEntries = template?.layout === "horizontal-stack"
    || template?.layout === "vertical-stack"
    || template?.layout === "grid";
  const stackEntityIds = supportsMultipleEntries
    ? selectedStackEntityIds()
    : [];
  const width = template?.layout === "horizontal-stack"
    ? Math.min(expertGridColumns, Math.max(1, input.width) * Math.max(1, stackEntityIds.length))
    : input.width;
  const field = createHomeAssistantCardEditorFieldFromTemplate({
    template: input.templateId,
    target: expertTarget.value,
    bubbleButtonType: expertTarget.value === "bubble" ? expertBubbleButtonType.value : undefined,
    entityId: input.entityId,
    id: input.title ?? `${expertTemplate.options[expertTemplate.selectedIndex]?.textContent ?? "Field"} ${expertEditorFields.length + 1}`,
    column: input.column,
    row: input.row,
    width,
    height: input.height,
  });
  const fieldWithResizeBase = {
    ...field,
    resizeBaseWidth: field.width,
    resizeBaseHeight: field.height,
    templateId: input.templateId,
  };
  if (stackEntityIds.length > 1 && field.layout !== "card") {
    return {
      ...fieldWithResizeBase,
      entityId: "",
      entries: stackEntityIds.map((entityId, index) => ({
        id: `${field.id} ${index + 1}`,
        target: expertTarget.value,
        ...(expertTarget.value === "bubble" ? { bubbleButtonType: expertBubbleButtonType.value } : {}),
        entityId,
      })),
    };
  }
  return {
    ...fieldWithResizeBase,
    entries: renameExpertFieldEntries(field, field.id),
  };
}

function addExpertEditorFieldFromTemplate(templateId, placement = calculateExpertDropPlacement(), options = {}) {
  if (!options.preserveSelection) {
    selectExpertTemplate(templateId);
  }
  const sizing = resolveExpertTemplateSizing(templateId);
  const fieldTitle = expertTitle.value.trim() || undefined;
  const field = createExpertEditorField({
    templateId,
    entityId: expertEntity.value.trim() || currentEntityId(),
    title: fieldTitle,
    column: placement.column,
    row: placement.row,
    width: sizing.width,
    height: sizing.height,
  });
  expertEditorFields.push(field);
  selectedExpertFieldIndex = expertEditorFields.length - 1;
  expertFieldEditing = false;
  expertTitle.value = field.id;
  expertEntity.value = "";
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("text.fieldPlaced", { field: field.id });
}

function addExpertEditorFieldFromPaletteCard(cardId, placement = calculateExpertDropPlacement()) {
  const card = selectExpertPaletteCard(cardId);
  if (!card) return;
  addExpertEditorFieldFromTemplate(card.templateId, placement, { preserveSelection: true });
}

function resolveExpertTemplateSizing(templateId) {
  const template = cardEditorTemplates.find(candidate => candidate.id === templateId);
  const sizing = expertTemplateSizing.get(templateId);
  return {
    width: sizing?.columns === "full" ? expertGridColumns : Number(sizing?.columns ?? template?.defaultWidth ?? expertWidth.value),
    height: sizing?.rows === "auto" ? template?.defaultHeight ?? Number(expertHeight.value) : Number(sizing?.rows ?? expertHeight.value),
  };
}

function calculateExpertDropPlacement(event) {
  if (!event) {
    return {
      column: Number(expertColumn.value),
      row: Number(expertRow.value),
    };
  }
  const bounds = expertEditorGridBounds();
  const rawColumn = Math.floor(((event.clientX - bounds.left) / bounds.width) * expertGridColumns);
  const rawRow = Math.floor(((event.clientY - bounds.top) / bounds.height) * expertGridRows);
  const column = Math.max(0, Math.min(expertGridColumns - 1, rawColumn - expertDragFieldOffset.column));
  const row = Math.max(0, Math.min(expertGridRows - 1, rawRow - expertDragFieldOffset.row));
  return { column, row };
}

function moveExpertEditorField(index, placement) {
  const field = expertEditorFields[index];
  if (!field) return;
  const column = Math.max(0, Math.min(expertGridColumns - field.width, placement.column));
  const row = Math.max(0, Math.min(expertGridRows - field.height, placement.row));
  expertEditorFields[index] = {
    ...field,
    column,
    row,
  };
  selectedExpertFieldIndex = index;
  expertColumn.value = String(column);
  expertRow.value = String(row);
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("message.fieldMoved", { field: field.id });
}

function createHaCardExportPayload() {
  const card = createActiveHaCardConfig();
  return createHomeAssistantCardExportPayload({
    card,
    format: haCardFormat.value,
    name: currentHaCardExportName(),
  });
}

function createHaCardExportPackage() {
  const card = createActiveHaCardConfig();
  const editorPlan = createActiveCardEditorPlan();
  return createHomeAssistantCardExportPackage({
    card,
    format: haCardFormat.value,
    name: currentHaCardExportName(),
    editorPlan,
    script: createHomeAssistantCardEditorScriptExport(editorPlan),
  });
}

function canExportHaCard() {
  return activeEditorMode === "expert" ? expertEditorFields.length > 0 : cardPreviewEntityIds().length > 0;
}

async function writeClipboardText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.inset = "0 auto auto 0";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) {
    throw new Error("Clipboard copy was rejected.");
  }
}

function createGroupId(title) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "home-assistant-card";
  let candidate = `group-${slug}`;
  let counter = 2;
  while (panelGroups.some(group => group.id === candidate)) {
    candidate = `group-${slug}-${counter}`;
    counter += 1;
  }
  return candidate;
}

function renderEntityList() {
  entityList.replaceChildren();
  reconcileStackEntitySelection();
  const entityIds = trackedEntityIds();
  if (entityIds.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.className = "empty-selection-state";
    emptyState.textContent = emptyEntitySelectionMessage;
    entityList.append(emptyState);
    groupSummary.textContent = emptyEntitySelectionMessage;
    groupIssues.textContent = "";
    selectedEntity.textContent = emptyEntitySelectionMessage;
    renderStackSelectionSummary();
    renderHaCardPreview();
    renderEmptyStatusPreview();
    return;
  }

  let ready = 0;
  let pending = 0;
  let blocked = 0;
  const blockedEntities = [];
  for (const entityId of entityIds) {
    const entity = entitySnapshots.get(entityId);
    const card = document.createElement("article");
    const name = document.createElement("strong");
    const value = document.createElement("span");
    const detail = document.createElement("small");
    const controls = document.createElement("div");
    card.className = "atlas-entity-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", t("aria.showStatusPreview", { entityId }));
    const presentation = entity ? createHomeAssistantEntityPresentation(entity) : undefined;
    card.dataset.category = presentation?.category ?? "status";
    if (presentation?.category === "battery" && entity?.value) {
      const batteryPercent = Number(entity.value);
      card.dataset.batteryLevel = batteryPercent <= 20 ? "low" : batteryPercent <= 50 ? "medium" : "normal";
    }
    name.textContent = presentation?.label ?? entityId;
    value.textContent = entity?.value && presentation?.category === "battery" && !entity.unit
      ? `${entity.value}%`
      : entity?.value ?? entity?.state ?? t("text.waiting");
    detail.textContent = entity?.updatedAt
      ? `${presentation?.detail ?? entityId.split(".", 1)[0]} · ${formatRelativeTime(entity.updatedAt)}`
      : presentation?.detail ?? entityId.split(".", 1)[0];
    if (entity?.state === "on" || entity?.state === "available") ready += 1;
    else if (entity?.state === "off") pending += 1;
    else if (entity) {
      blocked += 1;
      blockedEntities.push(presentation?.label ?? entityId);
    }
    card.addEventListener("click", () => handleEntityCardSelection(entityId));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleEntityCardSelection(entityId);
      }
    });
    controls.className = "atlas-entity-card-actions";
    card.append(name, value, detail);
    const position = entityIds.indexOf(entityId);
    if (entityId === currentEntityId()) {
      card.dataset.primary = "true";
    }
    if (usesStackEntitySelection() && stackSelectedEntityIds.has(entityId)) {
      card.dataset.stackSelected = "true";
    }
    const moveUp = document.createElement("button");
    const moveDown = document.createElement("button");
    const remove = document.createElement("button");
    const stackToggle = document.createElement("input");
    moveUp.type = "button";
    moveDown.type = "button";
    remove.type = "button";
    stackToggle.type = "checkbox";
    moveUp.className = "icon-button";
    moveDown.className = "icon-button";
    moveUp.textContent = "↑";
    moveDown.textContent = "↓";
    moveUp.title = t("aria.moveEntityUp", { entityId });
    moveDown.title = t("aria.moveEntityDown", { entityId });
    moveUp.setAttribute("aria-label", t("aria.moveEntityUp", { entityId }));
    moveDown.setAttribute("aria-label", t("aria.moveEntityDown", { entityId }));
    remove.className = "icon-button";
    remove.textContent = "🗑";
    remove.title = t("aria.removeEntity", { entityId });
    remove.setAttribute("aria-label", t("aria.removeEntity", { entityId }));
    stackToggle.className = "stack-checkbox";
    stackToggle.checked = stackSelectedEntityIds.has(entityId);
    stackToggle.title = t("aria.useEntityInStack", { entityId });
    stackToggle.setAttribute("aria-label", t("aria.useEntityInStack", { entityId }));
    stackToggle.addEventListener("click", event => event.stopPropagation());
    stackToggle.addEventListener("change", event => {
      event.stopPropagation();
      setStackEntitySelected(entityId, stackToggle.checked);
    });
    moveUp.addEventListener("click", event => {
      event.stopPropagation();
      moveEntity(entityId, -1);
    });
    moveDown.addEventListener("click", event => {
      event.stopPropagation();
      moveEntity(entityId, 1);
    });
    remove.addEventListener("click", event => {
      event.stopPropagation();
      removeEntity(entityId);
    });
    if (usesStackEntitySelection()) controls.append(stackToggle);
    if (position > 0) controls.append(moveUp);
    if (position < entityIds.length - 1) controls.append(moveDown);
    controls.append(remove);
    if (entity && activeTransport !== transport && (entityId.startsWith("light.") || entityId.startsWith("switch."))) {
      const action = document.createElement("button");
      const service = entity.state === "on" ? "turn_off" : "turn_on";
      action.type = "button";
      action.textContent = service === "turn_on" ? t("button.turnOn") : t("button.turnOff");
      action.addEventListener("click", event => {
        event.stopPropagation();
        requestEntityService(entityId, service);
      });
      controls.append(action);
    }
    card.append(controls);
    entityList.append(card);
  }
  groupSummary.textContent = t("message.groupStatus", { ready, pending, blocked });
  groupIssues.textContent = blockedEntities.length ? t("message.needsAttention", { entities: blockedEntities.join(", ") }) : "";
  renderStackSelectionSummary();
  renderHaCardPreview();
}

function moveEntity(entityId, direction) {
  const entityIds = trackedEntityIds();
  const index = entityIds.indexOf(entityId);
  const destination = index + direction;
  if (destination < 0 || destination >= entityIds.length) return;
  [entityIds[index], entityIds[destination]] = [entityIds[destination], entityIds[index]];
  homeAssistantEntity.value = entityIds.join(", ");
  homeAssistantEntity.dispatchEvent(new Event("input"));
}

function selectPrimaryEntity(entityId) {
  const entityIds = trackedEntityIds();
  homeAssistantEntity.value = [entityId, ...entityIds.filter(candidate => candidate !== entityId)].join(", ");
  statusPreviewEntityId = entityId;
  stackSelectedEntityIds.add(entityId);
  homeAssistantEntity.dispatchEvent(new Event("input"));
  statusMessage.textContent = t("message.selectedForHaPreview", { entityId });
}

function handleEntityCardSelection(entityId) {
  if (usesStackEntitySelection()) {
    selectStatusPreviewEntity(entityId);
    return;
  }
  if (activeEditorMode === "expert") {
    applyEntityToSelectedExpertField(entityId);
    return;
  }

  selectPrimaryEntity(entityId);
}

function selectStatusPreviewEntity(entityId) {
  statusPreviewEntityId = entityId;
  bindSelectedEntity(activeTransport ?? transport);
  if (activeTransport === transport) {
    void renderEntityState("on");
  }
  statusMessage.textContent = t("message.selectedForDiagnosticsPreview", { entityId });
}

function addEntityForStatusPreview(entityId) {
  const entityIds = trackedEntityIds();
  if (!entityIds.includes(entityId)) {
    homeAssistantEntity.value = [...entityIds, entityId].join(", ");
  }
  statusPreviewEntityId = entityId;
  homeAssistantEntity.dispatchEvent(new Event("input"));
  statusMessage.textContent = t("message.selectedForDiagnosticsWithStack", { entityId });
}

function setStackEntitySelected(entityId, selected) {
  if (selected) {
    stackSelectedEntityIds.add(entityId);
  } else {
    stackSelectedEntityIds.delete(entityId);
  }
  if (stackSelectedEntityIds.size === 0) {
    stackSelectedEntityIds.add(entityId);
    statusMessage.textContent = t("message.stackNeedsEntity", { entityId });
  } else {
    statusMessage.textContent = selected
      ? t("message.addedToStackPreview", { entityId })
      : t("message.removedFromStackPreview", { entityId });
  }
  persistConfiguration();
  renderEntityList();
}

function removeEntity(entityId) {
  const entityIds = trackedEntityIds().filter(candidate => candidate !== entityId);
  stackSelectedEntityIds.delete(entityId);
  if (statusPreviewEntityId === entityId) {
    statusPreviewEntityId = entityIds[0];
  }
  homeAssistantEntity.value = entityIds.join(", ");
  homeAssistantEntity.dispatchEvent(new Event("input"));
  statusMessage.textContent = entityIds.length
    ? t("message.entityRemoved", { entityId })
    : emptyEntitySelectionMessage;
}

function formatRelativeTime(timestamp) {
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));
  if (seconds < 60) return t("message.justNow");
  if (seconds < 3600) return t("message.minutesAgo", { count: Math.floor(seconds / 60) });
  return t("message.hoursAgo", { count: Math.floor(seconds / 3600) });
}

function requestEntityService(entityId, service) {
  const command = createHomeAssistantServiceCommand(entityId, service);
  if (!command || !window.confirm(t("message.sendServiceConfirm", { service, entityId }))) {
    return;
  }

  const result = connection?.getClient()?.callService(command);
  statusMessage.textContent = result?.accepted
    ? t("message.commandSent", { entityId })
    : result?.reason ?? t("message.noActiveConnection");
}

function bindSelectedEntity(nextTransport) {
  if (!registeredPanel || !nextTransport) {
    return;
  }

  panelBinding?.dispose();
  removeEntityListListener?.();
  removeServiceResultListener?.();
  removeEntityStateListListener?.();
  removeLovelaceResourceListener?.();
  removeEntityListListener = undefined;
  removeServiceResultListener = undefined;
  removeEntityStateListListener = undefined;
  removeLovelaceResourceListener = undefined;
  lovelaceResources = [];
  lovelaceResourcesChecked = false;
  renderExpertTemplatePalette();
  activeTransport = nextTransport;
  entitySnapshots.clear();
  if (trackedEntityIds().length === 0) {
    renderEmptyStatusPreview();
    selectedEntity.textContent = emptyEntitySelectionMessage;
    statusMessage.textContent = emptyEntitySelectionMessage;
    renderEntityPickerOptions();
    renderEntityList();
    return;
  }

  panelBinding = bindHomeAssistantEntityStatusPanel({
    transport: activeTransport,
    panel: registeredPanel,
    entityId: currentEntityId(),
    element: statusRoot,
    tokens,
  });
  removeEntityListListener = activeTransport.subscribe(entity => {
    if (!trackedEntityIds().includes(entity.entityId)) {
      return;
    }

    entitySnapshots.set(entity.entityId, { ...entity, updatedAt: Date.now() });
    knownEntityIds.add(entity.entityId);
    renderEntityPickerOptions();
    renderEntityList();
  });
  const usingLiveTransport = activeTransport !== transport;
  if (usingLiveTransport) {
    removeServiceResultListener = connection?.getClient()?.subscribeServiceResult(result => {
      statusMessage.textContent = result.success
        ? t("message.commandCompleted", { entityId: result.command.entityId })
        : t("message.commandFailed", {
          entityId: result.command.entityId,
          reason: result.reason ?? t("message.unknownError"),
        });
    });
    removeEntityStateListListener = connection?.getClient()?.subscribeEntityStateList(result => {
      for (const entity of result.entities) {
        knownEntityIds.add(entity.entityId);
      }
      renderEntityPickerOptions();
      statusMessage.textContent = result.success
        ? t("message.loadedEntities", { count: result.entities.length })
        : t("message.entityListFailed", { reason: result.reason ?? t("message.unknownError") });
    });
    removeLovelaceResourceListener = connection?.getClient()?.subscribeLovelaceResources(result => {
      lovelaceResources = result.resources;
      lovelaceResourcesChecked = result.success;
      const scannedCards = result.success ? refreshScannedExpertPaletteCards() : { total: 0, hacs: 0 };
      renderHaCardPreview();
      renderExpertTemplatePalette();
      statusMessage.textContent = result.success
        ? t("message.loadedResources", {
          count: result.resources.length,
          total: scannedCards.total,
          hacs: scannedCards.hacs,
        })
        : t("message.lovelaceFailed", { reason: result.reason ?? t("message.unknownError") });
    });
    refreshLiveEntityStates();
  }
  for (const button of buttons) {
    button.disabled = usingLiveTransport;
  }
  selectedEntity.textContent = usingLiveTransport
    ? t("message.liveEntity", { entityId: currentEntityId() })
    : t("message.demoEntityTarget", { entityId: currentEntityId() });
  statusMessage.textContent = usingLiveTransport
    ? t("message.waitingForUpdates", { entityId: currentEntityId() })
    : t("message.demoControlsTarget", { entityId: currentEntityId() });
  renderEntityPickerOptions();
  renderEntityList();
}

function connectHomeAssistant() {
  const configuration = createHomeAssistantConnectionConfiguration({ url: homeAssistantUrl.value });
  const readiness = inspectHomeAssistantConnectionReadiness(configuration);
  if (!readiness.ready) {
    renderConnectionLifecycle({ state: "failed", reason: readiness.reason });
    return;
  }

  if (!homeAssistantToken.value) {
    renderConnectionLifecycle({ state: "failed", reason: t("message.tokenRequired") });
    return;
  }

  removeLifecycleListener?.();
  clearTimeout(reconnectTimer);
  reconnectTimer = undefined;
  reconnectAttempts = 0;
  connection?.disconnect();
  connection = createHomeAssistantRuntimeConnection(configuration, createBrowserHomeAssistantWebSocket);
  removeLifecycleListener = connection.subscribeLifecycle(renderConnectionLifecycle);
  reconnectToken = homeAssistantToken.value;
  connection.connect(reconnectToken);
  if (!rememberHomeAssistantToken.checked) {
    homeAssistantToken.value = "";
  }
  persistConfiguration();
}

function disconnectHomeAssistant() {
  reconnectToken = undefined;
  reconnectAttempts = 0;
  clearTimeout(reconnectTimer);
  reconnectTimer = undefined;
  connection?.disconnect();
}

applyTranslations();

const registeredPanel = findHomeAssistantStatusPanel(panelRegistry, panel.id);
if (!registeredPanel) {
  statusMessage.textContent = t("message.statusPanelNotRegistered");
} else {
  bindSelectedEntity(transport);
  transport.subscribe(entity => {
    if (entity.entityId !== currentEntityId()) {
      return;
    }

    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.entityState === entity.state));
    }
    statusMessage.textContent = t("message.entityStateUpdated", { state: entity.state });
  });
}

for (const button of buttons) {
  button.addEventListener("click", () => {
    void renderEntityState(button.dataset.entityState);
  });
}

for (const button of languageButtons) {
  button.addEventListener("click", () => {
    setLanguage(button.dataset.language);
  });
}

homeAssistantUrl.addEventListener("input", () => {
  renderConnectionReadiness();
  persistConfiguration();
});
homeAssistantToken.addEventListener("input", () => {
  if (rememberHomeAssistantToken.checked) {
    persistConfiguration();
  }
});
rememberHomeAssistantToken.addEventListener("change", () => {
  persistConfiguration();
});
homeAssistantEntity.addEventListener("input", () => {
  persistConfiguration();
  renderEntityPickerOptions();
  bindSelectedEntity(activeTransport ?? transport);
  if (activeTransport === transport) {
    void renderEntityState("on");
  }
  renderHaCardPreview();
});
homeAssistantEntityDomain.addEventListener("change", () => {
  persistConfiguration();
  renderEntityPickerOptions();
});
homeAssistantEntityDomainShortcuts.addEventListener("click", event => {
  const button = event.target.closest("[data-entity-domain]");
  if (!button) return;
  homeAssistantEntityDomain.value = button.dataset.entityDomain;
  persistConfiguration();
  renderEntityPickerOptions();
});
homeAssistantEntitySearch.addEventListener("input", () => {
  persistConfiguration();
  renderEntityPickerOptions();
});
clearHomeAssistantEntitySearch.addEventListener("click", () => {
  homeAssistantEntitySearch.value = "";
  persistConfiguration();
  renderEntityPickerOptions();
  homeAssistantEntitySearch.focus();
});
addHomeAssistantEntity.addEventListener("click", addSelectedEntityFromPicker);
homeAssistantEntityPicker.addEventListener("change", addSelectedEntityFromPicker);
refreshHomeAssistantEntities.addEventListener("click", refreshLiveEntityStates);
checkHaCardResources.addEventListener("click", () => checkLiveLovelaceResources());
homeAssistantGroup.addEventListener("change", () => {
  const group = panelGroups.find(candidate => candidate.id === homeAssistantGroup.value);
  if (group) {
    homeAssistantEntity.value = group.entityIds.join(", ");
    homeAssistantGroupName.value = group.title;
  }
  homeAssistantEntity.dispatchEvent(new Event("input"));
});
homeAssistantGroupName.addEventListener("input", renderHaCardPreview);
expertCardName.addEventListener("input", () => {
  persistConfiguration();
  renderExpertEditorPreview();
});
diagnosticsPanel.addEventListener("toggle", persistConfiguration);
haCardTarget.addEventListener("change", () => {
  syncCardLayoutState();
  persistConfiguration();
  renderEntityList();
});
haCardLayout.addEventListener("change", () => {
  persistConfiguration();
  renderEntityList();
});
haCardFormat.addEventListener("change", () => {
  persistConfiguration();
  renderHaCardPreview();
  renderExpertEditorPreview();
});
haCardScriptFilename.addEventListener("input", () => {
  persistConfiguration();
  statusMessage.textContent = t("message.scriptFilenameNormalized", { scriptFilename: currentHaCardScriptFilename() });
});
for (const button of editorModeButtons) {
  button.addEventListener("click", () => {
    renderEditorMode(button.dataset.editorMode);
    persistConfiguration();
  });
}
expertTemplate.addEventListener("change", () => {
  selectExpertTemplate(expertTemplate.value);
});
expertTarget.addEventListener("change", updateSelectedExpertFieldTarget);
expertBubbleButtonType.addEventListener("change", updateSelectedExpertFieldBubbleType);
for (const control of [expertColumn, expertRow, expertWidth, expertHeight]) {
  control.addEventListener("change", updateSelectedExpertFieldGeometry);
}
applyExpertTitle.addEventListener("click", () => {
  updateSelectedExpertFieldTitle(expertTitle.value);
});
useEntityNameAsTitle.addEventListener("click", () => {
  const title = currentExpertEntityTitle();
  expertTitle.value = title;
  updateSelectedExpertFieldTitle(title);
  statusMessage.textContent = t("message.titleCopied", { title });
});
addExpertField.addEventListener("click", addExpertEditorField);
editExpertField.addEventListener("click", toggleExpertFieldEditing);
arrangeExpertFields.addEventListener("click", arrangeExpertEditorFields);
resetExpertSurfaceSize.addEventListener("click", resetExpertEditorSurfaceSize);
saveExpertPaletteFavorites.addEventListener("click", saveExpertPaletteFavoriteSelection);
showAllExpertPaletteCards.addEventListener("click", toggleExpertPaletteAllCards);
scanExpertPaletteCards.addEventListener("click", scanExpertPaletteCardsFromHomeAssistant);
resetExpertTemplateSizing.addEventListener("click", resetExpertTemplateSizingSelection);
resetExpertPaletteFavorites.addEventListener("click", resetExpertPaletteFavoriteSelection);
window.addEventListener("resize", applyExpertEditorSurfaceSize);
clearExpertFields.addEventListener("click", () => {
  expertEditorFields.length = 0;
  selectedExpertFieldIndex = -1;
  expertFieldEditing = false;
  expertTitle.value = "";
  persistConfiguration();
  renderExpertEditorPreview();
  statusMessage.textContent = t("message.expertPreviewCleared");
});
expertEditorDropzone.addEventListener("dragover", event => {
  event.preventDefault();
  expertEditorDropzone.classList.add("drag-over");
});
expertEditorDropzone.addEventListener("dragleave", event => {
  if (!(event.relatedTarget instanceof Node) || !expertEditorDropzone.contains(event.relatedTarget)) {
    expertEditorDropzone.classList.remove("drag-over");
  }
});
expertEditorDropzone.addEventListener("drop", event => {
  event.preventDefault();
  expertEditorDropzone.classList.remove("drag-over");
  const fieldIndex = event.dataTransfer?.getData("application/x-atlas-field-index");
  if (fieldIndex) {
    moveExpertEditorField(Number(fieldIndex), calculateExpertDropPlacement(event));
    expertDragFieldOffset = { column: 0, row: 0 };
    return;
  }
  const paletteCardId = event.dataTransfer?.getData("application/x-atlas-palette-card");
  if (paletteCardId) {
    addExpertEditorFieldFromPaletteCard(paletteCardId, calculateExpertDropPlacement(event));
    return;
  }
  const templateId = event.dataTransfer?.getData("application/x-atlas-template")
    || event.dataTransfer?.getData("text/plain")
    || expertTemplate.value;
  addExpertEditorFieldFromTemplate(templateId, calculateExpertDropPlacement(event));
});
saveHomeAssistantGroup.addEventListener("click", () => {
  const title = homeAssistantGroupName.value.trim();
  const entityIds = trackedEntityIds();
  if (!title || entityIds.length === 0) {
    statusMessage.textContent = t("message.groupRequiresNameAndEntity");
    return;
  }
  const id = `group-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  panelGroups = [...panelGroups.filter(group => group.id !== id), createHomeAssistantPanelGroup({ id, title, entityIds })];
  renderGroupOptions(id);
  persistConfiguration();
  statusMessage.textContent = t("message.groupSaved", { title });
});
deleteHomeAssistantGroup.addEventListener("click", () => {
  const id = homeAssistantGroup.value;
  if (!id.startsWith("group-")) {
    statusMessage.textContent = t("message.builtInGroupsCannotDelete");
    return;
  }
  panelGroups = panelGroups.filter(group => group.id !== id);
  renderGroupOptions("custom");
  persistConfiguration();
  statusMessage.textContent = t("message.groupDeleted");
});
duplicateHomeAssistantGroup.addEventListener("click", () => {
  const source = panelGroups.find(group => group.id === homeAssistantGroup.value);
  if (!source) {
    statusMessage.textContent = t("message.selectGroupToDuplicate");
    return;
  }
  const title = `${source.title} copy`;
  const id = `group-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
  panelGroups = [...panelGroups, createHomeAssistantPanelGroup({ id, title, entityIds: source.entityIds })];
  homeAssistantGroupName.value = title;
  renderGroupOptions(id);
  persistConfiguration();
  statusMessage.textContent = t("message.groupCreated", { title });
});
exportHomeAssistantConfig.addEventListener("click", () => {
  const payload = JSON.stringify({
    version: 1,
    name: homeAssistantGroup.value === "custom" ? "ATLAS custom panel" : homeAssistantGroup.value,
    createdAt: new Date().toISOString(),
    url: homeAssistantUrl.value,
    entities: homeAssistantEntity.value,
    entityDomain: homeAssistantEntityDomain.value,
    entitySearch: homeAssistantEntitySearch.value,
    selectedGroup: homeAssistantGroup.value,
    cardTarget: haCardTarget.value,
    cardLayout: haCardLayout.value,
    cardFormat: haCardFormat.value,
    cardScriptFilename: haCardScriptFilename.value,
    stackEntityIds: selectedStackEntityIds(),
    expertPaletteFavoriteIds: [...expertPaletteFavoriteIds],
    expertTemplateSizing: serializedExpertTemplateSizing(),
    expertEditorSurfaceSize,
    expertEditorFields,
    selectedExpertFieldIndex,
    expertCardName: expertCardName.value,
    diagnosticsOpen: diagnosticsPanel.open,
    editorMode: activeEditorMode,
    groups: panelGroups,
  }, null, 2);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
  const exportName = homeAssistantGroup.value === "custom" ? "atlas-custom-panel" : `atlas-${homeAssistantGroup.value}-panel`;
  link.download = `${exportName.replace(/[^a-z0-9-]+/gi, "-")}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
});
exportHaCardConfig.addEventListener("click", () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const link = document.createElement("a");
  const payload = createHaCardExportPayload();
  link.href = URL.createObjectURL(new Blob([payload.content], { type: payload.manifest.mimeType }));
  link.download = payload.manifest.filename;
  link.click();
  URL.revokeObjectURL(link.href);
});
exportHaCardPackage.addEventListener("click", () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const cardPackage = createHaCardExportPackage();
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([JSON.stringify(cardPackage, null, 2)], { type: "application/json" }));
  link.download = `${cardPackage.editorPlan?.scriptFilename?.replace(/\.js$/i, "") ?? cardPackage.manifest.filename.replace(/\.(json|yaml)$/i, "")}.atlas-card.json`;
  link.click();
  URL.revokeObjectURL(link.href);
  statusMessage.textContent = t("message.packageExported", {
    scriptFilename: cardPackage.editorPlan?.scriptFilename ?? currentHaCardScriptFilename(),
  });
});
exportHaCardScript.addEventListener("click", () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const scriptExport = createHomeAssistantCardEditorScriptExport(createActiveCardEditorPlan());
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([scriptExport.source], { type: "text/javascript" }));
  link.download = scriptExport.filename;
  link.click();
  URL.revokeObjectURL(link.href);
  statusMessage.textContent = t("message.scriptExported", { scriptFilename: scriptExport.filename });
});
exportHaCardBundle.addEventListener("click", () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const bundle = createHomeAssistantCardEditorHacsBundle(createHaCardExportPackage());
  const archive = createHomeAssistantCardEditorHacsBundleArchive(bundle);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([archive.content], { type: archive.mimeType }));
  link.download = archive.filename;
  link.click();
  URL.revokeObjectURL(link.href);
  statusMessage.textContent = t("message.bundleExported", {
    count: String(bundle.files.length),
    filename: archive.filename,
  });
});
copyHaCardConfig.addEventListener("click", async () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  try {
    const payload = createHaCardExportPayload();
    await writeClipboardText(payload.content);
    statusMessage.textContent = t("message.haCardCopied", { format: haCardFormat.value.toUpperCase() });
  } catch {
    statusMessage.textContent = t("message.copyPreviewFailed");
  }
});
copyHaCardResources.addEventListener("click", async () => {
  if (!canExportHaCard()) {
    statusMessage.textContent = emptyEntitySelectionMessage;
    return;
  }

  const card = createActiveHaCardConfig();
  const dependency = inspectHomeAssistantCardDependency(card);

  try {
    await writeClipboardText(serializeHomeAssistantAtlasFrontendResourceReferences({
      mode: "server",
      card,
      resources: lovelaceResources,
    }, haCardFormat.value));
    statusMessage.textContent = dependency.required
      ? t("message.resourcesCopiedWithDependency", {
        dependency: dependency.label,
        format: haCardFormat.value.toUpperCase(),
      })
      : t("message.atlasResourceCopied", { format: haCardFormat.value.toUpperCase() });
  } catch {
    statusMessage.textContent = t("message.copyDependencyFailed");
  }
});
importHomeAssistantConfig.addEventListener("change", async () => {
  const file = importHomeAssistantConfig.files?.[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    if (imported.version !== 1 || typeof imported.url !== "string" || typeof imported.entities !== "string" || !Array.isArray(imported.groups)) throw new Error();
    pendingImport = imported;
    const importedName = typeof imported.name === "string" ? imported.name : t("message.unnamedConfiguration");
    if (!window.confirm(t("message.importConfigurationConfirm", {
      name: importedName,
      groups: imported.groups.length,
      entities: imported.entities.split(",").filter(Boolean).length,
    }))) return;
    homeAssistantUrl.value = pendingImport.url;
    homeAssistantEntity.value = pendingImport.entities;
    if (typeof pendingImport.entityDomain === "string") {
      homeAssistantEntityDomain.value = pendingImport.entityDomain;
    }
    if (typeof pendingImport.entitySearch === "string") {
      homeAssistantEntitySearch.value = pendingImport.entitySearch;
    }
    panelGroups = pendingImport.groups.map(createHomeAssistantPanelGroup);
    if (typeof pendingImport.cardTarget === "string" && cardTargets.some(descriptor => descriptor.target === pendingImport.cardTarget)) {
      haCardTarget.value = pendingImport.cardTarget;
    }
    if (pendingImport.cardLayout === "single" || pendingImport.cardLayout === "horizontal-stack" || pendingImport.cardLayout === "vertical-stack") {
      haCardLayout.value = pendingImport.cardLayout;
    }
    if (pendingImport.cardFormat === "json" || pendingImport.cardFormat === "yaml") {
      haCardFormat.value = pendingImport.cardFormat;
    }
    if (typeof pendingImport.cardScriptFilename === "string") {
      haCardScriptFilename.value = pendingImport.cardScriptFilename;
    }
    if (pendingImport.expertEditorSurfaceSize && typeof pendingImport.expertEditorSurfaceSize === "object") {
      expertEditorSurfaceSize = {
        columns: clampExpertEditorSurfaceDelta(pendingImport.expertEditorSurfaceSize.columns),
        rows: clampExpertEditorSurfaceDelta(pendingImport.expertEditorSurfaceSize.rows),
      };
    } else {
      expertEditorSurfaceSize = { columns: 0, rows: 0 };
    }
    resetExpertTemplateSizingDefaults();
    if (Array.isArray(pendingImport.expertTemplateSizing)) {
      for (const entry of pendingImport.expertTemplateSizing) {
        if (typeof entry?.templateId === "string" && cardEditorTemplates.some(template => template.id === entry.templateId)) {
          expertTemplateSizing.set(entry.templateId, normalizeExpertTemplateSizing(entry));
        }
      }
    }
    expertEditorFields.length = 0;
    if (Array.isArray(pendingImport.expertEditorFields)) {
      expertEditorFields.push(...createHomeAssistantCardEditorPackagePlan({
        editorMode: "expert",
        fields: pendingImport.expertEditorFields,
      }).fields);
    }
    selectedExpertFieldIndex = Number.isInteger(pendingImport.selectedExpertFieldIndex)
      ? Math.max(-1, Math.min(expertEditorFields.length - 1, pendingImport.selectedExpertFieldIndex))
      : -1;
    expertCardName.value = typeof pendingImport.expertCardName === "string" ? pendingImport.expertCardName : "";
    diagnosticsPanel.open = pendingImport.diagnosticsOpen === true;
    expertFieldEditing = false;
    stackSelectedEntityIds.clear();
    if (Array.isArray(pendingImport.stackEntityIds)) {
      for (const entityId of pendingImport.stackEntityIds) {
        if (typeof entityId === "string" && entityId.trim()) {
          stackSelectedEntityIds.add(entityId.trim());
        }
      }
    }
    syncCardLayoutState();
    renderGroupOptions(typeof pendingImport.selectedGroup === "string" ? pendingImport.selectedGroup : "custom");
    renderEditorMode(pendingImport.editorMode === "expert" ? "expert" : "simple");
    syncExpertInputsFromTemplateSizing(expertTemplate.value);
    renderExpertTemplatePalette();
    persistConfiguration();
    homeAssistantEntity.dispatchEvent(new Event("input"));
    renderConnectionReadiness();
    statusMessage.textContent = t("message.configurationImported", {
      groups: panelGroups.length,
      entities: trackedEntityIds().length,
    });
  } catch {
    statusMessage.textContent = t("message.importConfigurationFailed");
  } finally {
    importHomeAssistantConfig.value = "";
  }
});
importHaCardConfig.addEventListener("change", async () => {
  const file = importHaCardConfig.files?.[0];
  if (!file) return;
  try {
    const text = await file.text();
    const decision = renderHaCardImportDecision(text);
    if (decision.action !== "import") {
      statusMessage.textContent = decision.action === "review"
        ? t("message.importPaused")
        : t("message.importRejected");
      return;
    }

    const summary = summarizeHomeAssistantCardImport(text);
    const entityIds = [...summary.entityIds];
    const title = summary.title;
    const id = createGroupId(title);
    panelGroups = [...panelGroups, createHomeAssistantPanelGroup({ id, title, entityIds })];
    homeAssistantEntity.value = entityIds.join(", ");
    homeAssistantGroupName.value = title;
    stackSelectedEntityIds.clear();
    for (const entityId of entityIds) {
      stackSelectedEntityIds.add(entityId);
    }
    haCardTarget.value = summary.target;
    haCardLayout.value = summary.layout;
    haCardFormat.value = summary.format;
    if (summary.editorPlan?.scriptFilename || summary.script?.filename) {
      haCardScriptFilename.value = summary.editorPlan?.scriptFilename ?? summary.script.filename;
    }
    syncCardLayoutState();
    renderGroupOptions(id);
    if (summary.editorPlan?.editorMode === "expert") {
      expertEditorFields.splice(0, expertEditorFields.length, ...createHomeAssistantCardEditorPackagePlan(summary.editorPlan).fields);
      selectedExpertFieldIndex = expertEditorFields.length ? 0 : -1;
      expertCardName.value = summary.editorPlan.cardName;
      haCardScriptFilename.value = summary.editorPlan.scriptFilename ?? summary.script?.filename ?? "";
      expertFieldEditing = false;
      renderEditorMode("expert");
    } else {
      expertEditorFields.length = 0;
      selectedExpertFieldIndex = -1;
      expertCardName.value = "";
      expertFieldEditing = false;
      renderEditorMode("simple");
    }
    persistConfiguration();
    homeAssistantEntity.dispatchEvent(new Event("input"));
    statusMessage.textContent = t("message.haCardImported", {
      type: summary.packaged ? t("message.atlasPackage") : t("message.haCard"),
      format: summary.format.toUpperCase(),
      title,
      entities: entityIds.length,
    });
  } catch {
    statusMessage.textContent = t("message.importHaCardFailed");
  } finally {
    importHaCardConfig.value = "";
  }
});
connectButton.addEventListener("click", connectHomeAssistant);
disconnectButton.addEventListener("click", disconnectHomeAssistant);

void renderEntityState("on");
renderCardTargetOptions(initialCardTarget);
renderExpertEditorOptions();
renderExpertTemplatePalette();
syncCardLayoutState();
renderGroupOptions(initialGroupSelection);
renderEntityPickerOptions();
renderConnectionReadiness();
renderEditorMode(initialEditorMode);

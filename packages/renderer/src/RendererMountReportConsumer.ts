import type { RendererMountReportConsumption } from "./RendererMountReporting";

export const RendererMountReportConsumerDiagnosticCodes = {
  NotConsumed: "renderer.mount.report.consumer.not_consumed",
  ConsumerFailed: "renderer.mount.report.consumer.failed",
} as const;

export const RendererMountReportConsumerDiagnosticPolicyCodes = {
  ConsumerDiagnosticsFailed: "renderer.mount.report.consumer.diagnostics.policy.consumer_failed",
  IssueLimitExceeded: "renderer.mount.report.consumer.diagnostics.policy.issue_limit_exceeded",
} as const;

export type RendererMountReportConsumerDiagnosticReport = Readonly<{
  context: Readonly<{
    component: string;
    consumerName: string;
  }>;
  result: Readonly<{
    ok: boolean;
    issues: readonly Readonly<{
      code: string;
      message: string;
      severity: "error";
    }>[];
  }>;
}>;

export type RendererMountReportConsumerDiagnosticAggregation = Readonly<{
  context: Readonly<{
    component: string;
    consumerNames: readonly string[];
  }>;
  result: Readonly<{
    ok: boolean;
    reports: readonly RendererMountReportConsumerDiagnosticReport[];
    issues: readonly RendererMountReportConsumerDiagnosticReport["result"]["issues"][number][];
  }>;
}>;

export type RendererMountReportConsumerDiagnosticAggregationSummary = Readonly<{
  ok: boolean;
  consumerCount: number;
  okConsumerCount: number;
  failedConsumerCount: number;
  issueCount: number;
}>;

export type RendererMountReportConsumerDiagnosticPolicy = Readonly<{
  requireAllConsumersOk?: boolean;
  maxIssueCount?: number;
}>;

export type RendererMountReportConsumerDiagnosticPolicyEvaluation = Readonly<{
  context: Readonly<{
    component: string;
  }>;
  result: Readonly<{
    ok: boolean;
    summary: RendererMountReportConsumerDiagnosticAggregationSummary;
    issues: readonly Readonly<{
      code: string;
      message: string;
      severity: "error";
    }>[];
  }>;
}>;

export type RendererMountReportConsumerDiagnosticExecution = Readonly<{
  consumerName: string;
  result: RendererMountReportConsumerResult;
  diagnostic: RendererMountReportConsumerDiagnosticReport;
}>;

export type RendererMountReportConsumerDiagnosticBatchExecution = Readonly<{
  executions: readonly RendererMountReportConsumerDiagnosticExecution[];
  aggregation: RendererMountReportConsumerDiagnosticAggregation;
  summary: RendererMountReportConsumerDiagnosticAggregationSummary;
  policyEvaluation?: RendererMountReportConsumerDiagnosticPolicyEvaluation;
}>;

export type RendererMountReportConsumerDiagnosticRegistryExecution = Readonly<{
  registry: RendererMountReportConsumerRegistry;
  batch: RendererMountReportConsumerDiagnosticBatchExecution;
}>;

export type RendererMountReportConsumerDiagnosticRegistryExecutionClosure = Readonly<{
  context: Readonly<{
    component: string;
  }>;
  result: Readonly<{
    ok: boolean;
    registryConsumerCount: number;
    executedConsumerCount: number;
    conflictCount: number;
    diagnosticsOk: boolean;
    policyOk?: boolean;
    issues: readonly Readonly<{
      code: string;
      message: string;
      severity: "error";
    }>[];
  }>;
}>;

export type RendererMountReportConsumerDiagnosticDelivery = Readonly<{
  kind: "renderer.mount.report.consumer.diagnostics.delivery";
  name: string;
  ready: boolean;
  issueCount: number;
  closure: RendererMountReportConsumerDiagnosticRegistryExecutionClosure;
}>;

export type RendererMountReportConsumerDiagnosticDeliveryManifest = Readonly<{
  kind: "renderer.mount.report.consumer.diagnostics.delivery.manifest";
  name: string;
  deliveries: readonly RendererMountReportConsumerDiagnosticDelivery[];
  readyCount: number;
  blockedCount: number;
  issueCount: number;
}>;

export type RendererMountReportConsumerDiagnosticDeliveryManifestClosure = Readonly<{
  context: Readonly<{
    component: string;
    manifestName: string;
  }>;
  result: Readonly<{
    ok: boolean;
    deliveryCount: number;
    readyCount: number;
    blockedCount: number;
    issueCount: number;
    issues: readonly RendererMountReportConsumerDiagnosticRegistryExecutionClosure["result"]["issues"][number][];
  }>;
}>;

export type RendererMountReportConsumerDiagnosticDeliveryBundle = Readonly<{
  kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle";
  name: string;
  ready: boolean;
  manifestCount: number;
  issueCount: number;
  closures: readonly RendererMountReportConsumerDiagnosticDeliveryManifestClosure[];
}>;

export type RendererMountReportConsumerDiagnosticDeliveryBundleSnapshot = Readonly<{
  kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle.snapshot";
  bundleName: string;
  ready: boolean;
  manifestCount: number;
  issueCount: number;
  manifestNames: readonly string[];
}>;

export type RendererMountReportConsumerDiagnosticDeliverySnapshotCatalog = Readonly<{
  kind: "renderer.mount.report.consumer.diagnostics.delivery.snapshot.catalog";
  name: string;
  snapshots: readonly RendererMountReportConsumerDiagnosticDeliveryBundleSnapshot[];
  readyCount: number;
  blockedCount: number;
  issueCount: number;
}>;

export type RendererMountReportConsumerDiagnosticDeliveryExport = Readonly<{
  kind: "renderer.mount.report.consumer.diagnostics.delivery.export";
  name: string;
  ready: boolean;
  snapshotCount: number;
  issueCount: number;
  catalog: RendererMountReportConsumerDiagnosticDeliverySnapshotCatalog;
}>;

export type RendererIntegrationPreparation = Readonly<{
  kind: "renderer.integration.preparation";
  name: string;
  ready: boolean;
  issueCount: number;
  deliveryExport: RendererMountReportConsumerDiagnosticDeliveryExport;
  boundaries: Readonly<{
    transport: false;
    dom: false;
    homeAssistant: false;
    theme: false;
    platform: false;
  }>;
}>;

export type RendererIntegrationReadiness = Readonly<{
  context: Readonly<{
    component: "renderer.integration";
    preparationName: string;
  }>;
  result: Readonly<{
    ready: boolean;
    issueCount: number;
    blockedBoundaries: readonly string[];
    issues: readonly Readonly<{
      code: "renderer.integration.preparation.not_ready";
      message: string;
      severity: "error";
    }>[];
  }>;
}>;

export type RendererMountReportConsumerResult = Readonly<{
  consumerName: string;
  consumed: boolean;
  summary: RendererMountReportConsumption["summary"];
  error?: string;
}>;

export type RendererMountReportConsumerOutput =
  | RendererMountReportConsumerResult
  | Promise<RendererMountReportConsumerResult>;

export type RendererMountReportConsumer = Readonly<{
  name: string;
  consume(
    consumption: RendererMountReportConsumption,
  ): RendererMountReportConsumerOutput;
}>;

export type RendererMountReportConsumerRegistry = Readonly<{
  consumers: readonly RendererMountReportConsumer[];
}>;

export type RendererMountReportConsumerLookupRequest = Readonly<{
  name: string;
}>;

export type RendererMountReportConsumerLookupResult = Readonly<{
  name: string;
  consumer?: RendererMountReportConsumer;
}>;

export type RendererMountReportConsumerSelectionRequest = Readonly<{
  name: string;
  candidates: readonly RendererMountReportConsumer[];
}>;

export type RendererMountReportConsumerSelectionResult = Readonly<{
  name: string;
  consumer?: RendererMountReportConsumer;
}>;

export type RendererMountReportConsumerConflict = Readonly<{
  name: string;
  consumers: readonly RendererMountReportConsumer[];
}>;

export type RendererMountReportConsumerConflictResolution = Readonly<{
  conflict: RendererMountReportConsumerConflict;
  resolved: boolean;
  consumer?: RendererMountReportConsumer;
}>;

export function createRendererMountReportConsumer(
  consumer: RendererMountReportConsumer,
): RendererMountReportConsumer {
  return {
    ...consumer,
  };
}

export function createRendererMountReportConsumerRegistry(
  consumers: readonly RendererMountReportConsumer[],
): RendererMountReportConsumerRegistry {
  return {
    consumers: [...consumers],
  };
}

export function createRendererMountReportConsumerLookupRequest(
  request: RendererMountReportConsumerLookupRequest,
): RendererMountReportConsumerLookupRequest {
  return {
    ...request,
  };
}

export function createRendererMountReportConsumerLookupResult(
  result: RendererMountReportConsumerLookupResult,
): RendererMountReportConsumerLookupResult {
  return {
    ...result,
  };
}

export function createRendererMountReportConsumerSelectionRequest(
  request: RendererMountReportConsumerSelectionRequest,
): RendererMountReportConsumerSelectionRequest {
  return {
    ...request,
    candidates: [...request.candidates],
  };
}

export function createRendererMountReportConsumerSelectionResult(
  result: RendererMountReportConsumerSelectionResult,
): RendererMountReportConsumerSelectionResult {
  return {
    ...result,
  };
}

export function createRendererMountReportConsumerConflict(
  conflict: RendererMountReportConsumerConflict,
): RendererMountReportConsumerConflict {
  return {
    ...conflict,
    consumers: [...conflict.consumers],
  };
}

export function createRendererMountReportConsumerConflictResolution(
  resolution: RendererMountReportConsumerConflictResolution,
): RendererMountReportConsumerConflictResolution {
  return {
    ...resolution,
    conflict: createRendererMountReportConsumerConflict(resolution.conflict),
  };
}

export function findRendererMountReportConsumer(
  registry: RendererMountReportConsumerRegistry,
  request: RendererMountReportConsumerLookupRequest,
): RendererMountReportConsumerLookupResult {
  const consumer = registry.consumers.find(candidate => candidate.name === request.name);

  return createRendererMountReportConsumerLookupResult({
    name: request.name,
    ...(consumer ? { consumer } : {}),
  });
}

export function findRendererMountReportConsumerConflicts(
  registry: RendererMountReportConsumerRegistry,
): readonly RendererMountReportConsumerConflict[] {
  const consumersByName = new Map<string, RendererMountReportConsumer[]>();

  for (const consumer of registry.consumers) {
    const consumers = consumersByName.get(consumer.name) ?? [];
    consumers.push(consumer);
    consumersByName.set(consumer.name, consumers);
  }

  return [...consumersByName.entries()]
    .filter(([, consumers]) => consumers.length > 1)
    .map(([name, consumers]) => createRendererMountReportConsumerConflict({
      name,
      consumers,
    }));
}

export function selectFirstRendererMountReportConsumerCandidate(
  request: RendererMountReportConsumerSelectionRequest,
): RendererMountReportConsumerSelectionResult {
  const consumer = request.candidates[0];

  return createRendererMountReportConsumerSelectionResult({
    name: request.name,
    ...(consumer ? { consumer } : {}),
  });
}

export function resolveRendererMountReportConsumerConflictWithFirstCandidate(
  conflict: RendererMountReportConsumerConflict,
): RendererMountReportConsumerConflictResolution {
  const selection = selectFirstRendererMountReportConsumerCandidate(
    createRendererMountReportConsumerSelectionRequest({
      name: conflict.name,
      candidates: conflict.consumers,
    }),
  );

  return createRendererMountReportConsumerConflictResolution({
    conflict,
    resolved: Boolean(selection.consumer),
    ...(selection.consumer ? { consumer: selection.consumer } : {}),
  });
}

export function resolveRendererMountReportConsumerRegistryConflictsWithFirstCandidate(
  registry: RendererMountReportConsumerRegistry,
): readonly RendererMountReportConsumerConflictResolution[] {
  return findRendererMountReportConsumerConflicts(registry)
    .map(resolveRendererMountReportConsumerConflictWithFirstCandidate);
}

export async function consumeRendererMountReports(
  consumer: RendererMountReportConsumer,
  consumption: RendererMountReportConsumption,
): Promise<RendererMountReportConsumerResult> {
  return consumer.consume(consumption);
}

export async function consumeAndInspectRendererMountReports(
  consumer: RendererMountReportConsumer,
  consumption: RendererMountReportConsumption,
): Promise<RendererMountReportConsumerDiagnosticExecution> {
  let result: RendererMountReportConsumerResult;

  try {
    result = await consumeRendererMountReports(consumer, consumption);
  } catch (error) {
    result = {
      consumerName: consumer.name,
      consumed: false,
      summary: consumption.summary,
      error: error instanceof Error ? error.message : String(error),
    };
  }

  return {
    consumerName: result.consumerName,
    result,
    diagnostic: inspectRendererMountReportConsumerResult(result),
  };
}

export async function consumeAndInspectRendererMountReportConsumers(
  consumers: readonly RendererMountReportConsumer[],
  consumption: RendererMountReportConsumption,
  policy?: RendererMountReportConsumerDiagnosticPolicy,
): Promise<RendererMountReportConsumerDiagnosticBatchExecution> {
  const executions: RendererMountReportConsumerDiagnosticExecution[] = [];

  for (const consumer of consumers) {
    executions.push(await consumeAndInspectRendererMountReports(consumer, consumption));
  }

  const aggregation = aggregateRendererMountReportConsumerDiagnostics(
    executions.map(execution => execution.diagnostic),
  );
  const summary = summarizeRendererMountReportConsumerDiagnosticAggregation(aggregation);

  return {
    executions,
    aggregation,
    summary,
    ...(policy ? {
      policyEvaluation: evaluateRendererMountReportConsumerDiagnosticPolicy(summary, policy),
    } : {}),
  };
}

export async function consumeAndInspectRendererMountReportConsumerRegistry(
  registry: RendererMountReportConsumerRegistry,
  consumption: RendererMountReportConsumption,
  policy?: RendererMountReportConsumerDiagnosticPolicy,
): Promise<RendererMountReportConsumerDiagnosticRegistryExecution> {
  return {
    registry,
    batch: await consumeAndInspectRendererMountReportConsumers(
      registry.consumers,
      consumption,
      policy,
    ),
  };
}

export function reviewRendererMountReportConsumerDiagnosticRegistryExecution(
  execution: RendererMountReportConsumerDiagnosticRegistryExecution,
): RendererMountReportConsumerDiagnosticRegistryExecutionClosure {
  const conflicts = findRendererMountReportConsumerConflicts(execution.registry);
  const policyOk = execution.batch.policyEvaluation?.result.ok;
  const issues = [
    ...execution.batch.aggregation.result.issues,
    ...conflicts.map(conflict => ({
      code: "renderer.mount.report.consumer.registry.execution.conflict",
      message: `${conflict.name} has ${conflict.consumers.length} Renderer mount report consumers`,
      severity: "error" as const,
    })),
    ...(execution.batch.policyEvaluation?.result.issues ?? []),
  ];

  return {
    context: {
      component: "renderer.mount.report.consumer.registry.execution.closure",
    },
    result: {
      ok: issues.length === 0,
      registryConsumerCount: execution.registry.consumers.length,
      executedConsumerCount: execution.batch.executions.length,
      conflictCount: conflicts.length,
      diagnosticsOk: execution.batch.aggregation.result.ok,
      ...(policyOk === undefined ? {} : { policyOk }),
      issues,
    },
  };
}

export function createRendererMountReportConsumerDiagnosticDelivery(
  name: string,
  closure: RendererMountReportConsumerDiagnosticRegistryExecutionClosure,
): RendererMountReportConsumerDiagnosticDelivery {
  return {
    kind: "renderer.mount.report.consumer.diagnostics.delivery",
    name,
    ready: closure.result.ok,
    issueCount: closure.result.issues.length,
    closure,
  };
}

export function createRendererMountReportConsumerDiagnosticDeliveryManifest(
  name: string,
  deliveries: readonly RendererMountReportConsumerDiagnosticDelivery[],
): RendererMountReportConsumerDiagnosticDeliveryManifest {
  const copiedDeliveries = [...deliveries];

  return {
    kind: "renderer.mount.report.consumer.diagnostics.delivery.manifest",
    name,
    deliveries: copiedDeliveries,
    readyCount: copiedDeliveries.filter(delivery => delivery.ready).length,
    blockedCount: copiedDeliveries.filter(delivery => !delivery.ready).length,
    issueCount: copiedDeliveries
      .reduce((issueCount, delivery) => issueCount + delivery.issueCount, 0),
  };
}

export function reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
  manifest: RendererMountReportConsumerDiagnosticDeliveryManifest,
): RendererMountReportConsumerDiagnosticDeliveryManifestClosure {
  const issues = manifest.deliveries
    .flatMap(delivery => delivery.closure.result.issues);

  return {
    context: {
      component: "renderer.mount.report.consumer.diagnostics.delivery.manifest.closure",
      manifestName: manifest.name,
    },
    result: {
      ok: manifest.blockedCount === 0 && issues.length === 0,
      deliveryCount: manifest.deliveries.length,
      readyCount: manifest.readyCount,
      blockedCount: manifest.blockedCount,
      issueCount: issues.length,
      issues,
    },
  };
}

export function createRendererMountReportConsumerDiagnosticDeliveryBundle(
  name: string,
  closures: readonly RendererMountReportConsumerDiagnosticDeliveryManifestClosure[],
): RendererMountReportConsumerDiagnosticDeliveryBundle {
  const copiedClosures = [...closures];

  return {
    kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle",
    name,
    ready: copiedClosures.every(closure => closure.result.ok),
    manifestCount: copiedClosures.length,
    issueCount: copiedClosures
      .reduce((issueCount, closure) => issueCount + closure.result.issueCount, 0),
    closures: copiedClosures,
  };
}

export function snapshotRendererMountReportConsumerDiagnosticDeliveryBundle(
  bundle: RendererMountReportConsumerDiagnosticDeliveryBundle,
): RendererMountReportConsumerDiagnosticDeliveryBundleSnapshot {
  return {
    kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle.snapshot",
    bundleName: bundle.name,
    ready: bundle.ready,
    manifestCount: bundle.manifestCount,
    issueCount: bundle.issueCount,
    manifestNames: bundle.closures.map(closure => closure.context.manifestName),
  };
}

export function createRendererMountReportConsumerDiagnosticDeliverySnapshotCatalog(
  name: string,
  snapshots: readonly RendererMountReportConsumerDiagnosticDeliveryBundleSnapshot[],
): RendererMountReportConsumerDiagnosticDeliverySnapshotCatalog {
  const copiedSnapshots = [...snapshots];

  return {
    kind: "renderer.mount.report.consumer.diagnostics.delivery.snapshot.catalog",
    name,
    snapshots: copiedSnapshots,
    readyCount: copiedSnapshots.filter(snapshot => snapshot.ready).length,
    blockedCount: copiedSnapshots.filter(snapshot => !snapshot.ready).length,
    issueCount: copiedSnapshots
      .reduce((issueCount, snapshot) => issueCount + snapshot.issueCount, 0),
  };
}

export function createRendererMountReportConsumerDiagnosticDeliveryExport(
  name: string,
  catalog: RendererMountReportConsumerDiagnosticDeliverySnapshotCatalog,
): RendererMountReportConsumerDiagnosticDeliveryExport {
  return {
    kind: "renderer.mount.report.consumer.diagnostics.delivery.export",
    name,
    ready: catalog.blockedCount === 0,
    snapshotCount: catalog.snapshots.length,
    issueCount: catalog.issueCount,
    catalog,
  };
}

export function createRendererIntegrationPreparation(
  name: string,
  deliveryExport: RendererMountReportConsumerDiagnosticDeliveryExport,
): RendererIntegrationPreparation {
  return {
    kind: "renderer.integration.preparation",
    name,
    ready: deliveryExport.ready,
    issueCount: deliveryExport.issueCount,
    deliveryExport,
    boundaries: {
      transport: false,
      dom: false,
      homeAssistant: false,
      theme: false,
      platform: false,
    },
  };
}

export function reviewRendererIntegrationPreparationReadiness(
  preparation: RendererIntegrationPreparation,
): RendererIntegrationReadiness {
  const blockedBoundaries = Object.entries(preparation.boundaries)
    .filter(([, enabled]) => !enabled)
    .map(([boundary]) => boundary);
  const issues = [
    ...(!preparation.ready ? [{
      code: "renderer.integration.preparation.not_ready" as const,
      message: `${preparation.name} is not ready for Renderer integration`,
      severity: "error" as const,
    }] : []),
  ];

  return {
    context: {
      component: "renderer.integration",
      preparationName: preparation.name,
    },
    result: {
      ready: issues.length === 0,
      issueCount: preparation.issueCount,
      blockedBoundaries,
      issues,
    },
  };
}

export function inspectRendererMountReportConsumerResult(
  result: RendererMountReportConsumerResult,
): RendererMountReportConsumerDiagnosticReport {
  const issues = [
    ...(!result.consumed ? [{
      code: RendererMountReportConsumerDiagnosticCodes.NotConsumed,
      message: `${result.consumerName} did not consume Renderer mount reports`,
      severity: "error" as const,
    }] : []),
    ...(result.error ? [{
      code: RendererMountReportConsumerDiagnosticCodes.ConsumerFailed,
      message: result.error,
      severity: "error" as const,
    }] : []),
  ];

  return {
    context: {
      component: "renderer.mount.report.consumer",
      consumerName: result.consumerName,
    },
    result: {
      ok: issues.length === 0,
      issues,
    },
  };
}

export function aggregateRendererMountReportConsumerDiagnostics(
  reports: readonly RendererMountReportConsumerDiagnosticReport[],
): RendererMountReportConsumerDiagnosticAggregation {
  const copiedReports = reports.map(report => ({
    context: {
      ...report.context,
    },
    result: {
      ok: report.result.ok,
      issues: [...report.result.issues],
    },
  }));
  const issues = copiedReports.flatMap(report => report.result.issues);

  return {
    context: {
      component: "renderer.mount.report.consumer.diagnostics",
      consumerNames: copiedReports.map(report => report.context.consumerName),
    },
    result: {
      ok: issues.length === 0,
      reports: copiedReports,
      issues,
    },
  };
}

export function summarizeRendererMountReportConsumerDiagnosticAggregation(
  aggregation: RendererMountReportConsumerDiagnosticAggregation,
): RendererMountReportConsumerDiagnosticAggregationSummary {
  const okConsumerCount = aggregation.result.reports
    .filter(report => report.result.ok).length;
  const failedConsumerCount = aggregation.result.reports.length - okConsumerCount;

  return {
    ok: aggregation.result.ok,
    consumerCount: aggregation.result.reports.length,
    okConsumerCount,
    failedConsumerCount,
    issueCount: aggregation.result.issues.length,
  };
}

export function evaluateRendererMountReportConsumerDiagnosticPolicy(
  summary: RendererMountReportConsumerDiagnosticAggregationSummary,
  policy: RendererMountReportConsumerDiagnosticPolicy = {},
): RendererMountReportConsumerDiagnosticPolicyEvaluation {
  const requireAllConsumersOk = policy.requireAllConsumersOk ?? true;
  const issues = [
    ...(requireAllConsumersOk && summary.failedConsumerCount > 0 ? [{
      code: RendererMountReportConsumerDiagnosticPolicyCodes.ConsumerDiagnosticsFailed,
      message: `${summary.failedConsumerCount} Renderer mount report consumers failed diagnostics`,
      severity: "error" as const,
    }] : []),
    ...(policy.maxIssueCount !== undefined && summary.issueCount > policy.maxIssueCount ? [{
      code: RendererMountReportConsumerDiagnosticPolicyCodes.IssueLimitExceeded,
      message: `Renderer mount report consumer diagnostics reported ${summary.issueCount} issues, exceeding ${policy.maxIssueCount}`,
      severity: "error" as const,
    }] : []),
  ];

  return {
    context: {
      component: "renderer.mount.report.consumer.diagnostics.policy",
    },
    result: {
      ok: issues.length === 0,
      summary,
      issues,
    },
  };
}

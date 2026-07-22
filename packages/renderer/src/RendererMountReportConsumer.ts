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

import type { RendererMountReportConsumption } from "./RendererMountReporting";

export const RendererMountReportConsumerDiagnosticCodes = {
  NotConsumed: "renderer.mount.report.consumer.not_consumed",
  ConsumerFailed: "renderer.mount.report.consumer.failed",
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

import type { RendererMountReportConsumption } from "./RendererMountReporting";

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

export function selectFirstRendererMountReportConsumerCandidate(
  request: RendererMountReportConsumerSelectionRequest,
): RendererMountReportConsumerSelectionResult {
  const consumer = request.candidates[0];

  return createRendererMountReportConsumerSelectionResult({
    name: request.name,
    ...(consumer ? { consumer } : {}),
  });
}

export async function consumeRendererMountReports(
  consumer: RendererMountReportConsumer,
  consumption: RendererMountReportConsumption,
): Promise<RendererMountReportConsumerResult> {
  return consumer.consume(consumption);
}

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

export function createRendererMountReportConsumer(
  consumer: RendererMountReportConsumer,
): RendererMountReportConsumer {
  return {
    ...consumer,
  };
}

export async function consumeRendererMountReports(
  consumer: RendererMountReportConsumer,
  consumption: RendererMountReportConsumption,
): Promise<RendererMountReportConsumerResult> {
  return consumer.consume(consumption);
}

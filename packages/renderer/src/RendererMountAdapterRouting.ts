import type { RendererAdapter } from "./RendererAdapter";
import {
  createRendererAdapterRegistry,
  findRendererAdapter,
  type RendererAdapterRegistry,
} from "./RendererAdapterRegistry";
import {
  createRendererDomMountAdapter,
  type RendererDomMountAdapter,
} from "./RendererDomMount";
import {
  createRendererMemoryMountAdapter,
  type RendererMemoryMountAdapter,
} from "./RendererMemoryMount";
import {
  createRendererMountRequest,
  createRendererMountResult,
  type RendererMountResult,
} from "./RendererMount";
import {
  inspectRendererMountResult,
  type RendererMountDiagnosticReport,
} from "./RendererMountDiagnostics";
import {
  createRendererMountLifecycleRecord,
  recordRendererMountLifecycleExecution,
  recordRendererMountLifecycleReport,
  type RendererMountLifecycleRecord,
} from "./RendererMountLifecycle";
import { createRendererMountPlan } from "./RendererMountPlan";
import {
  createRendererMountReportConsumption,
  createRendererMountReport,
  summarizeRendererMountReports,
  type RendererMountReportConsumption,
  type RendererMountReportFilter,
  type RendererMountReport,
  type RendererMountReportSummary,
} from "./RendererMountReporting";
import type { RendererOutput } from "./RendererOutput";
import type { RendererTarget, RendererTargetKind } from "./RendererTarget";

export const RendererDefaultMountAdapterNames = {
  Memory: "renderer.memory",
  Dom: "renderer.dom",
} as const;

export type RendererDefaultMountAdapterRegistry = Readonly<{
  registry: RendererAdapterRegistry;
  memoryAdapter: RendererMemoryMountAdapter;
  domAdapter: RendererDomMountAdapter;
}>;

export type RendererTargetMountAdapterResolution = Readonly<{
  target: RendererTarget;
  adapterName: string;
  adapter?: RendererAdapter;
  error?: string;
}>;

export type RendererUnifiedMountRequest = Readonly<{
  output: RendererOutput;
  target: RendererTarget;
  registry?: RendererAdapterRegistry;
}>;

export type RendererUnifiedMountExecution = Readonly<{
  result: RendererMountResult;
  lifecycleRecord: RendererMountLifecycleRecord;
  diagnosticReport: RendererMountDiagnosticReport;
  report: RendererMountReport;
}>;

export type RendererUnifiedMountBatchRequest = Readonly<{
  requests: readonly RendererUnifiedMountRequest[];
  registry?: RendererAdapterRegistry;
}>;

export type RendererUnifiedMountBatchExecution = Readonly<{
  executions: readonly RendererUnifiedMountExecution[];
  lifecycleRecords: readonly RendererMountLifecycleRecord[];
  reports: readonly RendererMountReport[];
  summary: RendererMountReportSummary;
}>;

export type RendererUnifiedMountBatchConsumptionRequest = Readonly<{
  execution: RendererUnifiedMountBatchExecution;
  filter?: RendererMountReportFilter;
}>;

export type RendererUnifiedMountBatchDiagnosticClosure = Readonly<{
  execution: RendererUnifiedMountBatchExecution;
  summary: RendererMountReportSummary;
  failures: readonly RendererUnifiedMountExecution[];
  ready: boolean;
  blocked: boolean;
  totalCount: number;
  mountedCount: number;
  failureCount: number;
  issueCount: number;
}>;

export type RendererUnifiedMountBatchDiagnosticSnapshot = Readonly<{
  ready: boolean;
  blocked: boolean;
  totalCount: number;
  mountedCount: number;
  failureCount: number;
  issueCount: number;
  failedOutputNames: readonly string[];
  failedTargetNames: readonly string[];
}>;

export type RendererUnifiedMountBatchDiagnosticHandoff = Readonly<{
  closure: RendererUnifiedMountBatchDiagnosticClosure;
  snapshot: RendererUnifiedMountBatchDiagnosticSnapshot;
  ready: boolean;
  blocked: boolean;
  transferable: boolean;
}>;

export type RendererUnifiedMountBatchDiagnosticCatalogSummary = Readonly<{
  handoffCount: number;
  readyCount: number;
  blockedCount: number;
  transferableCount: number;
}>;

export type RendererUnifiedMountBatchDiagnosticCatalog = Readonly<{
  handoffs: readonly RendererUnifiedMountBatchDiagnosticHandoff[];
  summary: RendererUnifiedMountBatchDiagnosticCatalogSummary;
}>;

function getRendererMountAdapterName(targetKind: RendererTargetKind): string {
  return targetKind === "memory"
    ? RendererDefaultMountAdapterNames.Memory
    : RendererDefaultMountAdapterNames.Dom;
}

export function createDefaultRendererMountAdapterRegistry(
  memoryAdapter: RendererMemoryMountAdapter = createRendererMemoryMountAdapter(
    RendererDefaultMountAdapterNames.Memory,
  ),
  domAdapter: RendererDomMountAdapter = createRendererDomMountAdapter(
    RendererDefaultMountAdapterNames.Dom,
  ),
): RendererDefaultMountAdapterRegistry {
  return {
    memoryAdapter,
    domAdapter,
    registry: createRendererAdapterRegistry([memoryAdapter, domAdapter]),
  };
}

export function resolveRendererTargetMountAdapter(
  registry: RendererAdapterRegistry,
  target: RendererTarget,
): RendererTargetMountAdapterResolution {
  const adapterName = getRendererMountAdapterName(target.kind);
  const lookup = findRendererAdapter(registry, {
    name: adapterName,
  });

  if (!lookup.adapter) {
    return {
      target,
      adapterName,
      error: `Renderer mount adapter ${adapterName} was not found.`,
    };
  }

  return {
    target,
    adapterName,
    adapter: lookup.adapter,
  };
}

export async function executeRendererTargetMount(
  request: RendererUnifiedMountRequest,
): Promise<RendererMountResult> {
  if (request.target.kind === "surface" && !request.target.identifier) {
    return createRendererMountResult({
      mounted: false,
      output: request.output,
      target: request.target,
      error: "Renderer surface targets require identifiers before adapter routing.",
    });
  }

  const registry = request.registry ?? createDefaultRendererMountAdapterRegistry().registry;
  const resolution = resolveRendererTargetMountAdapter(registry, request.target);

  if (!resolution.adapter) {
    return createRendererMountResult({
      mounted: false,
      output: request.output,
      target: request.target,
      error: resolution.error,
    });
  }

  return resolution.adapter.mount(createRendererMountRequest({
    output: request.output,
    target: request.target,
  }));
}

export async function executeRendererTargetMountWithReport(
  request: RendererUnifiedMountRequest,
): Promise<RendererUnifiedMountExecution> {
  const mountRequest = createRendererMountRequest({
    output: request.output,
    target: request.target,
  });
  const plan = createRendererMountPlan({
    name: `target:${request.output.name}->${request.target.name}`,
    status: "planned",
    strategy: "adapter",
    request: mountRequest,
    qualityGates: ["request", "output", "target", "diagnostics"],
  });
  const plannedRecord = createRendererMountLifecycleRecord(plan);
  const result = await executeRendererTargetMount(request);
  const executedRecord = recordRendererMountLifecycleExecution(plannedRecord, result);
  const diagnosticReport = inspectRendererMountResult(result);
  const lifecycleRecord = recordRendererMountLifecycleReport(executedRecord, diagnosticReport);

  return {
    result,
    lifecycleRecord,
    diagnosticReport,
    report: createRendererMountReport(lifecycleRecord),
  };
}

export async function executeRendererTargetMountBatch(
  request: RendererUnifiedMountBatchRequest,
): Promise<RendererUnifiedMountBatchExecution> {
  const registry = request.registry ?? createDefaultRendererMountAdapterRegistry().registry;
  const executions: RendererUnifiedMountExecution[] = [];

  for (const mountRequest of request.requests) {
    executions.push(await executeRendererTargetMountWithReport({
      ...mountRequest,
      registry: mountRequest.registry ?? registry,
    }));
  }

  const lifecycleRecords = executions.map(execution => execution.lifecycleRecord);

  return {
    executions,
    lifecycleRecords,
    reports: executions.map(execution => execution.report),
    summary: summarizeRendererMountReports(lifecycleRecords),
  };
}

export function consumeRendererTargetMountBatchReports(
  request: RendererUnifiedMountBatchConsumptionRequest,
): RendererMountReportConsumption {
  return createRendererMountReportConsumption({
    records: request.execution.lifecycleRecords,
    ...(request.filter ? { filter: request.filter } : {}),
  });
}

export function findRendererTargetMountBatchFailures(
  execution: RendererUnifiedMountBatchExecution,
): readonly RendererUnifiedMountExecution[] {
  return execution.executions.filter(item => item.report.diagnosticsOk === false);
}

export function closeRendererTargetMountBatchDiagnostics(
  execution: RendererUnifiedMountBatchExecution,
): RendererUnifiedMountBatchDiagnosticClosure {
  const failures = findRendererTargetMountBatchFailures(execution);
  const ready = execution.summary.total > 0 && failures.length === 0;

  return {
    execution,
    summary: execution.summary,
    failures,
    ready,
    blocked: !ready,
    totalCount: execution.summary.total,
    mountedCount: execution.summary.mounted,
    failureCount: failures.length,
    issueCount: execution.summary.issueCount,
  };
}

export function snapshotRendererTargetMountBatchDiagnostics(
  closure: RendererUnifiedMountBatchDiagnosticClosure,
): RendererUnifiedMountBatchDiagnosticSnapshot {
  return {
    ready: closure.ready,
    blocked: closure.blocked,
    totalCount: closure.totalCount,
    mountedCount: closure.mountedCount,
    failureCount: closure.failureCount,
    issueCount: closure.issueCount,
    failedOutputNames: closure.failures.map(item => item.report.outputName),
    failedTargetNames: closure.failures.map(item => item.report.targetName),
  };
}

export function handoffRendererTargetMountBatchDiagnostics(
  closure: RendererUnifiedMountBatchDiagnosticClosure,
): RendererUnifiedMountBatchDiagnosticHandoff {
  const snapshot = snapshotRendererTargetMountBatchDiagnostics(closure);

  return {
    closure,
    snapshot,
    ready: closure.ready,
    blocked: closure.blocked,
    transferable: closure.ready,
  };
}

export function createRendererTargetMountBatchDiagnosticCatalog(
  handoffs: readonly RendererUnifiedMountBatchDiagnosticHandoff[],
): RendererUnifiedMountBatchDiagnosticCatalog {
  const catalogHandoffs = [...handoffs];

  return {
    handoffs: catalogHandoffs,
    summary: {
      handoffCount: catalogHandoffs.length,
      readyCount: catalogHandoffs.filter(handoff => handoff.ready).length,
      blockedCount: catalogHandoffs.filter(handoff => handoff.blocked).length,
      transferableCount: catalogHandoffs.filter(handoff => handoff.transferable).length,
    },
  };
}

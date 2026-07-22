import { describe, expect, it } from "vitest";

import { createCoreRuntimeHost, type CoreRuntimeHost } from "@atlas/core";

import type {
  RendererAdapter,
  RendererAdapterConflict,
  RendererAdapterConflictResolution,
  RendererAdapterLookupRequest,
  RendererAdapterLookupResult,
  RendererAdapterMountResult,
  RendererAdapterRegistry,
  RendererAdapterSelectionRequest,
  RendererAdapterSelectionResult,
  RendererHostContext,
  RendererMountDiagnosticReport,
  RendererMountLifecycleRecord,
  RendererMountLifecycleReport,
  RendererMountLifecycleState,
  RendererMountPlan,
  RendererMountPlanQualityGate,
  RendererMountPlanExecution,
  RendererMountPlanReport,
  RendererMountPlanStatus,
  RendererMountPlanStrategy,
  RendererMountReportConsumer,
  RendererMountReportConsumerConflict,
  RendererMountReportConsumerConflictResolution,
  RendererMountReportConsumerDiagnosticDelivery,
  RendererMountReportConsumerDiagnosticDeliveryBundle,
  RendererMountReportConsumerDiagnosticDeliveryBundleSnapshot,
  RendererMountReportConsumerDiagnosticDeliverySnapshotCatalog,
  RendererMountReportConsumerDiagnosticDeliveryManifest,
  RendererMountReportConsumerDiagnosticDeliveryManifestClosure,
  RendererMountReportConsumerDiagnosticAggregation,
  RendererMountReportConsumerDiagnosticAggregationSummary,
  RendererMountReportConsumerDiagnosticBatchExecution,
  RendererMountReportConsumerDiagnosticExecution,
  RendererMountReportConsumerDiagnosticPolicy,
  RendererMountReportConsumerDiagnosticPolicyEvaluation,
  RendererMountReportConsumerDiagnosticRegistryExecution,
  RendererMountReportConsumerDiagnosticRegistryExecutionClosure,
  RendererMountReportConsumerDiagnosticReport,
  RendererMountReportConsumerLookupRequest,
  RendererMountReportConsumerLookupResult,
  RendererMountReportConsumerOutput,
  RendererMountReportConsumerRegistry,
  RendererMountReportConsumerResult,
  RendererMountReportConsumerSelectionRequest,
  RendererMountReportConsumerSelectionResult,
  RendererMountReport,
  RendererMountReportConsumption,
  RendererMountReportConsumptionRequest,
  RendererMountReportFilter,
  RendererMountReportIssue,
  RendererMountReportSummary,
  RendererMountRequest,
  RendererMountResult,
  RendererOutput,
  RendererOutputKind,
  RendererPipeline,
  RendererPipelineExecutionResult,
  RendererPlatformAdapter,
  RendererPlatformAdapterConflict,
  RendererPlatformAdapterConflictResolution,
  RendererPlatformAdapterLookupRequest,
  RendererPlatformAdapterLookupResult,
  RendererPlatformAdapterRegistry,
  RendererPlatformAdapterSelectionRequest,
  RendererPlatformAdapterSelectionResult,
  RendererPipelineStage,
  RendererPipelineStageResult,
  RendererTarget,
  RendererTargetKind,
} from "../src";
import * as Renderer from "../src";
import {
  aggregateRendererMountReportConsumerDiagnostics,
  createRendererAdapter,
  createRendererAdapterConflict,
  createRendererAdapterConflictResolution,
  createRendererAdapterLookupRequest,
  createRendererAdapterLookupResult,
  createRendererAdapterRegistry,
  createRendererAdapterSelectionRequest,
  createRendererAdapterSelectionResult,
  createRendererMountRequest,
  createRendererMountLifecycleRecord,
  createRendererMountReport,
  createRendererMountReportConsumer,
  createRendererMountReportConsumerConflict,
  createRendererMountReportConsumerConflictResolution,
  createRendererMountReportConsumerDiagnosticDeliveryBundle,
  createRendererMountReportConsumerDiagnosticDelivery,
  createRendererMountReportConsumerDiagnosticDeliveryManifest,
  createRendererMountReportConsumerDiagnosticDeliverySnapshotCatalog,
  createRendererMountReportConsumerLookupRequest,
  createRendererMountReportConsumerLookupResult,
  createRendererMountReportConsumerRegistry,
  createRendererMountReportConsumerSelectionRequest,
  createRendererMountReportConsumerSelectionResult,
  createRendererMountReportConsumption,
  createDefaultRendererMountPlan,
  createRendererMountPlan,
  createRendererMountResult,
  createRendererOutput,
  createRendererHostContext,
  createRendererPipeline,
  createRendererPlatformAdapter,
  createRendererPlatformAdapterConflict,
  createRendererPlatformAdapterConflictResolution,
  createRendererPlatformAdapterLookupRequest,
  createRendererPlatformAdapterLookupResult,
  createRendererPlatformAdapterRegistry,
  createRendererPlatformAdapterSelectionRequest,
  createRendererPlatformAdapterSelectionResult,
  createRendererTarget,
  consumeAndInspectRendererMountReportConsumerRegistry,
  consumeAndInspectRendererMountReportConsumers,
  consumeAndInspectRendererMountReports,
  consumeRendererMountReports,
  evaluateRendererMountReportConsumerDiagnosticPolicy,
  executeRendererMountPlan,
  executeRendererPipeline,
  findRendererAdapter,
  findRendererAdapterConflicts,
  findRendererMountReportConsumer,
  findRendererMountReportConsumerConflicts,
  findRendererPlatformAdapter,
  findRendererPlatformAdapterConflicts,
  inspectRendererMountResult,
  inspectRendererMountLifecycleRecord,
  inspectRendererMountPlan,
  inspectRendererMountReportConsumerResult,
  isRendererMountPlanReady,
  mountResolvedRendererAdapter,
  recordRendererMountLifecycleExecution,
  recordRendererMountLifecycleReport,
  mountResolvedRendererPlatformAdapter,
  resolveRendererAdapterConflictWithFirstCandidate,
  resolveRendererAdapterRegistryConflictsWithFirstCandidate,
  resolveRendererMountReportConsumerConflictWithFirstCandidate,
  resolveRendererMountReportConsumerRegistryConflictsWithFirstCandidate,
  resolveRendererPlatformAdapterConflictWithFirstCandidate,
  resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate,
  reviewRendererMountReportConsumerDiagnosticDeliveryManifest,
  reviewRendererMountReportConsumerDiagnosticRegistryExecution,
  selectFirstRendererAdapterCandidate,
  selectFirstRendererMountReportConsumerCandidate,
  selectFirstRendererPlatformAdapterCandidate,
  snapshotRendererMountReportConsumerDiagnosticDeliveryBundle,
  summarizeRendererMountReports,
  summarizeRendererMountReportConsumerDiagnosticAggregation,
} from "../src";

describe("renderer public API", () => {
  it("exports the Renderer package value surface from the package root", () => {
    expect(Renderer.createRendererAdapter).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterConflict).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterConflictResolution).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterLookupRequest).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterLookupResult).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterRegistry).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterSelectionRequest).toBeTypeOf("function");
    expect(Renderer.createRendererAdapterSelectionResult).toBeTypeOf("function");
    expect(Renderer.createRendererHostContext).toBeTypeOf("function");
    expect(Renderer.createDefaultRendererMountPlan).toBeTypeOf("function");
    expect(Renderer.createRendererMountLifecycleRecord).toBeTypeOf("function");
    expect(Renderer.createRendererMountPlan).toBeTypeOf("function");
    expect(Renderer.createRendererMountReport).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumer).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerConflict).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerConflictResolution).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerDiagnosticDeliveryBundle).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerDiagnosticDelivery).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerDiagnosticDeliveryManifest).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerDiagnosticDeliverySnapshotCatalog).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerLookupRequest).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerLookupResult).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerRegistry).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerSelectionRequest).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumerSelectionResult).toBeTypeOf("function");
    expect(Renderer.createRendererMountReportConsumption).toBeTypeOf("function");
    expect(Renderer.createRendererMountRequest).toBeTypeOf("function");
    expect(Renderer.createRendererMountResult).toBeTypeOf("function");
    expect(Renderer.createRendererOutput).toBeTypeOf("function");
    expect(Renderer.createRendererPipeline).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapter).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterConflict).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterConflictResolution).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterLookupRequest).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterLookupResult).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterRegistry).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterSelectionRequest).toBeTypeOf("function");
    expect(Renderer.createRendererPlatformAdapterSelectionResult).toBeTypeOf("function");
    expect(Renderer.createRendererTarget).toBeTypeOf("function");
    expect(Renderer.consumeAndInspectRendererMountReportConsumerRegistry).toBeTypeOf("function");
    expect(Renderer.consumeAndInspectRendererMountReportConsumers).toBeTypeOf("function");
    expect(Renderer.consumeAndInspectRendererMountReports).toBeTypeOf("function");
    expect(Renderer.consumeRendererMountReports).toBeTypeOf("function");
    expect(Renderer.executeRendererMountPlan).toBeTypeOf("function");
    expect(Renderer.executeRendererPipeline).toBeTypeOf("function");
    expect(Renderer.findRendererAdapter).toBeTypeOf("function");
    expect(Renderer.findRendererAdapterConflicts).toBeTypeOf("function");
    expect(Renderer.findRendererMountReportConsumer).toBeTypeOf("function");
    expect(Renderer.findRendererMountReportConsumerConflicts).toBeTypeOf("function");
    expect(Renderer.findRendererPlatformAdapter).toBeTypeOf("function");
    expect(Renderer.findRendererPlatformAdapterConflicts).toBeTypeOf("function");
    expect(Renderer.inspectRendererMountLifecycleRecord).toBeTypeOf("function");
    expect(Renderer.inspectRendererMountPlan).toBeTypeOf("function");
    expect(Renderer.inspectRendererMountReportConsumerResult).toBeTypeOf("function");
    expect(Renderer.inspectRendererMountResult).toBeTypeOf("function");
    expect(Renderer.isRendererMountPlanReady).toBeTypeOf("function");
    expect(Renderer.RendererMountDiagnosticCodes.MountFailed).toBe("renderer.mount.failed");
    expect(Renderer.RendererMountReportConsumerDiagnosticCodes.NotConsumed).toBe(
      "renderer.mount.report.consumer.not_consumed",
    );
    expect(Renderer.RendererMountReportConsumerDiagnosticPolicyCodes.ConsumerDiagnosticsFailed).toBe(
      "renderer.mount.report.consumer.diagnostics.policy.consumer_failed",
    );
    expect(Renderer.aggregateRendererMountReportConsumerDiagnostics).toBeTypeOf("function");
    expect(Renderer.evaluateRendererMountReportConsumerDiagnosticPolicy).toBeTypeOf("function");
    expect(Renderer.summarizeRendererMountReportConsumerDiagnosticAggregation).toBeTypeOf("function");
    expect(Renderer.mountResolvedRendererAdapter).toBeTypeOf("function");
    expect(Renderer.mountResolvedRendererPlatformAdapter).toBeTypeOf("function");
    expect(Renderer.recordRendererMountLifecycleExecution).toBeTypeOf("function");
    expect(Renderer.recordRendererMountLifecycleReport).toBeTypeOf("function");
    expect(Renderer.resolveRendererAdapterConflictWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.resolveRendererAdapterRegistryConflictsWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.resolveRendererMountReportConsumerConflictWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.resolveRendererMountReportConsumerRegistryConflictsWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.reviewRendererMountReportConsumerDiagnosticDeliveryManifest).toBeTypeOf("function");
    expect(Renderer.reviewRendererMountReportConsumerDiagnosticRegistryExecution).toBeTypeOf("function");
    expect(Renderer.resolveRendererPlatformAdapterConflictWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate).toBeTypeOf("function");
    expect(Renderer.selectFirstRendererAdapterCandidate).toBeTypeOf("function");
    expect(Renderer.selectFirstRendererMountReportConsumerCandidate).toBeTypeOf("function");
    expect(Renderer.selectFirstRendererPlatformAdapterCandidate).toBeTypeOf("function");
    expect(Renderer.snapshotRendererMountReportConsumerDiagnosticDeliveryBundle).toBeTypeOf("function");
    expect(Renderer.summarizeRendererMountReports).toBeTypeOf("function");
  });

  it("exports the Renderer package type surface from the package root", () => {
    const runtime: CoreRuntimeHost = createCoreRuntimeHost({
      application: {
        name: "renderer-type-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const context: RendererHostContext = {
      runtime,
    };
    const stageResult: RendererPipelineStageResult = {
      stage: "prepare",
      completed: true,
    };
    const stage: RendererPipelineStage = {
      name: "prepare",
      run: () => stageResult,
    };
    const pipeline: RendererPipeline = createRendererPipeline([stage]);
    const execution: RendererPipelineExecutionResult = {
      completed: true,
      stages: [stageResult],
    };
    const outputKind: RendererOutputKind = "fragment";
    const output: RendererOutput = {
      kind: outputKind,
      name: "type-output",
      content: "ready",
    };
    const targetKind: RendererTargetKind = "memory";
    const target: RendererTarget = {
      kind: targetKind,
      name: "type-target",
    };
    const mountRequest: RendererMountRequest = {
      output,
      target,
    };
    const mountPlanStatus: RendererMountPlanStatus = "planned";
    const mountPlanStrategy: RendererMountPlanStrategy = "manual";
    const mountPlanQualityGate: RendererMountPlanQualityGate = "request";
    const mountPlan: RendererMountPlan = {
      name: "type-mount-plan",
      status: mountPlanStatus,
      strategy: mountPlanStrategy,
      request: mountRequest,
      qualityGates: [mountPlanQualityGate],
    };
    const mountPlanReport: RendererMountPlanReport = {
      planned: true,
      name: mountPlan.name,
      strategy: mountPlan.strategy,
      outputName: output.name,
      targetName: target.name,
      qualityGates: mountPlan.qualityGates,
    };
    const mountPlanExecution: RendererMountPlanExecution = {
      plan: mountPlan,
    };
    const mountLifecycleState: RendererMountLifecycleState = "planned";
    const mountLifecycleRecord: RendererMountLifecycleRecord = {
      plan: mountPlan,
      state: mountLifecycleState,
    };
    const mountLifecycleReport: RendererMountLifecycleReport = {
      state: mountLifecycleState,
      planName: mountPlan.name,
      outputName: output.name,
      targetName: target.name,
    };
    const mountReportIssue: RendererMountReportIssue = {
      code: "renderer.mount.failed",
      message: "type mount failed",
      severity: "error",
    };
    const mountReport: RendererMountReport = {
      state: mountLifecycleState,
      planName: mountPlan.name,
      strategy: mountPlan.strategy,
      outputName: output.name,
      targetName: target.name,
      qualityGates: mountPlan.qualityGates,
      planned: true,
      executed: false,
      reported: false,
      issueCount: 1,
      issues: [mountReportIssue],
    };
    const mountReportFilter: RendererMountReportFilter = {
      states: [mountLifecycleState],
      mounted: false,
      diagnosticsOk: false,
    };
    const mountReportConsumptionRequest: RendererMountReportConsumptionRequest = {
      records: [mountLifecycleRecord],
      filter: mountReportFilter,
    };
    const mountReportSummary: RendererMountReportSummary = {
      total: 1,
      planned: 1,
      executed: 0,
      reported: 0,
      mounted: 0,
      diagnosticsOk: 0,
      failed: 0,
      issueCount: 1,
    };
    const mountReportConsumption: RendererMountReportConsumption = {
      reports: [mountReport],
      summary: mountReportSummary,
    };
    const mountReportConsumerResult: RendererMountReportConsumerResult = {
      consumerName: "type-consumer",
      consumed: true,
      summary: mountReportSummary,
    };
    const mountReportConsumerDiagnosticReport: RendererMountReportConsumerDiagnosticReport = {
      context: {
        component: "renderer.mount.report.consumer",
        consumerName: mountReportConsumerResult.consumerName,
      },
      result: {
        ok: true,
        issues: [],
      },
    };
    const mountReportConsumerDiagnosticAggregation: RendererMountReportConsumerDiagnosticAggregation = {
      context: {
        component: "renderer.mount.report.consumer.diagnostics",
        consumerNames: [mountReportConsumerResult.consumerName],
      },
      result: {
        ok: true,
        reports: [mountReportConsumerDiagnosticReport],
        issues: [],
      },
    };
    const mountReportConsumerDiagnosticAggregationSummary:
      RendererMountReportConsumerDiagnosticAggregationSummary = {
        ok: true,
        consumerCount: 1,
        okConsumerCount: 1,
        failedConsumerCount: 0,
        issueCount: 0,
      };
    const mountReportConsumerDiagnosticPolicy: RendererMountReportConsumerDiagnosticPolicy = {
      requireAllConsumersOk: true,
      maxIssueCount: 0,
    };
    const mountReportConsumerDiagnosticPolicyEvaluation:
      RendererMountReportConsumerDiagnosticPolicyEvaluation = {
        context: {
          component: "renderer.mount.report.consumer.diagnostics.policy",
        },
        result: {
          ok: true,
          summary: mountReportConsumerDiagnosticAggregationSummary,
          issues: [],
        },
      };
    const mountReportConsumerDiagnosticExecution:
      RendererMountReportConsumerDiagnosticExecution = {
        consumerName: mountReportConsumerResult.consumerName,
        result: mountReportConsumerResult,
        diagnostic: mountReportConsumerDiagnosticReport,
      };
    const mountReportConsumerDiagnosticBatchExecution:
      RendererMountReportConsumerDiagnosticBatchExecution = {
        executions: [mountReportConsumerDiagnosticExecution],
        aggregation: mountReportConsumerDiagnosticAggregation,
        summary: mountReportConsumerDiagnosticAggregationSummary,
        policyEvaluation: mountReportConsumerDiagnosticPolicyEvaluation,
      };
    const mountReportConsumerOutput: RendererMountReportConsumerOutput =
      mountReportConsumerResult;
    const mountReportConsumer: RendererMountReportConsumer = {
      name: "type-consumer",
      consume: () => mountReportConsumerOutput,
    };
    const mountReportConsumerConflict: RendererMountReportConsumerConflict = {
      name: mountReportConsumer.name,
      consumers: [mountReportConsumer],
    };
    const mountReportConsumerConflictResolution: RendererMountReportConsumerConflictResolution = {
      conflict: mountReportConsumerConflict,
      resolved: true,
      consumer: mountReportConsumer,
    };
    const mountReportConsumerRegistry: RendererMountReportConsumerRegistry = {
      consumers: [mountReportConsumer],
    };
    const mountReportConsumerDiagnosticRegistryExecution:
      RendererMountReportConsumerDiagnosticRegistryExecution = {
        registry: mountReportConsumerRegistry,
        batch: mountReportConsumerDiagnosticBatchExecution,
      };
    const mountReportConsumerDiagnosticRegistryExecutionClosure:
      RendererMountReportConsumerDiagnosticRegistryExecutionClosure = {
        context: {
          component: "renderer.mount.report.consumer.registry.execution.closure",
        },
        result: {
          ok: true,
          registryConsumerCount: 1,
          executedConsumerCount: 1,
          conflictCount: 0,
          diagnosticsOk: true,
          policyOk: true,
          issues: [],
        },
      };
    const mountReportConsumerDiagnosticDelivery: RendererMountReportConsumerDiagnosticDelivery = {
      kind: "renderer.mount.report.consumer.diagnostics.delivery",
      name: "type-delivery",
      ready: true,
      issueCount: 0,
      closure: mountReportConsumerDiagnosticRegistryExecutionClosure,
    };
    const mountReportConsumerDiagnosticDeliveryManifest:
      RendererMountReportConsumerDiagnosticDeliveryManifest = {
        kind: "renderer.mount.report.consumer.diagnostics.delivery.manifest",
        name: "type-manifest",
        deliveries: [mountReportConsumerDiagnosticDelivery],
        readyCount: 1,
        blockedCount: 0,
        issueCount: 0,
      };
    const mountReportConsumerDiagnosticDeliveryManifestClosure:
      RendererMountReportConsumerDiagnosticDeliveryManifestClosure = {
        context: {
          component: "renderer.mount.report.consumer.diagnostics.delivery.manifest.closure",
          manifestName: mountReportConsumerDiagnosticDeliveryManifest.name,
        },
        result: {
          ok: true,
          deliveryCount: 1,
          readyCount: 1,
          blockedCount: 0,
          issueCount: 0,
          issues: [],
        },
      };
    const mountReportConsumerDiagnosticDeliveryBundle:
      RendererMountReportConsumerDiagnosticDeliveryBundle = {
        kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle",
        name: "type-bundle",
        ready: true,
        manifestCount: 1,
        issueCount: 0,
        closures: [mountReportConsumerDiagnosticDeliveryManifestClosure],
      };
    const mountReportConsumerDiagnosticDeliveryBundleSnapshot:
      RendererMountReportConsumerDiagnosticDeliveryBundleSnapshot = {
        kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle.snapshot",
        bundleName: mountReportConsumerDiagnosticDeliveryBundle.name,
        ready: true,
        manifestCount: 1,
        issueCount: 0,
        manifestNames: [mountReportConsumerDiagnosticDeliveryManifest.name],
      };
    const mountReportConsumerDiagnosticDeliverySnapshotCatalog:
      RendererMountReportConsumerDiagnosticDeliverySnapshotCatalog = {
        kind: "renderer.mount.report.consumer.diagnostics.delivery.snapshot.catalog",
        name: "type-catalog",
        snapshots: [mountReportConsumerDiagnosticDeliveryBundleSnapshot],
        readyCount: 1,
        blockedCount: 0,
        issueCount: 0,
      };
    const mountReportConsumerLookupRequest: RendererMountReportConsumerLookupRequest = {
      name: mountReportConsumer.name,
    };
    const mountReportConsumerLookupResult: RendererMountReportConsumerLookupResult = {
      name: mountReportConsumer.name,
      consumer: mountReportConsumer,
    };
    const mountReportConsumerSelectionRequest: RendererMountReportConsumerSelectionRequest = {
      name: mountReportConsumer.name,
      candidates: [mountReportConsumer],
    };
    const mountReportConsumerSelectionResult: RendererMountReportConsumerSelectionResult = {
      name: mountReportConsumer.name,
      consumer: mountReportConsumer,
    };
    const mountResult: RendererMountResult = {
      mounted: false,
      output,
      target,
    };
    const mountDiagnosticReport: RendererMountDiagnosticReport = {
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: true,
        issues: [],
      },
    };
    const adapterResult: RendererAdapterMountResult = mountResult;
    const adapter: RendererAdapter = {
      name: "type-adapter",
      mount: () => adapterResult,
    };
    const platformAdapter: RendererPlatformAdapter = {
      platform: "type-platform",
      adapter,
      capabilities: ["mount"],
    };
    const platformAdapterRegistry: RendererPlatformAdapterRegistry = {
      platformAdapters: [platformAdapter],
    };
    const platformAdapterConflict: RendererPlatformAdapterConflict = {
      platform: platformAdapter.platform,
      platformAdapters: [platformAdapter],
    };
    const platformAdapterConflictResolution: RendererPlatformAdapterConflictResolution = {
      conflict: platformAdapterConflict,
      resolved: false,
    };
    const platformAdapterLookupRequest: RendererPlatformAdapterLookupRequest = {
      platform: platformAdapter.platform,
    };
    const platformAdapterLookupResult: RendererPlatformAdapterLookupResult = {
      platform: platformAdapter.platform,
      platformAdapter,
    };
    const platformAdapterSelectionRequest: RendererPlatformAdapterSelectionRequest = {
      platform: platformAdapter.platform,
      candidates: [platformAdapter],
    };
    const platformAdapterSelectionResult: RendererPlatformAdapterSelectionResult = {
      platform: platformAdapter.platform,
      platformAdapter,
    };
    const adapterConflict: RendererAdapterConflict = {
      name: adapter.name,
      adapters: [adapter],
    };
    const adapterConflictResolution: RendererAdapterConflictResolution = {
      conflict: adapterConflict,
      resolved: false,
    };
    const adapterRegistry: RendererAdapterRegistry = {
      adapters: [adapter],
    };
    const adapterSelectionRequest: RendererAdapterSelectionRequest = {
      name: adapter.name,
      candidates: [adapter],
    };
    const adapterSelectionResult: RendererAdapterSelectionResult = {
      name: adapter.name,
      adapter,
    };
    const adapterLookupRequest: RendererAdapterLookupRequest = {
      name: adapter.name,
    };
    const adapterLookupResult: RendererAdapterLookupResult = {
      name: adapter.name,
      adapter,
    };

    expect(adapter.name).toBe("type-adapter");
    expect(adapterConflict.adapters[0]).toBe(adapter);
    expect(adapterConflictResolution.conflict).toBe(adapterConflict);
    expect(adapterRegistry.adapters[0]).toBe(adapter);
    expect(adapterSelectionRequest.candidates[0]).toBe(adapter);
    expect(adapterSelectionResult.adapter).toBe(adapter);
    expect(adapterLookupRequest.name).toBe(adapter.name);
    expect(adapterLookupResult.adapter).toBe(adapter);
    expect(platformAdapter.adapter).toBe(adapter);
    expect(platformAdapter.capabilities).toEqual(["mount"]);
    expect(platformAdapterConflict.platformAdapters[0]).toBe(platformAdapter);
    expect(platformAdapterConflictResolution.conflict).toBe(platformAdapterConflict);
    expect(platformAdapterRegistry.platformAdapters[0]).toBe(platformAdapter);
    expect(platformAdapterLookupRequest.platform).toBe(platformAdapter.platform);
    expect(platformAdapterLookupResult.platformAdapter).toBe(platformAdapter);
    expect(platformAdapterSelectionRequest.candidates[0]).toBe(platformAdapter);
    expect(platformAdapterSelectionResult.platformAdapter).toBe(platformAdapter);
    expect(context.runtime.application.name).toBe("renderer-type-api");
    expect(output.kind).toBe("fragment");
    expect(target.kind).toBe("memory");
    expect(mountRequest.output.name).toBe("type-output");
    expect(mountPlan.request).toBe(mountRequest);
    expect(mountPlanReport.outputName).toBe(output.name);
    expect(mountPlanExecution.plan).toBe(mountPlan);
    expect(mountLifecycleRecord.plan).toBe(mountPlan);
    expect(mountLifecycleReport.planName).toBe(mountPlan.name);
    expect(mountReport.issues[0]).toBe(mountReportIssue);
    expect(mountReportConsumptionRequest.filter).toBe(mountReportFilter);
    expect(mountReportConsumption.reports[0]).toBe(mountReport);
    expect(mountReportSummary.total).toBe(1);
    expect(mountReportConsumer.consume(mountReportConsumption)).toBe(mountReportConsumerResult);
    expect(mountReportConsumerDiagnosticReport.result.ok).toBe(true);
    expect(mountReportConsumerDiagnosticAggregation.result.reports[0]).toBe(
      mountReportConsumerDiagnosticReport,
    );
    expect(mountReportConsumerDiagnosticAggregationSummary.consumerCount).toBe(1);
    expect(mountReportConsumerDiagnosticPolicy.maxIssueCount).toBe(0);
    expect(mountReportConsumerDiagnosticPolicyEvaluation.result.summary).toBe(
      mountReportConsumerDiagnosticAggregationSummary,
    );
    expect(mountReportConsumerDiagnosticExecution.diagnostic).toBe(
      mountReportConsumerDiagnosticReport,
    );
    expect(mountReportConsumerDiagnosticBatchExecution.executions[0]).toBe(
      mountReportConsumerDiagnosticExecution,
    );
    expect(mountReportConsumerDiagnosticRegistryExecution.registry).toBe(
      mountReportConsumerRegistry,
    );
    expect(mountReportConsumerDiagnosticRegistryExecutionClosure.result.ok).toBe(true);
    expect(mountReportConsumerDiagnosticDelivery.closure).toBe(
      mountReportConsumerDiagnosticRegistryExecutionClosure,
    );
    expect(mountReportConsumerDiagnosticDeliveryManifest.deliveries[0]).toBe(
      mountReportConsumerDiagnosticDelivery,
    );
    expect(mountReportConsumerDiagnosticDeliveryManifestClosure.result.deliveryCount).toBe(1);
    expect(mountReportConsumerDiagnosticDeliveryBundle.closures[0]).toBe(
      mountReportConsumerDiagnosticDeliveryManifestClosure,
    );
    expect(mountReportConsumerDiagnosticDeliveryBundleSnapshot.bundleName).toBe(
      mountReportConsumerDiagnosticDeliveryBundle.name,
    );
    expect(mountReportConsumerDiagnosticDeliverySnapshotCatalog.snapshots[0]).toBe(
      mountReportConsumerDiagnosticDeliveryBundleSnapshot,
    );
    expect(mountReportConsumerConflict.consumers[0]).toBe(mountReportConsumer);
    expect(mountReportConsumerConflictResolution.consumer).toBe(mountReportConsumer);
    expect(mountReportConsumerRegistry.consumers[0]).toBe(mountReportConsumer);
    expect(mountReportConsumerLookupRequest.name).toBe(mountReportConsumer.name);
    expect(mountReportConsumerLookupResult.consumer).toBe(mountReportConsumer);
    expect(mountReportConsumerSelectionRequest.candidates[0]).toBe(mountReportConsumer);
    expect(mountReportConsumerSelectionResult.consumer).toBe(mountReportConsumer);
    expect(mountResult.mounted).toBe(false);
    expect(mountDiagnosticReport.result.ok).toBe(true);
    expect(adapter.mount(mountRequest)).toBe(adapterResult);
    expect(pipeline[0]?.name).toBe("prepare");
    expect(execution.completed).toBe(true);
  });

  it("creates a Renderer host context from a Core Runtime host", () => {
    const runtime: CoreRuntimeHost = createCoreRuntimeHost({
      application: {
        name: "renderer-api",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const context: RendererHostContext = createRendererHostContext(runtime);

    expect(context.runtime).toBe(runtime);
    expect(context.runtime.application.name).toBe("renderer-api");
  });

  it("keeps Renderer host context as a read-through Core Runtime boundary", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-context-runtime",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);

    await runtime.start();

    expect(context.runtime).toBe(runtime);
    expect(context.runtime.state).toBe("running");
    expect(context.runtime.health.health).toBe("healthy");
  });

  it("does not clone Core Runtime hosts when creating Renderer host contexts", () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-context-identity",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });

    const first = Renderer.createRendererHostContext(runtime);
    const second = Renderer.createRendererHostContext(runtime);

    expect(first).not.toBe(second);
    expect(first.runtime).toBe(runtime);
    expect(second.runtime).toBe(runtime);
  });

  it("keeps Renderer host context independent from rendering output and target contracts", () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-context-independent",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const output = createRendererOutput({
      kind: "fragment",
      name: "context-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "context-target",
    });

    expect(context).toEqual({ runtime });
    expect(output.name).toBe("context-output");
    expect(target.name).toBe("context-target");
  });

  it("passes Renderer host contexts to pipeline stages without changing Runtime ownership", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-context-pipeline",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const pipeline = createRendererPipeline([{
      name: "inspect-runtime",
      run: rendererContext => ({
        stage: rendererContext.runtime.application.name,
        completed: rendererContext.runtime === runtime,
      }),
    }]);

    await expect(executeRendererPipeline(context, pipeline)).resolves.toEqual({
      completed: true,
      stages: [{
        stage: "renderer-context-pipeline",
        completed: true,
      }],
    });
  });

  it("surfaces Core Runtime diagnostics through Renderer host contexts without reclassification", () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-context-diagnostics",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
      modules: [{
        manifest: {
          id: "renderer-context-module",
          name: "Renderer context module",
          version: "1.0.0",
          dependencies: [],
        },
        module: { async initialize() {} },
      }],
    });
    const context = createRendererHostContext(runtime);

    expect(context.runtime.diagnostics).toMatchObject({
      context: {
        component: "runtime:renderer-context-diagnostics",
      },
      result: {
        ok: false,
        issues: [{
          code: "runtime.module.degraded",
        }],
      },
    });
  });

  it("creates Renderer output without binding it to a render target", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "status-card",
      content: "online",
    });

    expect(output).toEqual({
      kind: "fragment",
      name: "status-card",
      content: "online",
    });
  });

  it("creates Renderer output as an immutable copy of the source shape", () => {
    const source: RendererOutput = {
      kind: "document",
      name: "dashboard",
      content: "ready",
    };

    const output = createRendererOutput(source);

    expect(output).toEqual(source);
    expect(output).not.toBe(source);
  });

  it("creates Renderer output without optional content", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "empty-fragment",
    });

    expect(output).toEqual({
      kind: "fragment",
      name: "empty-fragment",
    });
  });

  it("supports the current Renderer output kinds", () => {
    const fragment = createRendererOutput({
      kind: "fragment",
      name: "card-fragment",
    });
    const document = createRendererOutput({
      kind: "document",
      name: "dashboard-document",
    });

    expect([fragment.kind, document.kind]).toEqual(["fragment", "document"]);
  });

  it("keeps Renderer output independent from targets, mounts and adapters", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "independent-output",
      content: "ready",
    });

    expect(Object.keys(output).sort()).toEqual(["content", "kind", "name"]);
    expect(output).not.toHaveProperty("target");
    expect(output).not.toHaveProperty("mounted");
    expect(output).not.toHaveProperty("adapter");
    expect(output).not.toHaveProperty("platform");
  });

  it("preserves empty Renderer output content as explicit content", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "empty-content-output",
      content: "",
    });

    expect(output).toEqual({
      kind: "fragment",
      name: "empty-content-output",
      content: "",
    });
    expect(Object.hasOwn(output, "content")).toBe(true);
  });

  it("keeps Renderer document output as descriptive data only", () => {
    const output = Renderer.createRendererOutput({
      kind: "document",
      name: "document-output-boundary",
      content: "<section>ready</section>",
    });

    expect(output.kind).toBe("document");
    expect(output.content).toBe("<section>ready</section>");
    expect(output).not.toHaveProperty("render");
    expect(output).not.toHaveProperty("mount");
  });

  it("creates Renderer targets without mounting behavior", () => {
    const target = createRendererTarget({
      kind: "memory",
      name: "preview",
      identifier: "preview-main",
    });

    expect(target).toEqual({
      kind: "memory",
      name: "preview",
      identifier: "preview-main",
    });
  });

  it("creates Renderer targets as immutable copies of the source shape", () => {
    const source: RendererTarget = {
      kind: "surface",
      name: "dashboard",
      identifier: "dashboard-root",
    };

    const target = createRendererTarget(source);

    expect(target).toEqual(source);
    expect(target).not.toBe(source);
  });

  it("creates Renderer targets without optional identifiers", () => {
    const target = createRendererTarget({
      kind: "memory",
      name: "scratch",
    });

    expect(target).toEqual({
      kind: "memory",
      name: "scratch",
    });
  });

  it("supports the current Renderer target kinds", () => {
    const memory = createRendererTarget({
      kind: "memory",
      name: "preview-buffer",
    });
    const surface = createRendererTarget({
      kind: "surface",
      name: "dashboard-surface",
    });

    expect([memory.kind, surface.kind]).toEqual(["memory", "surface"]);
  });

  it("keeps Renderer targets independent from outputs and adapters", () => {
    const target = createRendererTarget({
      kind: "surface",
      name: "independent-target",
      identifier: "target-root",
    });

    expect(Object.keys(target).sort()).toEqual(["identifier", "kind", "name"]);
    expect(target).not.toHaveProperty("output");
    expect(target).not.toHaveProperty("adapter");
    expect(target).not.toHaveProperty("platform");
    expect(target).not.toHaveProperty("mounted");
  });

  it("preserves empty Renderer target identifiers as explicit identifiers", () => {
    const target = createRendererTarget({
      kind: "memory",
      name: "empty-identifier-target",
      identifier: "",
    });

    expect(target).toEqual({
      kind: "memory",
      name: "empty-identifier-target",
      identifier: "",
    });
    expect(Object.hasOwn(target, "identifier")).toBe(true);
  });

  it("keeps Renderer surface targets as descriptive data only", () => {
    const target = Renderer.createRendererTarget({
      kind: "surface",
      name: "surface-target-boundary",
      identifier: "surface-root",
    });

    expect(target.kind).toBe("surface");
    expect(target.identifier).toBe("surface-root");
    expect(target).not.toHaveProperty("element");
    expect(target).not.toHaveProperty("mount");
  });

  it("creates Renderer mount requests without mounting output", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "status-card",
      content: "online",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "preview",
    });

    const request = createRendererMountRequest({
      output,
      target,
    });

    expect(request).toEqual({
      output,
      target,
    });
  });

  it("creates Renderer mount requests as immutable copies of the source shape", () => {
    const request: RendererMountRequest = {
      output: createRendererOutput({
        kind: "document",
        name: "dashboard",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "dashboard-surface",
        identifier: "dashboard-root",
      }),
    };

    const created = createRendererMountRequest(request);

    expect(created).toEqual(request);
    expect(created).not.toBe(request);
  });

  it("keeps Renderer mount requests linked to existing output and target references", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "request-reference-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "request-reference-target",
    });

    const request = Renderer.createRendererMountRequest({
      output,
      target,
    });

    expect(request.output).toBe(output);
    expect(request.target).toBe(target);
  });

  it("keeps Renderer mount requests independent from mount results", () => {
    const output = createRendererOutput({
      kind: "document",
      name: "request-result-boundary-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "request-result-boundary-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });

    expect(request).toEqual({
      output,
      target,
    });
    expect(request).not.toHaveProperty("mounted");
    expect(request).not.toHaveProperty("error");
  });

  it("creates Renderer mount plans for output-to-target requests", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "plan-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "plan-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });

    const plan = createRendererMountPlan({
      name: "plan-boundary",
      status: "planned",
      strategy: "manual",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });

    expect(plan).toEqual({
      name: "plan-boundary",
      status: "planned",
      strategy: "manual",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });
    expect(plan.request).toBe(request);
  });

  it("creates default Renderer mount plans from requests", () => {
    const output = createRendererOutput({
      kind: "document",
      name: "default-plan-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "default-plan-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });

    expect(Renderer.createDefaultRendererMountPlan(request)).toEqual({
      name: "default-plan-output->default-plan-target",
      status: "planned",
      strategy: "manual",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });
  });

  it("keeps Renderer mount plan quality gates independent from source arrays", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "copy-plan-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "copy-plan-target",
      }),
    });
    const qualityGates: RendererMountPlanQualityGate[] = ["request", "output"];

    const plan = createRendererMountPlan({
      name: "copy-plan",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates,
    });

    qualityGates.push("target");

    expect(plan.qualityGates).toEqual(["request", "output"]);
    expect(plan.qualityGates).not.toBe(qualityGates);
  });

  it("reports Renderer mount plan readiness details", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "report-plan-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "report-plan-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);

    expect(inspectRendererMountPlan(plan)).toEqual({
      planned: true,
      name: "report-plan-output->report-plan-target",
      strategy: "manual",
      outputName: "report-plan-output",
      targetName: "report-plan-target",
      qualityGates: ["request", "output", "target", "diagnostics"],
    });
  });

  it("keeps Renderer mount plan reports independent from later plan mutations", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "mutation-plan-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "mutation-plan-target",
      }),
    });
    const plan = {
      ...createDefaultRendererMountPlan(request),
      qualityGates: ["request", "output", "target", "diagnostics"],
    };
    const report = inspectRendererMountPlan(plan);

    plan.qualityGates.push("request");

    expect(report.qualityGates).toEqual(["request", "output", "target", "diagnostics"]);
    expect(report.qualityGates).not.toBe(plan.qualityGates);
  });

  it("checks Renderer mount plan readiness without mounting", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "ready-plan-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "ready-plan-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);

    expect(isRendererMountPlanReady(plan)).toBe(true);
    expect(plan).not.toHaveProperty("mounted");
    expect(plan).not.toHaveProperty("adapter");
    expect(plan).not.toHaveProperty("platform");
  });

  it("rejects incomplete Renderer mount plans as not ready", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "incomplete-plan-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "incomplete-plan-target",
      }),
    });

    const plan = createRendererMountPlan({
      name: "incomplete-plan",
      status: "planned",
      strategy: "platform-adapter",
      request,
      qualityGates: ["request", "output"],
    });

    expect(isRendererMountPlanReady(plan)).toBe(false);
  });

  it("keeps Renderer mount planning separate from adapter execution", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "no-exec-plan-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "no-exec-plan-target",
      }),
    });
    let mounted = false;
    const adapter = createRendererAdapter({
      name: "no-exec-plan-adapter",
      mount: mountRequest => {
        mounted = true;

        return createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        });
      },
    });

    const plan = createRendererMountPlan({
      name: "no-exec-plan",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });

    expect(isRendererMountPlanReady(plan)).toBe(true);
    expect(adapter.name).toBe("no-exec-plan-adapter");
    expect(mounted).toBe(false);
  });

  it("executes manual Renderer mount plans as unmounted planning results", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "manual-execution-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "manual-execution-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);

    await expect(executeRendererMountPlan({ plan })).resolves.toEqual({
      mounted: false,
      output: request.output,
      target: request.target,
    });
  });

  it("rejects incomplete Renderer mount plans during execution", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "incomplete-execution-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "incomplete-execution-target",
      }),
    });
    const plan = createRendererMountPlan({
      name: "incomplete-execution-plan",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates: ["request"],
    });

    await expect(Renderer.executeRendererMountPlan({ plan })).resolves.toEqual({
      mounted: false,
      output: request.output,
      target: request.target,
      error: "Renderer mount plan is not ready.",
    });
  });

  it("reports missing adapter resolutions for adapter Renderer mount plans", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "missing-adapter-plan-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "missing-adapter-plan-target",
      }),
    });
    const plan = createRendererMountPlan({
      name: "missing-adapter-plan",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });

    await expect(executeRendererMountPlan({ plan })).resolves.toEqual({
      mounted: false,
      output: request.output,
      target: request.target,
      error: "Renderer mount plan adapter resolution is missing.",
    });
  });

  it("executes adapter Renderer mount plans through resolved adapter choices", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "adapter-execution-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "adapter-execution-target",
      }),
    });
    const adapter = createRendererAdapter({
      name: "adapter-execution",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: adapter.name,
      adapters: [adapter],
    });
    const adapterResolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });
    const plan = createRendererMountPlan({
      name: "adapter-execution-plan",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });

    await expect(executeRendererMountPlan({ plan, adapterResolution })).resolves.toEqual({
      mounted: true,
      output: request.output,
      target: request.target,
    });
  });

  it("preserves adapter mount plan request references for rejected adapter executions", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "adapter-error-plan-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "adapter-error-plan-target",
      }),
    });
    const adapter = createRendererAdapter({
      name: "adapter-error-execution",
      mount: () => {
        throw new Error("planned adapter mount failed");
      },
    });
    const adapterResolution = createRendererAdapterConflictResolution({
      conflict: createRendererAdapterConflict({
        name: adapter.name,
        adapters: [adapter],
      }),
      resolved: true,
      adapter,
    });
    const plan = createRendererMountPlan({
      name: "adapter-error-plan",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });

    const result = await executeRendererMountPlan({ plan, adapterResolution });

    expect(result.output).toBe(request.output);
    expect(result.target).toBe(request.target);
    expect(result.error).toBe("planned adapter mount failed");
  });

  it("reports missing platform adapter resolutions for platform Renderer mount plans", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "missing-platform-plan-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "missing-platform-plan-target",
      }),
    });
    const plan = createRendererMountPlan({
      name: "missing-platform-plan",
      status: "planned",
      strategy: "platform-adapter",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });

    await expect(executeRendererMountPlan({ plan })).resolves.toEqual({
      mounted: false,
      output: request.output,
      target: request.target,
      error: "Renderer mount plan platform adapter resolution is missing.",
    });
  });

  it("executes platform Renderer mount plans through resolved platform adapter choices", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "platform-execution-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "platform-execution-target",
      }),
    });
    const adapter = createRendererAdapter({
      name: "platform-execution-adapter",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "platform-execution",
      adapter,
      capabilities: ["mount"],
    });
    const platformAdapterResolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: platformAdapter.platform,
        platformAdapters: [platformAdapter],
      }),
      resolved: true,
      platformAdapter,
    });
    const plan = createRendererMountPlan({
      name: "platform-execution-plan",
      status: "planned",
      strategy: "platform-adapter",
      request,
      qualityGates: ["request", "output", "target", "diagnostics"],
    });

    await expect(
      executeRendererMountPlan({ plan, platformAdapterResolution }),
    ).resolves.toEqual({
      mounted: true,
      output: request.output,
      target: request.target,
    });
  });

  it("keeps Renderer mount plan execution results free of plan metadata", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "metadata-free-plan-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "metadata-free-plan-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);

    const result = await executeRendererMountPlan({ plan });

    expect(result).not.toHaveProperty("plan");
    expect(result).not.toHaveProperty("strategy");
    expect(result).not.toHaveProperty("qualityGates");
    expect(result).not.toHaveProperty("platform");
    expect(result).not.toHaveProperty("theme");
    expect(result).not.toHaveProperty("homeAssistant");
  });

  it("creates Renderer mount lifecycle records from plans", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "lifecycle-plan-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "lifecycle-plan-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);

    const record = createRendererMountLifecycleRecord(plan);

    expect(record).toEqual({
      plan,
      state: "planned",
    });
    expect(record.plan).toBe(plan);
    expect(record).not.toHaveProperty("result");
    expect(record).not.toHaveProperty("report");
  });

  it("records Renderer mount lifecycle execution results", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "lifecycle-execution-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "lifecycle-execution-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);
    const record = createRendererMountLifecycleRecord(plan);
    const result = await executeRendererMountPlan({ plan });

    expect(recordRendererMountLifecycleExecution(record, result)).toEqual({
      plan,
      state: "executed",
      result,
    });
  });

  it("records Renderer mount lifecycle reports from execution results", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "lifecycle-report-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "lifecycle-report-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);
    const result = createRendererMountResult({
      mounted: false,
      output: request.output,
      target: request.target,
      error: "lifecycle mount failed",
    });
    const executed = recordRendererMountLifecycleExecution(
      createRendererMountLifecycleRecord(plan),
      result,
    );

    expect(recordRendererMountLifecycleReport(executed)).toEqual({
      plan,
      state: "reported",
      result,
      report: {
        context: {
          component: "renderer.mount",
        },
        result: {
          ok: false,
          issues: [{
            code: "renderer.mount.failed",
            message: "lifecycle mount failed",
            severity: "error",
          }],
        },
      },
    });
  });

  it("supports Renderer mount lifecycle reports before execution", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "lifecycle-pre-report-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "lifecycle-pre-report-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);
    const record = createRendererMountLifecycleRecord(plan);

    expect(Renderer.recordRendererMountLifecycleReport(record)).toEqual({
      plan,
      state: "reported",
      report: {
        context: {
          component: "renderer.mount",
        },
        result: {
          ok: true,
          issues: [],
        },
      },
    });
  });

  it("inspects Renderer mount lifecycle records", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "lifecycle-inspection-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "lifecycle-inspection-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);
    const result = createRendererMountResult({
      mounted: true,
      output: request.output,
      target: request.target,
    });
    const reported = recordRendererMountLifecycleReport(
      recordRendererMountLifecycleExecution(
        createRendererMountLifecycleRecord(plan),
        result,
      ),
    );

    expect(inspectRendererMountLifecycleRecord(reported)).toEqual({
      state: "reported",
      planName: "lifecycle-inspection-output->lifecycle-inspection-target",
      outputName: "lifecycle-inspection-output",
      targetName: "lifecycle-inspection-target",
      mounted: true,
      diagnosticsOk: true,
    });
  });

  it("keeps Renderer mount lifecycle records independent from integration metadata", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "lifecycle-boundary-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "lifecycle-boundary-target",
      }),
    });
    const record = createRendererMountLifecycleRecord(
      createDefaultRendererMountPlan(request),
    );

    expect(record).not.toHaveProperty("platform");
    expect(record).not.toHaveProperty("theme");
    expect(record).not.toHaveProperty("homeAssistant");
    expect(record).not.toHaveProperty("element");
  });

  it("creates Renderer mount reports from planned lifecycle records", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "report-planned-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "report-planned-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);

    expect(createRendererMountReport(
      createRendererMountLifecycleRecord(plan),
    )).toEqual({
      state: "planned",
      planName: "report-planned-output->report-planned-target",
      strategy: "manual",
      outputName: "report-planned-output",
      targetName: "report-planned-target",
      qualityGates: ["request", "output", "target", "diagnostics"],
      planned: true,
      executed: false,
      reported: false,
      issueCount: 0,
      issues: [],
    });
  });

  it("creates Renderer mount reports from executed lifecycle records", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "report-executed-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "report-executed-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);
    const result = createRendererMountResult({
      mounted: true,
      output: request.output,
      target: request.target,
    });

    expect(createRendererMountReport(
      recordRendererMountLifecycleExecution(
        createRendererMountLifecycleRecord(plan),
        result,
      ),
    )).toMatchObject({
      state: "executed",
      planned: false,
      executed: true,
      reported: false,
      mounted: true,
      issueCount: 0,
      issues: [],
    });
  });

  it("creates Renderer mount reports from reported lifecycle diagnostics", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "report-diagnostics-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "report-diagnostics-target",
      }),
    });
    const plan = createDefaultRendererMountPlan(request);
    const result = createRendererMountResult({
      mounted: false,
      output: request.output,
      target: request.target,
      error: "report diagnostics failed",
    });
    const report = createRendererMountReport(
      recordRendererMountLifecycleReport(
        recordRendererMountLifecycleExecution(
          createRendererMountLifecycleRecord(plan),
          result,
        ),
      ),
    );

    expect(report).toMatchObject({
      state: "reported",
      reported: true,
      mounted: false,
      diagnosticsOk: false,
      issueCount: 1,
    });
    expect(report.issues).toEqual([{
      code: "renderer.mount.failed",
      message: "report diagnostics failed",
      severity: "error",
    }]);
  });

  it("keeps Renderer mount report quality gates independent from source plans", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "report-gates-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "report-gates-target",
      }),
    });
    const qualityGates: RendererMountPlanQualityGate[] = ["request"];
    const plan = createRendererMountPlan({
      name: "report-gates-plan",
      status: "planned",
      strategy: "adapter",
      request,
      qualityGates,
    });

    const report = createRendererMountReport(
      createRendererMountLifecycleRecord(plan),
    );
    qualityGates.push("diagnostics");

    expect(report.qualityGates).toEqual(["request"]);
  });

  it("summarizes Renderer mount reports across lifecycle states", () => {
    const firstRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "summary-planned-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "summary-planned-target",
      }),
    });
    const secondRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "summary-executed-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "summary-executed-target",
      }),
    });
    const thirdRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "summary-reported-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "summary-reported-target",
      }),
    });
    const planned = createRendererMountLifecycleRecord(
      createDefaultRendererMountPlan(firstRequest),
    );
    const executed = recordRendererMountLifecycleExecution(
      createRendererMountLifecycleRecord(
        createDefaultRendererMountPlan(secondRequest),
      ),
      createRendererMountResult({
        mounted: true,
        output: secondRequest.output,
        target: secondRequest.target,
      }),
    );
    const reported = recordRendererMountLifecycleReport(
      recordRendererMountLifecycleExecution(
        createRendererMountLifecycleRecord(
          createDefaultRendererMountPlan(thirdRequest),
        ),
        createRendererMountResult({
          mounted: false,
          output: thirdRequest.output,
          target: thirdRequest.target,
          error: "summary failed",
        }),
      ),
    );

    expect(summarizeRendererMountReports([
      planned,
      executed,
      reported,
    ])).toEqual({
      total: 3,
      planned: 1,
      executed: 1,
      reported: 1,
      mounted: 1,
      diagnosticsOk: 0,
      failed: 1,
      issueCount: 1,
    });
  });

  it("reports empty Renderer mount report summaries", () => {
    expect(Renderer.summarizeRendererMountReports([])).toEqual({
      total: 0,
      planned: 0,
      executed: 0,
      reported: 0,
      mounted: 0,
      diagnosticsOk: 0,
      failed: 0,
      issueCount: 0,
    });
  });

  it("keeps Renderer mount reports independent from integration metadata", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "report-boundary-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "report-boundary-target",
      }),
    });
    const report = createRendererMountReport(
      createRendererMountLifecycleRecord(
        createDefaultRendererMountPlan(request),
      ),
    );

    expect(report).not.toHaveProperty("platform");
    expect(report).not.toHaveProperty("theme");
    expect(report).not.toHaveProperty("homeAssistant");
    expect(report).not.toHaveProperty("element");
  });

  it("creates Renderer mount report consumption views", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-target",
      }),
    });
    const record = createRendererMountLifecycleRecord(
      createDefaultRendererMountPlan(request),
    );

    expect(createRendererMountReportConsumption({
      records: [record],
    })).toEqual({
      reports: [{
        state: "planned",
        planName: "consumption-output->consumption-target",
        strategy: "manual",
        outputName: "consumption-output",
        targetName: "consumption-target",
        qualityGates: ["request", "output", "target", "diagnostics"],
        planned: true,
        executed: false,
        reported: false,
        issueCount: 0,
        issues: [],
      }],
      summary: {
        total: 1,
        planned: 1,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });
  });

  it("filters Renderer mount report consumption by lifecycle states", () => {
    const plannedRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-state-planned-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-state-planned-target",
      }),
    });
    const reportedRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-state-reported-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-state-reported-target",
      }),
    });
    const planned = createRendererMountLifecycleRecord(
      createDefaultRendererMountPlan(plannedRequest),
    );
    const reported = recordRendererMountLifecycleReport(
      createRendererMountLifecycleRecord(
        createDefaultRendererMountPlan(reportedRequest),
      ),
    );

    const consumption = createRendererMountReportConsumption({
      records: [planned, reported],
      filter: {
        states: ["reported"],
      },
    });

    expect(consumption.reports.map(report => report.state)).toEqual(["reported"]);
    expect(consumption.summary).toMatchObject({
      total: 1,
      planned: 0,
      reported: 1,
    });
  });

  it("filters Renderer mount report consumption by mounted state", () => {
    const mountedRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-mounted-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-mounted-target",
      }),
    });
    const unmountedRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-unmounted-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-unmounted-target",
      }),
    });
    const mounted = recordRendererMountLifecycleExecution(
      createRendererMountLifecycleRecord(
        createDefaultRendererMountPlan(mountedRequest),
      ),
      createRendererMountResult({
        mounted: true,
        output: mountedRequest.output,
        target: mountedRequest.target,
      }),
    );
    const unmounted = recordRendererMountLifecycleExecution(
      createRendererMountLifecycleRecord(
        createDefaultRendererMountPlan(unmountedRequest),
      ),
      createRendererMountResult({
        mounted: false,
        output: unmountedRequest.output,
        target: unmountedRequest.target,
      }),
    );

    const consumption = Renderer.createRendererMountReportConsumption({
      records: [mounted, unmounted],
      filter: {
        mounted: true,
      },
    });

    expect(consumption.reports.map(report => report.outputName)).toEqual([
      "consumption-mounted-output",
    ]);
    expect(consumption.summary.mounted).toBe(1);
  });

  it("filters Renderer mount report consumption by diagnostics status", () => {
    const okRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-ok-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-ok-target",
      }),
    });
    const failedRequest = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-failed-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-failed-target",
      }),
    });
    const ok = recordRendererMountLifecycleReport(
      recordRendererMountLifecycleExecution(
        createRendererMountLifecycleRecord(
          createDefaultRendererMountPlan(okRequest),
        ),
        createRendererMountResult({
          mounted: true,
          output: okRequest.output,
          target: okRequest.target,
        }),
      ),
    );
    const failed = recordRendererMountLifecycleReport(
      recordRendererMountLifecycleExecution(
        createRendererMountLifecycleRecord(
          createDefaultRendererMountPlan(failedRequest),
        ),
        createRendererMountResult({
          mounted: false,
          output: failedRequest.output,
          target: failedRequest.target,
          error: "consumption failed",
        }),
      ),
    );

    const consumption = createRendererMountReportConsumption({
      records: [ok, failed],
      filter: {
        diagnosticsOk: false,
      },
    });

    expect(consumption.reports.map(report => report.outputName)).toEqual([
      "consumption-failed-output",
    ]);
    expect(consumption.summary).toMatchObject({
      total: 1,
      failed: 1,
      issueCount: 1,
    });
  });

  it("keeps Renderer mount report consumption independent from source arrays", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-copy-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-copy-target",
      }),
    });
    const records = [
      createRendererMountLifecycleRecord(
        createDefaultRendererMountPlan(request),
      ),
    ];

    const consumption = createRendererMountReportConsumption({ records });
    records.push(recordRendererMountLifecycleReport(records[0]));

    expect(consumption.reports).toHaveLength(1);
    expect(consumption.summary.total).toBe(1);
  });

  it("reports empty Renderer mount report consumption views", () => {
    expect(createRendererMountReportConsumption({
      records: [],
      filter: {
        states: ["reported"],
        mounted: true,
        diagnosticsOk: true,
      },
    })).toEqual({
      reports: [],
      summary: {
        total: 0,
        planned: 0,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });
  });

  it("keeps Renderer mount report consumption free of integration metadata", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumption-boundary-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumption-boundary-target",
      }),
    });
    const consumption = createRendererMountReportConsumption({
      records: [
        createRendererMountLifecycleRecord(
          createDefaultRendererMountPlan(request),
        ),
      ],
    });

    expect(consumption).not.toHaveProperty("platform");
    expect(consumption).not.toHaveProperty("theme");
    expect(consumption).not.toHaveProperty("homeAssistant");
    expect(consumption).not.toHaveProperty("element");
  });

  it("creates Renderer mount report consumers", () => {
    const consumer = createRendererMountReportConsumer({
      name: "report-consumer",
      consume: consumption => ({
        consumerName: "report-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });

    expect(consumer.name).toBe("report-consumer");
    expect(consumer.consume).toBeTypeOf("function");
  });

  it("creates Renderer mount report consumers as immutable copies", () => {
    const source: RendererMountReportConsumer = {
      name: "copy-consumer",
      consume: consumption => ({
        consumerName: "copy-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    };

    const consumer = createRendererMountReportConsumer(source);

    expect(consumer).toEqual(source);
    expect(consumer).not.toBe(source);
    expect(consumer.consume).toBe(source.consume);
  });

  it("consumes Renderer mount report consumption views", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "consumer-output",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "consumer-target",
      }),
    });
    const consumption = createRendererMountReportConsumption({
      records: [
        createRendererMountLifecycleRecord(
          createDefaultRendererMountPlan(request),
        ),
      ],
    });
    const consumer = createRendererMountReportConsumer({
      name: "summary-consumer",
      consume: consumed => ({
        consumerName: "summary-consumer",
        consumed: consumed.summary.total === 1,
        summary: consumed.summary,
      }),
    });

    await expect(consumeRendererMountReports(
      consumer,
      consumption,
    )).resolves.toEqual({
      consumerName: "summary-consumer",
      consumed: true,
      summary: consumption.summary,
    });
  });

  it("supports asynchronous Renderer mount report consumers", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const consumer = createRendererMountReportConsumer({
      name: "async-consumer",
      async consume(consumed) {
        await Promise.resolve();

        return {
          consumerName: "async-consumer",
          consumed: true,
          summary: consumed.summary,
        };
      },
    });

    await expect(consumeRendererMountReports(
      consumer,
      consumption,
    )).resolves.toEqual({
      consumerName: "async-consumer",
      consumed: true,
      summary: consumption.summary,
    });
  });

  it("passes Renderer mount report consumption views to consumers by reference", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    let seen: RendererMountReportConsumption | undefined;
    const consumer = createRendererMountReportConsumer({
      name: "reference-consumer",
      consume(consumed) {
        seen = consumed;

        return {
          consumerName: "reference-consumer",
          consumed: consumed === consumption,
          summary: consumed.summary,
        };
      },
    });

    await consumeRendererMountReports(consumer, consumption);

    expect(seen).toBe(consumption);
  });

  it("preserves Renderer mount report consumer failure results", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const consumer = createRendererMountReportConsumer({
      name: "failure-consumer",
      consume: consumed => ({
        consumerName: "failure-consumer",
        consumed: false,
        summary: consumed.summary,
        error: "consumer rejected report set",
      }),
    });

    await expect(consumeRendererMountReports(
      consumer,
      consumption,
    )).resolves.toEqual({
      consumerName: "failure-consumer",
      consumed: false,
      summary: consumption.summary,
      error: "consumer rejected report set",
    });
  });

  it("consumes and inspects Renderer mount report consumers", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const consumer = createRendererMountReportConsumer({
      name: "execution-consumer",
      consume: consumed => ({
        consumerName: "execution-consumer",
        consumed: true,
        summary: consumed.summary,
      }),
    });

    await expect(consumeAndInspectRendererMountReports(
      consumer,
      consumption,
    )).resolves.toEqual({
      consumerName: "execution-consumer",
      result: {
        consumerName: "execution-consumer",
        consumed: true,
        summary: consumption.summary,
      },
      diagnostic: {
        context: {
          component: "renderer.mount.report.consumer",
          consumerName: "execution-consumer",
        },
        result: {
          ok: true,
          issues: [],
        },
      },
    });
  });

  it("consumes and inspects asynchronous Renderer mount report consumers", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const consumer = createRendererMountReportConsumer({
      name: "async-execution-consumer",
      async consume(consumed) {
        await Promise.resolve();

        return {
          consumerName: "async-execution-consumer",
          consumed: true,
          summary: consumed.summary,
        };
      },
    });

    const execution = await Renderer.consumeAndInspectRendererMountReports(
      consumer,
      consumption,
    );

    expect(execution.result.summary).toBe(consumption.summary);
    expect(execution.diagnostic.result.ok).toBe(true);
  });

  it("converts rejected Renderer mount report consumers into diagnostics", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const consumer = createRendererMountReportConsumer({
      name: "rejected-execution-consumer",
      consume() {
        throw new Error("consumer execution rejected");
      },
    });

    await expect(consumeAndInspectRendererMountReports(
      consumer,
      consumption,
    )).resolves.toEqual({
      consumerName: "rejected-execution-consumer",
      result: {
        consumerName: "rejected-execution-consumer",
        consumed: false,
        summary: consumption.summary,
        error: "consumer execution rejected",
      },
      diagnostic: {
        context: {
          component: "renderer.mount.report.consumer",
          consumerName: "rejected-execution-consumer",
        },
        result: {
          ok: false,
          issues: [{
            code: "renderer.mount.report.consumer.not_consumed",
            message: "rejected-execution-consumer did not consume Renderer mount reports",
            severity: "error",
          }, {
            code: "renderer.mount.report.consumer.failed",
            message: "consumer execution rejected",
            severity: "error",
          }],
        },
      },
    });
  });

  it("stringifies non-Error Renderer mount report consumer execution rejections", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const consumer = createRendererMountReportConsumer({
      name: "string-rejected-execution-consumer",
      async consume() {
        await Promise.resolve();

        throw "string consumer rejection";
      },
    });

    const execution = await consumeAndInspectRendererMountReports(
      consumer,
      consumption,
    );

    expect(execution.result.error).toBe("string consumer rejection");
    expect(execution.diagnostic.result.issues[1]?.message).toBe("string consumer rejection");
  });

  it("keeps Renderer mount report consumer diagnostic executions free of integration metadata", async () => {
    const execution = await consumeAndInspectRendererMountReports(
      createRendererMountReportConsumer({
        name: "boundary-execution-consumer",
        consume: consumption => ({
          consumerName: "boundary-execution-consumer",
          consumed: true,
          summary: consumption.summary,
        }),
      }),
      createRendererMountReportConsumption({
        records: [],
      }),
    );

    expect(execution).not.toHaveProperty("platform");
    expect(execution).not.toHaveProperty("theme");
    expect(execution).not.toHaveProperty("homeAssistant");
    expect(execution).not.toHaveProperty("element");
  });

  it("batch consumes and inspects Renderer mount report consumers", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const first = createRendererMountReportConsumer({
      name: "first-batch-consumer",
      consume: consumed => ({
        consumerName: "first-batch-consumer",
        consumed: true,
        summary: consumed.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "second-batch-consumer",
      consume: consumed => ({
        consumerName: "second-batch-consumer",
        consumed: false,
        summary: consumed.summary,
      }),
    });

    const batch = await consumeAndInspectRendererMountReportConsumers(
      [first, second],
      consumption,
    );

    expect(batch.executions.map(execution => execution.consumerName)).toEqual([
      "first-batch-consumer",
      "second-batch-consumer",
    ]);
    expect(batch.aggregation.context.consumerNames).toEqual([
      "first-batch-consumer",
      "second-batch-consumer",
    ]);
    expect(batch.summary).toEqual({
      ok: false,
      consumerCount: 2,
      okConsumerCount: 1,
      failedConsumerCount: 1,
      issueCount: 1,
    });
    expect(batch).not.toHaveProperty("policyEvaluation");
  });

  it("batch evaluates Renderer mount report consumer diagnostic policies", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const consumer = createRendererMountReportConsumer({
      name: "policy-batch-consumer",
      consume: consumed => ({
        consumerName: "policy-batch-consumer",
        consumed: false,
        summary: consumed.summary,
        error: "batch policy failed",
      }),
    });

    const batch = await Renderer.consumeAndInspectRendererMountReportConsumers(
      [consumer],
      consumption,
      {
        maxIssueCount: 1,
      },
    );

    expect(batch.policyEvaluation?.result).toEqual({
      ok: false,
      summary: batch.summary,
      issues: [{
        code: "renderer.mount.report.consumer.diagnostics.policy.consumer_failed",
        message: "1 Renderer mount report consumers failed diagnostics",
        severity: "error",
      }, {
        code: "renderer.mount.report.consumer.diagnostics.policy.issue_limit_exceeded",
        message: "Renderer mount report consumer diagnostics reported 2 issues, exceeding 1",
        severity: "error",
      }],
    });
  });

  it("reports empty Renderer mount report consumer diagnostic batches as ok", async () => {
    const batch = await consumeAndInspectRendererMountReportConsumers(
      [],
      createRendererMountReportConsumption({
        records: [],
      }),
      {
        maxIssueCount: 0,
      },
    );

    expect(batch.executions).toEqual([]);
    expect(batch.aggregation.result.ok).toBe(true);
    expect(batch.summary).toEqual({
      ok: true,
      consumerCount: 0,
      okConsumerCount: 0,
      failedConsumerCount: 0,
      issueCount: 0,
    });
    expect(batch.policyEvaluation?.result.ok).toBe(true);
  });

  it("keeps Renderer mount report consumer diagnostic batches free of integration metadata", async () => {
    const batch = await consumeAndInspectRendererMountReportConsumers(
      [],
      createRendererMountReportConsumption({
        records: [],
      }),
    );

    expect(batch).not.toHaveProperty("platform");
    expect(batch).not.toHaveProperty("theme");
    expect(batch).not.toHaveProperty("homeAssistant");
    expect(batch).not.toHaveProperty("element");
  });

  it("executes Renderer mount report consumer registries into diagnostic batches", async () => {
    const consumption = createRendererMountReportConsumption({
      records: [],
    });
    const first = createRendererMountReportConsumer({
      name: "first-registry-execution-consumer",
      consume: consumed => ({
        consumerName: "first-registry-execution-consumer",
        consumed: true,
        summary: consumed.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "second-registry-execution-consumer",
      consume: consumed => ({
        consumerName: "second-registry-execution-consumer",
        consumed: false,
        summary: consumed.summary,
      }),
    });
    const registry = createRendererMountReportConsumerRegistry([first, second]);

    const execution = await consumeAndInspectRendererMountReportConsumerRegistry(
      registry,
      consumption,
    );

    expect(execution.registry).toBe(registry);
    expect(execution.batch.executions.map(item => item.consumerName)).toEqual([
      "first-registry-execution-consumer",
      "second-registry-execution-consumer",
    ]);
    expect(execution.batch.summary.failedConsumerCount).toBe(1);
  });

  it("executes empty Renderer mount report consumer registries as successful batches", async () => {
    const execution = await Renderer.consumeAndInspectRendererMountReportConsumerRegistry(
      createRendererMountReportConsumerRegistry([]),
      createRendererMountReportConsumption({
        records: [],
      }),
    );

    expect(execution.batch.executions).toEqual([]);
    expect(execution.batch.summary).toEqual({
      ok: true,
      consumerCount: 0,
      okConsumerCount: 0,
      failedConsumerCount: 0,
      issueCount: 0,
    });
  });

  it("passes Renderer mount report consumer registry diagnostic policies to batches", async () => {
    const consumer = createRendererMountReportConsumer({
      name: "registry-policy-consumer",
      consume: consumption => ({
        consumerName: "registry-policy-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });

    const execution = await consumeAndInspectRendererMountReportConsumerRegistry(
      createRendererMountReportConsumerRegistry([consumer]),
      createRendererMountReportConsumption({
        records: [],
      }),
      {
        requireAllConsumersOk: false,
        maxIssueCount: 1,
      },
    );

    expect(execution.batch.policyEvaluation?.result.ok).toBe(true);
    expect(execution.batch.policyEvaluation?.result.summary).toBe(execution.batch.summary);
  });

  it("keeps Renderer mount report consumer registry diagnostic executions free of integration metadata", async () => {
    const execution = await consumeAndInspectRendererMountReportConsumerRegistry(
      createRendererMountReportConsumerRegistry([]),
      createRendererMountReportConsumption({
        records: [],
      }),
    );

    expect(execution).not.toHaveProperty("platform");
    expect(execution).not.toHaveProperty("theme");
    expect(execution).not.toHaveProperty("homeAssistant");
    expect(execution).not.toHaveProperty("element");
  });

  it("reviews successful Renderer mount report consumer registry diagnostic executions", async () => {
    const consumer = createRendererMountReportConsumer({
      name: "closure-success-consumer",
      consume: consumption => ({
        consumerName: "closure-success-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const execution = await consumeAndInspectRendererMountReportConsumerRegistry(
      createRendererMountReportConsumerRegistry([consumer]),
      createRendererMountReportConsumption({
        records: [],
      }),
      {
        maxIssueCount: 0,
      },
    );

    expect(reviewRendererMountReportConsumerDiagnosticRegistryExecution(execution)).toEqual({
      context: {
        component: "renderer.mount.report.consumer.registry.execution.closure",
      },
      result: {
        ok: true,
        registryConsumerCount: 1,
        executedConsumerCount: 1,
        conflictCount: 0,
        diagnosticsOk: true,
        policyOk: true,
        issues: [],
      },
    });
  });

  it("reports Renderer mount report consumer registry execution closure conflicts", async () => {
    const first = createRendererMountReportConsumer({
      name: "closure-conflict-consumer",
      consume: consumption => ({
        consumerName: "closure-conflict-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "closure-conflict-consumer",
      consume: consumption => ({
        consumerName: "closure-conflict-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const execution = await consumeAndInspectRendererMountReportConsumerRegistry(
      createRendererMountReportConsumerRegistry([first, second]),
      createRendererMountReportConsumption({
        records: [],
      }),
    );

    const closure = Renderer.reviewRendererMountReportConsumerDiagnosticRegistryExecution(execution);

    expect(closure.result.ok).toBe(false);
    expect(closure.result.conflictCount).toBe(1);
    expect(closure.result.issues).toEqual([{
      code: "renderer.mount.report.consumer.registry.execution.conflict",
      message: "closure-conflict-consumer has 2 Renderer mount report consumers",
      severity: "error",
    }]);
  });

  it("includes Renderer mount report consumer registry execution policy issues in closure", async () => {
    const consumer = createRendererMountReportConsumer({
      name: "closure-policy-consumer",
      consume: consumption => ({
        consumerName: "closure-policy-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const execution = await consumeAndInspectRendererMountReportConsumerRegistry(
      createRendererMountReportConsumerRegistry([consumer]),
      createRendererMountReportConsumption({
        records: [],
      }),
      {
        maxIssueCount: 0,
      },
    );

    const closure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(execution);

    expect(closure.result.policyOk).toBe(false);
    expect(closure.result.issues.map(issue => issue.code)).toEqual([
      "renderer.mount.report.consumer.not_consumed",
      "renderer.mount.report.consumer.diagnostics.policy.consumer_failed",
      "renderer.mount.report.consumer.diagnostics.policy.issue_limit_exceeded",
    ]);
  });

  it("keeps Renderer mount report consumer registry execution closures free of integration metadata", async () => {
    const closure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(
      await consumeAndInspectRendererMountReportConsumerRegistry(
        createRendererMountReportConsumerRegistry([]),
        createRendererMountReportConsumption({
          records: [],
        }),
      ),
    );

    expect(closure).not.toHaveProperty("platform");
    expect(closure).not.toHaveProperty("theme");
    expect(closure).not.toHaveProperty("homeAssistant");
    expect(closure).not.toHaveProperty("element");
  });

  it("creates ready Renderer mount report consumer diagnostic deliveries", async () => {
    const closure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(
      await consumeAndInspectRendererMountReportConsumerRegistry(
        createRendererMountReportConsumerRegistry([]),
        createRendererMountReportConsumption({
          records: [],
        }),
      ),
    );

    expect(createRendererMountReportConsumerDiagnosticDelivery(
      "ready-delivery",
      closure,
    )).toEqual({
      kind: "renderer.mount.report.consumer.diagnostics.delivery",
      name: "ready-delivery",
      ready: true,
      issueCount: 0,
      closure,
    });
  });

  it("creates blocked Renderer mount report consumer diagnostic deliveries from closure issues", async () => {
    const consumer = createRendererMountReportConsumer({
      name: "blocked-delivery-consumer",
      consume: consumption => ({
        consumerName: "blocked-delivery-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const closure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(
      await consumeAndInspectRendererMountReportConsumerRegistry(
        createRendererMountReportConsumerRegistry([consumer]),
        createRendererMountReportConsumption({
          records: [],
        }),
      ),
    );

    const delivery = Renderer.createRendererMountReportConsumerDiagnosticDelivery(
      "blocked-delivery",
      closure,
    );

    expect(delivery.ready).toBe(false);
    expect(delivery.issueCount).toBe(1);
    expect(delivery.closure).toBe(closure);
  });

  it("preserves explicit empty Renderer mount report consumer diagnostic delivery names", async () => {
    const closure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(
      await consumeAndInspectRendererMountReportConsumerRegistry(
        createRendererMountReportConsumerRegistry([]),
        createRendererMountReportConsumption({
          records: [],
        }),
      ),
    );

    expect(createRendererMountReportConsumerDiagnosticDelivery("", closure).name).toBe("");
  });

  it("keeps Renderer mount report consumer diagnostic deliveries free of integration metadata", async () => {
    const delivery = createRendererMountReportConsumerDiagnosticDelivery(
      "boundary-delivery",
      reviewRendererMountReportConsumerDiagnosticRegistryExecution(
        await consumeAndInspectRendererMountReportConsumerRegistry(
          createRendererMountReportConsumerRegistry([]),
          createRendererMountReportConsumption({
            records: [],
          }),
        ),
      ),
    );

    expect(delivery).not.toHaveProperty("platform");
    expect(delivery).not.toHaveProperty("theme");
    expect(delivery).not.toHaveProperty("homeAssistant");
    expect(delivery).not.toHaveProperty("element");
  });

  it("creates empty Renderer mount report consumer diagnostic delivery manifests", () => {
    expect(createRendererMountReportConsumerDiagnosticDeliveryManifest(
      "empty-manifest",
      [],
    )).toEqual({
      kind: "renderer.mount.report.consumer.diagnostics.delivery.manifest",
      name: "empty-manifest",
      deliveries: [],
      readyCount: 0,
      blockedCount: 0,
      issueCount: 0,
    });
  });

  it("summarizes Renderer mount report consumer diagnostic delivery manifests", async () => {
    const readyClosure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(
      await consumeAndInspectRendererMountReportConsumerRegistry(
        createRendererMountReportConsumerRegistry([]),
        createRendererMountReportConsumption({
          records: [],
        }),
      ),
    );
    const blockedConsumer = createRendererMountReportConsumer({
      name: "manifest-blocked-consumer",
      consume: consumption => ({
        consumerName: "manifest-blocked-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const blockedClosure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(
      await consumeAndInspectRendererMountReportConsumerRegistry(
        createRendererMountReportConsumerRegistry([blockedConsumer]),
        createRendererMountReportConsumption({
          records: [],
        }),
      ),
    );
    const readyDelivery = createRendererMountReportConsumerDiagnosticDelivery(
      "ready-manifest-delivery",
      readyClosure,
    );
    const blockedDelivery = createRendererMountReportConsumerDiagnosticDelivery(
      "blocked-manifest-delivery",
      blockedClosure,
    );

    expect(Renderer.createRendererMountReportConsumerDiagnosticDeliveryManifest(
      "mixed-manifest",
      [readyDelivery, blockedDelivery],
    )).toEqual({
      kind: "renderer.mount.report.consumer.diagnostics.delivery.manifest",
      name: "mixed-manifest",
      deliveries: [readyDelivery, blockedDelivery],
      readyCount: 1,
      blockedCount: 1,
      issueCount: 1,
    });
  });

  it("keeps Renderer mount report consumer diagnostic delivery manifests independent from source arrays", async () => {
    const closure = reviewRendererMountReportConsumerDiagnosticRegistryExecution(
      await consumeAndInspectRendererMountReportConsumerRegistry(
        createRendererMountReportConsumerRegistry([]),
        createRendererMountReportConsumption({
          records: [],
        }),
      ),
    );
    const first = createRendererMountReportConsumerDiagnosticDelivery(
      "first-manifest-delivery",
      closure,
    );
    const second = createRendererMountReportConsumerDiagnosticDelivery(
      "second-manifest-delivery",
      closure,
    );
    const deliveries = [first];

    const manifest = createRendererMountReportConsumerDiagnosticDeliveryManifest(
      "copy-manifest",
      deliveries,
    );
    deliveries.push(second);

    expect(manifest.deliveries).toEqual([first]);
  });

  it("keeps Renderer mount report consumer diagnostic delivery manifests free of integration metadata", () => {
    const manifest = createRendererMountReportConsumerDiagnosticDeliveryManifest(
      "boundary-manifest",
      [],
    );

    expect(manifest).not.toHaveProperty("platform");
    expect(manifest).not.toHaveProperty("theme");
    expect(manifest).not.toHaveProperty("homeAssistant");
    expect(manifest).not.toHaveProperty("element");
  });

  it("reviews successful Renderer mount report consumer diagnostic delivery manifests", () => {
    expect(reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
      createRendererMountReportConsumerDiagnosticDeliveryManifest("ready-manifest", []),
    )).toEqual({
      context: {
        component: "renderer.mount.report.consumer.diagnostics.delivery.manifest.closure",
        manifestName: "ready-manifest",
      },
      result: {
        ok: true,
        deliveryCount: 0,
        readyCount: 0,
        blockedCount: 0,
        issueCount: 0,
        issues: [],
      },
    });
  });

  it("reviews blocked Renderer mount report consumer diagnostic delivery manifests", async () => {
    const consumer = createRendererMountReportConsumer({
      name: "blocked-manifest-closure-consumer",
      consume: consumption => ({
        consumerName: "blocked-manifest-closure-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const delivery = createRendererMountReportConsumerDiagnosticDelivery(
      "blocked-manifest-closure-delivery",
      reviewRendererMountReportConsumerDiagnosticRegistryExecution(
        await consumeAndInspectRendererMountReportConsumerRegistry(
          createRendererMountReportConsumerRegistry([consumer]),
          createRendererMountReportConsumption({
            records: [],
          }),
        ),
      ),
    );

    const closure = Renderer.reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
      createRendererMountReportConsumerDiagnosticDeliveryManifest("blocked-manifest", [delivery]),
    );

    expect(closure.result.ok).toBe(false);
    expect(closure.result.deliveryCount).toBe(1);
    expect(closure.result.blockedCount).toBe(1);
    expect(closure.result.issues).toEqual(delivery.closure.result.issues);
  });

  it("keeps Renderer mount report consumer diagnostic delivery manifest closures free of integration metadata", () => {
    const closure = reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
      createRendererMountReportConsumerDiagnosticDeliveryManifest("boundary-manifest-closure", []),
    );

    expect(closure).not.toHaveProperty("platform");
    expect(closure).not.toHaveProperty("theme");
    expect(closure).not.toHaveProperty("homeAssistant");
    expect(closure).not.toHaveProperty("element");
  });

  it("creates empty Renderer mount report consumer diagnostic delivery bundles", () => {
    expect(createRendererMountReportConsumerDiagnosticDeliveryBundle(
      "empty-bundle",
      [],
    )).toEqual({
      kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle",
      name: "empty-bundle",
      ready: true,
      manifestCount: 0,
      issueCount: 0,
      closures: [],
    });
  });

  it("creates blocked Renderer mount report consumer diagnostic delivery bundles", async () => {
    const consumer = createRendererMountReportConsumer({
      name: "bundle-blocked-consumer",
      consume: consumption => ({
        consumerName: "bundle-blocked-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const closure = reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
      createRendererMountReportConsumerDiagnosticDeliveryManifest("blocked-bundle-manifest", [
        createRendererMountReportConsumerDiagnosticDelivery(
          "blocked-bundle-delivery",
          reviewRendererMountReportConsumerDiagnosticRegistryExecution(
            await consumeAndInspectRendererMountReportConsumerRegistry(
              createRendererMountReportConsumerRegistry([consumer]),
              createRendererMountReportConsumption({
                records: [],
              }),
            ),
          ),
        ),
      ]),
    );

    const bundle = Renderer.createRendererMountReportConsumerDiagnosticDeliveryBundle(
      "blocked-bundle",
      [closure],
    );

    expect(bundle.ready).toBe(false);
    expect(bundle.manifestCount).toBe(1);
    expect(bundle.issueCount).toBe(1);
  });

  it("keeps Renderer mount report consumer diagnostic delivery bundles independent from source arrays", () => {
    const closure = reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
      createRendererMountReportConsumerDiagnosticDeliveryManifest("copy-bundle-manifest", []),
    );
    const closures = [closure];

    const bundle = createRendererMountReportConsumerDiagnosticDeliveryBundle(
      "copy-bundle",
      closures,
    );
    closures.push(closure);

    expect(bundle.closures).toEqual([closure]);
  });

  it("keeps Renderer mount report consumer diagnostic delivery bundles free of integration metadata", () => {
    const bundle = createRendererMountReportConsumerDiagnosticDeliveryBundle(
      "boundary-bundle",
      [],
    );

    expect(bundle).not.toHaveProperty("platform");
    expect(bundle).not.toHaveProperty("theme");
    expect(bundle).not.toHaveProperty("homeAssistant");
    expect(bundle).not.toHaveProperty("element");
  });

  it("snapshots Renderer mount report consumer diagnostic delivery bundles", () => {
    const closure = reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
      createRendererMountReportConsumerDiagnosticDeliveryManifest("snapshot-manifest", []),
    );

    expect(snapshotRendererMountReportConsumerDiagnosticDeliveryBundle(
      createRendererMountReportConsumerDiagnosticDeliveryBundle("snapshot-bundle", [closure]),
    )).toEqual({
      kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle.snapshot",
      bundleName: "snapshot-bundle",
      ready: true,
      manifestCount: 1,
      issueCount: 0,
      manifestNames: ["snapshot-manifest"],
    });
  });

  it("snapshots blocked Renderer mount report consumer diagnostic delivery bundles", async () => {
    const consumer = createRendererMountReportConsumer({
      name: "snapshot-blocked-consumer",
      consume: consumption => ({
        consumerName: "snapshot-blocked-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const closure = reviewRendererMountReportConsumerDiagnosticDeliveryManifest(
      createRendererMountReportConsumerDiagnosticDeliveryManifest("blocked-snapshot-manifest", [
        createRendererMountReportConsumerDiagnosticDelivery(
          "blocked-snapshot-delivery",
          reviewRendererMountReportConsumerDiagnosticRegistryExecution(
            await consumeAndInspectRendererMountReportConsumerRegistry(
              createRendererMountReportConsumerRegistry([consumer]),
              createRendererMountReportConsumption({
                records: [],
              }),
            ),
          ),
        ),
      ]),
    );

    const snapshot = Renderer.snapshotRendererMountReportConsumerDiagnosticDeliveryBundle(
      createRendererMountReportConsumerDiagnosticDeliveryBundle("blocked-snapshot-bundle", [closure]),
    );

    expect(snapshot.ready).toBe(false);
    expect(snapshot.issueCount).toBe(1);
  });

  it("keeps Renderer mount report consumer diagnostic delivery bundle snapshots free of integration metadata", () => {
    const snapshot = snapshotRendererMountReportConsumerDiagnosticDeliveryBundle(
      createRendererMountReportConsumerDiagnosticDeliveryBundle("boundary-snapshot-bundle", []),
    );

    expect(snapshot).not.toHaveProperty("platform");
    expect(snapshot).not.toHaveProperty("theme");
    expect(snapshot).not.toHaveProperty("homeAssistant");
    expect(snapshot).not.toHaveProperty("element");
  });

  it("creates empty Renderer mount report consumer diagnostic delivery snapshot catalogs", () => {
    expect(createRendererMountReportConsumerDiagnosticDeliverySnapshotCatalog(
      "empty-catalog",
      [],
    )).toEqual({
      kind: "renderer.mount.report.consumer.diagnostics.delivery.snapshot.catalog",
      name: "empty-catalog",
      snapshots: [],
      readyCount: 0,
      blockedCount: 0,
      issueCount: 0,
    });
  });

  it("summarizes Renderer mount report consumer diagnostic delivery snapshot catalogs", () => {
    const ready = snapshotRendererMountReportConsumerDiagnosticDeliveryBundle(
      createRendererMountReportConsumerDiagnosticDeliveryBundle("ready-catalog-bundle", []),
    );
    const blocked: RendererMountReportConsumerDiagnosticDeliveryBundleSnapshot = {
      kind: "renderer.mount.report.consumer.diagnostics.delivery.bundle.snapshot",
      bundleName: "blocked-catalog-bundle",
      ready: false,
      manifestCount: 1,
      issueCount: 2,
      manifestNames: ["blocked-catalog-manifest"],
    };

    expect(Renderer.createRendererMountReportConsumerDiagnosticDeliverySnapshotCatalog(
      "mixed-catalog",
      [ready, blocked],
    )).toEqual({
      kind: "renderer.mount.report.consumer.diagnostics.delivery.snapshot.catalog",
      name: "mixed-catalog",
      snapshots: [ready, blocked],
      readyCount: 1,
      blockedCount: 1,
      issueCount: 2,
    });
  });

  it("keeps Renderer mount report consumer diagnostic delivery snapshot catalogs independent from source arrays", () => {
    const snapshot = snapshotRendererMountReportConsumerDiagnosticDeliveryBundle(
      createRendererMountReportConsumerDiagnosticDeliveryBundle("copy-catalog-bundle", []),
    );
    const snapshots = [snapshot];

    const catalog = createRendererMountReportConsumerDiagnosticDeliverySnapshotCatalog(
      "copy-catalog",
      snapshots,
    );
    snapshots.push(snapshot);

    expect(catalog.snapshots).toEqual([snapshot]);
  });

  it("keeps Renderer mount report consumer diagnostic delivery snapshot catalogs free of integration metadata", () => {
    const catalog = createRendererMountReportConsumerDiagnosticDeliverySnapshotCatalog(
      "boundary-catalog",
      [],
    );

    expect(catalog).not.toHaveProperty("platform");
    expect(catalog).not.toHaveProperty("theme");
    expect(catalog).not.toHaveProperty("homeAssistant");
    expect(catalog).not.toHaveProperty("element");
  });

  it("keeps Renderer mount report consumers free of integration metadata", () => {
    const consumer = createRendererMountReportConsumer({
      name: "boundary-consumer",
      consume: consumption => ({
        consumerName: "boundary-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });

    expect(consumer).not.toHaveProperty("platform");
    expect(consumer).not.toHaveProperty("theme");
    expect(consumer).not.toHaveProperty("homeAssistant");
    expect(consumer).not.toHaveProperty("element");
  });

  it("creates Renderer mount report consumer registries", () => {
    const consumer = createRendererMountReportConsumer({
      name: "registry-consumer",
      consume: consumption => ({
        consumerName: "registry-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });

    expect(createRendererMountReportConsumerRegistry([consumer])).toEqual({
      consumers: [consumer],
    });
  });

  it("keeps Renderer mount report consumer registries independent from source arrays", () => {
    const first = createRendererMountReportConsumer({
      name: "first-registry-consumer",
      consume: consumption => ({
        consumerName: "first-registry-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "second-registry-consumer",
      consume: consumption => ({
        consumerName: "second-registry-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const consumers = [first];

    const registry = createRendererMountReportConsumerRegistry(consumers);
    consumers.push(second);

    expect(registry.consumers).toEqual([first]);
  });

  it("creates Renderer mount report consumer lookup requests and results", () => {
    const consumer = createRendererMountReportConsumer({
      name: "lookup-shape-consumer",
      consume: consumption => ({
        consumerName: "lookup-shape-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });

    expect(createRendererMountReportConsumerLookupRequest({
      name: consumer.name,
    })).toEqual({
      name: "lookup-shape-consumer",
    });
    expect(createRendererMountReportConsumerLookupResult({
      name: consumer.name,
      consumer,
    })).toEqual({
      name: "lookup-shape-consumer",
      consumer,
    });
  });

  it("finds Renderer mount report consumers by name", () => {
    const consumer = createRendererMountReportConsumer({
      name: "lookup-consumer",
      consume: consumption => ({
        consumerName: "lookup-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const registry = createRendererMountReportConsumerRegistry([consumer]);

    expect(findRendererMountReportConsumer(
      registry,
      createRendererMountReportConsumerLookupRequest({
        name: "lookup-consumer",
      }),
    )).toEqual({
      name: "lookup-consumer",
      consumer,
    });
  });

  it("reports missing Renderer mount report consumers", () => {
    const registry = createRendererMountReportConsumerRegistry([]);

    expect(Renderer.findRendererMountReportConsumer(
      registry,
      createRendererMountReportConsumerLookupRequest({
        name: "missing-consumer",
      }),
    )).toEqual({
      name: "missing-consumer",
    });
  });

  it("creates Renderer mount report consumer selection requests and results", () => {
    const consumer = createRendererMountReportConsumer({
      name: "selection-shape-consumer",
      consume: consumption => ({
        consumerName: "selection-shape-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });

    expect(createRendererMountReportConsumerSelectionRequest({
      name: consumer.name,
      candidates: [consumer],
    })).toEqual({
      name: "selection-shape-consumer",
      candidates: [consumer],
    });
    expect(createRendererMountReportConsumerSelectionResult({
      name: consumer.name,
      consumer,
    })).toEqual({
      name: "selection-shape-consumer",
      consumer,
    });
  });

  it("keeps Renderer mount report consumer selection candidates independent from source arrays", () => {
    const first = createRendererMountReportConsumer({
      name: "candidate-consumer",
      consume: consumption => ({
        consumerName: "candidate-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "candidate-consumer",
      consume: consumption => ({
        consumerName: "candidate-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const candidates = [first];

    const request = createRendererMountReportConsumerSelectionRequest({
      name: "candidate-consumer",
      candidates,
    });
    candidates.push(second);

    expect(request.candidates).toEqual([first]);
  });

  it("selects the first Renderer mount report consumer candidate", () => {
    const first = createRendererMountReportConsumer({
      name: "first-candidate-consumer",
      consume: consumption => ({
        consumerName: "first-candidate-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "second-candidate-consumer",
      consume: consumption => ({
        consumerName: "second-candidate-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });

    expect(selectFirstRendererMountReportConsumerCandidate(
      createRendererMountReportConsumerSelectionRequest({
        name: "candidate-consumer",
        candidates: [first, second],
      }),
    )).toEqual({
      name: "candidate-consumer",
      consumer: first,
    });
  });

  it("selects Renderer mount report consumer candidates without consuming reports", () => {
    let consumed = false;
    const consumer = createRendererMountReportConsumer({
      name: "no-consume-selection-consumer",
      consume: consumption => {
        consumed = true;

        return {
          consumerName: "no-consume-selection-consumer",
          consumed: true,
          summary: consumption.summary,
        };
      },
    });

    const result = selectFirstRendererMountReportConsumerCandidate(
      createRendererMountReportConsumerSelectionRequest({
        name: consumer.name,
        candidates: [consumer],
      }),
    );

    expect(result.consumer).toBe(consumer);
    expect(consumed).toBe(false);
  });

  it("reports missing Renderer mount report consumer selection candidates", () => {
    expect(selectFirstRendererMountReportConsumerCandidate(
      createRendererMountReportConsumerSelectionRequest({
        name: "missing-selection-consumer",
        candidates: [],
      }),
    )).toEqual({
      name: "missing-selection-consumer",
    });
  });

  it("keeps Renderer mount report consumer registries free of integration metadata", () => {
    const registry = createRendererMountReportConsumerRegistry([]);

    expect(registry).not.toHaveProperty("platform");
    expect(registry).not.toHaveProperty("theme");
    expect(registry).not.toHaveProperty("homeAssistant");
    expect(registry).not.toHaveProperty("element");
  });

  it("creates Renderer mount report consumer conflicts", () => {
    const first = createRendererMountReportConsumer({
      name: "conflict-consumer",
      consume: consumption => ({
        consumerName: "conflict-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "conflict-consumer",
      consume: consumption => ({
        consumerName: "conflict-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });

    expect(createRendererMountReportConsumerConflict({
      name: "conflict-consumer",
      consumers: [first, second],
    })).toEqual({
      name: "conflict-consumer",
      consumers: [first, second],
    });
  });

  it("keeps Renderer mount report consumer conflict consumers independent from source arrays", () => {
    const first = createRendererMountReportConsumer({
      name: "copy-conflict-consumer",
      consume: consumption => ({
        consumerName: "copy-conflict-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "copy-conflict-consumer",
      consume: consumption => ({
        consumerName: "copy-conflict-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const consumers = [first];

    const conflict = createRendererMountReportConsumerConflict({
      name: "copy-conflict-consumer",
      consumers,
    });
    consumers.push(second);

    expect(conflict.consumers).toEqual([first]);
  });

  it("finds Renderer mount report consumer registry conflicts", () => {
    const first = createRendererMountReportConsumer({
      name: "duplicate-consumer",
      consume: consumption => ({
        consumerName: "duplicate-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "duplicate-consumer",
      consume: consumption => ({
        consumerName: "duplicate-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const unique = createRendererMountReportConsumer({
      name: "unique-consumer",
      consume: consumption => ({
        consumerName: "unique-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });

    expect(findRendererMountReportConsumerConflicts(
      createRendererMountReportConsumerRegistry([first, unique, second]),
    )).toEqual([{
      name: "duplicate-consumer",
      consumers: [first, second],
    }]);
  });

  it("reports no Renderer mount report consumer conflicts for unique registries", () => {
    const registry = createRendererMountReportConsumerRegistry([
      createRendererMountReportConsumer({
        name: "first-unique-consumer",
        consume: consumption => ({
          consumerName: "first-unique-consumer",
          consumed: true,
          summary: consumption.summary,
        }),
      }),
      createRendererMountReportConsumer({
        name: "second-unique-consumer",
        consume: consumption => ({
          consumerName: "second-unique-consumer",
          consumed: true,
          summary: consumption.summary,
        }),
      }),
    ]);

    expect(Renderer.findRendererMountReportConsumerConflicts(registry)).toEqual([]);
  });

  it("creates Renderer mount report consumer conflict resolutions", () => {
    const consumer = createRendererMountReportConsumer({
      name: "resolution-consumer",
      consume: consumption => ({
        consumerName: "resolution-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const conflict = createRendererMountReportConsumerConflict({
      name: consumer.name,
      consumers: [consumer],
    });

    expect(createRendererMountReportConsumerConflictResolution({
      conflict,
      resolved: true,
      consumer,
    })).toEqual({
      conflict,
      resolved: true,
      consumer,
    });
  });

  it("resolves Renderer mount report consumer conflicts with first candidates", () => {
    const first = createRendererMountReportConsumer({
      name: "resolved-consumer",
      consume: consumption => ({
        consumerName: "resolved-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "resolved-consumer",
      consume: consumption => ({
        consumerName: "resolved-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });
    const conflict = createRendererMountReportConsumerConflict({
      name: "resolved-consumer",
      consumers: [first, second],
    });

    expect(resolveRendererMountReportConsumerConflictWithFirstCandidate(
      conflict,
    )).toEqual({
      conflict,
      resolved: true,
      consumer: first,
    });
  });

  it("resolves Renderer mount report consumer registry conflicts with first candidates", () => {
    const first = createRendererMountReportConsumer({
      name: "registry-resolution-consumer",
      consume: consumption => ({
        consumerName: "registry-resolution-consumer",
        consumed: true,
        summary: consumption.summary,
      }),
    });
    const second = createRendererMountReportConsumer({
      name: "registry-resolution-consumer",
      consume: consumption => ({
        consumerName: "registry-resolution-consumer",
        consumed: false,
        summary: consumption.summary,
      }),
    });

    expect(resolveRendererMountReportConsumerRegistryConflictsWithFirstCandidate(
      createRendererMountReportConsumerRegistry([first, second]),
    )).toEqual([{
      conflict: {
        name: "registry-resolution-consumer",
        consumers: [first, second],
      },
      resolved: true,
      consumer: first,
    }]);
  });

  it("resolves Renderer mount report consumer conflicts without consuming reports", () => {
    let consumed = false;
    const consumer = createRendererMountReportConsumer({
      name: "no-consume-conflict-consumer",
      consume: consumption => {
        consumed = true;

        return {
          consumerName: "no-consume-conflict-consumer",
          consumed: true,
          summary: consumption.summary,
        };
      },
    });

    resolveRendererMountReportConsumerConflictWithFirstCandidate({
      name: consumer.name,
      consumers: [consumer, consumer],
    });

    expect(consumed).toBe(false);
  });

  it("keeps Renderer mount report consumer conflicts free of integration metadata", () => {
    const conflict = createRendererMountReportConsumerConflict({
      name: "boundary-conflict-consumer",
      consumers: [],
    });

    expect(conflict).not.toHaveProperty("platform");
    expect(conflict).not.toHaveProperty("theme");
    expect(conflict).not.toHaveProperty("homeAssistant");
    expect(conflict).not.toHaveProperty("element");
  });

  it("inspects successful Renderer mount report consumer results", () => {
    const summary: RendererMountReportSummary = {
      total: 0,
      planned: 0,
      executed: 0,
      reported: 0,
      mounted: 0,
      diagnosticsOk: 0,
      failed: 0,
      issueCount: 0,
    };

    expect(inspectRendererMountReportConsumerResult({
      consumerName: "diagnostic-success-consumer",
      consumed: true,
      summary,
    })).toEqual({
      context: {
        component: "renderer.mount.report.consumer",
        consumerName: "diagnostic-success-consumer",
      },
      result: {
        ok: true,
        issues: [],
      },
    });
  });

  it("inspects unconsumed Renderer mount report consumer results", () => {
    const summary: RendererMountReportSummary = {
      total: 1,
      planned: 1,
      executed: 0,
      reported: 0,
      mounted: 0,
      diagnosticsOk: 0,
      failed: 0,
      issueCount: 0,
    };

    expect(inspectRendererMountReportConsumerResult({
      consumerName: "diagnostic-unconsumed-consumer",
      consumed: false,
      summary,
    })).toEqual({
      context: {
        component: "renderer.mount.report.consumer",
        consumerName: "diagnostic-unconsumed-consumer",
      },
      result: {
        ok: false,
        issues: [{
          code: "renderer.mount.report.consumer.not_consumed",
          message: "diagnostic-unconsumed-consumer did not consume Renderer mount reports",
          severity: "error",
        }],
      },
    });
  });

  it("inspects failed Renderer mount report consumer results", () => {
    const summary: RendererMountReportSummary = {
      total: 1,
      planned: 0,
      executed: 0,
      reported: 1,
      mounted: 0,
      diagnosticsOk: 0,
      failed: 1,
      issueCount: 1,
    };

    const report = inspectRendererMountReportConsumerResult({
      consumerName: "diagnostic-failed-consumer",
      consumed: false,
      summary,
      error: "consumer diagnostics failed",
    });

    expect(report.result.ok).toBe(false);
    expect(report.result.issues).toEqual([{
      code: "renderer.mount.report.consumer.not_consumed",
      message: "diagnostic-failed-consumer did not consume Renderer mount reports",
      severity: "error",
    }, {
      code: "renderer.mount.report.consumer.failed",
      message: "consumer diagnostics failed",
      severity: "error",
    }]);
  });

  it("keeps Renderer mount report consumer diagnostics free of integration metadata", () => {
    const report = inspectRendererMountReportConsumerResult({
      consumerName: "diagnostic-boundary-consumer",
      consumed: true,
      summary: {
        total: 0,
        planned: 0,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });

    expect(report).not.toHaveProperty("platform");
    expect(report).not.toHaveProperty("theme");
    expect(report).not.toHaveProperty("homeAssistant");
    expect(report).not.toHaveProperty("element");
  });

  it("aggregates Renderer mount report consumer diagnostics", () => {
    const first = inspectRendererMountReportConsumerResult({
      consumerName: "first-aggregate-consumer",
      consumed: true,
      summary: {
        total: 0,
        planned: 0,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });
    const second = inspectRendererMountReportConsumerResult({
      consumerName: "second-aggregate-consumer",
      consumed: false,
      summary: {
        total: 1,
        planned: 1,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });

    expect(aggregateRendererMountReportConsumerDiagnostics([first, second])).toEqual({
      context: {
        component: "renderer.mount.report.consumer.diagnostics",
        consumerNames: [
          "first-aggregate-consumer",
          "second-aggregate-consumer",
        ],
      },
      result: {
        ok: false,
        reports: [first, second],
        issues: second.result.issues,
      },
    });
  });

  it("reports empty Renderer mount report consumer diagnostic aggregations as ok", () => {
    expect(aggregateRendererMountReportConsumerDiagnostics([])).toEqual({
      context: {
        component: "renderer.mount.report.consumer.diagnostics",
        consumerNames: [],
      },
      result: {
        ok: true,
        reports: [],
        issues: [],
      },
    });
  });

  it("preserves Renderer mount report consumer diagnostic aggregation order", () => {
    const first = inspectRendererMountReportConsumerResult({
      consumerName: "first-order-consumer",
      consumed: false,
      summary: {
        total: 1,
        planned: 1,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });
    const second = inspectRendererMountReportConsumerResult({
      consumerName: "second-order-consumer",
      consumed: false,
      summary: {
        total: 1,
        planned: 1,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
      error: "second consumer failed",
    });

    const aggregation = Renderer.aggregateRendererMountReportConsumerDiagnostics([
      first,
      second,
    ]);

    expect(aggregation.context.consumerNames).toEqual([
      "first-order-consumer",
      "second-order-consumer",
    ]);
    expect(aggregation.result.issues.map(issue => issue.message)).toEqual([
      "first-order-consumer did not consume Renderer mount reports",
      "second-order-consumer did not consume Renderer mount reports",
      "second consumer failed",
    ]);
  });

  it("copies Renderer mount report consumer diagnostic aggregations from source arrays", () => {
    const report = inspectRendererMountReportConsumerResult({
      consumerName: "copy-aggregate-consumer",
      consumed: true,
      summary: {
        total: 0,
        planned: 0,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });
    const reports = [report];

    const aggregation = aggregateRendererMountReportConsumerDiagnostics(reports);
    reports.push(inspectRendererMountReportConsumerResult({
      consumerName: "late-aggregate-consumer",
      consumed: false,
      summary: {
        total: 0,
        planned: 0,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    }));

    expect(aggregation.context.consumerNames).toEqual(["copy-aggregate-consumer"]);
    expect(aggregation.result.reports).toEqual([report]);
  });

  it("keeps Renderer mount report consumer diagnostic aggregations free of integration metadata", () => {
    const aggregation = aggregateRendererMountReportConsumerDiagnostics([]);

    expect(aggregation).not.toHaveProperty("platform");
    expect(aggregation).not.toHaveProperty("theme");
    expect(aggregation).not.toHaveProperty("homeAssistant");
    expect(aggregation).not.toHaveProperty("element");
  });

  it("summarizes Renderer mount report consumer diagnostic aggregations", () => {
    const okReport = inspectRendererMountReportConsumerResult({
      consumerName: "summary-ok-consumer",
      consumed: true,
      summary: {
        total: 0,
        planned: 0,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });
    const failedReport = inspectRendererMountReportConsumerResult({
      consumerName: "summary-failed-consumer",
      consumed: false,
      summary: {
        total: 1,
        planned: 1,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
      error: "summary consumer failed",
    });

    expect(summarizeRendererMountReportConsumerDiagnosticAggregation(
      aggregateRendererMountReportConsumerDiagnostics([okReport, failedReport]),
    )).toEqual({
      ok: false,
      consumerCount: 2,
      okConsumerCount: 1,
      failedConsumerCount: 1,
      issueCount: 2,
    });
  });

  it("summarizes empty Renderer mount report consumer diagnostic aggregations", () => {
    expect(summarizeRendererMountReportConsumerDiagnosticAggregation(
      aggregateRendererMountReportConsumerDiagnostics([]),
    )).toEqual({
      ok: true,
      consumerCount: 0,
      okConsumerCount: 0,
      failedConsumerCount: 0,
      issueCount: 0,
    });
  });

  it("derives Renderer mount report consumer diagnostic summaries from aggregate results", () => {
    const report = inspectRendererMountReportConsumerResult({
      consumerName: "derived-summary-consumer",
      consumed: false,
      summary: {
        total: 1,
        planned: 1,
        executed: 0,
        reported: 0,
        mounted: 0,
        diagnosticsOk: 0,
        failed: 0,
        issueCount: 0,
      },
    });
    const aggregation = aggregateRendererMountReportConsumerDiagnostics([report]);

    const summary = Renderer.summarizeRendererMountReportConsumerDiagnosticAggregation({
      ...aggregation,
      result: {
        ...aggregation.result,
        ok: true,
      },
    });

    expect(summary).toEqual({
      ok: true,
      consumerCount: 1,
      okConsumerCount: 0,
      failedConsumerCount: 1,
      issueCount: 1,
    });
  });

  it("keeps Renderer mount report consumer diagnostic summaries free of integration metadata", () => {
    const summary = summarizeRendererMountReportConsumerDiagnosticAggregation(
      aggregateRendererMountReportConsumerDiagnostics([]),
    );

    expect(summary).not.toHaveProperty("platform");
    expect(summary).not.toHaveProperty("theme");
    expect(summary).not.toHaveProperty("homeAssistant");
    expect(summary).not.toHaveProperty("element");
  });

  it("evaluates successful Renderer mount report consumer diagnostic policies", () => {
    const summary: RendererMountReportConsumerDiagnosticAggregationSummary = {
      ok: true,
      consumerCount: 2,
      okConsumerCount: 2,
      failedConsumerCount: 0,
      issueCount: 0,
    };

    expect(evaluateRendererMountReportConsumerDiagnosticPolicy(summary)).toEqual({
      context: {
        component: "renderer.mount.report.consumer.diagnostics.policy",
      },
      result: {
        ok: true,
        summary,
        issues: [],
      },
    });
  });

  it("fails Renderer mount report consumer diagnostic policies when consumers fail by default", () => {
    const summary: RendererMountReportConsumerDiagnosticAggregationSummary = {
      ok: false,
      consumerCount: 2,
      okConsumerCount: 1,
      failedConsumerCount: 1,
      issueCount: 1,
    };

    expect(evaluateRendererMountReportConsumerDiagnosticPolicy(summary).result).toEqual({
      ok: false,
      summary,
      issues: [{
        code: "renderer.mount.report.consumer.diagnostics.policy.consumer_failed",
        message: "1 Renderer mount report consumers failed diagnostics",
        severity: "error",
      }],
    });
  });

  it("allows Renderer mount report consumer diagnostic policy consumers to fail when configured", () => {
    const summary: RendererMountReportConsumerDiagnosticAggregationSummary = {
      ok: false,
      consumerCount: 2,
      okConsumerCount: 1,
      failedConsumerCount: 1,
      issueCount: 1,
    };

    expect(evaluateRendererMountReportConsumerDiagnosticPolicy(summary, {
      requireAllConsumersOk: false,
    }).result).toEqual({
      ok: true,
      summary,
      issues: [],
    });
  });

  it("fails Renderer mount report consumer diagnostic policies when issue limits are exceeded", () => {
    const summary: RendererMountReportConsumerDiagnosticAggregationSummary = {
      ok: false,
      consumerCount: 3,
      okConsumerCount: 1,
      failedConsumerCount: 2,
      issueCount: 3,
    };

    expect(evaluateRendererMountReportConsumerDiagnosticPolicy(summary, {
      maxIssueCount: 2,
    }).result.issues).toEqual([{
      code: "renderer.mount.report.consumer.diagnostics.policy.consumer_failed",
      message: "2 Renderer mount report consumers failed diagnostics",
      severity: "error",
    }, {
      code: "renderer.mount.report.consumer.diagnostics.policy.issue_limit_exceeded",
      message: "Renderer mount report consumer diagnostics reported 3 issues, exceeding 2",
      severity: "error",
    }]);
  });

  it("keeps Renderer mount report consumer diagnostic policy evaluations free of integration metadata", () => {
    const evaluation = evaluateRendererMountReportConsumerDiagnosticPolicy({
      ok: true,
      consumerCount: 0,
      okConsumerCount: 0,
      failedConsumerCount: 0,
      issueCount: 0,
    });

    expect(evaluation).not.toHaveProperty("platform");
    expect(evaluation).not.toHaveProperty("theme");
    expect(evaluation).not.toHaveProperty("homeAssistant");
    expect(evaluation).not.toHaveProperty("element");
  });

  it("creates Renderer mount results without platform adapters", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "tile",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "wall-panel",
    });

    const result = createRendererMountResult({
      mounted: false,
      output,
      target,
    });

    expect(result).toEqual({
      mounted: false,
      output,
      target,
    });
  });

  it("creates Renderer mount results as immutable copies of the source shape", () => {
    const result: RendererMountResult = {
      mounted: true,
      output: createRendererOutput({
        kind: "document",
        name: "mounted-dashboard",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "dashboard-surface",
      }),
    };

    const created = createRendererMountResult(result);

    expect(created).toEqual(result);
    expect(created).not.toBe(result);
  });

  it("keeps Renderer mount results linked to existing output and target references", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "result-reference-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "result-reference-target",
    });

    const result = Renderer.createRendererMountResult({
      mounted: true,
      output,
      target,
    });

    expect(result.output).toBe(output);
    expect(result.target).toBe(target);
  });

  it("preserves Renderer mount result errors as explicit failure messages", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "error-result-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "error-result-target",
    });

    const result = createRendererMountResult({
      mounted: false,
      output,
      target,
      error: "mount boundary failed",
    });

    expect(result).toEqual({
      mounted: false,
      output,
      target,
      error: "mount boundary failed",
    });
    expect(Object.hasOwn(result, "error")).toBe(true);
  });

  it("keeps successful Renderer mount results free of failure messages", () => {
    const output = createRendererOutput({
      kind: "document",
      name: "success-result-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "success-result-target",
    });

    const result = createRendererMountResult({
      mounted: true,
      output,
      target,
    });

    expect(result.mounted).toBe(true);
    expect(result).not.toHaveProperty("error");
  });

  it("supports current Renderer mount result states", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "state-tile",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "state-buffer",
    });

    const pending = createRendererMountResult({
      mounted: false,
      output,
      target,
    });
    const mounted = createRendererMountResult({
      mounted: true,
      output,
      target,
    });

    expect([pending.mounted, mounted.mounted]).toEqual([false, true]);
  });

  it("creates Renderer adapters without concrete platform implementations", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "adapter-tile",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "adapter-buffer",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });

    const adapter = createRendererAdapter({
      name: "memory-adapter",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });

    expect(adapter.name).toBe("memory-adapter");
    expect(adapter.mount(request)).toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("creates Renderer adapters as immutable copies of the source shape", () => {
    const adapter: RendererAdapter = {
      name: "copy-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    };

    const created = createRendererAdapter(adapter);

    expect(created).toEqual(adapter);
    expect(created).not.toBe(adapter);
  });

  it("keeps Renderer adapter creation limited to name and mount contracts", () => {
    const adapter = createRendererAdapter({
      name: "shape-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    expect(Object.keys(adapter).sort()).toEqual(["mount", "name"]);
    expect(adapter).not.toHaveProperty("platform");
    expect(adapter).not.toHaveProperty("capabilities");
    expect(adapter).not.toHaveProperty("registry");
  });

  it("keeps Renderer adapter mount handlers attached by reference", () => {
    const mount: RendererAdapter["mount"] = request => createRendererMountResult({
      mounted: true,
      output: request.output,
      target: request.target,
    });

    const adapter = Renderer.createRendererAdapter({
      name: "mount-reference-adapter",
      mount,
    });

    expect(adapter.mount).toBe(mount);
  });

  it("supports asynchronous Renderer adapter mount contracts", async () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "async-dashboard",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "async-surface",
      }),
    });
    const adapter = createRendererAdapter({
      name: "async-adapter",
      async mount(mountRequest) {
        await Promise.resolve();

        return createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        });
      },
    });

    await expect(adapter.mount(request)).resolves.toEqual({
      mounted: true,
      output: request.output,
      target: request.target,
    });
  });

  it("preserves Renderer adapter names for future registration", () => {
    const adapters = [
      createRendererAdapter({
        name: "memory-preview",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      createRendererAdapter({
        name: "surface-dashboard",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
    ];

    expect(adapters.map(adapter => adapter.name)).toEqual([
      "memory-preview",
      "surface-dashboard",
    ]);
  });

  it("preserves explicit empty Renderer adapter names", () => {
    const adapter = createRendererAdapter({
      name: "",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    expect(adapter.name).toBe("");
    expect(Object.hasOwn(adapter, "name")).toBe(true);
  });

  it("passes Renderer mount requests to adapter mount handlers", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "fragment",
        name: "handler-tile",
      }),
      target: createRendererTarget({
        kind: "memory",
        name: "handler-buffer",
      }),
    });
    let receivedRequest: RendererMountRequest | undefined;
    const adapter = createRendererAdapter({
      name: "handler-adapter",
      mount(mountRequest) {
        receivedRequest = mountRequest;

        return createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        });
      },
    });

    const result = adapter.mount(request);

    expect(receivedRequest).toBe(request);
    expect(result).toEqual({
      mounted: true,
      output: request.output,
      target: request.target,
    });
  });

  it("preserves Renderer mount request references through adapter mount handlers", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "adapter-reference-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "adapter-reference-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "adapter-reference",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });

    const result = adapter.mount(request);

    expect(result.output).toBe(output);
    expect(result.target).toBe(target);
  });

  it("keeps Renderer adapter mount results independent from adapter metadata", () => {
    const request = createRendererMountRequest({
      output: createRendererOutput({
        kind: "document",
        name: "metadata-result-output",
      }),
      target: createRendererTarget({
        kind: "surface",
        name: "metadata-result-target",
      }),
    });
    const adapter = createRendererAdapter({
      name: "metadata-adapter",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });

    const result = adapter.mount(request);

    expect(result).not.toHaveProperty("adapter");
    expect(result).not.toHaveProperty("adapterName");
    expect(result).not.toHaveProperty("platform");
  });

  it("creates Renderer platform adapters without concrete platform behavior", () => {
    const adapter = createRendererAdapter({
      name: "platform-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = createRendererPlatformAdapter({
      platform: "generic-platform",
      adapter,
      capabilities: ["mount"],
    });

    expect(platformAdapter).toEqual({
      platform: "generic-platform",
      adapter,
      capabilities: ["mount"],
    });
  });

  it("keeps Renderer platform adapter creation limited to platform metadata and adapter references", () => {
    const adapter = createRendererAdapter({
      name: "shape-platform-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = createRendererPlatformAdapter({
      platform: "shape-platform",
      adapter,
      capabilities: ["mount"],
    });

    expect(Object.keys(platformAdapter).sort()).toEqual([
      "adapter",
      "capabilities",
      "platform",
    ]);
    expect(platformAdapter).not.toHaveProperty("target");
    expect(platformAdapter).not.toHaveProperty("output");
    expect(platformAdapter).not.toHaveProperty("mounted");
  });

  it("keeps Renderer package root free of concrete Home Assistant integration helpers", () => {
    expect(Object.hasOwn(Renderer, "createHomeAssistantIntegrationBoundary")).toBe(false);
    expect(Object.hasOwn(Renderer, "inspectHomeAssistantActivationGate")).toBe(false);
    expect(Object.hasOwn(Renderer, "createHomeAssistantCard")).toBe(false);
  });

  it("keeps Home Assistant platform adapters as metadata-only Renderer contracts", () => {
    const adapter = createRendererAdapter({
      name: "home-assistant-metadata-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter,
      capabilities: ["card", "dashboard", "theme"],
    });

    expect(platformAdapter).toEqual({
      platform: "home-assistant",
      adapter,
      capabilities: ["card", "dashboard", "theme"],
    });
    expect(platformAdapter).not.toHaveProperty("card");
    expect(platformAdapter).not.toHaveProperty("dashboard");
    expect(platformAdapter).not.toHaveProperty("theme");
    expect(platformAdapter).not.toHaveProperty("active");
  });

  it("keeps Renderer platform adapter capabilities from enabling concrete integrations", () => {
    const adapter = createRendererAdapter({
      name: "capability-boundary-platform-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = Renderer.createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter,
      capabilities: ["mount", "lovelace-card", "theme"],
    });

    expect(platformAdapter.capabilities).toEqual(["mount", "lovelace-card", "theme"]);
    expect(Object.keys(platformAdapter).sort()).toEqual([
      "adapter",
      "capabilities",
      "platform",
    ]);
  });

  it("keeps Renderer platform adapter entries linked to adapter references", () => {
    const adapter = createRendererAdapter({
      name: "reference-platform-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = Renderer.createRendererPlatformAdapter({
      platform: "reference-platform",
      adapter,
      capabilities: [],
    });

    expect(platformAdapter.adapter).toBe(adapter);
  });

  it("keeps Renderer platform adapter capabilities independent from source arrays", () => {
    const adapter = createRendererAdapter({
      name: "capability-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const capabilities = ["mount"];

    const platformAdapter = createRendererPlatformAdapter({
      platform: "capability-platform",
      adapter,
      capabilities,
    });
    capabilities.push("theme");

    expect(platformAdapter.capabilities).toEqual(["mount"]);
    expect(platformAdapter.capabilities).not.toBe(capabilities);
  });

  it("creates Renderer platform adapters without declared capabilities", () => {
    const adapter = createRendererAdapter({
      name: "empty-capability-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = createRendererPlatformAdapter({
      platform: "empty-capability-platform",
      adapter,
      capabilities: [],
    });

    expect(platformAdapter).toEqual({
      platform: "empty-capability-platform",
      adapter,
      capabilities: [],
    });
  });

  it("preserves explicit empty Renderer platform adapter names", () => {
    const adapter = createRendererAdapter({
      name: "empty-platform-name-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const platformAdapter = createRendererPlatformAdapter({
      platform: "",
      adapter,
      capabilities: [],
    });

    expect(platformAdapter.platform).toBe("");
    expect(Object.hasOwn(platformAdapter, "platform")).toBe(true);
  });

  it("creates Renderer platform adapter conflicts without detection behavior", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [first, second],
    });

    expect(conflict).toEqual({
      platform: "surface",
      platformAdapters: [first, second],
    });
  });

  it("keeps Renderer platform adapter conflicts independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "first-copy-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "second-copy-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];

    const conflict = createRendererPlatformAdapterConflict({
      platform: "memory",
      platformAdapters,
    });
    platformAdapters.push(second);

    expect(conflict.platformAdapters).toEqual([first]);
    expect(conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("creates empty Renderer platform adapter conflicts", () => {
    const platformAdapters: RendererPlatformAdapter[] = [];

    const conflict = Renderer.createRendererPlatformAdapterConflict({
      platform: "empty-platform",
      platformAdapters,
    });

    expect(conflict).toEqual({
      platform: "empty-platform",
      platformAdapters: [],
    });
    expect(conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("preserves explicit empty Renderer platform adapter conflict platforms", () => {
    const conflict = Renderer.createRendererPlatformAdapterConflict({
      platform: "",
      platformAdapters: [],
    });

    expect(conflict.platform).toBe("");
    expect(Object.hasOwn(conflict, "platform")).toBe(true);
  });

  it("keeps Renderer platform adapter conflict entries as platform adapter references", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "reference-conflict-platform",
      adapter: createRendererAdapter({
        name: "reference-conflict-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const conflict = createRendererPlatformAdapterConflict({
      platform: "reference-conflict-platform",
      platformAdapters: [platformAdapter],
    });

    expect(conflict.platformAdapters[0]).toBe(platformAdapter);
  });

  it("finds Renderer platform adapter conflicts from registries", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-detected-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const unique = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "unique-detected-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-detected-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, unique, second]);

    const conflicts = findRendererPlatformAdapterConflicts(registry);

    expect(conflicts).toEqual([{
      platform: "surface",
      platformAdapters: [first, second],
    }]);
    expect(conflicts[0]?.platformAdapters[0]).toBe(first);
    expect(conflicts[0]?.platformAdapters[1]).toBe(second);
  });

  it("finds multiple Renderer platform adapter conflicts in first-duplicate order", () => {
    const firstMemory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "first-detected-memory-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const firstSurface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-detected-surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const secondMemory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "second-detected-memory-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const secondSurface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-detected-surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([
      firstMemory,
      firstSurface,
      secondMemory,
      secondSurface,
    ]);

    expect(findRendererPlatformAdapterConflicts(registry)).toEqual([
      {
        platform: "memory",
        platformAdapters: [firstMemory, secondMemory],
      },
      {
        platform: "surface",
        platformAdapters: [firstSurface, secondSurface],
      },
    ]);
  });

  it("reports no Renderer platform adapter conflicts for unique registries", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-unique-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-unique-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, second]);

    expect(Renderer.findRendererPlatformAdapterConflicts(registry)).toEqual([]);
  });

  it("reports no Renderer platform adapter conflicts for empty registries", () => {
    const registry = createRendererPlatformAdapterRegistry([]);

    expect(Renderer.findRendererPlatformAdapterConflicts(registry)).toEqual([]);
  });

  it("creates unresolved Renderer platform adapter conflict resolutions", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "unresolved-platform-conflict-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });

    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
    expect(resolution.conflict).not.toBe(conflict);
    expect(resolution).not.toHaveProperty("platformAdapter");
  });

  it("creates resolved Renderer platform adapter conflict resolutions", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "resolved-platform-conflict-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "memory",
      platformAdapters: [platformAdapter],
    });

    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      platformAdapter,
    });
    expect(resolution.platformAdapter).toBe(platformAdapter);
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("keeps Renderer platform adapter conflict resolution conflicts independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-resolution-copy-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-resolution-copy-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];
    const conflict: RendererPlatformAdapterConflict = {
      platform: "surface",
      platformAdapters,
    };

    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter: first,
    });
    platformAdapters.push(second);

    expect(resolution.conflict.platformAdapters).toEqual([first]);
    expect(resolution.conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("reviews Renderer platform adapter conflict resolutions through the package root", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-package-root-resolution-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-package-root-resolution-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];
    const conflict: RendererPlatformAdapterConflict = {
      platform: "surface",
      platformAdapters,
    };

    const resolution = Renderer.createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter: first,
    });
    platformAdapters.push(second);

    expect(resolution).toEqual({
      conflict: {
        platform: "surface",
        platformAdapters: [first],
      },
      resolved: true,
      platformAdapter: first,
    });
    expect(resolution.conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("resolves Renderer platform adapter conflicts with first-candidate selection", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-conflict-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-conflict-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [first, second],
    });

    const resolution = resolveRendererPlatformAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      platformAdapter: first,
    });
    expect(resolution.platformAdapter).toBe(first);
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("reports unresolved Renderer platform adapter conflicts when no candidates exist", () => {
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [],
    });

    const resolution = resolveRendererPlatformAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
    expect(resolution.conflict).not.toBe(conflict);
    expect(resolution).not.toHaveProperty("platformAdapter");
  });

  it("resolves Renderer platform adapter conflicts without invoking selected adapters", () => {
    let mounted = false;
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "no-mount-platform-conflict-adapter",
        mount: request => {
          mounted = true;

          return createRendererMountResult({
            mounted: true,
            output: request.output,
            target: request.target,
          });
        },
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });

    const resolution = resolveRendererPlatformAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      platformAdapter,
    });
    expect(mounted).toBe(false);
  });

  it("keeps Renderer platform adapter conflict integrations independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-conflict-copy-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-conflict-copy-integration-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [first];
    const conflict: RendererPlatformAdapterConflict = {
      platform: "surface",
      platformAdapters,
    };

    const resolution = Renderer.resolveRendererPlatformAdapterConflictWithFirstCandidate(conflict);
    platformAdapters.push(second);

    expect(resolution).toEqual({
      conflict: {
        platform: "surface",
        platformAdapters: [first],
      },
      resolved: true,
      platformAdapter: first,
    });
    expect(resolution.conflict.platformAdapters).not.toBe(platformAdapters);
  });

  it("resolves Renderer platform adapter registry conflicts with first-candidate selection", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const unique = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "unique-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, unique, second]);

    const resolutions = resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([{
      conflict: {
        platform: "surface",
        platformAdapters: [first, second],
      },
      resolved: true,
      platformAdapter: first,
    }]);
  });

  it("reports no Renderer platform adapter registry conflict resolutions for unique registries", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-platform-registry-resolution-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, second]);

    expect(resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate(registry)).toEqual([]);
  });

  it("preserves Renderer platform adapter registry conflict resolution order", () => {
    const firstSurface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-surface-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const firstMemory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "first-memory-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const secondSurface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-surface-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const secondMemory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "second-memory-platform-registry-order-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([
      firstSurface,
      firstMemory,
      secondSurface,
      secondMemory,
    ]);

    const resolutions = Renderer.resolveRendererPlatformAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([
      {
        conflict: {
          platform: "surface",
          platformAdapters: [firstSurface, secondSurface],
        },
        resolved: true,
        platformAdapter: firstSurface,
      },
      {
        conflict: {
          platform: "memory",
          platformAdapters: [firstMemory, secondMemory],
        },
        resolved: true,
        platformAdapter: firstMemory,
      },
    ]);
  });

  it("creates Renderer platform adapter selection requests", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "platform-selection-request-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const request = createRendererPlatformAdapterSelectionRequest({
      platform: "surface",
      candidates: [platformAdapter],
    });

    expect(request).toEqual({
      platform: "surface",
      candidates: [platformAdapter],
    });
  });

  it("keeps Renderer platform adapter selection requests independent from source arrays", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-selection-request-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-selection-request-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const candidates = [first];

    const request = createRendererPlatformAdapterSelectionRequest({
      platform: "surface",
      candidates,
    });
    candidates.push(second);

    expect(request.candidates).toEqual([first]);
    expect(request.candidates).not.toBe(candidates);
  });

  it("reviews Renderer platform adapter selection requests with empty candidates through the package root", () => {
    const request = Renderer.createRendererPlatformAdapterSelectionRequest({
      platform: "surface",
      candidates: [],
    });

    expect(request).toEqual({
      platform: "surface",
      candidates: [],
    });
  });

  it("keeps Renderer platform adapter selection candidates as platform adapter references", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "platform-selection-reference-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const request = Renderer.createRendererPlatformAdapterSelectionRequest({
      platform: platformAdapter.platform,
      candidates: [platformAdapter],
    });

    expect(request.candidates[0]).toBe(platformAdapter);
  });

  it("preserves explicit empty Renderer platform adapter selection platforms", () => {
    const request = createRendererPlatformAdapterSelectionRequest({
      platform: "",
      candidates: [],
    });

    expect(request.platform).toBe("");
    expect(Object.hasOwn(request, "platform")).toBe(true);
  });

  it("creates selected Renderer platform adapter selection results", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "selected-platform-selection-result-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = createRendererPlatformAdapterSelectionResult({
      platform: "memory",
      platformAdapter,
    });

    expect(result).toEqual({
      platform: "memory",
      platformAdapter,
    });
    expect(result.platformAdapter).toBe(platformAdapter);
  });

  it("creates unselected Renderer platform adapter selection results", () => {
    const result = createRendererPlatformAdapterSelectionResult({
      platform: "surface",
    });

    expect(result).toEqual({
      platform: "surface",
    });
    expect(Object.hasOwn(result, "platformAdapter")).toBe(false);
  });

  it("preserves explicit empty Renderer platform adapter selection result platforms", () => {
    const result = Renderer.createRendererPlatformAdapterSelectionResult({
      platform: "",
    });

    expect(result.platform).toBe("");
    expect(Object.hasOwn(result, "platform")).toBe(true);
  });

  it("creates Renderer platform adapter registries without lookup behavior", () => {
    const memory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const surface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const registry = createRendererPlatformAdapterRegistry([memory, surface]);

    expect(registry).toEqual({
      platformAdapters: [memory, surface],
    });
  });

  it("keeps Renderer platform adapter registries independent from source arrays", () => {
    const memory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-registry-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const surface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-registry-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const platformAdapters = [memory];

    const registry = createRendererPlatformAdapterRegistry(platformAdapters);
    platformAdapters.push(surface);

    expect(registry.platformAdapters).toEqual([memory]);
    expect(registry.platformAdapters).not.toBe(platformAdapters);
  });

  it("creates empty Renderer platform adapter registries", () => {
    const registry = Renderer.createRendererPlatformAdapterRegistry([]);

    expect(registry).toEqual({
      platformAdapters: [],
    });
  });

  it("keeps Renderer platform adapter registry entries as platform adapter references", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "reference-registry-platform",
      adapter: createRendererAdapter({
        name: "reference-registry-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: [],
    });

    const registry = createRendererPlatformAdapterRegistry([platformAdapter]);

    expect(registry.platformAdapters[0]).toBe(platformAdapter);
  });

  it("preserves Renderer platform adapter registry insertion order", () => {
    const memory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "first-registry-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: [],
    });
    const surface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-registry-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: [],
    });

    const registry = createRendererPlatformAdapterRegistry([memory, surface]);

    expect(registry.platformAdapters.map(candidate => candidate.platform)).toEqual([
      "memory",
      "surface",
    ]);
  });

  it("creates Renderer platform adapter lookup requests without performing lookup", () => {
    const request = createRendererPlatformAdapterLookupRequest({
      platform: "memory",
    });

    expect(request).toEqual({
      platform: "memory",
    });
  });

  it("creates Renderer platform adapter lookup results with matched platform adapters", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-lookup-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = createRendererPlatformAdapterLookupResult({
      platform: platformAdapter.platform,
      platformAdapter,
    });

    expect(result).toEqual({
      platform: "surface",
      platformAdapter,
    });
  });

  it("creates Renderer platform adapter lookup results without matched platform adapters", () => {
    const result = Renderer.createRendererPlatformAdapterLookupResult({
      platform: "missing-platform",
    });

    expect(result).toEqual({
      platform: "missing-platform",
    });
    expect(result.platformAdapter).toBeUndefined();
  });

  it("preserves explicit empty Renderer platform adapter lookup platforms", () => {
    const request = createRendererPlatformAdapterLookupRequest({
      platform: "",
    });
    const result = createRendererPlatformAdapterLookupResult({
      platform: "",
    });

    expect(request.platform).toBe("");
    expect(result.platform).toBe("");
  });

  it("creates Renderer platform adapter lookup contracts as immutable copies", () => {
    const request: RendererPlatformAdapterLookupRequest = {
      platform: "copy-platform",
    };
    const platformAdapter = createRendererPlatformAdapter({
      platform: "copy-platform",
      adapter: createRendererAdapter({
        name: "copy-platform-adapter",
        mount: mountRequest => createRendererMountResult({
          mounted: false,
          output: mountRequest.output,
          target: mountRequest.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const result: RendererPlatformAdapterLookupResult = {
      platform: "copy-platform",
      platformAdapter,
    };

    const createdRequest = Renderer.createRendererPlatformAdapterLookupRequest(request);
    const createdResult = Renderer.createRendererPlatformAdapterLookupResult(result);

    expect(createdRequest).toEqual(request);
    expect(createdRequest).not.toBe(request);
    expect(createdResult).toEqual(result);
    expect(createdResult).not.toBe(result);
  });

  it("keeps Renderer platform adapter lookup result references", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "reference-lookup-platform",
      adapter: createRendererAdapter({
        name: "reference-lookup-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: [],
    });

    const result = createRendererPlatformAdapterLookupResult({
      platform: platformAdapter.platform,
      platformAdapter,
    });

    expect(result.platformAdapter).toBe(platformAdapter);
  });

  it("finds Renderer platform adapters by platform from registries", () => {
    const memory = createRendererPlatformAdapter({
      platform: "memory",
      adapter: createRendererAdapter({
        name: "memory-search-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const surface = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "surface-search-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([memory, surface]);

    const result = findRendererPlatformAdapter(
      registry,
      createRendererPlatformAdapterLookupRequest({
        platform: "surface",
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: surface,
    });
    expect(result.platformAdapter).toBe(surface);
  });

  it("reports missing Renderer platform adapters from registries", () => {
    const registry = createRendererPlatformAdapterRegistry([]);

    const result = Renderer.findRendererPlatformAdapter(
      registry,
      createRendererPlatformAdapterLookupRequest({
        platform: "missing-platform",
      }),
    );

    expect(result).toEqual({
      platform: "missing-platform",
    });
    expect(result.platformAdapter).toBeUndefined();
    expect(Object.hasOwn(result, "platformAdapter")).toBe(false);
  });

  it("finds the first Renderer platform adapter for duplicate platforms", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-surface-platform-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const registry = createRendererPlatformAdapterRegistry([first, second]);

    const result = Renderer.findRendererPlatformAdapter(
      registry,
      createRendererPlatformAdapterLookupRequest({
        platform: "surface",
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: first,
    });
    expect(result.platformAdapter).toBe(first);
  });

  it("creates Renderer adapter registries without lookup behavior", () => {
    const memory = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const surface = createRendererAdapter({
      name: "surface-dashboard",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const registry = createRendererAdapterRegistry([memory, surface]);

    expect(registry.adapters).toEqual([memory, surface]);
  });

  it("keeps Renderer adapter registries independent from source arrays", () => {
    const memory = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const surface = createRendererAdapter({
      name: "surface-dashboard",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [memory];

    const registry = createRendererAdapterRegistry(adapters);
    adapters.push(surface);

    expect(registry.adapters).toEqual([memory]);
  });

  it("creates empty Renderer adapter registries", () => {
    const registry = createRendererAdapterRegistry([]);

    expect(registry).toEqual({
      adapters: [],
    });
  });

  it("keeps Renderer adapter registry entries as adapter references", () => {
    const adapter = createRendererAdapter({
      name: "reference-registry-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const registry = Renderer.createRendererAdapterRegistry([adapter]);

    expect(registry.adapters[0]).toBe(adapter);
  });

  it("preserves Renderer adapter registry insertion order", () => {
    const first = createRendererAdapter({
      name: "first-registry-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "second-registry-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const third = createRendererAdapter({
      name: "third-registry-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const registry = createRendererAdapterRegistry([first, second, third]);

    expect(registry.adapters.map(adapter => adapter.name)).toEqual([
      "first-registry-adapter",
      "second-registry-adapter",
      "third-registry-adapter",
    ]);
  });

  it("creates Renderer adapter lookup requests without performing lookup", () => {
    const request = createRendererAdapterLookupRequest({
      name: "memory-preview",
    });

    expect(request).toEqual({
      name: "memory-preview",
    });
  });

  it("creates Renderer adapter lookup results with matched adapters", () => {
    const adapter = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const result = createRendererAdapterLookupResult({
      name: adapter.name,
      adapter,
    });

    expect(result).toEqual({
      name: "memory-preview",
      adapter,
    });
  });

  it("creates Renderer adapter lookup results without matched adapters", () => {
    const result = createRendererAdapterLookupResult({
      name: "missing-adapter",
    });

    expect(result).toEqual({
      name: "missing-adapter",
    });
  });

  it("creates Renderer adapter lookup requests as immutable copies of the source shape", () => {
    const request: RendererAdapterLookupRequest = {
      name: "memory-preview",
    };

    const created = createRendererAdapterLookupRequest(request);

    expect(created).toEqual(request);
    expect(created).not.toBe(request);
  });

  it("preserves explicit empty Renderer adapter lookup names", () => {
    const request = createRendererAdapterLookupRequest({
      name: "",
    });
    const result = createRendererAdapterLookupResult({
      name: "",
    });

    expect(request.name).toBe("");
    expect(result.name).toBe("");
  });

  it("creates Renderer adapter lookup results as immutable copies of the source shape", () => {
    const adapter = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const result: RendererAdapterLookupResult = {
      name: adapter.name,
      adapter,
    };

    const created = createRendererAdapterLookupResult(result);

    expect(created).toEqual(result);
    expect(created).not.toBe(result);
  });

  it("keeps Renderer adapter lookup result adapter references", () => {
    const adapter = createRendererAdapter({
      name: "lookup-reference-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const result = Renderer.createRendererAdapterLookupResult({
      name: adapter.name,
      adapter,
    });

    expect(result.adapter).toBe(adapter);
  });

  it("finds Renderer adapters by name from registries", () => {
    const memory = createRendererAdapter({
      name: "memory-preview",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const surface = createRendererAdapter({
      name: "surface-dashboard",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([memory, surface]);

    const result = findRendererAdapter(
      registry,
      createRendererAdapterLookupRequest({
        name: "surface-dashboard",
      }),
    );

    expect(result).toEqual({
      name: "surface-dashboard",
      adapter: surface,
    });
    expect(result.adapter).toBe(surface);
  });

  it("reports missing Renderer adapters from registries", () => {
    const registry = createRendererAdapterRegistry([]);

    const result = findRendererAdapter(
      registry,
      createRendererAdapterLookupRequest({
        name: "missing-adapter",
      }),
    );

    expect(result).toEqual({
      name: "missing-adapter",
    });
    expect(Object.hasOwn(result, "adapter")).toBe(false);
  });

  it("returns the first matching Renderer adapter from registries", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, second]);

    const result = findRendererAdapter(
      registry,
      createRendererAdapterLookupRequest({
        name: "duplicate-adapter",
      }),
    );

    expect(result).toEqual({
      name: "duplicate-adapter",
      adapter: first,
    });
  });

  it("creates Renderer adapter conflicts for duplicate adapter names", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    expect(conflict).toEqual({
      name: "duplicate-adapter",
      adapters: [first, second],
    });
  });

  it("keeps Renderer adapter conflicts independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [first];

    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters,
    });
    adapters.push(second);

    expect(conflict.adapters).toEqual([first]);
  });

  it("creates Renderer adapter conflicts without adapters", () => {
    const conflict = createRendererAdapterConflict({
      name: "empty-conflict",
      adapters: [],
    });

    expect(conflict).toEqual({
      name: "empty-conflict",
      adapters: [],
    });
  });

  it("keeps Renderer adapter conflict entries as adapter references", () => {
    const adapter = createRendererAdapter({
      name: "reference-conflict-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const conflict = Renderer.createRendererAdapterConflict({
      name: "reference-conflict-adapter",
      adapters: [adapter],
    });

    expect(conflict.adapters[0]).toBe(adapter);
  });

  it("preserves explicit empty Renderer adapter conflict names", () => {
    const conflict = createRendererAdapterConflict({
      name: "",
      adapters: [],
    });

    expect(conflict.name).toBe("");
    expect(Object.hasOwn(conflict, "name")).toBe(true);
  });

  it("finds Renderer adapter conflicts by duplicate names", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const unique = createRendererAdapter({
      name: "unique-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, unique, second]);

    const conflicts = findRendererAdapterConflicts(registry);

    expect(conflicts).toEqual([{
      name: "duplicate-adapter",
      adapters: [first, second],
    }]);
    expect(conflicts[0]?.adapters[0]).toBe(first);
    expect(conflicts[0]?.adapters[1]).toBe(second);
  });

  it("finds multiple Renderer adapter conflicts in first-duplicate order", () => {
    const firstMemory = createRendererAdapter({
      name: "memory-conflict",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const firstSurface = createRendererAdapter({
      name: "surface-conflict",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const secondMemory = createRendererAdapter({
      name: "memory-conflict",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const secondSurface = createRendererAdapter({
      name: "surface-conflict",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([
      firstMemory,
      firstSurface,
      secondMemory,
      secondSurface,
    ]);

    const conflicts = findRendererAdapterConflicts(registry);

    expect(conflicts.map(conflict => conflict.name)).toEqual([
      "memory-conflict",
      "surface-conflict",
    ]);
  });

  it("reports no Renderer adapter conflicts for unique names", () => {
    const first = createRendererAdapter({
      name: "first-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "second-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, second]);

    expect(findRendererAdapterConflicts(registry)).toEqual([]);
  });

  it("reports no Renderer adapter conflicts for empty registries", () => {
    const registry = createRendererAdapterRegistry([]);

    expect(findRendererAdapterConflicts(registry)).toEqual([]);
  });

  it("creates unresolved Renderer adapter conflict resolutions", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
    expect(resolution.conflict).not.toBe(conflict);
  });

  it("creates Renderer adapter conflict resolutions with explicit adapters", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter: second,
    });

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      adapter: second,
    });
    expect(resolution.adapter).toBe(second);
    expect(resolution.conflict.adapters[0]).toBe(first);
    expect(resolution.conflict.adapters[1]).toBe(second);
  });

  it("keeps unresolved Renderer adapter conflict resolutions free of adapter fields", () => {
    const conflict = createRendererAdapterConflict({
      name: "unresolved-shape",
      adapters: [],
    });

    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    expect(Object.hasOwn(resolution, "adapter")).toBe(false);
  });

  it("keeps Renderer adapter conflict resolutions independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [first];
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters,
    });

    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: false,
    });
    adapters.push(second);

    expect(resolution.conflict.adapters).toEqual([first]);
  });

  it("resolves Renderer adapter conflicts with first-candidate selection", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters: [first, second],
    });

    const resolution = resolveRendererAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      adapter: first,
    });
    expect(resolution.conflict).not.toBe(conflict);
    expect(resolution.adapter).toBe(first);
  });

  it("keeps Renderer adapter conflicts unresolved when first-candidate selection is empty", () => {
    const conflict = createRendererAdapterConflict({
      name: "empty-conflict",
      adapters: [],
    });

    const resolution = resolveRendererAdapterConflictWithFirstCandidate(conflict);

    expect(resolution).toEqual({
      conflict,
      resolved: false,
    });
    expect(Object.hasOwn(resolution, "adapter")).toBe(false);
  });

  it("keeps Renderer adapter conflict integration independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const adapters = [first];
    const conflict = createRendererAdapterConflict({
      name: "duplicate-adapter",
      adapters,
    });

    const resolution = resolveRendererAdapterConflictWithFirstCandidate(conflict);
    adapters.push(second);

    expect(resolution).toEqual({
      conflict,
      resolved: true,
      adapter: first,
    });
    expect(resolution.conflict.adapters).toEqual([first]);
  });

  it("resolves Renderer adapter conflicts without invoking selected adapters", () => {
    let mounted = false;
    const adapter = createRendererAdapter({
      name: "selection-only-adapter",
      mount: request => {
        mounted = true;

        return createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        });
      },
    });
    const conflict = createRendererAdapterConflict({
      name: "selection-only-adapter",
      adapters: [adapter],
    });

    const resolution = resolveRendererAdapterConflictWithFirstCandidate(conflict);

    expect(resolution.adapter).toBe(adapter);
    expect(mounted).toBe(false);
  });

  it("resolves Renderer adapter registry conflicts with first-candidate selection", () => {
    const first = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const unique = createRendererAdapter({
      name: "unique-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "duplicate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, unique, second]);

    const resolutions = resolveRendererAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([{
      conflict: {
        name: "duplicate-adapter",
        adapters: [first, second],
      },
      resolved: true,
      adapter: first,
    }]);
  });

  it("reports no Renderer adapter registry conflict resolutions for unique registries", () => {
    const first = createRendererAdapter({
      name: "first-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "second-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([first, second]);

    const resolutions = resolveRendererAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([]);
  });

  it("preserves Renderer adapter registry conflict resolution order", () => {
    const firstMemory = createRendererAdapter({
      name: "memory-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const firstSurface = createRendererAdapter({
      name: "surface-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const secondMemory = createRendererAdapter({
      name: "memory-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const secondSurface = createRendererAdapter({
      name: "surface-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });
    const registry = createRendererAdapterRegistry([
      firstMemory,
      firstSurface,
      secondMemory,
      secondSurface,
    ]);

    const resolutions = resolveRendererAdapterRegistryConflictsWithFirstCandidate(registry);

    expect(resolutions).toEqual([{
      conflict: {
        name: "memory-adapter",
        adapters: [firstMemory, secondMemory],
      },
      resolved: true,
      adapter: firstMemory,
    }, {
      conflict: {
        name: "surface-adapter",
        adapters: [firstSurface, secondSurface],
      },
      resolved: true,
      adapter: firstSurface,
    }]);
  });

  it("mounts resolved Renderer adapter conflict resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "resolved-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "resolved-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "resolved-adapter",
      mount: mountRequest => createRendererMountResult({
        mounted: true,
        output: mountRequest.output,
        target: mountRequest.target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "resolved-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("does not mount unresolved Renderer adapter conflict resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "unresolved-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "unresolved-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "unresolved-adapter",
      mount: () => createRendererMountResult({
        mounted: true,
        output,
        target,
      }),
    });
    const conflict = createRendererAdapterConflict({
      name: "unresolved-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
    });
  });

  it("does not mount Renderer adapter resolutions marked unresolved even with adapters", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "unresolved-with-adapter-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "unresolved-with-adapter-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    let mounted = false;
    const adapter = createRendererAdapter({
      name: "unresolved-with-adapter",
      mount: () => {
        mounted = true;

        return createRendererMountResult({
          mounted: true,
          output,
          target,
        });
      },
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict: createRendererAdapterConflict({
        name: "unresolved-with-adapter",
        adapters: [adapter],
      }),
      resolved: false,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
    });
    expect(mounted).toBe(false);
  });

  it("preserves Renderer mount request references for unresolved adapter resolutions", async () => {
    const output = createRendererOutput({
      kind: "document",
      name: "unresolved-reference-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "unresolved-reference-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict: createRendererAdapterConflict({
        name: "unresolved-reference",
        adapters: [],
      }),
      resolved: false,
    });

    const result = await mountResolvedRendererAdapter(resolution, request);

    expect(result.output).toBe(output);
    expect(result.target).toBe(target);
  });

  it("awaits asynchronous resolved Renderer adapter mounts", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "async-resolved-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "async-resolved-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "async-resolved-adapter",
      async mount(mountRequest) {
        await Promise.resolve();

        return createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        });
      },
    });
    const conflict = createRendererAdapterConflict({
      name: "async-resolved-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("reports rejected resolved Renderer adapter mounts as unmounted results", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "failed-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "failed-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "failed-adapter",
      async mount() {
        await Promise.resolve();

        throw new Error("adapter mount failed");
      },
    });
    const conflict = createRendererAdapterConflict({
      name: "failed-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
      error: "adapter mount failed",
    });
  });

  it("preserves Renderer mount request references for rejected adapter resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "failed-reference-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "failed-reference-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "failed-reference-adapter",
      mount() {
        throw new Error("failed reference mount");
      },
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict: createRendererAdapterConflict({
        name: "failed-reference-adapter",
        adapters: [adapter],
      }),
      resolved: true,
      adapter,
    });

    const result = await mountResolvedRendererAdapter(resolution, request);

    expect(result.output).toBe(output);
    expect(result.target).toBe(target);
    expect(result.error).toBe("failed reference mount");
  });

  it("reports non-Error resolved Renderer adapter mount rejections as strings", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "string-failed-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "string-failed-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const adapter = createRendererAdapter({
      name: "string-failed-adapter",
      async mount() {
        await Promise.resolve();

        throw "adapter mount failed as string";
      },
    });
    const conflict = createRendererAdapterConflict({
      name: "string-failed-adapter",
      adapters: [adapter],
    });
    const resolution = createRendererAdapterConflictResolution({
      conflict,
      resolved: true,
      adapter,
    });

    await expect(mountResolvedRendererAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
      error: "adapter mount failed as string",
    });
  });

  it("mounts resolved Renderer platform adapter conflict resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "resolved-platform-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "resolved-platform-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "resolved-platform-mount-adapter",
        mount: mountRequest => createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });

    await expect(mountResolvedRendererPlatformAdapter(resolution, request)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("does not mount unresolved Renderer platform adapter conflict resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "unresolved-platform-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "unresolved-platform-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "unresolved-platform-mount-adapter",
        mount: () => createRendererMountResult({
          mounted: true,
          output,
          target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: false,
    });

    await expect(mountResolvedRendererPlatformAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
    });
  });

  it("does not mount Renderer platform adapter resolutions marked unresolved even with platform adapters", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "unresolved-with-platform-adapter-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "unresolved-with-platform-adapter-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    let mounted = false;
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "unresolved-with-platform-adapter",
        mount: () => {
          mounted = true;

          return createRendererMountResult({
            mounted: true,
            output,
            target,
          });
        },
      }),
      capabilities: ["mount"],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "surface",
        platformAdapters: [platformAdapter],
      }),
      resolved: false,
      platformAdapter,
    });

    await expect(mountResolvedRendererPlatformAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
    });
    expect(mounted).toBe(false);
  });

  it("preserves Renderer mount request references for unresolved platform adapter resolutions", async () => {
    const output = createRendererOutput({
      kind: "document",
      name: "unresolved-platform-reference-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "unresolved-platform-reference-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "surface",
        platformAdapters: [],
      }),
      resolved: false,
    });

    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    expect(result.output).toBe(output);
    expect(result.target).toBe(target);
  });

  it("awaits asynchronous resolved Renderer platform adapter mounts", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "async-resolved-platform-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "async-resolved-platform-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "async-resolved-platform-adapter",
        async mount(mountRequest) {
          await Promise.resolve();

          return createRendererMountResult({
            mounted: true,
            output: mountRequest.output,
            target: mountRequest.target,
          });
        },
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });

    await expect(Renderer.mountResolvedRendererPlatformAdapter(resolution, request)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("reports rejected resolved Renderer platform adapter mounts as unmounted results", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "failed-platform-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "failed-platform-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "failed-platform-adapter",
        async mount() {
          await Promise.resolve();

          throw new Error("platform adapter mount failed");
        },
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });

    await expect(mountResolvedRendererPlatformAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
      error: "platform adapter mount failed",
    });
  });

  it("preserves Renderer mount request references for rejected platform adapter resolutions", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "failed-platform-reference-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "failed-platform-reference-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "failed-platform-reference-adapter",
        mount() {
          throw new Error("failed platform reference mount");
        },
      }),
      capabilities: ["mount"],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "surface",
        platformAdapters: [platformAdapter],
      }),
      resolved: true,
      platformAdapter,
    });

    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    expect(result.output).toBe(output);
    expect(result.target).toBe(target);
    expect(result.error).toBe("failed platform reference mount");
  });

  it("reports non-Error resolved Renderer platform adapter mount rejections as strings", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "string-failed-platform-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "string-failed-platform-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "string-failed-platform-adapter",
        async mount() {
          await Promise.resolve();

          throw "platform adapter mount failed as string";
        },
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });

    await expect(Renderer.mountResolvedRendererPlatformAdapter(resolution, request)).resolves.toEqual({
      mounted: false,
      output,
      target,
      error: "platform adapter mount failed as string",
    });
  });

  it("creates diagnostics for failed Renderer platform adapter mount results", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "diagnostic-platform-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "diagnostic-platform-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "diagnostic-platform-adapter",
        async mount() {
          await Promise.resolve();

          throw new Error("platform adapter diagnostic failure");
        },
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });
    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    expect(inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: false,
        issues: [{
          code: "renderer.mount.failed",
          message: "platform adapter diagnostic failure",
          severity: "error",
        }],
      },
    });
  });

  it("uses Renderer mount diagnostic codes for failed platform adapter mounts", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "coded-platform-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "coded-platform-diagnostic-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "coded-platform-diagnostic-adapter",
        mount() {
          throw new Error("coded platform adapter diagnostic failure");
        },
      }),
      capabilities: ["mount"],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "surface",
        platformAdapters: [platformAdapter],
      }),
      resolved: true,
      platformAdapter,
    });
    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    const report = Renderer.inspectRendererMountResult(result);

    expect(report.result.issues[0]?.code).toBe(Renderer.RendererMountDiagnosticCodes.MountFailed);
  });

  it("creates diagnostics for string failed Renderer platform adapter mount results", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "string-platform-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "string-platform-diagnostic-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "string-platform-diagnostic-adapter",
        async mount() {
          await Promise.resolve();

          throw "string platform diagnostic failure";
        },
      }),
      capabilities: ["mount"],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "surface",
        platformAdapters: [platformAdapter],
      }),
      resolved: true,
      platformAdapter,
    });
    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    expect(inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: false,
        issues: [{
          code: "renderer.mount.failed",
          message: "string platform diagnostic failure",
          severity: "error",
        }],
      },
    });
  });

  it("creates diagnostics for successful Renderer platform adapter mount results", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "successful-platform-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "successful-platform-diagnostic-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "successful-platform-diagnostic-adapter",
        mount: mountRequest => createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "surface",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });
    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    expect(Renderer.inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: true,
        issues: [],
      },
    });
  });

  it("creates successful diagnostics for unresolved Renderer platform adapter mount results", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "unresolved-platform-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "unresolved-platform-diagnostic-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "surface",
        platformAdapters: [],
      }),
      resolved: false,
    });
    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    expect(inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: true,
        issues: [],
      },
    });
  });

  it("keeps Renderer platform adapter diagnostics free of platform metadata", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "metadata-platform-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "metadata-platform-diagnostic-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "metadata-platform-diagnostic-adapter",
        mount() {
          throw new Error("metadata platform diagnostic failure");
        },
      }),
      capabilities: ["mount"],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "home-assistant",
        platformAdapters: [platformAdapter],
      }),
      resolved: true,
      platformAdapter,
    });
    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    const report = inspectRendererMountResult(result);

    expect(report.context).toEqual({
      component: "renderer.mount",
    });
    expect(report).not.toHaveProperty("platform");
    expect(report).not.toHaveProperty("platformAdapter");
    expect(report.result.issues[0]).not.toHaveProperty("platform");
    expect(report.result.issues[0]).not.toHaveProperty("adapter");
  });

  it("creates independent Renderer platform adapter diagnostic reports", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "independent-platform-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "independent-platform-diagnostic-target",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "independent-platform-diagnostic-adapter",
        mount() {
          throw new Error("independent platform diagnostic failure");
        },
      }),
      capabilities: ["mount"],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "surface",
        platformAdapters: [platformAdapter],
      }),
      resolved: true,
      platformAdapter,
    });
    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    const first = inspectRendererMountResult(result);
    const second = inspectRendererMountResult(result);

    expect(first).toEqual(second);
    expect(first).not.toBe(second);
    expect(first.result).not.toBe(second.result);
    expect(first.result.issues).not.toBe(second.result.issues);
  });

  it("keeps Renderer platform adapter mounting independent from concrete platform metadata", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "boundary-platform-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "boundary-platform-target",
      identifier: "ha-card-preview",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "boundary-platform-adapter",
        mount: mountRequest => createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        }),
      }),
      capabilities: [],
    });
    const conflict = createRendererPlatformAdapterConflict({
      platform: "home-assistant",
      platformAdapters: [platformAdapter],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict,
      resolved: true,
      platformAdapter,
    });

    await expect(Renderer.mountResolvedRendererPlatformAdapter(resolution, request)).resolves.toEqual({
      mounted: true,
      output,
      target,
    });
  });

  it("keeps Home Assistant platform registry entries metadata-only", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "home-assistant-registry-boundary-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["card"],
    });

    const registry = Renderer.createRendererPlatformAdapterRegistry([platformAdapter]);

    expect(registry.platformAdapters[0]).toBe(platformAdapter);
    expect(registry).not.toHaveProperty("active");
    expect(registry).not.toHaveProperty("homeAssistant");
    expect(registry).not.toHaveProperty("cardRegistry");
  });

  it("keeps Home Assistant platform lookup results metadata-only", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "home-assistant-lookup-boundary-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["card"],
    });
    const registry = createRendererPlatformAdapterRegistry([platformAdapter]);

    const result = findRendererPlatformAdapter(
      registry,
      createRendererPlatformAdapterLookupRequest({
        platform: "home-assistant",
      }),
    );

    expect(result.platformAdapter).toBe(platformAdapter);
    expect(result).not.toHaveProperty("card");
    expect(result).not.toHaveProperty("dashboard");
    expect(result).not.toHaveProperty("activated");
  });

  it("keeps Home Assistant platform selection results metadata-only", () => {
    const platformAdapter = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "home-assistant-selection-boundary-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["card"],
    });

    const result = selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: "home-assistant",
        candidates: [platformAdapter],
      }),
    );

    expect(result.platformAdapter).toBe(platformAdapter);
    expect(result).not.toHaveProperty("mounted");
    expect(result).not.toHaveProperty("card");
    expect(result).not.toHaveProperty("theme");
  });

  it("keeps Home Assistant platform conflict resolutions metadata-only", () => {
    const first = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "first-home-assistant-conflict-boundary-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["card"],
    });
    const second = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "second-home-assistant-conflict-boundary-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["dashboard"],
    });

    const resolution = resolveRendererPlatformAdapterConflictWithFirstCandidate(
      createRendererPlatformAdapterConflict({
        platform: "home-assistant",
        platformAdapters: [first, second],
      }),
    );

    expect(resolution.platformAdapter).toBe(first);
    expect(resolution).not.toHaveProperty("homeAssistant");
    expect(resolution).not.toHaveProperty("activated");
    expect(resolution).not.toHaveProperty("card");
  });

  it("keeps Home Assistant platform mount results free of platform metadata", async () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "home-assistant-result-boundary-output",
    });
    const target = createRendererTarget({
      kind: "surface",
      name: "home-assistant-result-boundary-target",
      identifier: "lovelace-preview",
    });
    const request = createRendererMountRequest({
      output,
      target,
    });
    const platformAdapter = createRendererPlatformAdapter({
      platform: "home-assistant",
      adapter: createRendererAdapter({
        name: "home-assistant-result-boundary-adapter",
        mount: mountRequest => createRendererMountResult({
          mounted: true,
          output: mountRequest.output,
          target: mountRequest.target,
        }),
      }),
      capabilities: ["card"],
    });
    const resolution = createRendererPlatformAdapterConflictResolution({
      conflict: createRendererPlatformAdapterConflict({
        platform: "home-assistant",
        platformAdapters: [platformAdapter],
      }),
      resolved: true,
      platformAdapter,
    });

    const result = await mountResolvedRendererPlatformAdapter(resolution, request);

    expect(result).toEqual({
      mounted: true,
      output,
      target,
    });
    expect(result).not.toHaveProperty("platform");
    expect(result).not.toHaveProperty("card");
    expect(result).not.toHaveProperty("theme");
  });

  it("creates diagnostics for failed Renderer mount results", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "diagnostic-target",
    });
    const result = createRendererMountResult({
      mounted: false,
      output,
      target,
      error: "adapter mount failed",
    });

    expect(inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: false,
        issues: [{
          code: "renderer.mount.failed",
          message: "adapter mount failed",
          severity: "error",
        }],
      },
    });
  });

  it("creates diagnostics for successful Renderer mount results", () => {
    const output = createRendererOutput({
      kind: "fragment",
      name: "successful-diagnostic-output",
    });
    const target = createRendererTarget({
      kind: "memory",
      name: "successful-diagnostic-target",
    });
    const result = createRendererMountResult({
      mounted: true,
      output,
      target,
    });

    expect(inspectRendererMountResult(result)).toEqual({
      context: {
        component: "renderer.mount",
      },
      result: {
        ok: true,
        issues: [],
      },
    });
  });

  it("creates Renderer adapter selection requests", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const selection = createRendererAdapterSelectionRequest({
      name: "candidate-adapter",
      candidates: [first, second],
    });

    expect(selection).toEqual({
      name: "candidate-adapter",
      candidates: [first, second],
    });
  });

  it("keeps Renderer adapter selection requests independent from source arrays", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const candidates = [first];

    const selection = createRendererAdapterSelectionRequest({
      name: "candidate-adapter",
      candidates,
    });
    candidates.push(second);

    expect(selection.candidates).toEqual([first]);
  });

  it("creates Renderer adapter selection requests without candidates", () => {
    const selection = createRendererAdapterSelectionRequest({
      name: "empty-selection",
      candidates: [],
    });

    expect(selection).toEqual({
      name: "empty-selection",
      candidates: [],
    });
  });

  it("keeps Renderer adapter selection candidates as adapter references", () => {
    const adapter = createRendererAdapter({
      name: "selection-reference-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const selection = Renderer.createRendererAdapterSelectionRequest({
      name: adapter.name,
      candidates: [adapter],
    });

    expect(selection.candidates[0]).toBe(adapter);
  });

  it("preserves explicit empty Renderer adapter selection names", () => {
    const selection = createRendererAdapterSelectionRequest({
      name: "",
      candidates: [],
    });

    expect(selection.name).toBe("");
    expect(Object.hasOwn(selection, "name")).toBe(true);
  });

  it("creates Renderer adapter selection results with selected adapters", () => {
    const adapter = createRendererAdapter({
      name: "selected-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });

    const result = createRendererAdapterSelectionResult({
      name: "selected-adapter",
      adapter,
    });

    expect(result).toEqual({
      name: "selected-adapter",
      adapter,
    });
    expect(result.adapter).toBe(adapter);
  });

  it("creates Renderer adapter selection results without selected adapters", () => {
    const result = createRendererAdapterSelectionResult({
      name: "missing-selection",
    });

    expect(result).toEqual({
      name: "missing-selection",
    });
    expect(Object.hasOwn(result, "adapter")).toBe(false);
  });

  it("preserves explicit empty Renderer adapter selection result names", () => {
    const result = createRendererAdapterSelectionResult({
      name: "",
    });

    expect(result.name).toBe("");
  });

  it("selects the first Renderer adapter candidate", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });

    const result = selectFirstRendererAdapterCandidate(
      createRendererAdapterSelectionRequest({
        name: "candidate-adapter",
        candidates: [first, second],
      }),
    );

    expect(result).toEqual({
      name: "candidate-adapter",
      adapter: first,
    });
    expect(result.adapter).toBe(first);
  });

  it("preserves Renderer adapter candidate order during first-candidate selection", () => {
    const first = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: false,
        output: request.output,
        target: request.target,
      }),
    });
    const second = createRendererAdapter({
      name: "candidate-adapter",
      mount: request => createRendererMountResult({
        mounted: true,
        output: request.output,
        target: request.target,
      }),
    });

    const result = selectFirstRendererAdapterCandidate(
      createRendererAdapterSelectionRequest({
        name: "candidate-adapter",
        candidates: [second, first],
      }),
    );

    expect(result).toEqual({
      name: "candidate-adapter",
      adapter: second,
    });
  });

  it("selects Renderer adapter candidates without invoking mount handlers", () => {
    let mounted = false;
    const adapter = createRendererAdapter({
      name: "selection-no-mount-adapter",
      mount: request => {
        mounted = true;

        return createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        });
      },
    });

    const result = selectFirstRendererAdapterCandidate(
      createRendererAdapterSelectionRequest({
        name: adapter.name,
        candidates: [adapter],
      }),
    );

    expect(result.adapter).toBe(adapter);
    expect(mounted).toBe(false);
  });

  it("reports missing Renderer adapter selection when no candidates exist", () => {
    const result = selectFirstRendererAdapterCandidate(
      createRendererAdapterSelectionRequest({
        name: "missing-selection",
        candidates: [],
      }),
    );

    expect(result).toEqual({
      name: "missing-selection",
    });
    expect(Object.hasOwn(result, "adapter")).toBe(false);
  });

  it("selects the first Renderer platform adapter candidate", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: "surface",
        candidates: [first, second],
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: first,
    });
    expect(result.platformAdapter).toBe(first);
  });

  it("preserves Renderer platform adapter candidate order during first-candidate selection", () => {
    const first = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "first-platform-order-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: false,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });
    const second = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "second-platform-order-policy-adapter",
        mount: request => createRendererMountResult({
          mounted: true,
          output: request.output,
          target: request.target,
        }),
      }),
      capabilities: ["mount"],
    });

    const result = Renderer.selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: "surface",
        candidates: [second, first],
      }),
    );

    expect(result).toEqual({
      platform: "surface",
      platformAdapter: second,
    });
  });

  it("selects Renderer platform adapter candidates without invoking mount handlers", () => {
    let mounted = false;
    const platformAdapter = createRendererPlatformAdapter({
      platform: "surface",
      adapter: createRendererAdapter({
        name: "platform-selection-no-mount-adapter",
        mount: request => {
          mounted = true;

          return createRendererMountResult({
            mounted: true,
            output: request.output,
            target: request.target,
          });
        },
      }),
      capabilities: ["mount"],
    });

    const result = selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: platformAdapter.platform,
        candidates: [platformAdapter],
      }),
    );

    expect(result.platformAdapter).toBe(platformAdapter);
    expect(mounted).toBe(false);
  });

  it("reports missing Renderer platform adapter selection when no candidates exist", () => {
    const result = selectFirstRendererPlatformAdapterCandidate(
      createRendererPlatformAdapterSelectionRequest({
        platform: "surface",
        candidates: [],
      }),
    );

    expect(result).toEqual({
      platform: "surface",
    });
    expect(Object.hasOwn(result, "platformAdapter")).toBe(false);
  });

  it("creates a Renderer pipeline from ordered stages", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-pipeline",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const stage: RendererPipelineStage = {
      name: "prepare-output",
      run: rendererContext => ({
        stage: rendererContext.runtime.application.name,
        completed: true,
      }),
    };

    const pipeline = createRendererPipeline([stage]);
    const result = await pipeline[0]?.run(context);

    expect(pipeline).toHaveLength(1);
    expect(pipeline[0]).toBe(stage);
    expect(result).toEqual({
      stage: "renderer-pipeline",
      completed: true,
    });
  });

  it("keeps Renderer pipeline stage order independent from source arrays", () => {
    const first: RendererPipelineStage = {
      name: "first",
      run: () => ({
        stage: "first",
        completed: true,
      }),
    };
    const second: RendererPipelineStage = {
      name: "second",
      run: () => ({
        stage: "second",
        completed: true,
      }),
    };
    const stages = [first];

    const pipeline = createRendererPipeline(stages);
    stages.push(second);

    expect(pipeline.map(stage => stage.name)).toEqual(["first"]);
  });

  it("executes Renderer pipeline stages sequentially", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const order: string[] = [];
    const first: RendererPipelineStage = {
      name: "first",
      async run() {
        order.push("first");

        return {
          stage: "first",
          completed: true,
        };
      },
    };
    const second: RendererPipelineStage = {
      name: "second",
      run() {
        order.push("second");

        return {
          stage: "second",
          completed: true,
        };
      },
    };

    const result = await executeRendererPipeline(
      context,
      createRendererPipeline([first, second]),
    );

    expect(order).toEqual(["first", "second"]);
    expect(result).toEqual({
      completed: true,
      stages: [{
        stage: "first",
        completed: true,
      }, {
        stage: "second",
        completed: true,
      }],
    });
  });

  it("reports incomplete Renderer pipeline execution", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-incomplete-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const pipeline = createRendererPipeline([{
      name: "blocked",
      run: () => ({
        stage: "blocked",
        completed: false,
      }),
    }]);

    const result = await executeRendererPipeline(context, pipeline);

    expect(result.completed).toBe(false);
    expect(result.stages).toEqual([{
      stage: "blocked",
      completed: false,
    }]);
  });

  it("reports empty Renderer pipeline execution as completed", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-empty-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);

    const result = await executeRendererPipeline(
      context,
      createRendererPipeline([]),
    );

    expect(result).toEqual({
      completed: true,
      stages: [],
    });
  });

  it("awaits asynchronous Renderer pipeline stages before continuing", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-async-execution",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const order: string[] = [];
    const pipeline = createRendererPipeline([{
      name: "async-first",
      async run() {
        await Promise.resolve();
        order.push("async-first");

        return {
          stage: "async-first",
          completed: true,
        };
      },
    }, {
      name: "sync-second",
      run() {
        order.push("sync-second");

        return {
          stage: "sync-second",
          completed: true,
        };
      },
    }]);

    const result = await executeRendererPipeline(context, pipeline);

    expect(order).toEqual(["async-first", "sync-second"]);
    expect(result.completed).toBe(true);
  });

  it("passes the same Renderer host context to every pipeline stage", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-pipeline-context",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const seenContexts: RendererHostContext[] = [];
    const pipeline = createRendererPipeline([{
      name: "first-context",
      run(rendererContext) {
        seenContexts.push(rendererContext);

        return {
          stage: "first-context",
          completed: rendererContext.runtime === runtime,
        };
      },
    }, {
      name: "second-context",
      run(rendererContext) {
        seenContexts.push(rendererContext);

        return {
          stage: "second-context",
          completed: rendererContext === context,
        };
      },
    }]);

    const result = await executeRendererPipeline(context, pipeline);

    expect(seenContexts).toEqual([context, context]);
    expect(result.completed).toBe(true);
  });

  it("keeps Renderer pipeline execution results in stage completion order", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-pipeline-result-order",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const pipeline = createRendererPipeline([{
      name: "prepare",
      async run() {
        await Promise.resolve();

        return {
          stage: "prepare-result",
          completed: true,
        };
      },
    }, {
      name: "render",
      run: () => ({
        stage: "render-result",
        completed: true,
      }),
    }, {
      name: "mount",
      run: () => ({
        stage: "mount-result",
        completed: true,
      }),
    }]);

    const result = await executeRendererPipeline(context, pipeline);

    expect(result.stages.map(stage => stage.stage)).toEqual([
      "prepare-result",
      "render-result",
      "mount-result",
    ]);
  });

  it("marks Renderer pipeline execution incomplete when any stage is incomplete", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-pipeline-mixed-completion",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const pipeline = createRendererPipeline([{
      name: "ready",
      run: () => ({
        stage: "ready",
        completed: true,
      }),
    }, {
      name: "blocked",
      run: () => ({
        stage: "blocked",
        completed: false,
      }),
    }, {
      name: "skipped",
      run: () => ({
        stage: "skipped",
        completed: true,
      }),
    }]);

    const result = await executeRendererPipeline(context, pipeline);

    expect(result).toEqual({
      completed: false,
      stages: [{
        stage: "ready",
        completed: true,
      }, {
        stage: "blocked",
        completed: false,
      }, {
        stage: "skipped",
        completed: true,
      }],
    });
  });

  it("preserves Renderer pipeline stage result objects without wrapping them", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-pipeline-result-identity",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const firstResult: RendererPipelineStageResult = {
      stage: "identity-first",
      completed: true,
    };
    const secondResult: RendererPipelineStageResult = {
      stage: "identity-second",
      completed: true,
    };

    const result = await executeRendererPipeline(
      context,
      createRendererPipeline([{
        name: "identity-first",
        run: () => firstResult,
      }, {
        name: "identity-second",
        async run() {
          await Promise.resolve();

          return secondResult;
        },
      }]),
    );

    expect(result.stages[0]).toBe(firstResult);
    expect(result.stages[1]).toBe(secondResult);
  });

  it("stops Renderer pipeline execution when a stage rejects", async () => {
    const runtime = createCoreRuntimeHost({
      application: {
        name: "renderer-pipeline-rejection",
        version: {
          major: 0,
          minor: 2,
          patch: 0,
        },
      },
    });
    const context = createRendererHostContext(runtime);
    const order: string[] = [];
    const pipeline = createRendererPipeline([{
      name: "before-rejection",
      run() {
        order.push("before-rejection");

        return {
          stage: "before-rejection",
          completed: true,
        };
      },
    }, {
      name: "rejecting-stage",
      async run() {
        order.push("rejecting-stage");

        throw new Error("renderer pipeline rejected");
      },
    }, {
      name: "after-rejection",
      run() {
        order.push("after-rejection");

        return {
          stage: "after-rejection",
          completed: true,
        };
      },
    }]);

    await expect(executeRendererPipeline(context, pipeline)).rejects.toThrow(
      "renderer pipeline rejected",
    );
    expect(order).toEqual(["before-rejection", "rejecting-stage"]);
  });
});

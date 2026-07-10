import type {
  Application,
  ApplicationHost,
  DisposableModule,
  EventBus,
  ServiceContainer,
  StoppableModule,
} from "@atlas/kernel";
import {
  DefaultEventBus,
  DefaultServiceContainer,
  ModuleDependencyResolver,
} from "@atlas/kernel";
import type { AsyncDisposable, LifecycleState } from "@atlas/foundation";

import type { RuntimeEvent } from "./RuntimeEvent";
import type { RuntimeModule } from "./RuntimeModule";
import { RuntimeServiceKeys } from "./RuntimeServiceKeys";

export class RuntimeHost implements ApplicationHost, AsyncDisposable {
  private stateInternal: LifecycleState = "created";
  private readonly modulesInternal: RuntimeModule[] = [];
  private readonly initializedModuleIds = new Set<string>();
  private readonly moduleResolver = new ModuleDependencyResolver();

  public constructor(
    public readonly application: Application,
    public readonly events: EventBus = new DefaultEventBus(),
    public readonly services: ServiceContainer = new DefaultServiceContainer(),
  ) {
    this.services.register(RuntimeServiceKeys.application, application);
    this.services.register(RuntimeServiceKeys.events, events);
  }

  public get state(): LifecycleState {
    return this.stateInternal;
  }

  public get modules(): readonly RuntimeModule[] {
    return [...this.modulesInternal];
  }

  public registerModule(runtimeModule: RuntimeModule): void {
    this.ensureAvailable();

    if (this.stateInternal !== "created") {
      throw new Error("Runtime modules must be registered before startup.");
    }

    if (this.modulesInternal.some(
      registered => registered.manifest.id === runtimeModule.manifest.id,
    )) {
      throw new Error(`Runtime module already registered: ${runtimeModule.manifest.id}`);
    }

    this.modulesInternal.push(runtimeModule);
  }

  public async start(): Promise<void> {
    this.ensureAvailable();

    if (this.stateInternal === "running") {
      return;
    }

    if (this.stateInternal === "created") {
      await this.initialize();
    }

    await this.activateModules();
    this.stateInternal = "running";
    await this.publish("runtime.started");
  }

  public async stop(): Promise<void> {
    this.ensureAvailable();

    if (this.stateInternal !== "running") {
      return;
    }

    this.stateInternal = "stopped";
    await this.publish("runtime.stopped");
  }

  public async restart(): Promise<void> {
    await this.stop();
    await this.start();
  }

  public async dispose(): Promise<void> {
    if (this.stateInternal === "disposed") {
      return;
    }

    if (this.stateInternal === "running") {
      await this.stop();
    }

    await this.shutdownModules();
    this.stateInternal = "disposed";
    await this.publish("runtime.disposed");
  }

  private async initialize(): Promise<void> {
    this.stateInternal = "initialized";
    await this.publish("runtime.initialized");
  }

  private async activateModules(): Promise<void> {
    for (const runtimeModule of this.resolveModules()) {
      if (this.initializedModuleIds.has(runtimeModule.manifest.id)) {
        continue;
      }

      await runtimeModule.module.initialize({
        services: this.services,
      });
      this.initializedModuleIds.add(runtimeModule.manifest.id);
      await this.publishModuleInitialized(runtimeModule.manifest.id);
    }
  }

  private resolveModules(): readonly RuntimeModule[] {
    const modulesById = new Map(
      this.modulesInternal.map(runtimeModule => [
        runtimeModule.manifest.id,
        runtimeModule,
      ]),
    );
    const descriptors = this.modulesInternal.map(runtimeModule => ({
      manifest: runtimeModule.manifest,
      loaded: false,
    }));

    return this.moduleResolver.resolve(descriptors).map(descriptor => {
      const runtimeModule = modulesById.get(descriptor.manifest.id);
      if (!runtimeModule) {
        throw new Error(`Runtime module not registered: ${descriptor.manifest.id}`);
      }
      return runtimeModule;
    });
  }

  private async shutdownModules(): Promise<void> {
    const initializedModules = this.resolveModules()
      .filter(runtimeModule => this.initializedModuleIds.has(runtimeModule.manifest.id))
      .reverse();

    for (const runtimeModule of initializedModules) {
      if (this.isStoppableModule(runtimeModule.module)) {
        await runtimeModule.module.stop();
        await this.publishModuleEvent("runtime.module.stopped", runtimeModule.manifest.id);
      }

      if (this.isDisposableModule(runtimeModule.module)) {
        await runtimeModule.module.dispose();
        await this.publishModuleEvent("runtime.module.disposed", runtimeModule.manifest.id);
      }
    }
  }

  private async publish(type: RuntimeEvent["type"]): Promise<void> {
    await this.events.publish({
      type,
      timestamp: new Date(),
    });
  }

  private async publishModuleInitialized(moduleId: string): Promise<void> {
    await this.publishModuleEvent("runtime.module.initialized", moduleId);
  }

  private async publishModuleEvent(
    type: Extract<RuntimeEvent, { moduleId: string }> ["type"],
    moduleId: string,
  ): Promise<void> {
    await this.events.publish({
      type,
      moduleId,
      timestamp: new Date(),
    });
  }

  private isStoppableModule(module: unknown): module is StoppableModule {
    return typeof module === "object"
      && module !== null
      && "stop" in module
      && typeof module.stop === "function";
  }

  private isDisposableModule(module: unknown): module is DisposableModule {
    return typeof module === "object"
      && module !== null
      && "dispose" in module
      && typeof module.dispose === "function";
  }

  private ensureAvailable(): void {
    if (this.stateInternal === "disposed") {
      throw new Error("Runtime host has been disposed.");
    }
  }
}

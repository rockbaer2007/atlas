import type {
  Application,
  ApplicationHost,
  EventBus,
  ServiceContainer,
} from "@atlas/kernel";
import { DefaultEventBus, DefaultServiceContainer } from "@atlas/kernel";
import type { AsyncDisposable, LifecycleState } from "@atlas/foundation";

import type { RuntimeEvent } from "./RuntimeEvent";
import { RuntimeServiceKeys } from "./RuntimeServiceKeys";

export class RuntimeHost implements ApplicationHost, AsyncDisposable {
  private stateInternal: LifecycleState = "created";

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

  public async start(): Promise<void> {
    this.ensureAvailable();

    if (this.stateInternal === "running") {
      return;
    }

    if (this.stateInternal === "created") {
      await this.initialize();
    }

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

    this.stateInternal = "disposed";
    await this.publish("runtime.disposed");
  }

  private async initialize(): Promise<void> {
    this.stateInternal = "initialized";
    await this.publish("runtime.initialized");
  }

  private async publish(type: RuntimeEvent["type"]): Promise<void> {
    await this.events.publish({
      type,
      timestamp: new Date(),
    });
  }

  private ensureAvailable(): void {
    if (this.stateInternal === "disposed") {
      throw new Error("Runtime host has been disposed.");
    }
  }
}

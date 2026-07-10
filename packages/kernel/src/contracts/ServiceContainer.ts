import type { ServiceResolver } from "../container/ServiceResolver";

export interface ServiceContainer extends ServiceResolver {
  register<T>(key: symbol, instance: T): void;
}

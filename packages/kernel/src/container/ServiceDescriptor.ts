import type { ServiceKey } from "../di/ServiceKey";
import type { ServiceProvider } from "../di/ServiceProvider";
import type { ServiceLifetime } from "./ServiceLifetime";

export type ServiceFactory<T> = (provider: ServiceProvider) => T;
export type ServiceImplementation<T> = abstract new (...args: never[]) => T;

export type ServiceDescriptor<T=unknown> = Readonly<{
  key: ServiceKey<T>;
  lifetime: ServiceLifetime;
  implementation?: ServiceImplementation<T>;
  factory?: ServiceFactory<T>;
  instance?: T;
  dependencies?: readonly ServiceKey[];
}>;

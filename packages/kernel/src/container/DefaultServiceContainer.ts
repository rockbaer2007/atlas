import type { ServiceCollection } from "./ServiceCollection";
import type { ServiceDescriptor } from "./ServiceDescriptor";
import type { ServiceResolver } from "./ServiceResolver";
import { ServiceLifetimes } from "./ServiceLifetime";

export class DefaultServiceContainer
implements ServiceCollection, ServiceResolver {

  private readonly descriptors = new Map<symbol, ServiceDescriptor>();
  private readonly singletons = new Map<symbol, unknown>();

  add<T>(descriptor: ServiceDescriptor<T>): void {
    this.descriptors.set(descriptor.key.id, descriptor);
  }

  descriptors(): readonly ServiceDescriptor[] {
    return [...this.descriptors.values()];
  }

  contains(key: symbol): boolean {
    return this.descriptors.has(key);
  }

  resolve<T>(key: symbol): T {
    const descriptor = this.descriptors.get(key);

    if (!descriptor) {
      throw new Error(`Service not registered: ${String(key)}`);
    }

    if (descriptor.instance !== undefined) {
      return descriptor.instance as T;
    }

    const create = () => {
      if (descriptor.factory) {
        return descriptor.factory(this as never);
      }

      if (descriptor.implementation) {
        return new descriptor.implementation();
      }

      throw new Error("Invalid service descriptor.");
    };

    if (descriptor.lifetime === ServiceLifetimes.Singleton) {
      if (!this.singletons.has(key)) {
        this.singletons.set(key, create());
      }
      return this.singletons.get(key) as T;
    }

    return create() as T;
  }
}

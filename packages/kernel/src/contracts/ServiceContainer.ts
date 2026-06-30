export interface ServiceContainer {
  register<T>(key: symbol, instance: T): void;
  resolve<T>(key: symbol): T;
  contains(key: symbol): boolean;
}

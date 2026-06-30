import type { MutableRegistry } from "./MutableRegistry";
import type { RegistryEvent } from "./RegistryEvent";
export interface ObservableRegistry<TKey, TValue> extends MutableRegistry<TKey, TValue> {
    subscribe(listener: (event: RegistryEvent<TKey, TValue>) => void): () => void;
}

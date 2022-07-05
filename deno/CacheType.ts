export type CacheType<K, V> = {
    entries: () => IterableIterator<[K, V]>;
    keys: () => IterableIterator<K>;
    values: () => IterableIterator<V>;
    forEach: (
        callbackfn: (value: V, key: K, map: Map<K, V>) => void,
        // deno-lint-ignore no-explicit-any
        thisArg?: any
    ) => void;
    clear: () => void;
    has: (key: K) => boolean;
    delete(name: K): boolean;
    age: number;
    // storage: storage,
    get(name: K): V | undefined;
    set(name: K, value: V): void;
};

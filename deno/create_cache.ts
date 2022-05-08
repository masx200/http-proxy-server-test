import { CacheType } from "./CacheType.ts";

export function create_cache<K, V>(age: number): CacheType<K, V> {
    const storage = new Map<K, V>();
    const expires = new Map<K, number>();
    return {
        entries: storage.entries.bind(storage),
        keys: storage.keys.bind(storage),
        values: storage.values.bind(storage),
        forEach: storage.forEach.bind(storage),
        clear: function () {
            expires.clear();
            return storage.clear();
        },
        has: storage.has.bind(storage),
        delete(name: K) {
            expires.delete(name);
            return storage.delete(name);
        },
        age,
        // storage: storage,
        get(name: K): V | undefined {
            const exp = expires.get(name);
            if (exp && Number(new Date()) > exp) {
                expires.delete(name);
                storage.delete(name);
                return;
            }
            return storage.get(name);
        },
        set(name: K, value: V) {
            storage.set(name, value);
            expires.set(name, age + Number(new Date()));
        },
    };
}

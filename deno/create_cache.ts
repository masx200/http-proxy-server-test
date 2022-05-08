export function create_cache<K, V>(
    age: number,
): {
    age: number;
    // storage: Map<K, V>;
    get(name: K): V | undefined;
    set(name: K, value: V): void;
} {
    const storage = new Map<K, V>();
    const expires = new Map<K, number>();
    return {
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

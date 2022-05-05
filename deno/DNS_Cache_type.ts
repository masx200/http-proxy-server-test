export interface DNS_Cache {
    storage: Map<string, {
        A?: string;
        AAAA?: string;
    }>;
    get(name: string): undefined | {
        A?: string;
        AAAA?: string;
    };
    set(name: string, value: {
        A?: string;
        AAAA?: string;
    }): void;
}

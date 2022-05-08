export interface DNS_Cache {
    // storage: Map<string, {
    //     A?: string;
    //     AAAA?: string;
    // }>;
    get(name: string): undefined | string[];
    set(name: string, value: string[]): void;
    age: number;
}

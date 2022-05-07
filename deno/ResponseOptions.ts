export interface ResponseOptions {
    status: number;
    statusText?: string;
    headers: Headers;
    body?: BodyInit | null
}
import TokenBucket from "../models/token-bucket";

export type Endpoint = {
    endpoint: string;
    burst: number;
    sustained: number;
};

export interface EndpointsRepository {
    read(): Promise<Endpoint[]>;
}

export interface EndpointsStore {
    get(endpoint: string): TokenBucket | undefined;
    load(): Promise<void>;
}

import TokenBucket from "../models/token-bucket";

export type EndpointRate = {
    canRequest: boolean | undefined,
    tokens: number | undefined,
};

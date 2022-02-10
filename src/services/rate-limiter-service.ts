import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { InvalidParamater } from '../logging/bad-request';
import { EndpointsStore } from '../repositories/types';
import { EndpointRate } from './types';

@injectable()
class RateLimiterService {
    constructor(
        @inject(TYPES.RateLimiterStore) private rateLimiterStore: EndpointsStore,
    ) { }

    async getEndpoint(endpoint: string): Promise<EndpointRate> {
        const bucket = this.rateLimiterStore.get(endpoint);

        if (!bucket) {
            throw new InvalidParamater(`bucket is missing with ${endpoint}`);
        }

        const endpointRate: EndpointRate = {
            canRequest: bucket.take(),
            tokens: bucket.tokens
        };

        return endpointRate;
    }

    async loadEndpointsConfig(): Promise<void> {
        await this.rateLimiterStore.load();
    }
}

export default RateLimiterService;

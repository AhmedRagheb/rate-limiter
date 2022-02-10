import { inject, injectable } from 'inversify';
import TokenBucket from '../models/token-bucket';
import { Endpoint, EndpointsRepository, EndpointsStore } from './types';
import { TYPES } from '../config/types';

@injectable()
class EndpointsInMemoryStore implements EndpointsStore {

    constructor(
        @inject(TYPES.EndpointsRepository) private endpointsRepository: EndpointsRepository,
    ) { }

    private _store: Map<string, TokenBucket> = new Map<string, TokenBucket>();

    get(endpoint: string): TokenBucket | undefined {
        return this._store.get(endpoint);
    }

    async load(): Promise<void> {
        const endpoints = await this.endpointsRepository.read();
        await this.map(endpoints);
    }

    private async map(endpoints: Endpoint[]): Promise<void> {
        await Promise.all(endpoints.map(e =>
            this._store.set(e.endpoint, new TokenBucket(e.burst, e.sustained))));
    }
}

export default EndpointsInMemoryStore;

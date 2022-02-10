import * as fs from 'fs';
import { injectable } from 'inversify';
import Settings from '../config/settings';
import { Endpoint, EndpointsRepository } from './types';


@injectable()
class EndpointsDiskRepository implements EndpointsRepository {
    async read(): Promise<Endpoint[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(Settings.DEFAULT_PATH, { encoding: 'utf8' }, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const endpoints = JSON.parse(data).rateLimitsPerEndpoint as Endpoint[]
                    resolve(endpoints);
                }
            });
        });
    }
}

export default EndpointsDiskRepository;

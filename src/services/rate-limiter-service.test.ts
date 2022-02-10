import TokenBucket from "../models/token-bucket";
import { EndpointsStore } from "../repositories/types";
import RateLimiterService from "./rate-limiter-service";
import { EndpointRate } from "./types";

describe('RateLimiter Service', () => {
    test('getEndpoint should returns endpointRate model', async () => {
        // when
        const mockEndpointsStore = {
            load: jest.fn(),
            get: jest.fn().mockImplementation().mockReturnValue(new TokenBucket(10, 5)),
        } as unknown as EndpointsStore;

        const target = new RateLimiterService(
            mockEndpointsStore,
        );
        const actual = await target.getEndpoint('users');

        // then
        const expected: EndpointRate = {
            tokens: 9,
            canRequest: true,
        };

        expect(actual).toEqual(expected);
    });

    test('getEndpoint not exist should returns undefined', async () => {
        // when
        const mockEndpointsStore = {
            load: jest.fn(),
            get: jest.fn().mockImplementation().mockReturnValue(undefined),
        } as unknown as EndpointsStore;

        const target = new RateLimiterService(
            mockEndpointsStore,
        );

        // then
        expect(async () => await target.getEndpoint('users3'))
            .rejects.toThrowError('bucket is missing with users3');
    });
});

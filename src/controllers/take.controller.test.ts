import request from 'supertest';
import container from '../config/container';
import { TYPES } from "../config/types";
import TakeRoutes from "../routes/take-routes";
import Server from "../server";
import { DiskFileMock } from '../repositories/disk-file-mock';
import RateLimiterService from '../services/rate-limiter-service';

describe('Take Controller', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        DiskFileMock.mockEndpoints();
    });

    afterEach(() => {
        jest.useRealTimers();
        DiskFileMock.restoreState();
    });

    const routes = container.get<TakeRoutes>(TYPES.TakeRoutes);
    const service = container.get<RateLimiterService>(TYPES.RateLimiterService);

    test('should returns 404 response', async () => {
        // given
        const app = new Server(routes, service).app;
        
        const expected = {
            statusCode: 404,
        };

        // when
        const { status } = await request(app).get('/not-exist');

        // then
        expect(status).toEqual(expected.statusCode);
    });

    test('should takes one token when request', async () => {
        // given
        const app = new Server(routes, service).app;
        await service.loadEndpointsConfig();

        const expected = {
            statusCode: 200,
            body: {
                canRequest: true,
                tokens: 3
            }
        };

        // when
        const { body, status } = await request(app).get('/take/GET%20%2Fuser%2F%3Aid');

        // then
        expect(status).toEqual(expected.statusCode);
        expect(body).toEqual(expected.body);
    });

    test('should return 0 with no access when bucket get empty', async () => {
        // given
        const app = new Server(routes, service).app;
        await service.loadEndpointsConfig();

        const expected = {
            statusCode: 200,
            body: {
                canRequest: false,
                tokens: 0
            }
        };

        // when
        await Promise.all(
            [...Array(5)].map(() => request(app).get('/take/GET%20%2Fuser%2F%3Aid')));

        const { body, status } = await request(app).get('/take/GET%20%2Fuser%2F%3Aid');

        // then
        expect(status).toEqual(expected.statusCode);
        expect(body).toEqual(expected.body);
    });

    test('should refill bucket with a fraction of suatained and return tokens', async () => {
        // given
        jest.setSystemTime(new Date('2021-01-01T12:00:00Z'));
        const app = new Server(routes, service).app;
        await service.loadEndpointsConfig();

        const expected = {
            statusCode: 200,
            body: {
                canRequest: true,
                tokens: 2
            }
        };

        // when
        await request(app).get('/take/GET%20%2Fuser%2F%3Aid');
        jest.setSystemTime(new Date('2021-01-01T12:01:00Z'));

        const { body, status } = await request(app).get('/take/GET%20%2Fuser%2F%3Aid');
        // then
        expect(status).toBe(expected.statusCode);
        expect(body).toEqual(expected.body);
    });
});

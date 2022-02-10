import EndpointsInMemoryStore from "./endpoints-store";
import { EndpointsRepository } from "./types";

describe('Endpoints InMemory Store', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
        jest.setSystemTime(new Date('2022-01-01'));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    const endpoints = [{
        endpoint: 'users',
        burst: 10,
        sustained: 5,
    }, {
        endpoint: 'users2',
        burst: 5,
        sustained: 2,
    }];

    const mockEndpointsRepository = {
        read: jest.fn().mockImplementation().mockReturnValue(endpoints),
    } as unknown as EndpointsRepository;

    const target = new EndpointsInMemoryStore(
        mockEndpointsRepository,
    );

    test('load config should save endpoints in memory', async () => {
        // given
        const expected = {
            burst: 10,
            lastFilled: 1640995200,
            sustained: 5,
            tokens: 10,
          };

        // when
        await target.load();
        const actual = target.get('users');

        // then
        expect(actual).toEqual(expected);
    });
});

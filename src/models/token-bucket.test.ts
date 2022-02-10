import TokenBucket from './token-bucket';

describe('token bucket model', () => {
    beforeAll(() => {
        jest.useFakeTimers('modern');
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test('should takes one token when take', async () => {
        // given
        const bucket = new TokenBucket(4, 2);

        // when
        bucket.take();

        // then
        expect(bucket.tokens).toEqual(3);
    });

    test('should refill bucket with a fraction of suatained', async () => {
        // given
        jest.setSystemTime(new Date('2021-01-01T12:00:00Z'));
        const bucket = new TokenBucket(4, 2);

        // when
        await Promise.all([...Array(2)].map(() => bucket.take()));
        jest.setSystemTime(new Date('2021-01-01T12:01:00Z'));
        bucket.take();

        // then
        expect(bucket.tokens).toEqual(3);
    });
});

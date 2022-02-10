import { DateUtil } from './date.util';

describe('dateUtil', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('2021-01-01'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should get time now in seconds', () => {
    const ttl = DateUtil.getTimeNowSeconds();

    expect(ttl).toEqual(1609459200);
  });
});

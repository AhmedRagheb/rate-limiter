import Settings from './settings';

describe('Settings', () => {
  it('has to return the port setting value from the process.env', () => {
    // given
    const settingName = 'PORT';
    const settingValue = '8080';
    process.env[settingName] = settingValue;

    // when
    const result = Settings.port;

    // then
    expect(result).toBe(parseInt(settingValue));
  });
});

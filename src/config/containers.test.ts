import { makeMainContainer } from './container';
import Server from '../Server';
import { TYPES } from './types';

describe('Test container', () => {
  it('should not throw any errors when container is initialized', () => {
    expect(
      () => {
        const container = makeMainContainer();
        container.get<Server>(TYPES.Server);
      },
    ).not.toThrow();
  });
});

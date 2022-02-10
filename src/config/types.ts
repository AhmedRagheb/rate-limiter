const routes = {
  TakeRoutes: Symbol.for('TakeRoutes'),
};

const controllers = {
  TakeController: Symbol.for('TakeController'),
};

const services = {
  RateLimiterService: Symbol.for('RateLimiterService'),
  RateLimiterStore: Symbol.for('RateLimiterStore'),
};

const repositories = {
  EndpointsRepository: Symbol.for('EndpointsRepository'),
};

const host = {
  Server: Symbol.for('Server'),
};

const TYPES = {
  Container: Symbol.for('Container'),

  ...host,
  ...routes,
  ...controllers,
  ...services,
  ...repositories,
};

export {
  TYPES,
};

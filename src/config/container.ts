import { Container } from 'inversify';
import TakeController from '../controllers/take.controller';
import EndpointsDiskRepository from '../repositories/endpoints-disk-repository';
import { EndpointsRepository, EndpointsStore } from '../repositories/types';
import TakeRoutes from '../routes/take-routes';
import Server from '../Server';
import RateLimiterService from '../services/rate-limiter-service';
import EndpointsInMemoryStore from '../repositories/endpoints-store';
import { TYPES } from './types';

export const makeMainContainer = (): Container => {
  const container = new Container();

  container.bind<EndpointsRepository>(TYPES.EndpointsRepository)
    .to(EndpointsDiskRepository)
    .inSingletonScope();

  container.bind<EndpointsStore>(TYPES.RateLimiterStore)
    .to(EndpointsInMemoryStore)
    .inSingletonScope();

  container.bind<RateLimiterService>(TYPES.RateLimiterService)
    .to(RateLimiterService);

  container.bind<TakeController>(TYPES.TakeController)
    .to(TakeController);

  container.bind<Server>(TYPES.Server)
    .to(Server)
    .inSingletonScope();

  container.bind<TakeRoutes>(TYPES.TakeRoutes)
    .to(TakeRoutes);

  return container;
};

const container = makeMainContainer();

export default container;

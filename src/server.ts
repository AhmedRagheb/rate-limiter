import express from 'express'

import Settings from './config/settings';
import { notFoundHandler } from './middleware/not-found';
import { errorHandler } from './middleware/error';
import { inject, injectable } from 'inversify';
import { TYPES } from './config/types';
import Logger from './logging/logger';
import TakeRoutes from './routes/take-routes';
import RateLimiterService from './services/rate-limiter-service';

/**
 * A small wrapper around an express server.
 */
@injectable()
class Server {
  public app: express.Express;

  constructor(
    @inject(TYPES.TakeRoutes) private routes: TakeRoutes,
    @inject(TYPES.RateLimiterService) private rateLimiterService: RateLimiterService,
  ) {
    this.app = express();

    // set up routes
    this.app.use(this.routes.configureRoutes());

    // set up handlers
    this.app.use(notFoundHandler);
    this.app.use(errorHandler);
  }

  public async start(): Promise<void> {
    await this.rateLimiterService.loadEndpointsConfig();

    await new Promise(() => {
      this.app.listen(Settings.port, () => {
        Logger.info(`Server started listening on port ${Settings.port}...`);
      })
    });
  }
}

export default Server;

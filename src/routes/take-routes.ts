import Router from 'express-promise-router'
import { injectable, inject } from 'inversify';
import { TYPES } from '../config/types';
import TakeController from '../controllers/take.controller';

@injectable()
class TakeRoutes {
  constructor(
    @inject(TYPES.TakeController)
    private controller: TakeController,
  ) { }

  configureRoutes() {
    const routes = Router();

    routes.get('/take/:endpoint', this.controller.take);

    return routes;
  };
}

export default TakeRoutes;

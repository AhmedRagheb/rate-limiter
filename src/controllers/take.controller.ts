import { Handler } from 'express'
import { inject, injectable } from 'inversify';
import { TYPES } from '../config/types';
import { InvalidParamater } from '../logging/bad-request';
import { HttpCodes } from '../logging/types';
import RateLimiterService from '../services/rate-limiter-service';

@injectable()
class TakeController {
  constructor(
    @inject(TYPES.RateLimiterService) private rateLimiterService: RateLimiterService,
  ) { }

  take: Handler = async (
    request,
    reply,
  ) => {
    const endpoint = request.params.endpoint;
    if (!endpoint) {
      throw new InvalidParamater('endpoint is missing');
    }

    const endpointRate = await this.rateLimiterService.getEndpoint(endpoint);

    reply.status(HttpCodes.OK).json(endpointRate);
  }
};

export default TakeController;

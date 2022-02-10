import { Handler } from 'express'
import { HttpCodes } from '../logging/types'

export const notFoundHandler: Handler = (req, res, next) => {
  res.status(HttpCodes.NotFound).send({ error: 'Not found' });
}

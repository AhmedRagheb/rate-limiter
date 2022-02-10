import { ErrorRequestHandler } from 'express'
import { InvalidParamater } from '../logging/bad-request';
import { HttpCodes } from '../logging/types';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status;
  let code;

  switch (err.constructor) {
    case InvalidParamater:
      status = HttpCodes.BadRequest;
      break;
    default:
      status = HttpCodes.InternalServerError;
      break;
  }

  res.status(status).json({
    msg: err,
  })
}

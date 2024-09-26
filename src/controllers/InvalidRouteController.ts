import { NextFunction, Request, Response } from 'express';

import { NotFound } from '../utils/CustomError';

export const InvalidRouteController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new NotFound(`Can't find ${req.originalUrl} on the server`));
};

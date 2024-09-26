import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../utils/CustomError';

export const errorHandlerMiddleware = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error.statusCode) {
    return res.status(500).json({
      status: 500,
      message: error.message ?? 'Internal Server Error',
    });
  }

  return res
    .status(error.statusCode)
    .json({ status: error.statusCode, message: error.message });
};

import { Request, Response, NextFunction } from 'express';
import { stati } from '../config/config';

export interface AppError extends Error {
  status?: number
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || stati.INTERNAL_SERVER_ERROR).json({
    message: err.message || 'Internal Server Error',
  });
};
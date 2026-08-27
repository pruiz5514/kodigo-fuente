import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'sequelize';

export interface AppError extends Error {
  status?: number;
  data?: unknown;
}

const errorHandler: ErrorRequestHandler = (err: AppError, req, res, next) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  const body: { message: string; data?: unknown } = {
    message: err.message || 'Internal server error',
  };

  if (err.data !== undefined) body.data = err.data;

  res.status(err.status || 500).json(body);
};

export default errorHandler;
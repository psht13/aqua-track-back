import createHttpError from 'http-errors';

export const notFoundHandlerMiddleware = (req, res, next) => {
  return next(createHttpError(404, 'Route not found'));
};

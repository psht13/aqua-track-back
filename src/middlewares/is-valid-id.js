import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidID = (req, res, next) => {
  const { userId } = req.params;
  if (isValidObjectId(userId) !== true) {
    return next(createHttpError(400, 'ID is not  valid'));
  }

  next();
};

import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (id) => (req, res, next) => {
  const oid = req.params[id];

  if (!isValidObjectId(oid)) {
    return next(createHttpError(400, 'Invalid ObjectID'));
  }

  next();
};

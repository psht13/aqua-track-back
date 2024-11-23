import createHttpError from 'http-errors';
import { SessionsCollection } from '../models/sessions.model.js';
import { UsersCollection } from '../models/users.model.js';

export const authenticate = async (req, res, next) => {
  const authorizationHeader = req.get('authorization');

  if (!authorizationHeader) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const [scheme, token] = authorizationHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const session = await SessionsCollection.findOne({ accessToken: token });

  if (!session) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  if (new Date() > new Date(session.accessTokenValidUntil)) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  const user = await UsersCollection.findOne({ _id: session.userId });

  if (!user) {
    return next(createHttpError(401, 'Unauthorized'));
  }

  req.user = { _id: user._id, name: user.name };
  next();
};

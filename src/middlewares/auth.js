import createHttpError from 'http-errors';
import { Session } from '../models/session.js';
import { UserCollection } from '../models/user.js';

export async function auth(req, res, next) {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    return next(createHttpError(401, 'Please provide access token'));
  }

  const [bearer, token] = authHeader.split(' ', 2);

  if (bearer !== 'Bearer' || !token) {
    return next(createHttpError(401, 'Please provide access token'));
  }

  const session = await Session.findOne({ accessToken: token });

  if (session === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await UserCollection.findById(session.userId);

  if (user === null) {
    return next(createHttpError(401, 'Session not found'));
  }

  req.user = { id: user._id, name: user.name };

  next();
}

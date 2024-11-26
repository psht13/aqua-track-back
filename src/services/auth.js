import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { Session } from '../models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';

/**************** User Registration *****************/
export async function registerUser(payload) {
  const user = await User.findOne({ email: payload.email });
  if (user !== null) {
    throw createHttpError(409, 'Email  already in use');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
}

/************************ User Login *************************/
export async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (user === null) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (isMatch !== true) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
  await Session.deleteOne({ userId: user._id });
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');
  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
}

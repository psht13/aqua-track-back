import { User } from '../models/user.js';
import { Session } from '../models/session.js';

/************************ Update User *************************/
export const updateUser = async (userId, payload) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      payload,
      {
        new: true,
        upsert: false,
      },
    );
    if (!user) return null;
    return {
      user,
      isNew: false,
    };
  } catch (error) {
    throw new Error('Failed to update user');
  }
};

/************************ User Logout *************************/
export async function logoutUser(sessionId) {
  return Session.deleteOne({ _id: sessionId });
}
/************************ Refresh Session*************************/
export async function refreshSession(sessionId, refreshToken) {
  const session = await Session.findById(sessionId);
  if (!sessionId) {
    throw createHttpError(401, 'Session not found');
  }
  if (session.refreshToken !== refreshToken) {
    throw createHttpError(401, 'Session not found');
  }
  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);
  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Refresh token is expired');
  }
  await Session.deleteOne({ _id: session._id });

  return Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  });
}

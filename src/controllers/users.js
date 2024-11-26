import fs from 'node:fs/promises';
import createHttpError from 'http-errors';
import { env } from '../utils/env.js';
import { updateUser } from '../services/users.js';
import { uploadToCloudinary } from '../utils/upload-to-cloudinary.js';
import { saveFileToUploadDir } from '../utils/save-file-to-upload-dir.js';
import { refreshSession, logoutUser } from '../services/users.js';
import { ENABLE_CLOUDINARY } from '../constants/index.js';

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const avatarFile = req.file;
  let avatarUrl;
  if (avatarFile) {
    if (ENABLE_CLOUDINARY === true) {
      const result = await uploadToCloudinary(avatarFile.path);
      avatarUrl = result.secure_url || result.url;
      await fs.unlink(avatarFile.path);
    } else {
      avatarUrl = await saveFileToUploadDir(avatarFile);
    }
  }
  const result = await updateUser(userId, {
    ...req.body,
    avatarUrl,
  });
  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact',
    data: result.user,
  });
};
/* Controller for user logout.  */
export async function logoutController(req, res) {
  const { sessionId } = req.cookies;
  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).end();
}
/* Refresh Controller . Updates the user's refresh token by validating the existing refresh token
 * and issuing a new pair of access and refresh tokens. */

export async function refreshController(req, res) {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshSession(sessionId, refreshToken);
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.send({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
}

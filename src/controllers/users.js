import fs from 'node:fs/promises';
import createHttpErrors from 'http-errors';
import { updateUser } from '../services/users.js';
import { uploadToCloudinary } from '../utils/upload-to-cloudinary.js';
import { saveFileToUploadDir } from '../utils/save-file-to-upload-dir.js';
import { ENABLE_CLOUDINARY } from '../constants/index.js';

export const patchUserController = async (req, res, next) => {
  const { id: userId } = req.user;
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
    next(createHttpErrors(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact',
    data: result.user,
  });
};

export const currentUserController = async (req, res) => {
  const { user } = req;
  if (!user) {
    throw createHttpErrors(401, 'Unauthorized: User data is not available');
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      user,
    },
  });
};

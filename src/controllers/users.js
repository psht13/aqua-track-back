import fs from 'node:fs/promises';
import { env } from '../utils/env.js';
import { updateUser } from '../services/users.js';
import { uploadToCloudinary } from '../utils/upload-to-cloudinary.js';

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const avatarFile = req.file;
  let avatarUrl;
  if (avatarFile) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
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
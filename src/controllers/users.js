import fs from 'node:fs/promises';
import { env } from '../utils/env.js';
import { unlink } from 'node:fs';
import { create } from 'node:domain';

export const patchUserController = async (req, res, next) => {
  const { userId } = req.params;
  const avatar = req.file;
  let avatarURL;
  if (avatar) {
    if (env('ENABLE_CLOUDINARY' === 'true')) {
      const result = await uploadToCloudinary(avatar.path);
      avatarURL = result.secure_url || result.url;
      await fs.unlink(avatar.path);
    } else {
      avatarURL = await saveFileToUploadDir(avatar);
    }
  }
  const result = upUser();
};

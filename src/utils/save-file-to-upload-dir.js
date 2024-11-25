import fs from 'node:fs/promises';
import path from 'node:path';
import { UPLOAD_DIR, TEMP_UPLOAD_DIR } from '../constants/index.js';
import { env } from '../utils/env.js';

export async function saveFileToUploadDir(file) {
  await fs.promises.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );
  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
}

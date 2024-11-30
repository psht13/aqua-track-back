import path from 'node:path';
import { env } from '../utils/env.js';

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUDINARY_CLOUD_NAME',
  API_KEY: 'CLOUDINARY_API_KEY',
  API_SECRET: 'CLOUDINARY_API_SECRET',
};
export const ENABLE_CLOUDINARY = true;

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');

export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;
export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');
export const RESET_PWD_PATH = path.join(TEMPLATES_DIR, 'reset-password.html');

export const SMTP = {
  SMTP_HOST: env('SMTP_HOST'),
  SMTP_PORT: Number(env('SMTP_PORT')),
  SMTP_USER: env('SMTP_USER'),
  SMTP_PASSWORD: env('SMTP_PASSWORD'),
  SMTP_FROM: env('SMTP_FROM'),
};

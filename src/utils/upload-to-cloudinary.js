import cloudinary from 'cloudinary';
import { env } from '../utils/env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

export async function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}

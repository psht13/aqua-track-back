import nodemailer from 'nodemailer';

import { env } from './env.js';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: env(SMTP.SMTP_PORT),
  auth: {
    pass: env(SMTP.SMTP_PASSWORD),
    user: env(SMTP.SMTP_USER),
  },
});

export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};

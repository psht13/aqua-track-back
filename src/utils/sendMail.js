import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';

const transporter = nodemailer.createTransport({
  host: SMTP.SMTP_HOST,
  port: SMTP.SMTP_PORT,
  auth: {
    user: SMTP.SMTP_USER,
    pass: SMTP.SMTP_PASSWORD,
  },
});

export function sendMail(message) {
  return transporter.sendMail({ ...message, from: SMTP.SMTP_FROM });
}

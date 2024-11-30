import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import express from 'express';
import { validateBody } from '../middlewares/validate-body.js';
import { updateUserSchema } from '../validation/users.js';
import { upload } from '../middlewares/uploads.js';
import {
  patchUserController,
  currentUserController,
} from '../controllers/users.js';

const router = Router();

const jsonParser = express.json();

router.patch(
  '/',
  upload.single('avatarUrl'),
  jsonParser,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

router.get('/me', ctrlWrapper(currentUserController));

export default router;

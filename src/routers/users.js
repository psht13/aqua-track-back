import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import express from 'express';
import { validateBody } from '../middlewares/validate-body.js';
import { updateUserSchema } from '../validation/users.js';
import { isValidID } from '../middlewares/is-valid-id.js';
import { upload } from '../middlewares/uploads.js';
import {
  patchUserController,
  currentUserController,
} from '../controllers/users.js';

const router = Router();

const jsonParser = express.json();

router.patch(
  '/:userId',
  upload.single('avatarUrl'),
  isValidID,
  jsonParser,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);

router.get('/me', ctrlWrapper(currentUserController));

export default router;

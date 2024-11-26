import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import express from 'express';
import { validateBody } from '../middlewares/validate-body.js';
import { updateUserSchema } from '../validation/users.js';
import { isValidID } from '../middlewares/is-valid-id.js';
import { upload } from '../middlewares/uploads.js';
import {
  patchUserController,
  logoutController,
  refreshController,
} from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

const jsonParser = express.json();

router.patch(
  '/:userId',
  auth,
  upload.single('avatarUrl'),
  isValidID,
  jsonParser,
  validateBody(updateUserSchema),
  ctrlWrapper(patchUserController),
);
router.post('/logout', auth, ctrlWrapper(logoutController));

router.post('/refresh', auth, ctrlWrapper(refreshController));

export default router;

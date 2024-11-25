import express from 'express';
import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import {
  registerController,
  loginController,
  countController,
  logoutController,
  refreshController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validate-body.js';
import { registerSchema, loginSchema } from '../validation/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.post(
  '/register',
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(registerController),
);
router.post(
  '/login',
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(loginController),
);
router.post('/logout', ctrlWrapper(logoutController));

router.post('/refresh', ctrlWrapper(refreshController));

router.get('/user-count', ctrlWrapper(countController));

export default router;

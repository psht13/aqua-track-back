import express from 'express';
import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import {
  registerController,
  loginController,
  countController,
  logoutController,
  refreshController,
  getOauthController,
  confirmOauthController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validate-body.js';
import {
  registerSchema,
  loginSchema,
  confirmOauthSchema,
} from '../validation/auth.js';

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

router.get('/get-oauth', ctrlWrapper(getOauthController));

router.post(
  '/confirm-oauth',
  jsonParser,
  validateBody(confirmOauthSchema),
  ctrlWrapper(confirmOauthController),
);

export default router;

import { Router } from 'express';
import usersRouter from './users.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.use('/users', auth, usersRouter);

export default router;

import { Router } from 'express';
import contactsRouter from './contacts.router.js';
import authRouter from './auth.router.js';

const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;

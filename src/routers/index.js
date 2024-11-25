import authRoutes from './auth.js';
import { Router } from 'express';
import waterRouter from './water-router.js';
import userRouter from './users.js';
import { swaggerDocs } from '../middlewares/swagger-docs.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

router.use('/users', auth, userRouter);

router.use('/auth', authRoutes);

router.use('/waters', waterRouter);

router.use('/api-docs', swaggerDocs());

export default router;

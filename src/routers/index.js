import authRoutes from './auth.js';
import { Router } from 'express';
import waterRouter from './water-router.js';
import { swaggerDocs } from '../middlewares/swagger-docs.js';
const router = Router();
router.use('/auth', authRoutes);

// Auth routes
// TODO

// User routes
// TODO

// Water routes
router.use('/waters', waterRouter);

// router.use('/', someRouter);

router.use('/api-docs', swaggerDocs());
export default router;

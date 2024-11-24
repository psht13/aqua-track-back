import express from 'express';
import {
  addWaterRecordController,
  deleteWaterRecordController,
  getWaterByDayController,
  getWaterByIntervalController,
  updateWaterRecordController,
} from '../controllers/water-controllers.js';
import { isValidId } from '../middlewares/is-valid-id.middleware.js';
import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import { validateBody } from '../middlewares/validate-body.js';
import {
  createWaterSchema,
  updateWaterSchema,
} from '../validation/water-validator.js';

const router = express.Router();

// TODO add authentication for routes

/**
 * @method returns a list of water records filtered by a month
 */
router.get('/byMonth', ctrlWrapper(getWaterByIntervalController));

/**
 * @method returns a list of water records filtered by a day
 */
router.get('/byDay', ctrlWrapper(getWaterByDayController));

/**
 * @method creates a new water record
 */
router.post(
  '/',
  validateBody(createWaterSchema),
  ctrlWrapper(addWaterRecordController),
);

/**
 * @method updates an existing water record by id
 */
router.patch(
  '/:id',
  isValidId,
  validateBody(updateWaterSchema),
  ctrlWrapper(updateWaterRecordController),
);

/**
 * @method deletes an existing water record by id
 */
router.delete('/:id', isValidId, ctrlWrapper(deleteWaterRecordController));

export default router;

import { Router } from 'express';
import express from 'express';

import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  getContactByIdController,
  updateContactController,
} from '../controllers/contacts.controller.js';

import {
  createContactSchema,
  patchContactSchema,
} from '../validation/contacts.schema.js';

import { ctrlWrapper } from '../utils/ctrl-wrapper.js';
import { validateBody } from '../middlewares/validate-body.middleware.js';
import { isValidId } from '../middlewares/validate-id.middleware.js';
import { authenticate } from '../middlewares/authenticate.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';

const jsonParser = express.json();
const uploadPhoto = upload.single('photo');

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  uploadPhoto,
  jsonParser,
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.patch(
  '/:contactId',
  isValidId('contactId'),
  uploadPhoto,
  jsonParser,
  validateBody(patchContactSchema),
  ctrlWrapper(updateContactController),
);

router.delete(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;

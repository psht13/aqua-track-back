import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.service.js';
import { parsePaginationParams } from '../utils/parse-pagination-params.js';
import { parseSortParams } from '../utils/parse-sort-params.js';
import { parseFilterParams } from '../utils/parse-filter-params.js';
import { saveFileToCloudinary } from '../utils/save-to-cloudinary.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const data = await getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
    userId: req.user._id,
  });

  const {
    contacts,
    count: totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  } = data;

  res.status(200).json({
    status: 200,
    message:
      contacts.length !== 0
        ? 'Successfully found contacts!'
        : 'No contacts found',
    data: {
      contacts,
      sortOrder,
      sortBy,
      page,
      perPage,
      totalItems,
      totalPages,
      hasNextPage,
      hasPreviousPage,
    },
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found contact!',
    data: { contact },
  });
};

export const createContactController = async (req, res) => {
  const photo = await saveFileToCloudinary(req.file);

  const payload = { ...req.body, userId: req.user._id, photo };
  const contact = await createContact(payload);

  res.status(201).json({
    status: 201,
    message: 'Successfully created contact!',
    data: { contact },
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const photo = await saveFileToCloudinary(req.file);

  const payload = { ...req.body, userId: req.user._id, photo };
  const contact = await updateContact(contactId, payload);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully updated contact!',
    data: { contact },
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId, req.user._id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).send();
};

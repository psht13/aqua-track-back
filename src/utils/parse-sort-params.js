import { SORT_ORDER } from '../constants/index.js';

const parseSortOrder = (sortOrder) => {
  const isString = typeof sortOrder === 'string';
  if (!isString) return SORT_ORDER.ASC;

  const isSelected = ['asc', 'desc'].includes(sortOrder);
  if (!isSelected) return SORT_ORDER.ASC;

  return sortOrder;
};

const parseSortBy = (sortBy) => {
  const fields = [
    '_id',
    'name',
    'email',
    'phoneNumber',
    'contactType',
    'isFavourite',
    'updatedAt',
    'createdAt',
  ];

  const isString = typeof sortBy === 'string';
  if (!isString) return fields[0];

  const isSelected = fields.includes(sortBy);
  if (!isSelected) return fields[0];

  return sortBy;
};

export const parseSortParams = (query) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};

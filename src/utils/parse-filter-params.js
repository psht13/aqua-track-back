const parseType = (type) => {
  const types = ['work', 'personal', 'home'];

  const isString = typeof type === 'string';
  if (!isString) return;

  const isSelected = types.includes(type);
  if (!isSelected) return;

  return type;
};

const parseBool = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  const isBool = value === 'true' || value === 'false';
  if (!isBool) return;

  return value === 'true' ? true : false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseBool(isFavourite);

  return {
    type: parsedType,
    isFavourite: parsedIsFavourite,
  };
};

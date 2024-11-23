export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.ceil(count / perPage);
  const hasNextPage = Boolean(totalPages - page);
  const hasPreviousPage = page !== 1;

  return {
    count,
    page,
    perPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};

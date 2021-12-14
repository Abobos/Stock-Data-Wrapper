export const getOffSet = (page: number, perPage: number) =>
  perPage * page - perPage;

export const getPaginationMetaData = (
  totalCount: number,
  page: number,
  perPage: number,
  numberOfItems: number
) => {
  const numberOfPages = Math.ceil(totalCount / +perPage);

  return {
    totalCount,
    currentPage: +page,
    numberOfPages,
    numberOfItems,
    firstPage: page === 1,
    lastPage: page === numberOfPages,
  };
};

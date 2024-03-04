export type Pagination<T> = {
  data: T;
  page: number;
  limit: number;
  totalPages: number;
};

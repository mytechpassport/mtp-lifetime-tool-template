export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

export type Pagination = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

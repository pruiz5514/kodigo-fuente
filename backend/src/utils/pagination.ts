interface PaginationParams {
  page?: string | number;
  limit?: string | number;
}

interface PaginationResult {
  currentPage: number;
  currentLimit: number;
  offset: number;
}

export function getPaginationParams({
  page = 1,
  limit = 10,
}: PaginationParams = {}): PaginationResult {
  const currentPage = Math.max(Number.parseInt(String(page), 10) || 1, 1);
  const currentLimit = Math.max(Number.parseInt(String(limit), 10) || 10, 1);
  const offset = (currentPage - 1) * currentLimit;

  return {
    currentPage,
    currentLimit,
    offset,
  };
}

interface BuildPaginationParams<T> {
  count: number;
  rows: T[];
  currentPage: number;
  currentLimit: number;
}

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  currentItems: number;
}

export function buildPagination<T>({
  count,
  rows,
  currentPage,
  currentLimit,
}: BuildPaginationParams<T>): Pagination {
  return {
    totalItems: count,
    totalPages: Math.ceil(count / currentLimit),
    currentPage,
    limit: currentLimit,
    currentItems: rows.length,
  };
}
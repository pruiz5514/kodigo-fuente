export function getPaginationParams({ page = 1, limit = 10, } = {}) {
    const currentPage = Math.max(Number.parseInt(String(page), 10) || 1, 1);
    const currentLimit = Math.max(Number.parseInt(String(limit), 10) || 10, 1);
    const offset = (currentPage - 1) * currentLimit;
    return {
        currentPage,
        currentLimit,
        offset,
    };
}
export function buildPagination({ count, rows, currentPage, currentLimit, }) {
    return {
        totalItems: count,
        totalPages: Math.ceil(count / currentLimit),
        currentPage,
        limit: currentLimit,
        currentItems: rows.length,
    };
}

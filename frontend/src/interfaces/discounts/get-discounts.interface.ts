export interface IDiscounts {
    ok:         boolean;
    discounts:  Discount[];
    pagination: Pagination;
}

export interface Discount {
    id:               number;
    name:             string;
    category_id:      number | null;
    product_id:       number | null;
    discount_type_id: number;
    discount_value:   string;
    start_date:       Date;
    end_date:         Date;
    status:           string;
    createdAt:        Date;
    updatedAt:        Date;
    category:         DiscountType | null;
    product:          Product | null;
    discount_type:    DiscountType;
}

export interface DiscountType {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    id:          number;
    name:        string;
    price:       string;
    category_id: number;
    createdAt:   Date;
    updatedAt:   Date;
}

export interface Pagination {
    totalItems:   number;
    totalPages:   number;
    currentPage:  number;
    limit:        number;
    currentItems: number;
}

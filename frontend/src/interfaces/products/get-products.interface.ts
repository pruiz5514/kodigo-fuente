import type { Category } from "../categories/get-categories.interface";

export interface IProducts {
    ok:       boolean;
    products: Product[];
}

export interface Product {
    id:          number;
    name:        string;
    price:       string;
    category_id: number;
    createdAt:   Date;
    updatedAt:   Date;
    category:    Category | null;
}

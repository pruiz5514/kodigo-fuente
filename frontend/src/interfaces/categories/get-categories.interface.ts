export interface ICategories {
    ok:         boolean;
    categories: Category[];
}

export interface Category {
    id:        number;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

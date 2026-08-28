export interface ICreateDiscount {
    name:             string;
    category_id?:     number;
    product_id?:      number;
    discount_type_id: number;
    discount_value:   number;
    start_date:       Date;
    end_date:         Date;
}

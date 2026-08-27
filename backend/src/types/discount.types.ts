export interface CreateDiscountBody {
    name: string;
    category_id?: number;
    product_id?: number;
    discount_type_id: number;
    discount_value: number;
    status?: 'Programado' | 'Activo' | 'Finalizado';
    start_date: string;
    end_date: string;
}

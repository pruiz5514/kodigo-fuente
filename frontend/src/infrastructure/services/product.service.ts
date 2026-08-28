import type { IProducts } from "../../interfaces/products/get-products.interface";
import { apiClient } from "../utils/api-client";

class ProductService {
    async getProducts(params?: { name?: string }): Promise<IProducts> {
        const query = new URLSearchParams();
        if (params?.name) query.set("name", params.name);

        const queryString = query.toString();
        return apiClient.get<IProducts>(`product${queryString ? `?${queryString}` : ""}`);
    }
}

const productService = new ProductService();
export default productService;

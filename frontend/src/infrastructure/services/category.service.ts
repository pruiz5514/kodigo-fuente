import type { ICategories } from "../../interfaces/categories/get-categories.interface";
import { apiClient } from "../utils/api-client";

class CategoryService {
    async getCategories(): Promise<ICategories> {
        return apiClient.get<ICategories>("category");
    }
}

const categoryService = new CategoryService();
export default categoryService;

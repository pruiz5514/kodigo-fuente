import { Category } from "../database/models/category.model.js";
export default class CategoryService {
    async find() {
        const categories = await Category.findAll();
        return categories;
    }
}

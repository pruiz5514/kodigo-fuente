import CategoryService from '../services/category.service.js';
const service = new CategoryService();
export default class CategoryController {
    async findAll(req, res, next) {
        try {
            const result = await service.find();
            return res.status(200).json({ ok: true, categories: result });
        }
        catch (error) {
            next(error);
        }
    }
}

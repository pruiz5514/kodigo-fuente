import ProductService from '../services/product.service.js';
const service = new ProductService();
export default class ProductController {
    async findAll(req, res, next) {
        try {
            const { name } = req.query;
            const products = await service.find({ name: name });
            return res.status(200).json({ ok: true, products });
        }
        catch (error) {
            next(error);
        }
    }
}

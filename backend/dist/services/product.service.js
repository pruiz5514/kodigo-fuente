import { Op } from "sequelize";
import { Product } from "../database/models/product.model.js";
import { Category } from "../database/models/category.model.js";
export default class ProductService {
    async find({ name } = {}) {
        const where = {};
        if (name)
            where.name = { [Op.iLike]: `%${name}%` };
        return Product.findAll({
            where,
            include: [Category],
        });
    }
}

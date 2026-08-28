import { Op, WhereOptions } from "sequelize";
import { Product } from "../database/models/product.model.js";
import { Category } from "../database/models/category.model.js";

interface FindParams {
    name?: string;
}

export default class ProductService{
    async find({ name }: FindParams = {}){
        const where: WhereOptions = {};
        if (name) where.name = { [Op.iLike]: `%${name}%` };

        return Product.findAll({
            where,
            include: [Category],
        })
    }
}

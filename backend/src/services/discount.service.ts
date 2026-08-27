import { Op, WhereOptions } from "sequelize";
import { Discount } from "../database/models/discount.model.js";
import { Category } from "../database/models/category.model.js";
import { Product } from "../database/models/product.model.js";
import { DiscountType } from "../database/models/discount-type.model.js";

interface FindParams {
    currentLimit: number;
    offset: number;
    name?: string;
    status?: string;
    category_id?: number;
    start_date_from?: string;
    start_date_to?: string;
    end_date_from?: string;
    end_date_to?: string;
}

export default class DiscountService{
    async find({
        currentLimit,
        offset,
        name,
        status,
        category_id,
        start_date_from,
        start_date_to,
        end_date_from,
        end_date_to,
    }: FindParams){
        const where: WhereOptions = {};
        if (name) where.name = { [Op.iLike]: `%${name}%` };
        if (status) where.status = status;
        if (category_id) where.category_id = category_id;

        if (start_date_from || start_date_to) {
            where.start_date = {
                ...(start_date_from ? { [Op.gte]: start_date_from } : {}),
                ...(start_date_to ? { [Op.lte]: start_date_to } : {}),
            };
        }

        if (end_date_from || end_date_to) {
            where.end_date = {
                ...(end_date_from ? { [Op.gte]: end_date_from } : {}),
                ...(end_date_to ? { [Op.lte]: end_date_to } : {}),
            };
        }

        return Discount.findAndCountAll({
            where,
            include: [Category, Product, DiscountType],
            limit: currentLimit,
            offset
        })
    }
}

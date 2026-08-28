import { Op, WhereOptions } from "sequelize";
import { Discount } from "../database/models/discount.model.js";
import { Category } from "../database/models/category.model.js";
import { Product } from "../database/models/product.model.js";
import { DiscountType } from "../database/models/discount-type.model.js";
import { CreateDiscountBody } from "../types/discount.types.js";
import { AppError } from "../middlewares/error.handler.js";

function badRequest(message: string): AppError {
    const error: AppError = new Error(message);
    error.status = 400;
    return error;
}

function getBogotaToday(): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(new Date());
}

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

    async create(data: CreateDiscountBody){
        const today = getBogotaToday();

        if (data.start_date < today) {
            throw badRequest('"start_date" no puede ser anterior a la fecha de hoy');
        }

        if (data.end_date < data.start_date) {
            throw badRequest('"end_date" no puede ser anterior a "start_date"');
        }

        if (!data.category_id && !data.product_id) {
            throw badRequest('Debe especificar un producto o una categoría');
        }

        if (data.category_id) {
            const category = await Category.findByPk(data.category_id);
            if (!category) throw badRequest('La categoría especificada no existe');
        }

        if (data.product_id) {
            const product = await Product.findByPk(data.product_id);
            if (!product) throw badRequest('El producto especificado no existe');
        }

        if (data.discount_type_id) {
            const discountType = await DiscountType.findByPk(data.discount_type_id);
            if (!discountType) throw badRequest('El Tipo de descuento especificado no existe');

            if (discountType.get('name') === 'Porcentaje') {
                if (data.discount_value < 1 || data.discount_value > 100) {
                    throw badRequest('Si el tipo de descuento es "Porcentaje", el valor debe estar entre 1 y 100');
                }

                if (!Number.isInteger(data.discount_value)) {
                    throw badRequest('Si el tipo de descuento es "Porcentaje", el valor debe ser un número entero');
                }
            }
        }

        return Discount.create(data)
    }

    async findActiveToday(){
        const today = getBogotaToday();

        return Discount.findAll({
            where: {
                status: 'Activo',
                start_date: { [Op.lte]: today },
                end_date: { [Op.gte]: today },
            },
            include: [Category, Product, DiscountType],
        })
    }

    async getSummary(){
        const [programada, activa, finalizada, activeToday] = await Promise.all([
            Discount.count({ where: { status: 'Programado' } }),
            Discount.count({ where: { status: 'Activo' } }),
            Discount.count({ where: { status: 'Finalizado' } }),
            this.findActiveToday(),
        ]);

        return {
            scheduled: programada,
            active: activa,
            finished: finalizada,
            activeToday: activeToday.length,
        };
    }

    async delete(id: number){
        const discount = await Discount.findByPk(id);
        if (!discount) throw badRequest('La promoción especificada no existe');

        if (discount.get('status') !== 'Programado') {
            throw badRequest('Solo se puede eliminar una promoción en estado "Programado"');
        }

        await discount.destroy();
    }
}

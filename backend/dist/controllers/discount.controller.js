import DiscountService from '../services/discount.service.js';
import { getPaginationParams, buildPagination } from '../utils/pagination.js';
const service = new DiscountService();
export default class DiscountController {
    async findAll(req, res, next) {
        try {
            const { currentPage, currentLimit, offset } = getPaginationParams({
                page: req.query.page,
                limit: req.query.limit,
            });
            const { name, status, category_id, start_date_from, start_date_to, end_date_from, end_date_to, } = req.query;
            const { count, rows } = await service.find({
                currentLimit,
                offset,
                name: name,
                status: status,
                category_id: category_id ? Number(category_id) : undefined,
                start_date_from: start_date_from,
                start_date_to: start_date_to,
                end_date_from: end_date_from,
                end_date_to: end_date_to,
            });
            const pagination = buildPagination({ count, rows, currentPage, currentLimit });
            return res.status(200).json({ ok: true, discounts: rows, pagination });
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const body = req.body;
            const newDiscount = await service.create(body);
            return res.status(201).json({
                ok: true,
                discount: newDiscount,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;
            const discount = await service.updateStatus(id, status);
            return res.status(200).json({ ok: true, discount });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            await service.delete(id);
            return res.status(204).send();
        }
        catch (error) {
            next(error);
        }
    }
    async getSummary(req, res, next) {
        try {
            const summary = await service.getSummary();
            return res.status(200).json({ ok: true, summary });
        }
        catch (error) {
            next(error);
        }
    }
}

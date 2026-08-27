import { Request, Response, NextFunction } from 'express';
import DiscountService from '../services/discount.service.js';
import { getPaginationParams, buildPagination } from '../utils/pagination.js';

const service = new DiscountService();

export default class DiscountController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { currentPage, currentLimit, offset } = getPaginationParams({
        page: req.query.page as string,
        limit: req.query.limit as string,
      });

      const {
        name,
        status,
        category_id,
        start_date_from,
        start_date_to,
        end_date_from,
        end_date_to,
      } = req.query;

      const { count, rows } = await service.find({
        currentLimit,
        offset,
        name: name as string | undefined,
        status: status as string | undefined,
        category_id: category_id ? Number(category_id) : undefined,
        start_date_from: start_date_from as string | undefined,
        start_date_to: start_date_to as string | undefined,
        end_date_from: end_date_from as string | undefined,
        end_date_to: end_date_to as string | undefined,
      });

      const pagination = buildPagination({ count, rows, currentPage, currentLimit });

      return res.status(200).json({ ok: true, discounts: rows, pagination });
    } catch (error) {
        next(error);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import CategoryService from '../services/category.service.js';

const service = new CategoryService();

export default class CategoryController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await service.find();
      return res.status(200).json({ ok: true, categories: result });
    } catch (error) {
        next(error);
    }
  }
}
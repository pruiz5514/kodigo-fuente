import { Request, Response, NextFunction } from 'express';
import ProductService from '../services/product.service.js';

const service = new ProductService();

export default class ProductController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;
      const products = await service.find({ name: name as string | undefined });
      return res.status(200).json({ ok: true, products });
    } catch (error) {
        next(error);
    }
  }
}

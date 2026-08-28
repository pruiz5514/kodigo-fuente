import express from 'express';
import CategoryRouter from './category.router.js';
import DiscountRouter from './discount.router.js';
import ProductRouter from './product.router.js';
export function routerApi(app) {
    const router = express.Router();
    app.use('/api', router);
    router.use('/category', CategoryRouter);
    router.use('/discount', DiscountRouter);
    router.use('/product', ProductRouter);
}

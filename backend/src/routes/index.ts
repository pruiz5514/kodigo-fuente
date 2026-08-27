import express, { Express } from 'express';
import CategoryRouter from './category.router.js'
import DiscountRouter from './discount.router.js'

export function routerApi(app: Express){
    const router = express.Router()

    app.use('/api', router);
    router.use('/category', CategoryRouter)
    router.use('/discount', DiscountRouter)
}
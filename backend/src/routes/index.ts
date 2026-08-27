import express, { Express } from 'express';

export function routerApi(app: Express){
    const router = express.Router()

    app.use('/app', router)
}
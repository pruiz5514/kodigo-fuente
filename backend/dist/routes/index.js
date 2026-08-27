import express from 'express';
export function routerApi(app) {
    const router = express.Router();
    app.use('/app', router);
}

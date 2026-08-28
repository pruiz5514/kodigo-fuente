import express from 'express';
import cors from 'cors';
import { sequelize } from './database/sequelize.js';
import errorHandler from './middlewares/error.handler.js';
import { routerApi } from './routes/index.js';
import './database/models/index.js';
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.get('/health', async (req, res) => {
    try {
        await sequelize.authenticate();
        res.status(200).json({ status: 'ok' });
    }
    catch (error) {
        res.status(503).json({ status: 'error', message: error.message });
    }
});
routerApi(app);
app.use(errorHandler);
const main = async () => {
    try {
        app.listen(PORT, async () => {
            await sequelize.sync({ alter: true });
            console.log('Database connected');
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
main();

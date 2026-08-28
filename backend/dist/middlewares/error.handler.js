import { ValidationError } from 'sequelize';
const errorHandler = (err, req, res, _next) => {
    if (err instanceof ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    const body = {
        message: err.message || 'Internal server error',
    };
    if (err.data !== undefined)
        body.data = err.data;
    res.status(err.status || 500).json(body);
};
export default errorHandler;

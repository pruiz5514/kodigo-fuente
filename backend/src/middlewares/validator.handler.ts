import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

const validatorHandler = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.details.map((detail) => detail.message),
      });
    }

    req.body = value;
    next();
  };
};


export default validatorHandler

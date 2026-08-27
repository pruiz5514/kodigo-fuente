import Joi from "joi";
export const discountSchema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.number().optional(),
    product_id: Joi.number().optional(),
    discount_type_id: Joi.number().required(),
    discount_value: Joi.number().precision(2).required(),
    status: Joi.string().valid('Programado', 'Activo', 'Finalizado').optional(),
    start_date: Joi.date().custom((value, helpers) => {
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        if (value < today) {
            return helpers.message({ '*': '"start_date" no puede ser anterior a la fecha de hoy' });
        }
        return value;
    }).required(),
    end_date: Joi.date().min(Joi.ref('start_date')).required().messages({
        'date.min': '"end_date" no puede ser anterior a "start_date"'
    })
});

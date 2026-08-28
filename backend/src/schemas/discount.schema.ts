import Joi from "joi";

function getBogotaToday(): string {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota' }).format(new Date());
}

export const discountSchema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.number().optional(),
    product_id: Joi.number().optional(),
    discount_type_id: Joi.number().required(),
    discount_value: Joi.number().precision(2).required(),
    status: Joi.string().valid('Programado', 'Activo', 'Finalizado').optional(),
    start_date: Joi.date().custom((value, helpers) => {
        const today = getBogotaToday();
        const valueDate = value.toISOString().slice(0, 10);

        if (valueDate < today) {
            return helpers.message({ '*': '"start_date" no puede ser anterior a la fecha de hoy' });
        }

        return value;
    }).required(),
    end_date: Joi.date().min(Joi.ref('start_date')).required().messages({
        'date.min': '"end_date" no puede ser anterior a "start_date"'
    })
})

export const updateDiscountStatusSchema = Joi.object({
    status: Joi.string().valid('Activo', 'Finalizado').required()
})
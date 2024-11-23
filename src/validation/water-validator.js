import Joi from 'joi';

export const createWaterSchema = Joi.object({
  amount: Joi.number().positive().required().messages({
    'number.base': `"amount" must be a number`,
    'number.positive': `"amount" must be a positive number`,
    'any.required': `"amount" is a required field`,
  }),
  date: Joi.date().required().messages({
    'date.base': `"date" must be a valid date`,
    'any.required': `"date" is a required field`,
  }),
});
export const updateWaterSchema = Joi.object({
  amount: Joi.number().positive().optional().messages({
    'number.base': `"amount" must be a number`,
    'number.positive': `"amount" must be a positive number`,
  }),
  date: Joi.date().optional().messages({
    'date.base': `"date" must be a valid date`,
  }),
});

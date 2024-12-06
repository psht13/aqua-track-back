import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username shouls be a string',
    'string.min': 'User should have at least 3 characters ',
    'string.max': 'User should have at most 20 characters',
  }),
  email: Joi.string().min(3).max(50).messages({
    'string.base': 'Email must be a string',
    'string.min': 'Email must be at least 3 characters long',
    'string.max': 'Email must be at most 50 characters long',
  }),
  gender: Joi.string().valid('woman', 'man').messages({
    'string.base': 'Gender must be a string',
    'string.valid': 'Gender must be "woman" or "man"',
  }),
  weight: Joi.number().messages({
    'number.base': 'Weight must be a number',
  }),
  activeTime: Joi.number().messages({
    'number.base': 'Weight must be a number',
  }),
  dailyNorm: Joi.number().messages({
    'number.base': 'Weight must be a number',
  }),
});

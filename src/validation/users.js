import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username shouls be a string',
    'string.min': 'User should have at least 3 characters ',
    'string.max': 'User should have at most 20 characters',
  }),
  email: Joi.string().min(3).max(20),
  gender: Joi.string().valid('woman', ' man'),
  weight: Joi.number(),
  activeTime: Joi.number(),
  dailyNorm: Joi.number(),
  avatarUrl: Joi.string(),
});

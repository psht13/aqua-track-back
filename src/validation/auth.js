import Joi from 'joi';
export const registerSchema = Joi.object({
  email: Joi.string().min(5).max(50).email().required(),
  password: Joi.string().min(8).max(20).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(5).max(50).email().required(),
  password: Joi.string().min(8).max(20).required(),
});

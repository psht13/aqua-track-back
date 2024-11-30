import Joi from 'joi';
export const registerSchema = Joi.object({
  email: Joi.string().min(5).max(50).email().required().messages({
    'string.base': 'Email must be a string',
    'string.min': 'Email must be at least 5 characters long',
    'string.max': 'Email must be at most 50 characters long',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(20).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must be at most 20 characters long',
    'any.required': 'Password is required',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().min(5).max(50).email().required().messages({
    'string.base': 'Email must be a string',
    'string.min': 'Email must be at least 5 characters long',
    'string.max': 'Email must be at most 50 characters long',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(20).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must be at most 20 characters long',
    'any.required': 'Password is required',
  }),
});

export const confirmOauthSchema = Joi.object({
  code: Joi.string().required().messages({
    'string.base': 'Code must be a string',
    'any.required': 'Code is required',
  }),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().min(5).max(50).email().required().messages({
    'string.base': 'Email must be a string',
    'string.min': 'Email must be at least 5 characters long',
    'string.max': 'Email must be at most 50 characters long',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
});

export const requestPasswordSchema = Joi.object({
  password: Joi.string().min(8).max(20).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must be at most 20 characters long',
    'any.required': 'Password is required',
  }),
  token: Joi.string().required(),
});

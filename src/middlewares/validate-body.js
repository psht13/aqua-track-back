import createHttpError from 'http-errors';

export function validateBody(schema) {
  return async (req, res, next) => {
    const result = await schema.validate(req.body, { abortEarly: false });

    if (typeof result.error !== 'undefined') {
      console.log(result.error);

      return next(
        createHttpError(
          400,
          result.error.details.map((err) => err.message).join(', '),
        ),
      );
    }
    next();
  };
}

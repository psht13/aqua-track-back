import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
    });
    next();
  } catch (err) {
    const error = createHttpError(
      400,
      err.details.reduce(
        (pv, cv, i) =>
          i < err.details.length - 1
            ? pv + cv.message + ' | '
            : pv + cv.message,
        '',
      ),
    );
    next(error);
  }
};

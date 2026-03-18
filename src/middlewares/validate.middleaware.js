import { CustomError } from '../utils/CustomError.js';
import { ZodError } from 'zod';

export const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message
      }));

      const customError = new CustomError('Validation failed', 400);
      customError.errors = formattedErrors;

      return next(customError);
    }

    next(error);
  }
};
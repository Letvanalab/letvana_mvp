const ApiResponse = require('../utils/responses');

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // Prisma errors
  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'A record with this information already exists';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
  } else if (err.code?.startsWith('P')) {
    statusCode = 400;
    message = 'Database operation failed';
  }

  // Validation errors (Joi)
  if (err.isJoi) {
    statusCode = 422;
    message = 'Validation failed';
    const errors = err.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    return ApiResponse.validationError(res, errors, message);
  }

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  return ApiResponse.error(res, message, statusCode);
};

module.exports = { errorHandler, AppError };
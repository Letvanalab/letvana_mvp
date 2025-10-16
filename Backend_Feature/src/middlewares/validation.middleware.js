const ApiResponse = require('../utils/responses');

const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Return all errors, not just the first one
      stripUnknown: true, // Remove unknown keys
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message.replace(/"/g, ''),
      }));

      return ApiResponse.validationError(res, errors, 'Validation failed');
    }

    // Replace request data with validated and sanitized data
    req[property] = value;
    next();
  };
};

module.exports = validate;
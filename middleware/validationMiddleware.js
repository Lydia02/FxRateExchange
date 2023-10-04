const Joi = require('joi');
const ErrorHandler = require('../errors/AppError'); // Import the error handler
const AppError = require('../errors/AppError');

const userValidationSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const fxPreferenceValidationSchema = Joi.object({
  //userId: Joi.string().required(),
  currencyPair: Joi.string(),
  targetRate: Joi.number(),
});

const validateUser = (req, res, next) => {
  const { error } = userValidationSchema.validate(req.body);
  req.body.email = req.body?.email?.toLowerCase();

  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    // Create and pass an AppError to the error handling middleware
    return next(new AppError(validationErrors.join(', '), 400));
  }

  next();
};

const validateFxPreference = (req, res, next) => {
  const { error } = fxPreferenceValidationSchema.validate(req.body);

  if (error) {
    const validationErrors = error.details.map((detail) => detail.message);
    // Create and pass an AppError to the error handling middleware
    return next(new AppError(validationErrors.join(', '), 400));
  }

  next();
};

module.exports = {
  validateUser,
  validateFxPreference,
};

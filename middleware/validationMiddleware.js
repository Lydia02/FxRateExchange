const Joi = require('joi');

const userValidationSchema = Joi.object({
  firstname: Joi.string(),
  lastname: Joi.string(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const fxPreferenceValidationSchema = Joi.object({
  userId: Joi.string().required(),
  currencyPair: Joi.string().required(),
  targetRate: Joi.number().required(),
});

const validateUser = (req, res, next) => {
  req.body.email = req.body.email.toLowerCase();
  const { error } = userValidationSchema.validate(req.body);
  
  if (error) {
    const validationErrors = error.details.map(detail => detail.message);
    return res.status(400).json({ errors: validationErrors });
  }
  
  next();
};

const validateFxPreference = (req, res, next) => {
  const { error } = fxPreferenceValidationSchema.validate(req.body);
  
  if (error) {
    const validationErrors = error.details.map(detail => detail.message);
    return res.status(400).json({ errors: validationErrors });
  }
  
  next();
};

module.exports = {
  validateUser,
  validateFxPreference,
};

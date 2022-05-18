const { body, validationResult } = require('express-validator');

const userValidator = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters'),
];

const loginValidator = [
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('password must be at least 8 characters'),
];

const userValidatorModific = [
  body('date')
    .notEmpty()
    .withMessage('date cannot be empty')
    .isDate()
    .withMessage('date is not a valid date'),
  body('email')
    .notEmpty()
    .withMessage('email cannot be empty')
    .isEmail()
    .withMessage('must be a valid email'),
];

const restaurantsValidator = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('address').notEmpty().withMessage('address cannot be empty'),
  body('rating').notEmpty().withMessage('rating cannot be empty'),
];

const mealsValidator = [
  body('name').notEmpty().withMessage('name cannot be empty'),
  body('price').notEmpty().withMessage('price cannot be empty'),
];

const ckeckValidator = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join('. ');
    return res.status(400).json({
      status: 'error',
      message: errorMsg,
    });
  }

  next();
};

module.exports = {
  loginValidator,
  userValidator,
  ckeckValidator,
  userValidatorModific,
  restaurantsValidator,
  mealsValidator,
};

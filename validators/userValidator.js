const { body } = require('express-validator');

exports.updateProfileValidation = [
  body('username')
    .optional()
    .isLength({ min: 3, max: 30 }).withMessage('Username must be 3-30 characters'),

  body('email')
    .optional()
    .isEmail().withMessage('Invalid email format'),

  body('bio')
    .optional()
    .isLength({ max: 200 }).withMessage('Bio cannot exceed 200 characters')
];
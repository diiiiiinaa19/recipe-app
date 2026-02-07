const { body } = require('express-validator');

exports.createRecipeValidation = [
  body('title')
    .notEmpty().withMessage('Title is required'),

  body('description')
    .notEmpty().withMessage('Description is required'),

  body('ingredients')
    .isArray({ min: 1 }).withMessage('Ingredients must be a non-empty array'),

  body('instructions')
    .isArray({ min: 1 }).withMessage('Instructions must be a non-empty array'),

  body('category')
    .notEmpty().withMessage('Category is required'),

  body('cookingTime')
    .isInt({ min: 1 }).withMessage('Cooking time must be at least 1 minute'),

  body('servings')
    .isInt({ min: 1 }).withMessage('Servings must be at least 1')
];

exports.updateRecipeValidation = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 100 }).withMessage('Title must be 3-100 characters'),

  body('description')
    .optional()
    .isLength({ min: 10, max: 500 }).withMessage('Description must be 10-500 characters'),

  body('ingredients')
    .optional()
    .isArray({ min: 1 }).withMessage('Ingredients must be a non-empty array'),

  body('instructions')
    .optional()
    .isArray({ min: 1 }).withMessage('Instructions must be a non-empty array'),

  body('category')
    .optional()
    .isIn(['breakfast', 'lunch', 'dinner', 'dessert', 'snacks']).withMessage('Invalid category'),

  body('cookingTime')
    .optional()
    .isInt({ min: 1 }).withMessage('Cooking time must be at least 1 minute'),

  body('servings')
    .optional()
    .isInt({ min: 1 }).withMessage('Servings must be at least 1')
];

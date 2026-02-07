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

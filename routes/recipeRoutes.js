const express = require('express');
const router = express.Router();

const {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  getMyRecipes
} = require('../controllers/recipeController');

const { protect } = require('../middleware/authMiddleware');
const { createRecipeValidation } = require('../validators/recipeValidator');
const { validate } = require('../middleware/validationMiddleware');

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipe);

// Private routes
router.post('/', protect, createRecipeValidation, validate, createRecipe);
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.get('/my/recipes', protect, getMyRecipes);

module.exports = router;


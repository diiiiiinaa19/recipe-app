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
const { createRecipeValidation, updateRecipeValidation } = require('../validators/recipeValidator');
const { validate } = require('../middleware/validationMiddleware');

// Public route - Get all recipes
router.get('/', getAllRecipes);

// Private routes - ВАЖНО: /my/recipes ПЕРЕД /:id
router.get('/my/recipes', protect, getMyRecipes);
router.post('/', protect, createRecipeValidation, validate, createRecipe);

// Routes with :id parameter - ДОЛЖНЫ БЫТЬ ПОСЛЕДНИМИ
router.get('/:id', getRecipe);
router.put('/:id', protect, updateRecipeValidation, validate, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
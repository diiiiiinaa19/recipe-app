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
const { getRecipeById } = require('../controllers/recipeController');

router.get('/', getAllRecipes);


router.get('/my/recipes', protect, getMyRecipes);
router.post('/', protect, createRecipeValidation, validate, createRecipe);


router.get('/:id', getRecipeById);
router.put('/:id', protect, updateRecipeValidation, validate, updateRecipe);
router.delete('/:id', protect, deleteRecipe);

module.exports = router;
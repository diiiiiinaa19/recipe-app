#!/bin/bash

# User Controller
cat > controllers/userController.js << 'EOF'
const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
  try {
    const { username, email, bio } = req.body;
    
    const updateData = {};
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (bio !== undefined) updateData.bio = bio;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    next(error);
  }
};
EOF

# Recipe Controller
cat > controllers/recipeController.js << 'EOF'
const Recipe = require('../models/Recipe');

// @desc    Create new recipe
// @route   POST /api/recipes
// @access  Private
exports.createRecipe = async (req, res, next) => {
  try {
    const { title, description, ingredients, instructions, category, cookingTime, servings } = req.body;
    
    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
      instructions,
      category,
      cookingTime,
      servings,
      author: req.user._id
    });
    
    const populatedRecipe = await Recipe.findById(recipe._id).populate('author', 'username email');
    
    res.status(201).json({
      success: true,
      message: 'Recipe created successfully',
      data: populatedRecipe
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public (can view all, but returns author info)
exports.getAllRecipes = async (req, res, next) => {
  try {
    const { category, search } = req.query;
    
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }
    
    const recipes = await Recipe.find(query)
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single recipe
// @route   GET /api/recipes/:id
// @access  Public
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('author', 'username email bio');
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update recipe
// @route   PUT /api/recipes/:id
// @access  Private (only recipe author)
exports.updateRecipe = async (req, res, next) => {
  try {
    let recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    // Check if user is recipe author
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this recipe'
      });
    }
    
    const { title, description, ingredients, instructions, category, cookingTime, servings } = req.body;
    
    const updateData = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (ingredients) updateData.ingredients = ingredients;
    if (instructions) updateData.instructions = instructions;
    if (category) updateData.category = category;
    if (cookingTime) updateData.cookingTime = cookingTime;
    if (servings) updateData.servings = servings;
    
    recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'username email');
    
    res.status(200).json({
      success: true,
      message: 'Recipe updated successfully',
      data: recipe
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete recipe
// @route   DELETE /api/recipes/:id
// @access  Private (only recipe author)
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: 'Recipe not found'
      });
    }
    
    // Check if user is recipe author
    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this recipe'
      });
    }
    
    await Recipe.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Recipe deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's own recipes
// @route   GET /api/recipes/my/recipes
// @access  Private
exports.getMyRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ author: req.user._id })
      .populate('author', 'username email')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: recipes.length,
      data: recipes
    });
  } catch (error) {
    next(error);
  }
};
EOF

# Auth Routes
cat > routes/authRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
EOF

# User Routes
cat > routes/userRoutes.js << 'EOF'
const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

module.exports = router;
EOF

# Recipe Routes
cat > routes/recipeRoutes.js << 'EOF'
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

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipe);

// Private routes
router.post('/', protect, createRecipe);
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.get('/my/recipes', protect, getMyRecipes);

module.exports = router;
EOF

# Server.js
cat > server.js << 'EOF'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/recipes', require('./routes/recipeRoutes'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Recipe Sharing API',
    version: '1.0.0',
    endpoints: {
      'POST /api/auth/register': 'Register new user',
      'POST /api/auth/login': 'Login user',
      'GET /api/users/profile': 'Get user profile (Private)',
      'PUT /api/users/profile': 'Update user profile (Private)',
      'POST /api/recipes': 'Create recipe (Private)',
      'GET /api/recipes': 'Get all recipes (Public)',
      'GET /api/recipes/:id': 'Get single recipe (Public)',
      'PUT /api/recipes/:id': 'Update recipe (Private)',
      'DELETE /api/recipes/:id': 'Delete recipe (Private)',
      'GET /api/recipes/my/recipes': 'Get my recipes (Private)'
    }
  });
});

// Error handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
EOF

echo "✅ All files created successfully!"

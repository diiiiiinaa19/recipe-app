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

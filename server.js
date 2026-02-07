require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimit = require('express-rate-limit');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Rate limiting для auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per 15 minutes
  message: {
    success: false,
    message: 'Too many login attempts, please try again later'
  }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiter to auth routes
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);


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
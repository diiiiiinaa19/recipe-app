# Recipe Sharing Website

A full-stack recipe sharing platform built with Node.js, Express, and MongoDB where users can create, share, and discover recipes.

# Project Overview

This is a RESTful API backend for a recipe sharing application that allows users to:
Create and share their own recipes
Search and filter through community recipes
Manage their personal profile
Securely authenticate with JWT
Edit and delete their own recipes

Live Demo: https://recipe-app-9ml5.onrender.com

# Features

For Users

Easy recipe creation
Smart search
Personal dashboard
User profiles

Technical Features

Secure authentication
Input validation
Responsive design
RESTful API
Error handling

# Tech Stack

Runtime: Node.js
Framework: Express.js
Database: MongoDB with Mongoose ODM
Authentication: JSON Web Tokens (JWT)
Password Hashing: bcryptjs
Validation: express-validator
CORS: cors

# Project Structure

recipe-sharing-website/
├── config/
│   └── db.js                      # MongoDB connection configuration
│
├── models/
│   ├── User.js                    # User schema (username, email, password, bio)
│   └── Recipe.js                  # Recipe schema (title, ingredients, instructions, etc.)
│
├── controllers/
│   ├── authController.js          # Authentication logic (register, login)
│   ├── userController.js          # User operations (get/update profile)
│   └── recipeController.js        # Recipe CRUD operations
│
├── routes/
│   ├── authRoutes.js              # Auth endpoints (/register, /login)
│   ├── userRoutes.js              # User endpoints (/profile)
│   └── recipeRoutes.js            # Recipe endpoints (CRUD)
│
├── middleware/
│   ├── authMiddleware.js          # JWT token verification
│   ├── errorMiddleware.js         # Global error handler
│   └── validationMiddleware.js    # Validation error handler
│
├── validators/
│   ├── authValidator.js           # Login/register validation rules
│   ├── recipeValidator.js         # Recipe validation rules
│   └── userValidator.js           # Profile update validation rules
│
├── public/                        # Frontend files
│   ├── index.html                 # Homepage (browse all recipes)
│   ├── login.html                 # Login page
│   ├── register.html              # Registration page
│   ├── create.html                # Create new recipe page
│   ├── edit-recipe.html           # Edit recipe page
│   ├── recipe.html                # Recipe details page
│   ├── profile.html               # User profile page
│   └── style.css                  # All styles
│
├── postman-tests/
│   └── screenshots/               # Postman test screenshots
│
├── .env                           # Environment variables (not in repo)
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies and scripts
├── server.js                      # Application entry point
└── README.md                      # Project documentation



# Setup & Installation
Prerequisites

Node.js v18+ installed
MongoDB Atlas account (or local MongoDB)

Steps

Clone the repository

bash   git clone https://github.com/your-username/recipe-sharing-website.git
   cd recipe-sharing-website

Install dependencies

bash   npm install

Create a .env file in the root directory:

env   MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/recipe-db
   JWT_SECRET=your_super_secret_key_here
   JWT_EXPIRE=30d
   PORT=5000
   NODE_ENV=development

Run the server

bash   # Development mode (with auto-restart)
   npm run dev

   # Production mode
   npm start

Open the frontend

Open public/index.html in your browser, or
Use Live Server extension in VS Code

# Testing with Postman

### Step 1: Register a User
- Method: POST
- URL: `http://localhost:5000/api/auth/register`
- Body: JSON with username, email, password
- Save the `token` from response

### Step 2: Create Recipe
- Method: POST
- URL: `http://localhost:5000/api/recipes`
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Body: JSON with recipe details

### Step 3: Get All Recipes
- Method: GET
- URL: `http://localhost:5000/api/recipes`
- No authentication needed

### Step 4: Update Recipe
- Method: PUT
- URL: `http://localhost:5000/api/recipes/RECIPE_ID`
- Headers: `Authorization: Bearer YOUR_TOKEN`
- Body: JSON with fields to update

### Step 5: Delete Recipe
- Method: DELETE
- URL: `http://localhost:5000/api/recipes/RECIPE_ID`
- Headers: `Authorization: Bearer YOUR_TOKEN`


# Dependencies


{
  "express": "^4.18.2",
  "mongoose": "^7.6.0",
  "dotenv": "^16.3.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}



# 🍳 Recipe Sharing Website - Project Plan

## 📋 Project Overview
A full-stack recipe sharing platform where users can:
- Register and login
- Create, view, update, and delete recipes
- Browse recipes by category
- Search recipes
- View other users' recipes

## 🎯 Requirements Coverage

### 1. Project Setup (10 Points) ✅
- Node.js + Express.js
- Modular structure (routes, models, controllers, middleware)
- README.md with documentation

### 2. Database & Models (10 Points) ✅
**Collections:**
- **User** (username, email, password, bio, profilePicture)
- **Recipe** (title, description, ingredients[], instructions[], category, cookingTime, servings, author)

### 3. API Endpoints (20 Points) ✅
**Auth Routes (Public):**
- POST /api/auth/register
- POST /api/auth/login

**User Routes (Private):**
- GET /api/users/profile
- PUT /api/users/profile

**Recipe Routes (Private):**
- POST /api/recipes (Create recipe)
- GET /api/recipes (Get all recipes)
- GET /api/recipes/:id (Get single recipe)
- PUT /api/recipes/:id (Update recipe)
- DELETE /api/recipes/:id (Delete recipe)

**External API (Optional):**
- Nutrition API (get nutrition facts for ingredients)

### 4. Authentication & Security (10 Points) ✅
- JWT authentication
- bcrypt password hashing
- Auth middleware

### 5. Validation & Error Handling (5 Points) ✅
- Input validation
- Error handling middleware

### 6. Deployment (10 Points) ✅
- Deploy to Render/Railway
- Environment variables

### 7. Defense (35 Points) ✅
- Explain code
- Answer questions

## 🏗️ Project Structure

```
recipe-sharing-website/
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── Recipe.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── recipeRoutes.js
├── middleware/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── validationMiddleware.js
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── recipeController.js
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🎨 Features

### Core Features:
✅ User authentication (JWT)
✅ Recipe CRUD operations
✅ User profile management
✅ Recipe categories (Breakfast, Lunch, Dinner, Dessert, Snacks)

### Bonus Features:
✅ Search recipes by title
✅ Filter by category
✅ Recipe belongs to user (author field)
✅ Public recipe browsing
✅ User's own recipes management

## 📊 Database Schema

### User Schema:
```javascript
{
  username: String (required, unique)
  email: String (required, unique)
  password: String (required, hashed)
  bio: String (optional)
  createdAt: Date
  updatedAt: Date
}
```

### Recipe Schema:
```javascript
{
  title: String (required)
  description: String (required)
  ingredients: [String] (required)
  instructions: [String] (required)
  category: String (enum: breakfast, lunch, dinner, dessert, snacks)
  cookingTime: Number (minutes)
  servings: Number
  author: ObjectId (ref: User)
  createdAt: Date
  updatedAt: Date
}
```

## 🚀 Development Steps

1. ✅ Project setup and structure
2. ✅ Database connection
3. ✅ User model and authentication
4. ✅ Recipe model
5. ✅ Auth routes
6. ✅ User routes
7. ✅ Recipe routes
8. ✅ Validation middleware
9. ✅ Error handling
10. ✅ Testing
11. ✅ Documentation
12. ✅ Deployment

## 🎯 Success Criteria

- [x] All endpoints working
- [x] Authentication secure
- [x] Data validation complete
- [x] Error handling proper
- [x] Deployed successfully
- [x] README complete

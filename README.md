# Recipe Sharing Website

A full-stack recipe sharing platform built with Node.js, Express, and MongoDB where users can create, share, and discover recipes.

# Project Overview

This is a RESTful API backend for a recipe sharing application that allows users to:
- Register and authenticate securely with JWT
- Create, read, update, and delete their own recipes
- Browse all recipes from the community
- Filter recipes by category
- Search recipes by title
- View detailed recipe information including ingredients and instructions

# Features

### Core Features
- **User Authentication** - Secure JWT-based authentication
-  **User Profile Management** - View and update user profiles
-  **Recipe CRUD Operations** - Full create, read, update, delete functionality
-  **Recipe Categories** - Organize recipes (Breakfast, Lunch, Dinner, Dessert, Snacks)
-  **Search & Filter** - Find recipes by title or category
-  **Author Attribution** - Each recipe is linked to its creator
-  **Input Validation** - Comprehensive validation on all endpoints
-  **Error Handling** - Detailed error messages and proper status codes

### Security Features
- **Password Hashing** - bcrypt with salt
- **JWT Tokens** - Secure token-based authentication
- **Protected Routes** - Middleware authentication
- **Authorization** - Users can only modify their own recipes

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator
- **CORS:** cors

## Project Structure

```
recipe-sharing-website/
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── User.js               # User schema with password hashing
│   ├── Recipe.js             # Recipe schema
│   ├── profile.js
│   └── edit-recipe.js
├── routes/
│   ├── authRoutes.js         # Authentication routes
│   ├── userRoutes.js         # User profile routes
│   └── recipeRoutes.js       # Recipe CRUD routes
├── middleware/
│   ├── authMiddleware.js     # JWT verification
│   ├── errorMiddleware.js    # Error handling
│   └──validationMiddleware.js
├── controllers/
│   ├── authController.js     # Auth logic
│   ├── userController.js     # User logic
│   └── recipeController.js   # Recipe logic
├── public/
│   ├── create.html
│   ├── edit-recipe.html
│   ├── index.html
│   ├── login.html
│   ├── profile.html
│   ├── recipe.html
│   ├── register.html
│   └── style.css
├── validators/
│   ├── authValidator.js    
│   ├── recipeValidator.js   
│   └── userValidator.js
├── .env                      # Environment variables
├── .gitignore
├── package.json
├── server.js                 # Entry point
├── postman tests/
│   └──postman tests screenshots
└── README.md                                                                       
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account OR local MongoDB
- npm or yarn

### Step 1: Clone the Repository
```bash
git clone <your-repo-url>
cd recipe-sharing-website
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
NODE_ENV=development
```

**MongoDB URI Example:**
```
mongodb+srv://username:password@cluster.mongodb.net/recipe-sharing?retryWrites=true&w=majority
```

### Step 4: Run the Application

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123",
  "bio": "....." // optional
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "I love cooking!"
  }
}
```

---

#### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "I love cooking!"
  }
}
```

---

### User Endpoints (Protected)

**All user endpoints require `Authorization` header:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get User Profile
```http
GET /api/users/profile
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "I love cooking!",
    "createdAt": "2026-02-07T10:00:00.000Z",
    "updatedAt": "2026-02-07T10:00:00.000Z"
  }
}
```

---

#### Update User Profile
```http
PUT /api/users/profile
```

**Request Body:**
```json
{
  "username": "john_chef",
  "bio": "Professional chef and food blogger"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "username": "john_chef",
    "email": "john@example.com",
    "bio": "Professional chef and food blogger",
    "createdAt": "2026-02-07T10:00:00.000Z",
    "updatedAt": "2026-02-07T11:00:00.000Z"
  }
}
```

---

### Recipe Endpoints

#### Create Recipe (Protected)
```http
POST /api/recipes
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body:**
```json
{
  "title": "Chocolate Chip Cookies",
  "description": "Classic homemade chocolate chip cookies that are crispy on the outside and chewy on the inside",
  "ingredients": [
    "2 cups all-purpose flour",
    "1 tsp baking soda",
    "1 cup butter, softened",
    "3/4 cup granulated sugar",
    "2 eggs",
    "2 cups chocolate chips"
  ],
  "instructions": [
    "Preheat oven to 375°F (190°C)",
    "Mix flour and baking soda in a bowl",
    "Cream together butter and sugar",
    "Beat in eggs one at a time",
    "Gradually blend in flour mixture",
    "Stir in chocolate chips",
    "Drop spoonfuls onto baking sheet",
    "Bake for 9-11 minutes until golden"
  ],
  "category": "dessert",
  "cookingTime": 25,
  "servings": 24
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Recipe created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439022",
    "title": "Chocolate Chip Cookies",
    "description": "Classic homemade chocolate chip cookies...",
    "ingredients": [...],
    "instructions": [...],
    "category": "dessert",
    "cookingTime": 25,
    "servings": 24,
    "author": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com"
    },
    "createdAt": "2026-02-07T12:00:00.000Z",
    "updatedAt": "2026-02-07T12:00:00.000Z"
  }
}
```

---

#### Get All Recipes (Public)
```http
GET /api/recipes
```

**Query Parameters (optional):**
- `category` - Filter by category (breakfast, lunch, dinner, dessert, snacks)
- `search` - Search by title

**Examples:**
```http
GET /api/recipes?category=dessert
GET /api/recipes?search=cookie
GET /api/recipes?category=breakfast&search=pancake
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439022",
      "title": "Chocolate Chip Cookies",
      "description": "Classic homemade chocolate chip cookies...",
      "ingredients": [...],
      "instructions": [...],
      "category": "dessert",
      "cookingTime": 25,
      "servings": 24,
      "author": {
        "_id": "507f1f77bcf86cd799439011",
        "username": "johndoe",
        "email": "john@example.com"
      },
      "createdAt": "2026-02-07T12:00:00.000Z"
    },
    ...
  ]
}
```

---

#### Get Single Recipe (Public)
```http
GET /api/recipes/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439022",
    "title": "Chocolate Chip Cookies",
    "description": "Classic homemade chocolate chip cookies...",
    "ingredients": [...],
    "instructions": [...],
    "category": "dessert",
    "cookingTime": 25,
    "servings": 24,
    "author": {
      "_id": "507f1f77bcf86cd799439011",
      "username": "johndoe",
      "email": "john@example.com",
      "bio": "I love cooking!"
    },
    "createdAt": "2026-02-07T12:00:00.000Z",
    "updatedAt": "2026-02-07T12:00:00.000Z"
  }
}
```

---

#### Update Recipe (Protected - Author Only)
```http
PUT /api/recipes/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

**Request Body (all fields optional):**
```json
{
  "title": "Best Chocolate Chip Cookies",
  "cookingTime": 30
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipe updated successfully",
  "data": {
    ...updated recipe data
  }
}
```

---

#### Delete Recipe (Protected - Author Only)
```http
DELETE /api/recipes/:id
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Recipe deleted successfully"
}
```

---

#### Get My Recipes (Protected)
```http
GET /api/recipes/my/recipes
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    ...user's recipes
  ]
}
```

---

## Authentication

### How to Use JWT Token

1. **Register or Login** to receive a token
2. **Include token** in Authorization header for protected routes:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Protected Routes
- `GET /api/users/profile`
- `PUT /api/users/profile`
- `POST /api/recipes`
- `PUT /api/recipes/:id`
- `DELETE /api/recipes/:id`
- `GET /api/recipes/my/recipes`

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Please provide all required fields"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Not authorized to update this recipe"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Recipe not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Testing with Postman

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

---

## Deployment

### Deploying to Render

1. **Create Render Account** at https://render.com

2. **Create New Web Service**
   - Connect your GitHub repository
   - Choose "Node" environment

3. **Configure Build & Start Commands**
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Set Environment Variables**
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secret key
   - `NODE_ENV`: `production`

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

---

## Dependencies

```json
{
  "express": "^4.18.2",
  "mongoose": "^7.6.0",
  "dotenv": "^16.3.1",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "cors": "^2.8.5",
  "express-validator": "^7.0.1"
}
```


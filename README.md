# Blog Project: Assignment-3

## Overview
This project is a backend service for a blogging platform that allows users to create, update, and delete their blogs. The system has two roles: Admin and User. 
- **Admin** can manage users and delete any blog.
- **Users** can perform CRUD operations on their own blogs.
- Secure authentication and role-based access control are implemented.
- A public API is available for viewing blogs with search, sorting, and filtering functionalities.

## 🚀 Technologies Used
- **TypeScript**
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose**

## 🔥 Features
### 1. User Roles
#### Admin:
- Manually created in the database with predefined credentials.
- Can delete any blog.
- Can block any user.
- Cannot update any blog.

#### User:
- Can register and log in.
- Can create, update, and delete their own blogs.
- Cannot perform admin actions.

### 2. Authentication & Authorization
- **Authentication**: Users must log in to perform write, update, and delete operations.
- **Authorization**: Admin and User roles are differentiated and secured.

### 3. Blog API
- Public API to view blogs.
- Includes blog title, content, and author details.
- Supports **search, sorting, and filtering**.

## 🛠️ Models
### User Model
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "admin" | "user",  // Default: "user"
  "isBlocked": false,  // Default: false
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Blog Model
```json
{
  "title": "string",
  "content": "string",
  "author": "ObjectId",  // Reference to User Model
  "isPublished": true,  // Default: true
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 📡 API Endpoints
### 1. Authentication
#### 📌 Register User
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### 📌 Login User
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### 2. Blog Management
#### 📌 Create Blog
```http
POST /api/blogs
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "My First Blog",
  "content": "This is the content of my blog."
}
```

#### 📌 Update Blog
```http
PATCH /api/blogs/:id
```
**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content."
}
```

#### 📌 Delete Blog
```http
DELETE /api/blogs/:id
```
**Headers:** `Authorization: Bearer <token>`

### 3. Public Blog Access
#### 📌 Get All Blogs
```http
GET /api/blogs?search=technology&sortBy=createdAt&sortOrder=desc&filter=authorId
```

### 4. Admin Actions
#### 📌 Block User
```http
PATCH /api/admin/users/:userId/block
```
**Headers:** `Authorization: Bearer <admin_token>`

#### 📌 Delete Blog (Admin)
```http
DELETE /api/admin/blogs/:id
```
**Headers:** `Authorization: Bearer <admin_token>`

## 🛠️ Error Handling
Errors are structured in a consistent format:
```json
{
  "success": false,
  "message": "Error message",
  "statusCode": 400,
  "error": { "details": "Additional error details" },
  "stack": "Error stack trace"
}
```
### Common Errors
- **Validation Error (400)**
- **Authentication Error (401)**
- **Authorization Error (403)**
- **Not Found Error (404)**
- **Internal Server Error (500)**
  

### 📌 Follow these steps to set up the project:
#### 1️⃣ Clone the Repository
```sh
git clone https://github.com/razzbabu4/blog-backend-project.git
cd blog-backend-project
```
#### 2️⃣ Install Dependencies
- If you prefer npm

   ```sh
   npm install
   ```

   - If you prefer yarn

   ```sh
   yarn install
   ```
#### 3️⃣ Set Up Environment Variables
Create a `.env` file and add the following:
```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```
#### 4️⃣ Run the Project
 - For npm
   ```sh
   npm run start:dev
   ```
   
   - For yarn
   ```sh
   yarn start:dev
   ```

## 🔥 Important Links

  **Live Deployment**: https://blog-project-backend-beta.vercel.app
  
  **Video Explanation**:

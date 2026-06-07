# Inventory Management API

A production-style backend application built with Node.js, Express.js, TypeScript, and MongoDB following a layered architecture:

**Controller → Service → Repository → Database**

This project was built to explore backend engineering concepts such as authentication, authorization, API design, validation, security, documentation, and scalable application structure.

---

## Features

### Authentication & Security

* User Registration
* User Login
* User Logout
* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Forgot Password Flow
* Reset Password Flow
* Express Rate Limiting
* Helmet Security Middleware

### Authorization

* Role-Based Access Control (RBAC)
* Admin-only Product Management
* Product Ownership (`createdBy`)

### Product Management

* Create Product
* Update Product
* Delete Product
* Get Product by ID
* Get All Products
* Inventory Stock Management

### API Enhancements

* Pagination
* Filtering
* Sorting
* Request Validation
* Centralized Error Handling
* Standardized API Responses

### Documentation

* Swagger API Documentation
* Bearer Token Support in Swagger UI

---

## Tech Stack

| Category             | Technology                   |
| -------------------- | ---------------------------- |
| Runtime              | Node.js                      |
| Framework            | Express.js 5                 |
| Language             | TypeScript                   |
| Database             | MongoDB Atlas                |
| ODM                  | Mongoose                     |
| Authentication       | JWT (jsonwebtoken)           |
| Password Security    | bcryptjs                     |
| Documentation        | Swagger                      |
| Security             | Helmet, Express Rate Limiter |
| Logging              | Morgan                       |
| Cross-Origin Support | CORS                         |

---

## Architecture

The application follows a layered architecture for better separation of concerns and maintainability.

```text
Request
   ↓
Router
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Mongoose Model
   ↓
MongoDB
```

### Layer Responsibilities

**Controller**

* Handles HTTP requests and responses
* Extracts request parameters
* Delegates business logic to services

**Service**

* Contains business logic
* Performs validations and authorization checks
* Coordinates repository operations

**Repository**

* Handles database interactions
* Encapsulates Mongoose queries

**Database**

* MongoDB Atlas using Mongoose ODM

---

## Product Schema

```ts
{
  name: string;
  price: number;
  description?: string;
  category: "electronics" | "fashion" | "grocery" | "other";
  stock: number;
  createdBy: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
```

### Validation Rules

| Field       | Validation                   |
| ----------- | ---------------------------- |
| name        | Required, 3–100 characters   |
| price       | Required, ≥ 0                |
| description | Optional, max 500 characters |
| category    | Required enum value          |
| stock       | Required, ≥ 0                |
| createdBy   | Required ObjectId reference  |

---

## Installation

### Clone Repository

```bash
git clone <your-repository-url>
cd inventory-management-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000
```

### Start Development Server

```bash
npm run dev
```

### Build Project

```bash
npm run build
```

### Run Production Build

```bash
npm start
```

Server runs on:

```text
http://localhost:5001
```

---

## API Endpoints

### Authentication

| Method | Endpoint                           | Description          |
| ------ | ---------------------------------- | -------------------- |
| POST   | /api/v1/auth/register              | Register user        |
| POST   | /api/v1/auth/login                 | Login user           |
| POST   | /api/v1/auth/logout                | Logout user          |
| POST   | /api/v1/auth/forgot-password       | Generate reset token |
| POST   | /api/v1/auth/reset-password/:token | Reset password       |

---

### Products

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | /api/v1/products     | Create Product (Admin) |
| GET    | /api/v1/products     | List Products          |
| GET    | /api/v1/products/:id | Get Product            |
| PUT    | /api/v1/products/:id | Update Product (Admin) |
| DELETE | /api/v1/products/:id | Delete Product (Admin) |

---

### Query Parameters

```http
GET /api/v1/products?page=1
```

```http
GET /api/v1/products?limit=10
```

```http
GET /api/v1/products?category=electronics
```

```http
GET /api/v1/products?minPrice=100&maxPrice=1000
```

```http
GET /api/v1/products?sort=price
```

---

## Standard API Response

### Success Response

```json
{
  "success": true,
  "message": "Product fetched successfully",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

---

## Swagger Documentation

Swagger UI is available at:

```text
http://localhost:5001/api-docs
```

Features:

* Interactive API Testing
* Request/Response Schemas
* Bearer Token Authentication Support
* Endpoint Documentation

---

## Security Features

* JWT-based Authentication
* Password Hashing using bcryptjs
* Role-Based Access Control
* Protected Routes
* Rate Limiting
* Helmet Security Headers
* Environment Variable Configuration

---

## Future Improvements

* Unit & Integration Testing
* Docker Support
* Refresh Token Strategy
* CI/CD Pipeline
* Redis Caching

---

## Author

Khushi Verma

Frontend Engineer transitioning into Full-Stack Development through hands-on backend projects built with Node.js, Express.js, TypeScript, and MongoDB.

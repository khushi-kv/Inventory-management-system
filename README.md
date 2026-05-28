# Product Inventory API

A backend project built with **Node.js, Express, TypeScript, and MongoDB** following a layered architecture (Controller → Service → Repository).

## Product Schema (current)

```
name        : string (3–100 chars, required)
price       : number (≥ 0, required)
description : string (max 500)
category    : enum ["electronics", "fashion", "grocery", "other"] (required)
stock       : number (≥ 0, required, default: 0)
createdBy   : ObjectId (ref: "User", required)
createdAt   : timestamp (auto)
updatedAt   : timestamp (auto)
```

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express 5
- **Language:** TypeScript
- **Database:** MongoDB (Mongoose ODM)
- **Auth:** bcryptjs (password hashing), jsonwebtoken (JWT)
- **Docs:** Swagger (swagger-jsdoc + swagger-ui-express)
- **Middleware:** cors, helmet, morgan

## Setup

```bash
npm install
npm run dev      # development (tsx watch)
npm run build    # production build
npm start        # run compiled JS
```

Server runs at `http://localhost:5001`.

## APIs (`/api/v1`)

### Products

| Method | Endpoint        | Description                                     |
| ------ | --------------- | ----------------------------------------------- |
| POST   | `/products`     | Create a product (admin only)                   |
| GET    | `/products`     | List products (`?page`, `?limit`, `?category`, `?sort`, `?minPrice`, `?maxPrice`) |
| GET    | `/products/:id` | Get product by ID                               |
| PUT    | `/products/:id` | Update product (admin only)                     |
| DELETE | `/products/:id` | Delete product (admin only)                     |

### Auth

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/auth/register` | Register a new user    |
| POST   | `/auth/login`    | Login, returns JWT     |
| POST   | `/auth/logout`   | Logout (auth required) |

### Docs

| Method | Endpoint    | Description |
| ------ | ----------- | ----------- |
| GET    | `/api-docs` | Swagger UI  |

## Feature Status

| # | Feature | Status |
|---|---------|--------|
| 1 | Product ↔ User relationship (`createdBy`, stored on create) | ✅ Done |
| 2 | Product model — `stock`, `category`, `description`, timestamps, validations | ✅ Done |
| 3 | Business logic — stock/price rejection, proper HTTP codes | ✅ Done |
| 4 | Pagination + filtering (`page`, `limit`, `category`, `sort`, `minPrice`, `maxPrice`) | ✅ Done |
| 5 | Standard API response `{ success, message, data }` | ✅ Done |
| 6 | Centralized error handling (400/401/403/404/500) | ✅ Done |
| 7 | Clean layered architecture | ✅ Done |
| 8 | Testing + edge cases | ❌ Not done |
| 9 | README + docs | ✅ Done |

## Architecture

```
Request → Router → Controller → Service → Repository → Mongoose Model
```

## Next Up

- Password reset flow
- Rate limiting
- Test suite

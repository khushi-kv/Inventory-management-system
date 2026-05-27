# Product Inventory API

A backend project built with **Node.js, Express, TypeScript, and MongoDB** following a layered architecture (Controller → Service → Repository).

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
| POST   | `/products`     | Create a product                                |
| GET    | `/products`     | List products (paginated, filterable, sortable) |
| GET    | `/products/:id` | Get product by ID                               |
| PUT    | `/products/:id` | Update product                                  |
| DELETE | `/products/:id` | Delete product                                  |

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

## Architecture

```
Request → Router → Controller → Service → Repository → Mongoose Model
```

## Next Up

- Role-based access control (admin/user) on product routes
- Password reset flow
- Rate limiting

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import productRouter from "./products/product.module.js";
import authRouter from "./users/auth.module.js";
import { swaggerSpec } from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";
import { globalRateLimiter } from "./common/middleware/rateLimit.middleware.js";
import { errorHandler } from "./common/middleware/errorMiddleware.js";
// console.log("NODE_ENV in app.ts:", process.env.NODE_ENV);
const app = express();

/**
 * Security headers to protect from attacks
 */
app.use(helmet());

/**
 * Logging (only in dev)
 */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * CORS — production ready
 */
app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(","),
    credentials: true,
  }),
);

/**
 * Body parser
 */
app.use(express.json());

app.use(globalRateLimiter);
/**
 * API Routes
 */
app.use("/api/v1/products", productRouter);

/**
 * Swagger Docs
 */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);
export default app;

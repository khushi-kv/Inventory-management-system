// Express app setup — registers middleware, routes, and error handler
import express from "express";
import cors from "cors";
import productRoutes from "./products/product.module.js";
import { errorHandler } from "./common/middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.use("/api/products", productRoutes);
app.use(errorHandler);

export default app;

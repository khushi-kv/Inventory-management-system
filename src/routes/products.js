import express from "express";
import {
  createProduct,
  getProducts,
  getProductId,
  updateProduct,
  deleteProduct
} from "../controllers/products.js";
import { validateObjectId } from "../middleware/validateObjectId.js";
const router = express.Router();

router.route("/").post(createProduct).get(getProducts);

router.get("/:id", validateObjectId, getProductId);

router.put("/:id", validateObjectId, updateProduct);

router.delete("/:id", validateObjectId, deleteProduct);

export default router;

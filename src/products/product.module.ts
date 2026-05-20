// Module — wires routes to controller (replaces old routes/products.js)
import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";
import { validateObjectId } from "../common/middleware/validateObjectId.js";

const router = Router();

router.route("/").post(createProduct).get(getProducts);

router.get("/:id", validateObjectId, getProductById);
router.put("/:id", validateObjectId, updateProduct);
router.delete("/:id", validateObjectId, deleteProduct);

export default router;

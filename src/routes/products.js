import express from "express";
import {
  createProduct,
  getProducts,
  getProductId,
  updateProduct,
  deleteProduct
} from "../controllers/products.js";
const router = express.Router();

router.route("/").post(createProduct).get(getProducts);

router.get("/:id", getProductId);
router.put("/:id", updateProduct);
router.delete("/:id",deleteProduct);
export default router;

import mongoose from "mongoose";
import Product from "../models/product.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

// CREATE PRODUCT
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  return apiResponse(res, 201, true, "Product created successfully", product);
});

// GET ALL PRODUCTS
export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  return apiResponse(res, 200, true, "Products fetched", products);
});

// GET SINGLE PRODUCT BY ID
export const getProductId = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return apiResponse(res, 404, false, "Product not found");
  }

  return apiResponse(res, 200, true, "Product fetched", product);
});

// UPDATE PRODUCT
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedProduct) {
      return apiResponse(res, 404, false, "Product not found");
    }
    return apiResponse(
      res,
      200,
      true,
      "Product updated successfully",
      updatedProduct,
    );

});

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return apiResponse(res, 404, false, "Product not found");
    }
    return apiResponse(res, 200, true, "Product deleted successfully");
};

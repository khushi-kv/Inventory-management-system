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
  let {
    page = 1,
    limit = 10,
    sort = "-createdAt",
    category,
    minPrice,
    maxPrice,
  } = req.query;

  page = Number(page);
  limit = Number(limit);

  //Build filter object
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  //pagination logic

  const skip = (page - 1) * limit;

  //DB query
  const products = await Product.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  //total count for FE pagination
  const total = await Product.countDocuments(filter);

  return apiResponse(res, 200, true, "Products fetched", {
    products,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
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

// HTTP layer — parses request, delegates to service, sends response
import { Request, Response } from "express";
import productService from "./product.service.js";
import { validateCreateProduct } from "./dto/createProduct.dto.js";
import { apiResponse } from "../common/utils/apiResponse.js";
import { asyncHandler } from "../common/middleware/asyncHandler.js";

export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { valid, errors, data } = validateCreateProduct(req.body);
  if (!valid) {
    return apiResponse(res, 400, false, errors.join("; "));
  }

  const product = await productService.createProduct(data);
  return apiResponse(res, 201, true, "Product created successfully", product);
});

export const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const result = await productService.listProducts(req.query);
  return apiResponse(res, 200, true, "Products fetched", result);
});

export const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.getProductById(req.params.id as string);
  return apiResponse(res, 200, true, "Product fetched", product);
});

export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.updateProduct(req.params.id as string, req.body);
  return apiResponse(res, 200, true, "Product updated successfully", product);
});

export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  await productService.deleteProduct(req.params.id as string);
  return apiResponse(res, 200, true, "Product deleted successfully");
});

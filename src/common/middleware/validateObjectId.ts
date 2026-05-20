// Middleware — rejects requests with invalid MongoDB ObjectId params
import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";

export const validateObjectId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id as string)) {
    return apiResponse(res, 400, false, "Invalid ID format");
  }
  next();
};

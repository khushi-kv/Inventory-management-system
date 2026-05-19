import mongoose from "mongoose";
import { apiResponse } from "../utils/apiResponse.js";

export const validateObjectId = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return apiResponse(res, 400, false, "Invalid ID format");
  }
  next();
};
// HTTP layer — parses request, delegates to service, sends response

import { Request, Response } from "express";
import authService from "./auth.service.js";
import { validateRegister } from "./dto/register.dto.js";
import { apiResponse } from "../common/utils/apiResponse.js";
import { asyncHandler } from "../common/middleware/asyncHandler.js";

import { validateLogin } from "./dto/login.dto.js";
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { valid, errors, data } = validateRegister(req.body);

    if (!valid) {
      return apiResponse(res, 400, false, errors.join("; "));
    }
    const user = await authService.registerUser(data);
    return apiResponse(res, 201, true, "User registered successfully", user);
  },
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { valid, errors, data } = validateLogin(req.body);

    // Validation check
    if (!valid) {
      return apiResponse(
        res,
        400,
        false,
        errors.join("; ")
      );
    }

    // Call service
    const loginData = await authService.loginUser(
      data.email,
      data.password
    );

    // Send response
    return apiResponse(
      res,
      200,
      true,
      "Login successful",
      loginData
    );
  }
);
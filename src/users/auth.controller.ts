// HTTP layer — parses request, delegates to service, sends response

import { NextFunction, Request, Response } from "express";
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

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { valid, errors, data } = validateLogin(req.body);

  // Validation check
  if (!valid) {
    return apiResponse(res, 400, false, errors.join("; "));
  }

  // Call service
  const loginData = await authService.loginUser(data.email, data.password);

  // Send response
  return apiResponse(res, 200, true, "Login successful", loginData);
});

export const logoutUser = asyncHandler(async (_req: Request, res: Response) => {
  return apiResponse(res, 200, true, "Logout successful");
});

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const resetData = await authService.forgotPassword(email);

    //send response
    return apiResponse(
      res,
      200,
      true,
      "Reset token generated successfully",
      resetData,
    );
  },
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response) => {
    console.log("RESET PASSWORD CONTROLLER HIT");
    const token = req.params.token as string;

    const { password } = req.body;

    const result = await authService.resetPassword(token, password);

    return apiResponse(res, 200, true, "Password reset successful", result);
  },
);

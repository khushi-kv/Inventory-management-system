// Standard API response helper — consistent JSON shape everywhere
import { Response } from "express";

export const apiResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data: unknown = null
) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
  });
};

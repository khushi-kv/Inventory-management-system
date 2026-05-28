import {
    Request,
    Response,
    NextFunction,
  } from "express";
  
  import jwt from "jsonwebtoken";
  
  export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Read authorization header
      const authHeader =
        req.headers.authorization;
  
      // Check if token exists
      if (!authHeader) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
  
      // Extract token from Bearer token
      const token = authHeader.split(" ")[1];
  
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      );
      // console.log(decoded);
      // Attach decoded user data to request
      (req as any).user = decoded;
  
      // Continue to next middleware/controller
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  };
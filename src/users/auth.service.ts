// Business logic layer — handles auth operations

import bcrypt from "bcryptjs";
import User, { IUser } from "../db/models/user.js";
import jwt, { type SignOptions } from "jsonwebtoken";
class AuthService {
  async registerUser(data: Partial<IUser>) {
    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      const error = new Error("User already exists");
      (error as Error & { statusCode: number }).statusCode = 400;
      throw error;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password as string, 10);

    // Create user
    const user = await User.create({
      ...data,
      password: hashedPassword,
    });

    // Remove password before returning response
    const userObject = user.toObject();

    const { password, ...safeUser } = userObject;

    return safeUser;
  }

  // LOGIN USER
  async loginUser(email: string, password: string) {
    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      const error = new Error("Invalid credentials");

      (error as Error & { statusCode: number }).statusCode = 401;

      throw error;
    }

    // Compare entered password with hashed password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    // Check if password matches
    if (!isPasswordMatched) {
      const error = new Error("Invalid credentials");

      (error as Error & { statusCode: number }).statusCode = 401;

      throw error;
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
  {
    expiresIn: (process.env.JWT_EXPIRES_IN ?? "1d") as SignOptions["expiresIn"],
  },
    );

    // Convert mongoose document to object
    const userObject = user.toObject();

    // Remove password before sending response
    const { password: _, ...safeUser } = userObject;

    // Return token + safe user
    return {
      token,
      user: safeUser,
    };
  }
}

export default new AuthService();

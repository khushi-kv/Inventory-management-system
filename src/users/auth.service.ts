// Business logic layer — handles auth operations

import bcrypt from "bcryptjs";
import User, { IUser } from "../db/models/user.js";

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
}

export default new AuthService();
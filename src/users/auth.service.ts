// Business logic layer — handles auth operations
import crypto from "crypto";
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
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: (process.env.JWT_EXPIRES_IN ??
          "1d") as SignOptions["expiresIn"],
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

  //forgot password
  async forgotPassword(email: string) {
    //find user
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("User not found");

      (error as Error & { statusCode: number }).statusCode = 404;

      throw error;
    }

    //generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    // Set expiry (15 mins)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);

    // Save updated user
    await user.save();

    // Return token temporarily for testing
//     In real apps:

// this is sent via EMAIL link
// NOT returned in API response
    return {
      resetToken,
    };
  }

  //reset password
  async resetPassword(token: string, password: string) {
    // console.log("Incoming token:", token);
    // Find user by token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() },
    });
  
    // console.log("Matched user:", user);
    // Check token validity
    if (!user) {
      const error = new Error("Invalid or expired token");
  
      (error as Error & { statusCode: number }).statusCode = 400;
  
      throw error;
    }
  
    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Update password
    user.password = hashedPassword;
  
    // Clear reset fields after usage 
    user.resetPasswordToken = "";
    user.resetPasswordExpires = new Date(0);
  
    // Save updated user
    await user.save();
  
    return {
      message: "Password reset successful",
    };
  }

   
}

export default new AuthService();

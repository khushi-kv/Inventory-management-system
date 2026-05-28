// Mongoose schema + model — defines Product shape & DB-level validation
import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category: "electronics" | "fashion" | "grocery" | "other";
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    description: {
      type: String,
      maxlength: [500, "Description too long"],
    },
    category: {
      type: String,
      required: true,
      enum: ["electronics", "fashion", "grocery", "other"],
    },
    stock: {
      type: Number,
      default: 0,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>("Product", productSchema);

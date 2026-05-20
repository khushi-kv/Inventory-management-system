// DTO — validates incoming request body BEFORE it reaches the controller
import { CreateProductDTO } from "../interfaces/product.interface.js";

interface FieldRule {
  required: boolean;
  type: "string" | "number" | "boolean";
  minLength?: number;
  maxLength?: number;
  min?: number;
  enum?: string[];
}

const productSchema: Record<string, FieldRule> = {
  name: { required: true, type: "string", minLength: 3, maxLength: 100 },
  price: { required: true, type: "number", min: 0 },
  description: { required: false, type: "string", maxLength: 500 },
  category: {
    required: true,
    type: "string",
    enum: ["electronics", "fashion", "grocery", "other"],
  },
  inStock: { required: false, type: "boolean" },
};

interface ValidationResult {
  valid: boolean;
  errors: string[];
  data: Partial<CreateProductDTO>;
}

export function validateCreateProduct(data: Record<string, unknown>): ValidationResult {
  const errors: string[] = [];
  const sanitized: Partial<CreateProductDTO> = {};

  for (const [field, rules] of Object.entries(productSchema)) {
    const value = data[field];

    if (rules.required && (value === undefined || value === null || value === "")) {
      errors.push(`${field} is required`);
      continue;
    }

    if (value === undefined || value === null) continue;

    if (rules.type === "number" && typeof value !== "number") {
      errors.push(`${field} must be a number`);
      continue;
    }

    if (rules.type === "string" && typeof value !== "string") {
      errors.push(`${field} must be a string`);
      continue;
    }

    if (rules.type === "boolean" && typeof value !== "boolean") {
      errors.push(`${field} must be a boolean`);
      continue;
    }

    if (typeof value === "string") {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${field} must be at least ${rules.minLength} characters`);
        continue;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${field} cannot exceed ${rules.maxLength} characters`);
        continue;
      }
    }

    if (typeof value === "number" && rules.min !== undefined && value < rules.min) {
      errors.push(`${field} must be at least ${rules.min}`);
      continue;
    }

    if (rules.enum && typeof value === "string" && !rules.enum.includes(value)) {
      errors.push(`${field} must be one of: ${rules.enum.join(", ")}`);
      continue;
    }

    (sanitized as Record<string, unknown>)[field] = value;
  }

  return { valid: errors.length === 0, errors, data: sanitized };
}

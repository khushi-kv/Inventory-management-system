import { IUser } from "../../db/models/user.js";

interface FieldRule {
  required: boolean;
  type: "string";
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
}

const registerSchema: Record<string, FieldRule> = {
  name: {
    required: true,
    type: "string",
    minLength: 3,
    maxLength: 50,
  },

  email: {
    required: true,
    type: "string",
    pattern: /^\S+@\S+\.\S+$/,
  },

  password: {
    required: true,
    type: "string",
    minLength: 6,
  },
};

interface ValidationResult {
  valid: boolean;
  errors: string[];
  data: Partial<IUser>;
}

export function validateRegister(
  data: Record<string, unknown>
): ValidationResult {
  const errors: string[] = [];
  const sanitized: Partial<IUser> = {};

  for (const [field, rules] of Object.entries(registerSchema)) {
    const value = data[field];

    if (rules.required && (value === undefined || value === null || value === "")) {
      errors.push(`${field} is required`);
      continue;
    }

    if (value === undefined || value === null) continue;

    if (typeof value !== "string") {
      errors.push(`${field} must be a string`);
      continue;
    }

    if (rules.minLength && value.length < rules.minLength) {
      errors.push(`${field} must be at least ${rules.minLength} characters`);
      continue;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      errors.push(`${field} cannot exceed ${rules.maxLength} characters`);
      continue;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      errors.push(`${field} format is invalid`);
      continue;
    }

    (sanitized as Record<string, unknown>)[field] = value;
  }

  return {
    valid: errors.length === 0,
    errors,
    data: sanitized,
  };
}
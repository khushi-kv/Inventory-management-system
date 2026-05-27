export interface LoginDto {
    email: string;
    password: string;
  }
  
  export const validateLogin = (data: LoginDto) => {
    const errors: string[] = [];
  
    if (!data.email) {
      errors.push("Email is required");
    }
  
    if (!data.password) {
      errors.push("Password is required");
    }
  
    return {
      valid: errors.length === 0,
      errors,
      data,
    };
  };
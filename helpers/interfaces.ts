export interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  result?: User;
  errors?: ValidationError[];
  data?: Record<string, any>;
}

export interface Data {
  result: Record<string, any>[]; // Ensures 'result' is an array of objects
  [key: string]: any; // Allows any other fields with any type
}


export interface listResponse {
  success: boolean;
  message: string;
  token?: string;
  result?: User;
  errors?: ValidationError[];
  data: Data; // Might be an object or an array
}
export interface User {
  id: string;
  name: string;
  email: string;
  role: number;
}

export interface FormData {
  [key: string]: any;
}

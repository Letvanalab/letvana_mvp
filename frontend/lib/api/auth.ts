const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number?: string;
  user_type: "tenant" | "landlord";
  profile_picture_url?: string;
}

interface ApiResponse {
  status: number;
  success: boolean;
  message: string;
  token?: string;
  user?: {
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    user_type: string;
    created_at: string;
    profile_picture_url?: string;
  };
  errors?: string[];
}

export const authAPI = {
  register: async (data: RegisterData): Promise<ApiResponse> => {
    try {
      // Changed from /api/auth/register to /user/register based on backend routes
      const response = await fetch(`${API_BASE_URL}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned non-JSON response. Backend might not be running.",
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Registration API error:", error);
      throw error;
    }
  },

  login: async (email: string, password: string): Promise<ApiResponse> => {
    try {
      // Changed from /api/auth/login to /user/login based on backend routes
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server returned non-JSON response. Backend might not be running.",
        );
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Login API error:", error);
      throw error;
    }
  },
};

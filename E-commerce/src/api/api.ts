import axios from "axios";

const API_BASE_URL = "https://auth-backend-zwbl.onrender.com/api/auth";

interface RegisterResponse {
  message: string;
  user?: {
    name: string;
    email: string;
    _id: string;
  };
}

interface RegisterError {
  message: string;
}

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> => {
  try {
    const response = await axios.post<RegisterResponse>(
      `${API_BASE_URL}/register`,
      userData
    );
    return response.data;
  } catch (error: any) {
    throw (error.response?.data as RegisterError) || {
      message: "Something went wrong. Please try again.",
    };
  }
};


export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/verify-otp`, { email, otp });
    return response.data; // Success response from backend
  } catch (error: any) {
    throw error.response?.data || { message: "Something went wrong. Please try again." };
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });

    return response.data; // Assuming API returns { success: true, token: "your-token" }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Login failed",
    };
  }
};


export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/faker-data`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

export const saveCategory = async (name: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/save-category`, { name });
    return response.data;
  } catch (error) {
    console.error("Error saving category", error);
    return null;
  }
};

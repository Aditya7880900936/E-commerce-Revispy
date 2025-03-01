import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

const EcommerceLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    showPassword: false,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({
      ...prev,
      showPassword: !prev.showPassword,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await loginUser(formData.email, formData.password);

      console.log("API Response:", response); // Debugging step

      // Check for success
      if (response.success) {
        // Store token in localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("isAuthenticated", "true");

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Login Form */}
      <div className="max-w-md mx-auto my-12 p-8 border rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>

        <div className="text-center mb-8">
          <h3 className="text-xl font-medium">Welcome back to ECOMMERCE</h3>
          <p className="text-gray-600">The next gen business marketplace</p>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200 pr-16"
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm"
                onClick={togglePasswordVisibility}
              >
                {formData.showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full bg-black text-white py-3 rounded text-sm font-medium ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-gray-800 transition"
            }`}
            disabled={loading}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <div className="border-t mt-6 pt-6">
            <div className="text-center">
              <span className="text-gray-600">Don't have an Account? </span>
              <a href="/signup" className="font-bold">
                SIGN UP
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EcommerceLogin;

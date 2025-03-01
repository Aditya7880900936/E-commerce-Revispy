import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";


interface SignupFormData {
  name: string;
  email: string;
  password: string;
  showPassword: boolean;
}

// Main app component
const EcommerceSignUp = () => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    password: "",
    showPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await registerUser(formData)
      setSuccess(response.message);
      localStorage.setItem("userEmail", formData.email);
      setTimeout(()=>{
        navigate("/otp-verification");
      }, 2000);
    }
    catch(error:any){
      setError(error.message || "Something went wrong. Please try again.");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sign Up Form */}
      <div className="max-w-md mx-auto my-12 p-8 border rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-8 ">
          Create your account
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}


        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

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
            <label htmlFor="password" className="block mb-2">Password</label>
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
                {formData.showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded text-sm  font-semibold hover:bg-gray-800 transition"
            disabled={loading}
          >
            {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="text-center mt-6 pb-10 pt-2" >
          <span className="text-gray-600">Have an Account? </span>
          <a href="/login" className="font-semibold">
            LOGIN
          </a>
        </div>
      </div>
    </div>
  );
};

export default EcommerceSignUp;

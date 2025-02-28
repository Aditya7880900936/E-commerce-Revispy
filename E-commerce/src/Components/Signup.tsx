import React, { useState } from "react";

// Main app component
const EcommerceSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically handle the API call to create the account
  };

  return (
    <section id="signup">


    <div className="min-h-screen bg-white">
      {/* Sign Up Form */}
      <div className="max-w-md mx-auto my-12 p-8 border rounded-xl">
        <h2 className="text-2xl font-bold text-center mb-8 ">
          Create your account
        </h2>

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
            <label htmlFor="password" className="block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded text-sm  font-semibold hover:bg-gray-800 transition"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <div className="text-center mt-6 pb-10 pt-2" >
          <span className="text-gray-600">Have an Account? </span>
          <a href="#login" className="font-semibold">
            LOGIN
          </a>
        </div>
      </div>
    </div>
    </section>
  );
};

export default EcommerceSignUp;

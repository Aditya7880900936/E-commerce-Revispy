import React, { useState } from 'react';

interface LoginFormData {
  email: string;
  password: string;
  showPassword: boolean;
}

const EcommerceLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    showPassword: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { email: formData.email, password: formData.password });
    // Here you would typically handle authentication
  };

  return (
    <section id='login'>
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="p-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">ECOMMERCE</h1>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Sale</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Clearance</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">New stock</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Trending</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <a href="#" className="text-sm text-gray-700">Help</a>
              <a href="#" className="text-sm text-gray-700">Orders & Returns</a>
              <a href="#" className="text-sm text-gray-700">Hi, John</a>
            </div>
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Announcement Bar */}
      <div className="bg-gray-100 py-3 text-center relative">
        <button className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-sm">Get 10% off on business sign up</p>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Login Form */}
      <div className="max-w-md mx-auto my-12 p-8 border rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        
        <div className="text-center mb-8">
          <h3 className="text-xl font-medium">Welcome back to ECOMMERCE</h3>
          <p className="text-gray-600">The next gen business marketplace</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">Email</label>
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
            className="w-full bg-black text-white py-3 rounded text-sm font-medium hover:bg-gray-800 transition"
          >
            LOGIN
          </button>
          
          <div className="border-t mt-6 pt-6">
            <div className="text-center">
              <span className="text-gray-600">Don't have an Account? </span>
              <a href="#signup" className="font-bold">SIGN UP</a>
            </div>
          </div>
        </form>
      </div>
    </div>
    </section>
  );
};

export default EcommerceLogin;
import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    alert(`Welcome back, ${formData.email}! 👋`);
    setError("");
    setFormData({ email: "", password: "" });
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 py-16 bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
    
          <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">Welcome Back</h2>
          <p className="mb-8 text-center text-gray-600">
          Log in to continue your personalized learning journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
 
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                <LockClosedIcon className="w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 border-gray-300 rounded accent-indigo-600 focus:ring-2 focus:ring-indigo-500"
                />
                Remember me
              </label>
              <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-700 hover:underline">
                Forgot password?
              </a>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="w-full py-3 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-2.5 rounded-lg font-medium border border-gray-300 hover:bg-gray-50 transition-colors shadow-sm">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Signin;

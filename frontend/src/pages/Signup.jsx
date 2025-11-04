import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        // Show success message
        setSuccess("Account created successfully! Redirecting to sign in...");
        setError("");
        
        // Navigate to signin page after a brief delay
        setTimeout(() => {
          navigate("/signin");
        }, 1500);
      } else {
        setError(data.message || "Signup failed");
        setSuccess("");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Unable to connect to server. Please try again later.");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen px-4 py-16 bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white border border-gray-200 shadow-xl rounded-2xl">
          <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">
            Create Your Account
          </h2>
          <p className="mb-8 text-center text-gray-600">
            Join NexaLearn and start your personalized learning journey.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-200">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Ethan Hunt"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email Address
              </label>
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
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
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

            {error && <p className="text-sm text-red-600">{error}</p>}
            {success && <p className="text-sm text-green-600">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-semibold text-indigo-600 hover:text-indigo-700 hover:underline"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;

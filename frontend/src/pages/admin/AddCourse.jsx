import React, { useState } from "react";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ClockIcon,
  PhotoIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusCircleIcon
} from "@heroicons/react/24/outline";

const AddCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "",
    duration: "",
    image: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!form.title || !form.description || !form.level || !form.duration) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch("http://localhost:5000/api/courses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Course added successfully!");
        setForm({
          title: "",
          description: "",
          level: "",
          duration: "",
          image: "",
        });
      } else {
        setError(data.message || "Error adding course. Please try again.");
      }
    } catch (err) {
      console.error("Add course error:", err);
      setError("Unable to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        <div className="p-6 mb-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <PlusCircleIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Add New Course</h2>
          </div>
          <p className="text-gray-600 ml-14">
            Fill in the course details below to add a new course to the platform
          </p>
        </div>

        {message && (
          <div className="flex items-center gap-3 p-4 mb-6 border border-green-200 rounded-lg bg-green-50">
            <CheckCircleIcon className="flex-shrink-0 w-6 h-6 text-green-600" />
            <p className="font-medium text-green-700">{message}</p>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 mb-6 border border-red-200 rounded-lg bg-red-50">
            <XCircleIcon className="flex-shrink-0 w-6 h-6 text-red-600" />
            <p className="font-medium text-red-700">{error}</p>
          </div>
        )}

        
        <div className="p-6 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Course Title <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200">
                <AcademicCapIcon className="flex-shrink-0 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Advanced React & TypeScript"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Course Description */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Course Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3">
                  <BookOpenIcon className="w-5 h-5 text-gray-400" />
                </div>
                <textarea
                  name="description"
                  rows="5"
                  placeholder="Provide a detailed description of the course content, learning outcomes, and what students will gain..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full py-3 pl-10 pr-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg resize-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                ></textarea>
              </div>
            </div>

            {/* Level and Duration - Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {/* Course Level */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Course Level <span className="text-red-500">*</span>
                </label>
                <select
                  name="level"
                  value={form.level}
                  onChange={handleChange}
                  className="w-full p-3 text-gray-900 bg-white border border-gray-300 rounded-lg appearance-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                >
                  <option value="">Select Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Duration <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200">
                  <ClockIcon className="flex-shrink-0 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="duration"
                    placeholder="e.g., 15 hours"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                  />
                </div>
              </div>
            </div>

        
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Course Image URL
              </label>
              <div className="flex items-center gap-2 p-3 border border-gray-300 rounded-lg focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200">
                <PhotoIcon className="flex-shrink-0 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="image"
                  placeholder="https://example.com/course-image.jpg"
                  value={form.image}
                  onChange={handleChange}
                  className="w-full text-gray-900 placeholder-gray-400 bg-transparent focus:outline-none"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Optional: Add a URL to a course thumbnail image
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center flex-1 gap-2 py-3 font-semibold text-white transition-all duration-200 bg-emerald-600 rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-400 disabled:cursor-not-allowed"
              >
                {loading ? (
                  "Adding Course..."
                ) : (
                  <>
                    <PlusCircleIcon className="w-5 h-5" />
                    Add Course
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    title: "",
                    description: "",
                    level: "",
                    duration: "",
                    image: "",
                  })
                }
                className="px-6 py-3 font-semibold text-gray-700 transition-colors duration-200 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <div className="p-4 mt-6 border border-emerald-200 rounded-lg bg-emerald-50">
          <div className="flex gap-3">
            <BookOpenIcon className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="mb-1 font-semibold text-emerald-900">Course Guidelines</h3>
              <ul className="space-y-1 text-sm text-emerald-700">
                <li>• Ensure the course title is clear and descriptive</li>
                <li>• Provide comprehensive course description</li>
                <li>• Select appropriate difficulty level for target audience</li>
                <li>• Include estimated completion time in hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;

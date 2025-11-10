import React, { useState, useEffect } from "react";
import StudentSidebar from "../components/sidebar/StudentSidebar";
import {
  MagnifyingGlassIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  FunnelIcon,
  BookOpenIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/courses");
      const data = await response.json();

      if (response.ok) {
        setCourses(data.courses || []);
        setFilteredCourses(data.courses || []);
      } else {
        setError("Failed to load courses");
        setCourses([]);
        setFilteredCourses([]);
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
      setError("Unable to connect to server. Please check your connection.");
      setCourses([]);
      setFilteredCourses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (course.instructor &&
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedLevel !== "all") {
      result = result.filter((course) => course.level === selectedLevel);
    }

    if (selectedCategory !== "all") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedLevel, selectedCategory, courses]);

  const handleEnroll = (courseId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signin";
      return;
    }

    alert("Enrollment feature coming soon!");
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const categories = [
    "all",
    "Development",
    "AI & ML",
    "Design",
    "Data Science",
    "Security",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />

      <div className="flex-1">
        {/* Header Section */}
        <div className="text-white bg-gradient-to-r from-indigo-600 to-indigo-800">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="text-center">
              <AcademicCapIcon className="w-16 h-16 mx-auto mb-4 text-indigo-200" />
              <h1 className="mb-4 text-4xl font-bold md:text-5xl">
                Explore Our Courses
              </h1>
              <p className="max-w-2xl mx-auto text-xl text-indigo-100">
                Learn from industry experts and advance your career with our
                comprehensive course catalog
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="p-6 mb-8 bg-white rounded-lg shadow-md">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <FunnelIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 bg-white border border-gray-300 rounded-lg appearance-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  >
                    <option value="all">All Levels</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="relative">
                  <BookOpenIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full py-3 pl-10 pr-4 bg-white border border-gray-300 rounded-lg appearance-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredCourses.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {courses.length}
              </span>{" "}
              courses
            </div>
          </div>

          {loading && (
            <div className="py-12 text-center">
              <div className="inline-block w-12 h-12 border-b-2 border-indigo-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
          )}

          {error && !loading && courses.length === 0 && (
            <div className="py-12 text-center border border-yellow-200 rounded-lg bg-yellow-50">
              <BookOpenIcon className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
              <p className="mb-2 text-lg font-semibold text-yellow-800">
                No Courses Available
              </p>
              <p className="text-yellow-700">{error}</p>
              <p className="mt-2 text-sm text-yellow-600">
                Please contact the administrator or check back later.
              </p>
            </div>
          )}

          {!loading && filteredCourses.length === 0 && (
            <div className="py-12 text-center bg-gray-100 rounded-lg">
              <BookOpenIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-600">
                No courses found matching your criteria
              </p>
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl"
              >
                <div className="relative h-48 bg-gradient-to-br from-indigo-400 to-indigo-600">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full">
                      <AcademicCapIcon className="w-20 h-20 text-white opacity-50" />
                    </div>
                  )}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
                      course.level
                    )}`}
                  >
                    {course.level
                      ? course.level.charAt(0).toUpperCase() +
                        course.level.slice(1)
                      : "N/A"}
                  </div>
                </div>

                <div className="p-6">
                  {course.category && (
                    <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                      {course.category}
                    </span>
                  )}

                  <h3 className="mb-2 text-xl font-bold text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>

                  <p className="mb-4 text-sm text-gray-600 line-clamp-2">
                    {course.description}
                  </p>

                  {course.instructor && (
                    <p className="mb-3 text-sm text-gray-500">
                      by{" "}
                      <span className="font-medium text-gray-700">
                        {course.instructor}
                      </span>
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    {course.students && (
                      <div className="flex items-center gap-1">
                        <UserGroupIcon className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {course.rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, index) =>
                          index < Math.floor(course.rating) ? (
                            <StarSolidIcon
                              key={index}
                              className="w-4 h-4 text-yellow-400"
                            />
                          ) : (
                            <StarIcon
                              key={index}
                              className="w-4 h-4 text-gray-300"
                            />
                          )
                        )}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        {course.rating}
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700"
                  >
                    <CheckCircleIcon className="w-5 h-5" />
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredCourses.length > 0 && (
            <div className="p-8 mt-16 text-center text-white rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-800">
              <AcademicCapIcon className="w-12 h-12 mx-auto mb-4 text-indigo-200" />
              <h2 className="mb-4 text-3xl font-bold">
                Can't Find What You're Looking For?
              </h2>
              <p className="max-w-2xl mx-auto mb-6 text-indigo-100">
                We're constantly adding new courses. Contact us to suggest
                topics or request custom training.
              </p>
              <a
                href="/contact"
                className="inline-block px-8 py-3 font-semibold text-indigo-600 transition-colors duration-200 bg-white rounded-lg hover:bg-indigo-50"
              >
                Contact Us
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

import React from "react";
import { StarIcon, ClockIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

const CoursesPreview = () => {
  const courses = [
    {
      title: "Web Development Fundamentals",
      description:
        "Learn the core technologies behind every modern website — HTML, CSS, and JavaScript — and start building real projects.",
      duration: "6 weeks",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Data Science with Python",
      description:
        "Master data analysis, visualization, and machine learning using Python libraries like Pandas, NumPy, and Scikit-learn.",
      duration: "8 weeks",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1556155092-8707de31f9c4?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "AI & Machine Learning Essentials",
      description:
        "Understand the foundations of Artificial Intelligence and Machine Learning to create intelligent solutions for real-world problems.",
      duration: "10 weeks",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">

        <div className="mb-12 text-center">
          <h2 className="font-semibold tracking-wide text-purple-600 uppercase">Courses</h2>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Explore Popular Learning Paths
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Whether you’re starting your journey or upskilling for the future, NexaLearn’s AI-powered
            platform connects you with the right course for your goals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {courses.map((course, index) => (
            <div
              key={index}
              className="overflow-hidden transition-transform transform border border-purple-100 shadow-md bg-gray-50 rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >

              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-48"
                />
                <div className="absolute px-3 py-1 text-xs text-white bg-purple-600 rounded-full shadow top-3 right-3">
                  {course.level}
                </div>
              </div>

              <div className="p-6 text-left">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">{course.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{course.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-5 h-5 text-purple-500" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>

                <button className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2.5 rounded-lg hover:from-purple-700 hover:to-pink-600 transition">
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 font-semibold text-white transition bg-purple-600 rounded-lg hover:bg-purple-700">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;

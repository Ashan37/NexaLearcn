import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sophia Adams",
      role: "Computer Science Student",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      review:
        "NexaLearn changed the way I study! The AI recommendations helped me find the best courses and focus on what truly matters for my goals.",
      rating: 5,
    },
    {
      name: "Ethan Williams",
      role: "Web Developer",
      image: "https://randomuser.me/api/portraits/men/52.jpg",
      review:
        "As a self-taught developer, I found NexaLearn incredibly helpful. The platform’s personalized learning paths made my upskilling journey smooth and efficient.",
      rating: 5,
    },
    {
      name: "Ava Chen",
      role: "AI Enthusiast",
      image: "https://randomuser.me/api/portraits/women/75.jpg",
      review:
        "The AI advisor feels like a personal mentor! It analyzed my progress and suggested exactly what I needed to move forward. Highly recommended!",
      rating: 4.8,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="font-semibold tracking-wide text-teal-600 uppercase">Testimonials</h2>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            What Our Learners Say
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-600">
            Discover how students and professionals around the world are learning smarter
            with NexaLearn’s AI-powered platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="p-8 transition-transform transform bg-white border border-purple-100 shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  src={t.image}
                  alt={t.name}
                  className="object-cover w-20 h-20 mb-4 border-4 border-purple-200 rounded-full"
                />
                <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
                <p className="text-sm font-medium text-teal-500">{t.role}</p>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(t.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  “{t.review}”
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 font-semibold text-white transition rounded-lg bg-emerald-600 hover:from-purple-700 hover:to-pink-600">
            Share Your Experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

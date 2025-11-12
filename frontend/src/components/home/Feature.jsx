import React from "react";
import {
  SparklesIcon,
  CalendarIcon,
  ChartBarIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

const Feature = () => {
  const features = [
    {
      name: "AI Learning Advisor",
      description:
        "Get personalized guidance powered by AI find the best courses and learning paths based on your goals and interests.",
      icon: SparklesIcon,
    },
    {
      name: "Personalized Study Plans",
      description:
        "Receive customized study schedules that adapt to your pace and learning style, ensuring effective knowledge retention.",
      icon: CalendarIcon,
    },
    {
      name: "Smart Progress Tracking",
      description:
        "Stay motivated with visual progress tracking. Our AI monitors your learning habits and suggests next steps.",
      icon: ChartBarIcon,
    },
    {
      name: "Interactive AI Chat",
      description:
        "Chat with NexaLearn’s AI assistant anytime. Get instant feedback, answers, and study recommendations.",
      icon: ChatBubbleLeftRightIcon,
    },
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Platform Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover how NexaLearn transforms your learning experience
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 text-white bg-teal-600 rounded-lg">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;

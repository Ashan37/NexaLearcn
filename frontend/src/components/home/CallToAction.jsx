import React from "react";
import { ArrowRightIcon, SparklesIcon } from "@heroicons/react/24/outline";

const CallToAction = () => {
  return (
    <section className="relative py-20 overflow-hidden text-white bg-gradient-to-r from-purple-700 via-purple-600 to-pink-500">
      
      <div className="absolute inset-0">
        <div className="absolute rounded-full top-20 left-20 w-72 h-72 bg-purple-400/30 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full bottom-20 right-20 w-72 h-72 bg-pink-400/20 blur-3xl animate-pulse"></div>
      </div>

      
      <div className="relative z-10 max-w-5xl px-6 mx-auto text-center">
        <div className="flex justify-center mb-6">
          <SparklesIcon className="w-10 h-10 text-yellow-300 animate-pulse" />
        </div>
        <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
          Take the Next Step in Your Learning Journey
        </h2>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-purple-100">
          Join thousands of learners who are using NexaLearn’s AI-powered education advisor
          to unlock their full potential. Start your personalized journey today!
        </p>

        
        <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
          <button className="flex items-center justify-center gap-2 px-8 py-3 font-semibold text-purple-700 transition bg-white rounded-xl hover:bg-gray-100">
            Get Started Free
            <ArrowRightIcon className="w-5 h-5" />
          </button>

          <button className="flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white transition border border-white rounded-xl hover:bg-white/10">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

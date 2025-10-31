import React from "react";

const Hero = () => {
  return (
    <div 
      className="relative flex items-center min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: "url('./src/assets/hero.png')",
      }}
    >
      
      {/* Solid Dark Overlay */}
      <div className="absolute inset-0 bg-slate-900/10"></div>
      
      
      <div className="relative z-10 px-6 sm:px-8 lg:px-12 animate-fade-in">
        <div className="max-w-4xl">
          
          {/* Tagline with slide-up animation */}
          <p className="mb-4 text-base font-semibold tracking-widest uppercase transition-all duration-300 transform text-gray">
          Unlock the future of learning
          </p>


          <h1 className="mb-6 text-5xl font-extrabold leading-tight text-gray-700 transition-all duration-500 transform md:text-6xl lg:text-7xl hover:scale-105 animate-slide-up-delay drop-shadow-2xl">
            Your AI Learning
            <span className="block text-indigo-800">
              Companion
            </span>
          </h1>
          


          <p className="max-w-2xl mb-8 text-xs leading-relaxed transition-all duration-300 text-gray md:text-xl ">
            Get tailored course recommendations, study strategies, and
            skill-building guidance made just for you with cutting-edge AI technology.
          </p>
          
          
          
          <div className="flex flex-col gap-4 sm:flex-row animate-fade-in-late">
            <a
              href="/signup"
              className="inline-flex items-center justify-center w-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 transform bg-indigo-600 shadow-2xl rounded-xl hover:bg-indigo-700 hover:scale-110 hover:shadow-indigo-500/50 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto group"
            >
              Get Started
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <a
              href="/about"
              className="inline-flex items-center justify-center w-full px-8 py-4 text-sm font-bold text-gray-900 transition-all duration-300 transform bg-white border-2 border-white rounded-xl hover:bg-gray-100 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 sm:w-auto group"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import Navbar from "../components/navbar/Navbar"; // ✅ correct relative path

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to NexaLearn</h1>
        <p className="mt-4 text-gray-600">Your journey to learning starts here!</p>
      </div>
    </div>
  );
};

export default Home;

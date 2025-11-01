import React from "react";
import Navbar from "../components/navbar/Navbar";
import Hero from "../components/home/Hero";
import Feature from "../components/home/Feature";
// import CoursesPreview from "../components/home/CoursesPreview";
// import ChatBotWidget from "../components/home/ChatBotWidget";
//  
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Feature/>
      {/* 
      
      <CoursesPreview/>
      <Testimonials/>
      <CallToAction/>
      <ChatBotWidget/> */}
      <Footer/>  
    </div>
  );
};

export default Home;

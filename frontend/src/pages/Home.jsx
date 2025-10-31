import React from "react";
import Navbar from "../components/navbar/Navbar"; // ✅ correct relative path
import Testimonials from "../components/home/Testimonials";
import CallToAction from "../components/home/CallToAction";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      {/* <Hero/>
      <Feature/>
      <CoursesPreview/>
      <Testimonials/>
      <CallToAction/>
      <ChatBotWidget/> */}
      <Footer/>  
    </div>
  );
};

export default Home;

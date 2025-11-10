import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import AdminSignin from "./pages/admin/AdminSignin";
import Dashboard from "./pages/student/Dashboard";
import AddCourse from "./pages/admin/AddCourse";
import Courses from "./pages/student/Courses";
import AIChat from "./pages/student/AIChat";
import Progress from "./pages/student/Progress";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/adminsignin" element={<AdminSignin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addcourse" element={<AddCourse />} />
        <Route path="/ai" element={<AIChat />} />
      </Routes>
    </>
  );
}

export default App;

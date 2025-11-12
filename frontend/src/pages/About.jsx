import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import aboutImg from "../assets/about.png";
import {
  AcademicCapIcon,
  UserGroupIcon,
  LightBulbIcon,
  TrophyIcon,
  SparklesIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const About = () => {
  const stats = [
    { number: "10,000+", label: "Active Students" },
    { number: "500+", label: "Expert Instructors" },
    { number: "1,000+", label: "Courses Available" },
    { number: "95%", label: "Success Rate" },
  ];

  const values = [
    {
      icon: AcademicCapIcon,
      title: "Excellence in Education",
      description:
        "We are committed to providing world-class education with cutting-edge curriculum designed by industry experts.",
    },
    {
      icon: LightBulbIcon,
      title: "Innovation First",
      description:
        "Leveraging AI and modern technology to create personalized learning experiences for every student.",
    },
    {
      icon: UserGroupIcon,
      title: "Community Driven",
      description:
        "Building a supportive community where students and instructors collaborate and grow together.",
    },
    {
      icon: TrophyIcon,
      title: "Student Success",
      description:
        "Your success is our mission. We provide comprehensive support to help you achieve your learning goals.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description:
        "Former EdTech executive with 15+ years of experience in online education.",
    },
    {
      name: "Michael Chen",
      role: "Chief Learning Officer",
      description:
        "PhD in Educational Technology, pioneering AI-driven personalized learning.",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Content",
      description:
        "Award-winning curriculum designer with expertise in interactive learning.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="text-white bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              About NexaLearn
            </h1>
            <p className="max-w-3xl mx-auto text-xl text-emerald-100 md:text-2xl">
              Empowering learners worldwide through innovative AI-powered
              education
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="order-2 md:order-1">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Our Mission
            </h2>
            <p className="mb-4 text-lg text-gray-600">
              At NexaLearn, we believe education should be accessible,
              personalized, and transformative. Our mission is to revolutionize
              online learning by combining cutting-edge AI technology with
              expert instruction.
            </p>
            <p className="mb-6 text-lg text-gray-600">
              We're dedicated to helping students achieve their full potential
              through adaptive learning paths, real-time feedback, and a
              supportive community of learners and educators.
            </p>
            <div className="flex items-center space-x-4">
              <SparklesIcon className="w-8 h-8 text-emerald-600" />
              <p className="text-xl font-semibold text-gray-900">
                Learning Reimagined for the AI Era
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img
              src={aboutImg}
              alt="About NexaLearn"
              className="object-cover w-full h-auto rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="py-16 bg-emerald-600">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
                  {stat.number}
                </div>
                <div className="text-lg text-emerald-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Our Core Values
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            These principles guide everything we do at NexaLearn
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-6 transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-emerald-100">
                <value.icon className="text-emerald-600 w-7 h-7" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Meet Our Leadership
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600">
              Industry experts passionate about transforming education
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-8 text-center transition-colors duration-300 rounded-lg bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 rounded-full bg-emerald-600">
                  <span className="text-3xl font-bold text-white">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="mb-3 font-semibold text-emerald-600">
                  {member.role}
                </p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <RocketLaunchIcon className="w-16 h-16 mx-auto mb-6 text-white" />
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mb-8 text-xl text-emerald-100">
            Join thousands of students already transforming their careers with
            NexaLearn
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/signup"
              className="px-8 py-4 font-semibold transition-colors duration-300 bg-white rounded-lg text-emerald-600 hover:bg-gray-100"
            >
              Get Started Free
            </a>
            <a
              href="/contact"
              className="px-8 py-4 font-semibold text-white transition-colors duration-300 bg-teal-700 border-2 border-white rounded-lg hover:bg-indigo-800"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;

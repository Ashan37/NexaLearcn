import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  AcademicCapIcon,
  SparklesIcon,
  ChartBarIcon,
  BookmarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../assets/logo.png";

const StudentSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      icon: HomeIcon,
      path: "/dashboard",
      badge: null,
    },
    {
      name: "Courses",
      icon: AcademicCapIcon,
      path: "/courses",
      badge: null,
    },
    {
      name: "AI Chat",
      icon: SparklesIcon,
      path: "/ai",
      badge: "New",
    },
    {
      name: "Progress",
      icon: ChartBarIcon,
      path: "/progress",
      badge: null,
    },
    {
      name: "Saved Courses",
      icon: BookmarkIcon,
      path: "/saved",
      badge: null,
    },
    {
      name: "Profile",
      icon: UserCircleIcon,
      path: "/profile",
      badge: null,
    },
    {
      name: "Settings",
      icon: Cog6ToothIcon,
      path: "/settings",
      badge: null,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 p-2 text-white transition-all rounded-lg shadow-lg bg-emerald-600 top-4 left-4 lg:hidden hover:bg-emerald-700"
      >
        {isOpen ? (
          <XMarkIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-gradient-to-b from-emerald-700 via-emerald-700 to-emerald-700 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-3 p-6 border-b border-emerald-600">
            <img
              src={logo}
              alt="NexaLearn"
              className="object-contain w-12 h-12"
            />
            <div>
              <h2 className="text-xl font-bold text-white">NexaLearn</h2>
              <p className="text-xs text-emerald-200">Student Portal</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-6">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);

                return (
                  <li key={item.name}>
                    <button
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                        active
                          ? "bg-white text-emerald-700 shadow-lg"
                          : "text-white hover:bg-emerald-600 hover:translate-x-1"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-5 h-5 ${
                            active
                              ? "text-emerald-700"
                              : "text-emerald-200 group-hover:text-white"
                          }`}
                        />
                        <span
                          className={`font-medium ${
                            active ? "text-emerald-900" : "text-white"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-amber-500 text-white rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-emerald-600">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 p-3 mb-3 rounded-lg bg-emerald-600">
              <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
                <UserCircleIcon className="w-6 h-6 text-emerald-700" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {
                    JSON.parse(
                      localStorage.getItem("user") || '{"name":"Student"}'
                    ).name
                  }
                </p>
                <p className="text-xs truncate text-emerald-200">
                  {
                    JSON.parse(
                      localStorage.getItem("user") ||
                        '{"email":"student@nexalearn.com"}'
                    ).email
                  }
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center w-full gap-3 px-4 py-3 text-white transition-all duration-200 rounded-lg bg-emerald-600 hover:bg-red-600 hover:shadow-lg group"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Spacer for content (only on desktop) */}
      <div className="hidden w-64 lg:block" />
    </>
  );
};

export default StudentSidebar;

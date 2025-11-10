import React, { useState } from "react";
import logo from "../../assets/logo.png";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm text-blue">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center space-x-2">
                <img
                  src={logo}
                  alt="NexaLearn logo"
                  className="object-contain w-16 h-16"
                />
                <span className="text-xl font-semibold text-gray-800">
                  NexaLearn
                </span>
              </a>
            </div>
          </div>

          <nav className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((item) => {
              const isActive =
                typeof window !== "undefined" &&
                window.location.pathname === item.href;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-colors duration-150 px-2 py-1 rounded-md ${
                    isActive
                      ? "text-indigo-700 underline decoration-indigo-500 font-medium"
                      : "text-gray-600 hover:text-indigo-600 hover:underline hover:decoration-indigo-300"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
          </nav>

          <div className="items-center hidden space-x-3 md:flex">
            <a
              href="/signin"
              className="text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              Sign in
            </a>

            <a
              href="/signup"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Get Started
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="inline-flex items-center justify-center p-2 text-gray-600 rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {open ? (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`${open ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 sm:px-3">
          {navItems.map((item) => {
            const isActive =
              typeof window !== "undefined" &&
              window.location.pathname === item.href;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive
                    ? "text-indigo-700 bg-indigo-50 underline decoration-indigo-400"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {item.name}
              </a>
            );
          })}

          <div className="px-3 mt-2 space-y-2">
            <a
              href="/signin"
              className="block px-4 py-2 text-sm font-medium text-center text-gray-700 rounded-md hover:bg-gray-50"
            >
              Sign in
            </a>
            <a
              href="/signup"
              className="block px-4 py-2 text-sm font-medium text-center text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

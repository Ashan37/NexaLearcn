import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StudentSidebar from "../components/sidebar/StudentSidebar";
import {
  PaperAirplaneIcon,
  SparklesIcon,
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      // Redirect to signin if not authenticated
      navigate("/signin");
      return;
    }

    try {
      setUser(JSON.parse(userData));
    } catch (err) {
      console.error("Error parsing user data:", err);
      navigate("/signin");
    }

    // Welcome message
    setMessages([
      {
        role: "assistant",
        content:
          "Hello! I'm your AI Learning Assistant. I can help you with course recommendations, study tips, answer questions about various topics, and assist with your learning journey. How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  }, [navigate]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: input.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        const assistantMessage = {
          role: "assistant",
          content:
            data.answer ||
            data.message ||
            "I apologize, but I couldn't generate a response. Please try again.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
          timestamp: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (err) {
      console.error("AI Chat error:", err);
      const errorMessage = {
        role: "assistant",
        content:
          "Unable to connect to AI service. Please check your connection and try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Chat cleared! How can I help you today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const suggestedQuestions = [
    "What courses do you recommend for beginners?",
    "How can I improve my study habits?",
    "Explain the difference between React and Vue",
    "Tips for learning programming effectively",
  ];

  const handleSuggestedQuestion = (question) => {
    setInput(question);
  };

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <StudentSidebar />
      
      <div className="flex flex-col flex-1">
        {/* Header */}
        <div className="text-white bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-5xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
                <SparklesIcon className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">AI Learning Assistant</h1>
                <p className="mt-1 text-indigo-100">
                  Welcome back, {user.name}!
                </p>
              </div>
            </div>
            <button
              onClick={handleClearChat}
              className="flex items-center gap-2 px-4 py-2 transition-colors rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 w-full max-w-5xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" && (
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
                      <SparklesIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    message.role === "user"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-indigo-200"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>

                {message.role === "user" && (
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full">
                      <UserCircleIcon className="w-6 h-6 text-indigo-600" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex justify-start gap-3">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500">
                    <SparklesIcon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-100 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Suggested Questions:
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="px-3 py-2 text-sm text-left text-gray-700 transition-colors bg-white border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about learning, courses, or study tips..."
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="flex items-center gap-2 px-6 py-3 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Info Card */}
        <div className="p-4 mt-6 border border-indigo-200 rounded-lg bg-indigo-50">
          <div className="flex gap-3">
            <ChatBubbleLeftRightIcon className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="mb-1 font-semibold text-indigo-900">
                How can the AI assist you?
              </h3>
              <ul className="space-y-1 text-sm text-indigo-700">
                <li>
                  • Get personalized course recommendations based on your
                  interests
                </li>
                <li>• Receive study tips and learning strategies</li>
                <li>
                  • Ask questions about programming, design, or any subject
                </li>
                <li>• Get explanations for complex topics in simple terms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AIChat;

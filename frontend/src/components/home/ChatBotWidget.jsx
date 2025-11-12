import React, { useState, useRef, useEffect } from "react";
import { PaperAirplaneIcon, ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/solid";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Hi there! I'm Nexa, your AI learning advisor. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const aiMsg = {
        sender: "bot",
        text: "💡 That’s interesting! I can help you find courses or study plans based on your goals. Try saying 'Suggest a web development course'.",
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1200);
  };

  return (
    <>
 
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed p-4 text-white transition-transform rounded-full shadow-lg bottom-6 right-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105"
        >
          <ChatBubbleLeftRightIcon className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed flex flex-col overflow-hidden bg-white border border-purple-100 shadow-2xl bottom-6 right-6 w-80 sm:w-96 rounded-2xl">
 
          <div className="flex items-center justify-between px-4 py-3 text-white bg-gradient-to-r from-purple-600 to-pink-500">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-full bg-white/20">
                <ChatBubbleLeftRightIcon className="w-5 h-5 text-yellow-300" />
              </div>
              <h2 className="text-lg font-semibold">Nexa AI</h2>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <XMarkIcon className="w-5 h-5 transition hover:text-gray-200" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-purple-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          
          <div className="flex items-center p-3 bg-white border-t border-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="p-2 ml-2 text-white transition rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
            >
              <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBotWidget;

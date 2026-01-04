import React, { useState, useRef, useEffect } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../bot/config";
import MessageParser from "../bot/MessageParser";
import ModeToggle from "../components/ModeToggle";
import ActionProviderFactory from "../bot/ActionProviderFactory";
import { FiMessageSquare, FiX } from "react-icons/fi";

export default function VadicaBot() {
  const [mode, setMode] = useState("normal");
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null); // Ref to chatbot container

  const toggleChat = () => setIsOpen(!isOpen);

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-2 right-6 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          ref={chatRef}
          className="fixed bottom-16 right-6 z-50 rounded-lg shadow-xl flex flex-col overflow-auto"
        >
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProviderFactory(mode)}
          />
        </div>
      )}
    </>
  );
}

import React from "react";
import { FaLock } from "react-icons/fa";

function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background animate-fade-in px-4">
      <div className="bg-surface p-8 rounded-lg shadow-xl max-w-sm w-full text-center transform transition duration-500 hover:scale-105">
        <FaLock className="text-red-500 text-6xl mb-4 animate-bounce" />
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-muted mb-6">
          You do not have permission to access this page.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-primary hover:bg-primary-hover hover:cursor-pointer text-white py-2 px-6 rounded-full focus:outline-none transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default Unauthorized;

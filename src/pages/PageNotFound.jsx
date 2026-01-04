import React from "react";
import { MdError } from "react-icons/md";

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background animate-fadeIn px-4">
      <div className="bg-surface p-8 rounded-lg shadow-xl max-w-sm w-full text-center transform transition duration-300 hover:scale-105">
        <MdError className="text-accent text-6xl mb-4 animate-bounce" />
        <h1 className="text-3xl font-semibold  mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-muted mb-6">
          Sorry, the page you are looking for doesn't exist.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-primary hover:bg-primary-hover hover:scale-105 text-white py-2 px-6 rounded-full transition duration-200 focus:outline-none"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;

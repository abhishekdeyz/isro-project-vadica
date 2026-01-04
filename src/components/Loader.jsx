import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="w-16 h-16  border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;

export const LoaderForButton = () => {
  return (
    <div className="flex justify-center items-center w-full ">
      <div className="w-6 h-6 border-t-2 border-l-2 border-dotted  border-gray-200  rounded-full animate-spin"></div>
    </div>
  );
};

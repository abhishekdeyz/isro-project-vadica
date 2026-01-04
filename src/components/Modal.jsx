import React from "react";
import { GiCrossMark } from "react-icons/gi";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center z-100">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="absolute min-w-3/4 max-h-[500px] overflow-auto px-10 py-5  bg-white shadow-lg rounded-lg z-50">
        <GiCrossMark
          onClick={onClose}
          className="float-right sticky mb-2 top-0 text-2xl text-gray-600 hover:text-gray-500 cursor-pointer"
        />
        <div className="clear-both mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

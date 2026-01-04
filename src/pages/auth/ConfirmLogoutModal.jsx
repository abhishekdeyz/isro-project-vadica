import React from "react";
import { AiOutlineWarning } from "react-icons/ai";

const ConfirmLogoutModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-100">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onCancel}
      ></div>
      <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-sm p-6 text-center">
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <div className="text-red-600 mb-6 flex items-center justify-center">
          <AiOutlineWarning className="mr-2 text-2xl" />
          <p className="text-base text-center">
            Are you sure you want to logout?
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-primary text-white rounded hover:cursor-pointer hover:scale-105 transition"
          >
            Yes, Logout
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:cursor-pointer hover:scale-105 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;

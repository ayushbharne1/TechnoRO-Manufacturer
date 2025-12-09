import React, { useState } from "react";

const ChangePasswordModal = ({ onClose, onSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan API call logics aayega (Optional)
    onSuccess(); // <-- Ye success modal open karega
  };

  return (
    <div className="fixed inset-0  backdrop-blur-sm bg-opacity-40 flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Change Password
        </h2>
        <p className="text-gray-500 text-center text-sm mt-1 mb-6">
          Please enter new password.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-gray-600 text-sm">Old Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">New Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-600 text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full mt-1 p-3 rounded-lg bg-gray-100 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#7EC1B1] text-white rounded-lg hover:bg-teal-600 transition"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;

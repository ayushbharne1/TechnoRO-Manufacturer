import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import Dashboard from "../../../assets/images/Dashboard.svg";

const StartNewChat = () => {
  const [userType, setUserType] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const navigate = useNavigate();

  const handleStartChat = () => {
    if (!userType || !selectedUser) {
      alert("Please select both fields before starting chat.");
      return;
    }
    console.log("Chat started with:", selectedUser);
    navigate("/chat"); // ✅ navigate to /chat
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span
          onClick={() => navigate("/help-support")}
          className="text-gray-900 font-medium cursor-pointer"
        >
          Help & Support
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">
          Start New Chat
        </span>
      </div>


      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Start New Chat
      </h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      {/* Form Section */}
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        {/* Select User Type */}
        <div className="flex flex-col w-full md:w-1/3">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Select User Type
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none bg-[#F9FAFB]"
          >
            <option value="">Select User Type</option>
            <option value="Vendor">Vendor</option>
            <option value="Customer">Customer</option>
            <option value="Support">Support</option>
          </select>
        </div>

        {/* Select User */}
        <div className="flex flex-col w-full md:w-1/3">
          <label className="text-sm font-medium text-gray-700 mb-2">
            Select User
          </label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none bg-[#F9FAFB]"
          >
            <option value="">Select User</option>
            <option value="Annette Black">Annette Black</option>
            <option value="Cody Fisher">Cody Fisher</option>
            <option value="Jane Cooper">Jane Cooper</option>
          </select>
        </div>
      </div>

      {/* Start Chat Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleStartChat}
          className="bg-[#8DC9BE] text-white font-medium px-8 py-2 rounded-md transition"
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default StartNewChat;

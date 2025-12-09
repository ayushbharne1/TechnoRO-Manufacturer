import React from "react";
import { FiBriefcase, FiAlertTriangle, FiCalendar, FiInfo } from "react-icons/fi";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from "react-icons/md";

const QueryDetails = () => {

  const navigate = useNavigate();
  const query = {
    id: "Q15789",
    subject: "Product Listing Issue",
    category: "Product",
    lastUpdated: "21-05-2025",
    description:
      "Unable to add new product to listing even after filling all the fields",
    status: "Resolved",
  };

  return (
    <div className="p-4 bg-white">
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
          Query Details
        </span>
      </div>

      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Query Details</h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>
      <div className="border-t border-gray-200 pt-4 relative">
        {/* Query ID and Status */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Query ID : <span className="text-gray-900">{query.id}</span>
          </h2>
          <span className="bg-[#28B463] text-white text-sm px-4 py-1 rounded-full flex items-center gap-1">
            ✓ {query.status}
          </span>
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FiBriefcase className="text-[#8DC9BE]" /> Subject
            </div>
            <p className="text-gray-600 ml-6 mt-1">{query.subject}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FiAlertTriangle className="text-[#8DC9BE]" /> Category
            </div>
            <p className="text-gray-600 ml-6 mt-1">{query.category}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FiCalendar className="text-[#8DC9BE]" /> Last Updated
            </div>
            <p className="text-gray-600 ml-6 mt-1">{query.lastUpdated}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-gray-700 font-semibold">
              <FiInfo className="text-[#8DC9BE]" /> Problem Description
            </div>
            <p className="text-gray-600 ml-6 mt-1">{query.description}</p>
          </div>
        </div>

        {/* Chat Button */}
        <div className="mt-8 flex justify-center">
          <button onClick={() => navigate('/chat')} className="bg-[#8DC9BE] text-white px-6 py-2 rounded-md text-sm transition">
            Chat Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default QueryDetails;

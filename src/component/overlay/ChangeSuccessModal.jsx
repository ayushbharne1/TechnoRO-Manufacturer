import React from "react";
import logo from "../../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

const ChangeSuccessModal = ({ onClose }) => {
  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    onClose();
    navigate("/"); 
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex justify-center items-center px-4 z-50">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-10 relative text-center">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <img src={logo} alt="logo" className="w-70 h-25" />
          
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-800">CONGRATS!</h1>
        <p className="text-gray-500 mt-1 mb-8">Password Change Successful</p>

        {/* Button */}
        <button
          onClick={handleLoginRedirect}
          className="w-full py-3 bg-[#7EC1B1] text-white rounded-lg hover:bg-teal-600 transition"
        >
          Login Again
        </button>
      </div>
    </div>
  );
};

export default ChangeSuccessModal;

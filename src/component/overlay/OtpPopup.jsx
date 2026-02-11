import React from "react";
import { motion } from "framer-motion";

const OtpPopup = ({ isOpen, onClose, otp, phone }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP Sent!</h2>
          <p className="text-gray-600 mb-4">
            OTP has been sent to <span className="font-semibold text-[#82D9BC]">{phone}</span>
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-500 mb-2">Your OTP Code:</p>
            <div className="text-4xl font-bold text-[#82D9BC] tracking-widest">
              {otp}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full bg-[#82D9BC] text-white font-bold py-3 px-4 rounded hover:bg-[#6ec2a6] transition duration-200"
          >
            Continue to Verify
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OtpPopup;

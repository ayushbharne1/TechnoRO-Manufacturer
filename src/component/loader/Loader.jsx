import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-[#7EC1B1] rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm mt-4 text-center">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
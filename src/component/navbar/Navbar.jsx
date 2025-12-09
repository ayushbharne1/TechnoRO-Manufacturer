import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import kentLogo from "../../assets/images/kent.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white shadow flex items-center justify-between px-6 py-3">
      {/* Left Section - Logo + Title */}
      <div className="flex items-center space-x-3">
        <img
          src={logo}
          alt="Techno RO Logo"
          className="h-12 w-full object-contain"
        />
      </div>

      {/* Right Section - Manufacturer Info + Notification */}
      <div className="flex items-center space-x-4">
        {/* Left Border + Bell Icon + Right Border */}
        <div
          ref={dropdownRef}
          className="flex items-center relative mx-2 px-4 border-l border-r border-gray-300 cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <svg
            className="text-gray-700 text-xl w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="absolute -top-2 right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5">
            2
          </span>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-2">

                {/* Heading */}
                <div className="px-4 py-1 text-sm font-semibold text-[20px] text-[#465363]">
                  Select
                </div>

                {/* Items */}
                <button
                  onClick={() => handleNotificationClick("/notifications")}
                  className="w-full text-left px-4 py-1 text-sm text-[16px] text-[#051934]"
                >
                  Notifications
                </button>

                <button
                  onClick={() => handleNotificationClick("/feedback")}
                  className="w-full text-left px-4 py-1 text-sm text-[16px] text-[#051934]"
                >
                  Feedback
                </button>

              </div>
            </div>
          )}
        </div>

        {/* Manufacturer Info (clickable - navigates to profile) */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => navigate("/profile")}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && navigate("/profile")}
          className="flex items-center space-x-3 cursor-pointer"
          aria-label="Open profile"
        >
          <img
            src={kentLogo}
            alt="Kent Logo"
            className="h-10 object-contain"
          />
          <div className="text-right leading-tight">
            <h3 className="text-sm font-semibold text-gray-800">
              Kent Pvt. Ltd.
            </h3>
            <p className="text-xs text-gray-500">Manufacturer</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
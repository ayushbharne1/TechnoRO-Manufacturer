import React, { useState } from "react";
import Navbar from "../component/navbar/Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      {/* Navbar (Fixed Top) */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Fixed Left, Scrollable) */}
      <div 
        className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] w-64 border-r border-gray-200 bg-white shadow-sm overflow-y-auto z-40 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .fixed.top-\[70px\]::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <Sidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main Content (Pushed Right) */}
      <main className="lg:ml-64 mt-[70px] p-4 min-h-[calc(100vh-70px)]">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;
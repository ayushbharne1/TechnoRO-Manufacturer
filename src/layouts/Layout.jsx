import React from "react";
import Navbar from "../component/navbar/Navbar";
import Sidebar from "../component/sidebar/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
   <div className="bg-gray-100">

      
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      
      <div className="fixed top-[70px] left-0 h-[calc(100vh-70px)] w-64 border-r border-gray-200 bg-white shadow-sm ">
        <Sidebar />
      </div>

     
      <main className="ml-64 mt-[70px] p-4 h-[calc(100vh-70px)] overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};

export default Layout;

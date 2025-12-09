import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Dashboard from "../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

const OrderList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const orders = [
    {
      id: 1,
      orderId: "125120",
      name: "Prefilter RO Service Kit Pre-filter Housing Bowl",
      price: 1299,
      date: "21-10-2025",
      status: "New",
    },
    {
      id: 2,
      orderId: "125120",
      name: "Kent Grand Plus RO",
      price: 1299,
      date: "21-10-2025",
      status: "New",
    },
    {
      id: 3,
      orderId: "125120",
      name: "MG678",
      price: 1299,
      date: "21-10-2025",
      status: "In-Progress",
    },
    {
      id: 4,
      orderId: "125120",
      name: "Kent Grand Plus RO",
      price: 1299,
      date: "21-10-2025",
      status: "In-Progress",
    },
    {
      id: 5,
      orderId: "125120",
      name: "MG678",
      price: 1299,
      date: "21-10-2025",
      status: "In-Progress",
    },
    {
      id: 6,
      orderId: "125120",
      name: "Kent Grand Plus RO",
      price: 1299,
      date: "21-10-2025",
      status: "In-Progress",
    },
    {
      id: 7,
      orderId: "125120",
      name: "MG678",
      price: 1299,
      date: "21-10-2025",
      status: "In-Progress",
    },
    {
      id: 8,
      orderId: "125120",
      name: "Kent Grand Plus RO",
      price: 1299,
      date: "21-10-2025",
      status: "In-Progress",
    },
    {
      id: 9,
      orderId: "125120",
      name: "MG678",
      price: 1299,
      date: "21-10-2025",
      status: "Delivered",
    },
    {
      id: 10,
      orderId: "125120",
      name: "Kent Grand Plus RO",
      price: 1299,
      date: "21-10-2025",
      status: "Delivered",
    },
  ];

  const filteredOrders = orders.filter((o) =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / entries);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  const getStatusColor = (status) => {
    if (status === "New") return "text-yellow-500";
    if (status === "In-Progress") return "text-blue-500";
    if (status === "Delivered") return "text-green-500";
    return "";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white min-h-screen"
    >
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">
          Order Management
        </span>
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Order List</h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>
      {/* Controls */}
      <div className="flex items-center mb-4">
        {/* Left: Show Entries */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400 bg-white"
            value={entries}
            onChange={(e) => setEntries(parseInt(e.target.value))}
          >
            {[10, 20, 30].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700">Entries</span>
        </div>

        {/* Search - with more spacing */}
        <div className="relative ml-20">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-900 rounded pl-9 pr-3 py-1 text-sm focus:outline-none focus:border-gray-400 w-44"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-md">
        <table className="w-full text-sm text-left border border-[#CACACA] border-separate border-spacing-0 rounded-md overflow-hidden">
          <thead className="bg-[#F5F5F5] text-gray-600 font-medium">
            <tr>
              <th className="px-4 py-3 border-b border-[#CACACA] text-center">Sr.No.</th>
              <th className="px-4 py-3 border-b border-[#CACACA] text-center">Order ID</th>
              <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product Name</th>
              <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product Price</th>
              <th className="px-4 py-3 border-b border-[#CACACA] text-center">Order Date</th>
              <th className="px-4 py-3 border-b border-[#CACACA] text-center">Status</th>
              <th className="px-4 py-3 border-b border-[#CACACA] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {displayedOrders.map((order, index) => (
              <tr key={order.id} className="">
                <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{index + 1}</td>
                <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{order.orderId}</td>
                <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 truncate max-w-xs text-center">
                  {order.name}
                </td>
                <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">₹{order.price}</td>
                <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{order.date}</td>
                <td
                  className={`px-4 py-3 border-b border-[#CACACA] text-center font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                  <button
                    className="text-blue-500 mx-auto"
                    onClick={() => navigate(`/order-details/${order.id}`)}
                  >
                    <FiEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {(currentPage - 1) * entries + 1} to 
          {Math.min(currentPage * entries, filteredOrders.length)} of 
          {filteredOrders.length} Entries
        </span>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${currentPage === i + 1
                ? "bg-[#8DC9BE] text-white border-[#8DC9BE]"
                : ""
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderList;
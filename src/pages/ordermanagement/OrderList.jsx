import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Dashboard from "../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../redux/orderSlice";

const OrderList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { ordersList, isLoading } = useSelector((state) => state.orders);

  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const safeOrders = Array.isArray(ordersList) ? ordersList : [];

  const filteredOrders = safeOrders.filter((order) => {
    const term = searchTerm.toLowerCase();
    const idMatch = order.orderId?.toLowerCase().includes(term);
    const productMatch = order.items?.[0]?.name?.toLowerCase().includes(term);
    return idMatch || productMatch;
  });

  const totalPages = Math.ceil(filteredOrders.length / entries);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * entries,
    currentPage * entries
  );

  const getStatusConfig = (status) => {
    if (!status) return { label: "Unknown", color: "text-gray-500" };
    const s = status.toLowerCase();

    if (s === "assigned" || s === "new") {
      return { label: "New", color: "text-yellow-500" };
    }
    
    if (["confirmed", "picked-up", "shipped", "out-for-delivery", "processing"].includes(s)) {
      return { label: "In-Progress", color: "text-blue-500" };
    }

    if (s === "delivered") {
      return { label: "Delivered", color: "text-green-500" };
    }

    if (s === "rejected") {
      return { label: "Rejected", color: "text-red-500" };
    }

    return { label: status, color: "text-gray-500" };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-white min-h-screen"
    >
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1 cursor-pointer" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">
          Order Management
        </span>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Order List</h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      <div className="flex items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400 bg-white"
            value={entries}
            onChange={(e) => {
              setEntries(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 30].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-700">Entries</span>
        </div>

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
            {isLoading ? (
              <tr><td colSpan="7" className="text-center py-6 text-gray-500">Loading Orders...</td></tr>
            ) : displayedOrders.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-6 text-gray-500">No Orders Found</td></tr>
            ) : (
              displayedOrders.map((order, index) => {
                const { label, color } = getStatusConfig(order.orderStatus);
                const dateStr = order.orderedDate 
                    ? new Date(order.orderedDate).toLocaleDateString('en-GB') // 21-10-2025 format
                    : "N/A";

                return (
                  <tr key={order._id || index} className="">
                    {/* Sr No */}
                    <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">
                      {(currentPage - 1) * entries + index + 1}
                    </td>
                    
                    {/* Order ID */}
                    <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">
                      {order.orderId}
                    </td>
                    
                    {/* Product Name */}
                    <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 truncate max-w-xs text-center">
                      {order.items && order.items.length > 0 ? order.items[0].name : "N/A"}
                    </td>
                    
                    {/* Price */}
                    <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">
                      ₹{order.totalAmount}
                    </td>
                    
                    {/* Date */}
                    <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">
                      {dateStr}
                    </td>
                    
                    {/* Status */}
                    <td className={`px-4 py-3 border-b border-[#CACACA] text-center font-medium ${color}`}>
                      {label}
                    </td>
                    
                    {/* Action */}
                    <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                      <button
                        className="text-blue-500 mx-auto"
                        onClick={() => navigate(`/order-details/${order._id}`)}
                      >
                        <FiEye size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <span>
          Showing {(currentPage - 1) * entries + 1} to{" "}
          {Math.min(currentPage * entries, filteredOrders.length)} of{" "}
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
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1
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
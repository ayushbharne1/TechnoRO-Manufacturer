import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

const ProductionManagement = () => {

  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const data = [
    { id: "ROF-01", product: "RO Filter Cartridge", qty: 492, model: "MG678", date: "1/15/12", status: "In Production" },
    { id: "ROF-02", product: "RO Filter Cartridge", qty: 703, model: "MG678", date: "2/11/12", status: "In Production" },
    { id: "ROF-03", product: "RO Filter Cartridge", qty: 922, model: "MG678", date: "9/18/16", status: "Dispatched" },
    { id: "ROF-06", product: "RO System", qty: 423, model: "MG678", date: "7/27/13", status: "Dispatched" },
    { id: "ROF-05", product: "Membrane RO", qty: 826, model: "MG678", date: "8/16/13", status: "Dispatched" },
    { id: "ROF-07", product: "RO Filter Cartridge", qty: 540, model: "MG678", date: "8/15/17", status: "Ready for Dispatch" },
    { id: "ROF-08", product: "Membrane RO", qty: 426, model: "MG678", date: "4/21/12", status: "Dispatched" },
    { id: "ROF-11", product: "RO Filter Cartridge", qty: 798, model: "MG678", date: "9/4/12", status: "Ready for Dispatch" },
    { id: "ROF-51", product: "Membrane RO", qty: 536, model: "MG678", date: "7/18/17", status: "Ready for Dispatch" },
    { id: "ROF-10", product: "RO Filter Cartridge", qty: 740, model: "MG678", date: "10/28/12", status: "Ready for Dispatch" },
  ];

  const filteredData = data.filter(
    (item) =>
      item.product.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter === "" || item.status === statusFilter)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "In Production":
        return "text-yellow-500";
      case "Dispatched":
        return "text-blue-500";
      case "Ready for Dispatch":
        return "text-green-500";
      default:
        return "";
    }
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 flex items-center mb-2 ">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1 " />
        <span className="text-gray-900 font-medium cursor-pointer">Management</span> 
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1 " />
        <span className="text-[#4A90E2] font-medium cursor-pointer">Product Management</span>
      </div>

      {/* Page Header */}
      <h2 className="text-2xl font-semibold mb-2">Production Management</h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 mb-4">
        <button onClick={() => navigate("/batch-tracking")} className="bg-[#7EC1B1] text-white px-4 py-2 rounded-md font-medium cursor-pointer">
          Batch Tracking
        </button>
        <button onClick={() => navigate("/create-new-batch")} className="bg-[#7EC1B1] text-white px-4 py-2 rounded-md font-medium cursor-pointer">
          Create New Batch
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Production status</h3>

        {/* Top Controls */}
        <div className="flex items-center justify-between mb-4 gap-3">
          {/* Left: Show Entries */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Show</span>
            <select className="border border-gray-900 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-gray-400">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span className="text-sm text-gray-700">Entries</span>
          </div>

          {/* Center: Search */}
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-900 rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Right: Select Status */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-900 rounded px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-gray-400"
            >
              <option value="">Select Status</option>
              <option>In Production</option>
              <option>Dispatched</option>
              <option>Ready for Dispatch</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="w-full text-sm text-left border border-[#CACACA] border-separate border-spacing-0 rounded-md overflow-hidden">
            <thead className="bg-[#F5F5F5] text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Batch ID</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Quantity</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product Model</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Production Date</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Status</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Preview</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredData.map((item) => (
                <tr key={item.id} className="">
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.id}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.product}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.qty}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.model}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.date}</td>
                  <td className={`px-4 py-3 border-b border-[#CACACA] text-center font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                    <button
                      onClick={() => navigate(`/product-tracking/${item.id}`)}
                      className="text-blue-500 transition mx-auto cursor-pointer"
                    >
                      <FaEye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductionManagement;
import React from "react";
import { EditIcon } from "../../../assets/icons/AllIcons";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

const BatchTracking = () => {
  const navigate = useNavigate();
  const data = [
    { id: "ROF-01", name: "RO Filter Cartridge", qty: 492, model: "MG678", date: "1/15/12", status: "Out of Stock" },
    { id: "ROF-02", name: "RO Filter Cartridge", qty: 703, model: "MG678", date: "2/11/12", status: "Out of Stock" },
    { id: "ROF-03", name: "RO Filter Cartridge", qty: 922, model: "MG678", date: "9/18/16", status: "Out of Stock" },
    { id: "ROF-06", name: "RO System", qty: 423, model: "MG678", date: "7/27/13", status: "Out of Stock" },
    { id: "ROF-05", name: "Membrane RO", qty: 826, model: "MG678", date: "8/16/13", status: "Out of Stock" },
    { id: "ROF-07", name: "RO Filter Cartridge", qty: 540, model: "MG678", date: "8/15/17", status: "In Stock" },
    { id: "ROF-08", name: "Membrane RO", qty: 426, model: "MG678", date: "4/21/12", status: "Out of Stock" },
    { id: "ROF-11", name: "RO Filter Cartridge", qty: 798, model: "MG678", date: "9/4/12", status: "In Stock" },
    { id: "ROF-51", name: "Membrane RO", qty: 536, model: "MG678", date: "7/18/17", status: "In Stock" },
    { id: "ROF-10", name: "RO Filter Cartridge", qty: 740, model: "MG678", date: "10/28/12", status: "In Stock" },
  ];

  return (
    <div className="bg-white p-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span
          onClick={() => navigate("/production-management")}
          className="text-gray-900 font-medium cursor-pointer"
        >
          Production Management
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">
          Batch Tracking
        </span>
      </div>


      {/* Header */}
      <h2 className="text-2xl font-semibold mb-2">Batch Tracking</h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      {/* Card */}
      <div className="bg-white pt-4 ">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
          {/* Left: Show Entries */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Show</span>
            <select className="border border-[#263138] rounded-[8px] px-3 py-1.5 text-sm focus:outline-none focus:border-gray-400">
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
            <span className="text-sm text-gray-700">Entries</span>
          </div>

          {/* Center: Search */}
          <div className="relative bg-[#F5F5F5] flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="w-full border border-[#263138] rounded-[8px] pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Right: Select Status */}
          <div className="bg-[#F5F5F5]">
            <select className="border border-[#263138] rounded-[8px] px-3 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-gray-400">
              <option>Select Status</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200">
          <table className="w-full text-sm text-left border-t border-[#CACACA] border-separate border-spacing-0 overflow-hidden">
            <thead className="bg-[#F5F5F5] text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Batch ID</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product Name</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Quantity</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product Model</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Production Date</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Status</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Update</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {data.map((item, idx) => (
                <tr key={idx} className="">
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.id}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.name}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.qty}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.model}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.date}</td>
                  <td
                    className={`px-4 py-3 border-b border-[#CACACA] text-center font-medium ${item.status === "In Stock" ? "text-green-600" : "text-red-500"
                      }`}
                  >
                    {item.status}
                  </td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                    <button
                      className="text-blue-500 mx-auto"
                      onClick={() => navigate(`/update-batch/${item.id}`)}
                    >
                      <EditIcon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <p>Showing 1 to 10 of 30 Entries</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded-md">Previous</button>
            <button className="px-3 py-1 border rounded-md bg-[#8DC9BE] text-white">1</button>
            <button className="px-3 py-1 border rounded-md">2</button>
            <button className="px-3 py-1 border rounded-md">3</button>
            <button className="px-3 py-1 border rounded-md">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchTracking;

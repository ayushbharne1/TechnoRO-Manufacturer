import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import Dashboard from "../../../assets/images/Dashboard.svg";

const HelpSupport = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");

  const data = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    queryId: "Q15789",
    user: "Darlene Robertson",
    issue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, nulla.",
    date:
      i < 2
        ? "Today, 6:34 PM"
        : i < 4
          ? "Yesterday, 6:34 AM"
          : "10 Jan 2025, 6:34 AM",
    count: 2,
  }));

  const filteredData = data.filter(
    (item) =>
      item.user.toLowerCase().includes(search.toLowerCase()) ||
      item.queryId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1 cursor-pointer" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">Help & Support</span>
      </div>
      {/* Title */}
      <h2 className="text-2xl font-semibold mb-2">
        Help & Support
      </h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      {/* Top Controls */}
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Show</span>
          <select
            value={entries}
            onChange={(e) => setEntries(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
          >
            <option>10</option>
            <option>20</option>
            <option>30</option>
          </select>
          <span className="text-sm text-gray-700">Entries</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              className="border border-gray-300 rounded pl-10 pr-4 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button onClick={() => navigate("/start-chat")} className="bg-[#7EC1B1] text-white px-6 py-1.5 rounded text-sm whitespace-nowrap cursor-pointer">
            Start New Chat
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-[#CACACA]  text-sm text-left">
          <thead className="bg-gray-50 border-b border-[#CACACA]">
            <tr className="text-gray-600">
              <th className="py-2 px-3 font-medium">Sr.No.</th>
              <th className="py-2 px-3 font-medium">Query ID</th>
              <th className="py-2 px-3 font-medium">User Name</th>
              <th className="py-2 px-3 font-medium">Issue Details</th>
              <th className="py-2 px-3 font-medium">Date & Time</th>
              <th className="py-2 px-3 font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.slice(0, entries).map((item, i) => (
              <tr key={item.id} className="border-b border-[#CACACA]">
                <td className="py-2 px-3 pl-6">{i + 1}</td>
                <td className="py-2 px-3">{item.queryId}</td>
                <td className="py-2 px-3 ">{item.user}</td>
                <td className="py-2 px-3 truncate max-w-xs text-center">{item.issue}</td>
                <td className="py-2 px-3 text-[#28B463] font-medium">
                  {item.date}
                </td>
                <td className="py-2 px-3 flex items-center gap-2">
                  <span className="bg-[#E9F8F5] text-[#28B463] font-semibold text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                  <FiEye
                    className="text-[#1E5EFF] text-lg cursor-pointer"
                    onClick={() => navigate(`/query-details/${item.queryId}`)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <p>Showing 1 to {entries} of 30 Entries</p>
        <div className="flex items-center gap-2">
          <button className="border rounded-md px-3 py-1 flex items-center gap-1">
            <FiChevronLeft /> Previous
          </button>
          <div className="flex gap-1">
            <button className="border rounded-md px-3 py-1 bg-[#8DC9BE] text-white">
              1
            </button>
            <button className="border rounded-md px-3 py-1">
              2
            </button>
            <button className="border rounded-md px-3 py-1">
              3
            </button>
          </div>
          <button className="border rounded-md px-3 py-1 flex items-center gap-1">
            Next <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;

import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const Feedbacks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries, setEntries] = useState(10);

  const feedbackData = [
    {
      id: "R254789",
      customer: "Rahul Sharma",
      vendor: "Amit Jay",
      area: "Pune",
      date: "10-05-2025",
      feedback: "Product was good",
      rating: 4,
    },
    {
      id: "R254789",
      customer: "Rahul Sharma",
      vendor: "Amit Jay",
      area: "Pune",
      date: "10-05-2025",
      feedback: "Product was good",
      rating: 5,
    },
    {
      id: "R254789",
      customer: "Rahul Sharma",
      vendor: "Amit Jay",
      area: "Pune",
      date: "10-05-2025",
      feedback: "Product was good",
      rating: 4,
    },
    {
      id: "R254789",
      customer: "Rahul Sharma",
      vendor: "Amit Jay",
      area: "Pune",
      date: "10-05-2025",
      feedback: "Product was good",
      rating: 4,
    },
    {
      id: "R254789",
      customer: "Rahul Sharma",
      vendor: "Amit Jay",
      area: "Pune",
      date: "10-05-2025",
      feedback: "Product was good",
      rating: 4,
    },
  ];

  const filteredData = feedbackData.filter((item) =>
    item.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-[#1E5EFF] font-medium mb-2 flex items-center gap-1">
        <FiArrowLeft className="cursor-pointer" />
        <span className="cursor-pointer">Notification</span>
        <span className="text-gray-500">› Feedbacks</span>
      </div>

      {/* Title */}
      <h1 className="text-lg font-semibold text-gray-800 mb-4">Feedbacks</h1>
      <hr className="border-gray-200 mb-6" />

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
        {/* Search */}
        <div className="w-full md:w-1/3">
          <input
            type="text"
            placeholder=" Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md w-full px-4 py-2 focus:outline-none"
          />
        </div>

        {/* Show Entries */}
        <div className="flex items-center gap-2 text-gray-700">
          <span>Show</span>
          <select
            value={entries}
            onChange={(e) => setEntries(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <span>Entries</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm text-gray-700">
          <thead className="bg-gray-100 text-gray-800">
            <tr>
              <th className="text-left py-3 px-4 font-medium">Sr.No.</th>
              <th className="text-left py-3 px-4 font-medium">Feedback ID</th>
              <th className="text-left py-3 px-4 font-medium">Customer Name</th>
              <th className="text-left py-3 px-4 font-medium">Vendor</th>
              <th className="text-left py-3 px-4 font-medium">Area</th>
              <th className="text-left py-3 px-4 font-medium">Date</th>
              <th className="text-left py-3 px-4 font-medium">Feedback</th>
              <th className="text-left py-3 px-4 font-medium">Performance</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={index}
                className="border-t border-gray-200 transition"
              >
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{item.id}</td>
                <td className="py-3 px-4">{item.customer}</td>
                <td className="py-3 px-4">{item.vendor}</td>
                <td className="py-3 px-4">{item.area}</td>
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">{item.feedback}</td>
                <td className="py-3 px-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < item.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <span>Showing 1 to 5 of 30 Entries</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md text-[#8DC9BE] border-[#8DC9BE]">
            Previous
          </button>
          <button className="px-3 py-1 bg-[#8DC9BE] text-white rounded-md">
            1
          </button>
          <button className="px-3 py-1 border rounded-md text-[#8DC9BE] border-[#8DC9BE]">
            2
          </button>
          <button className="px-3 py-1 border rounded-md text-[#8DC9BE] border-[#8DC9BE]">
            3
          </button>
          <button className="px-3 py-1 border rounded-md text-[#8DC9BE] border-[#8DC9BE]">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;

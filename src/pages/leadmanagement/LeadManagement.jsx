import React, { useState } from "react";
import { FiEye, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LeadManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Sample data
  const leadsData = [
    { id: 1, leadId: "1770443352375", customerName: "ayush", serviceType: "AMC", productModel: "Silver Annual an Premium Service.", orderDate: "07/02/2026", status: "New" },
    { id: 2, leadId: "1770370505909", customerName: "ayush", serviceType: "AMC", productModel: "Best RO", orderDate: "06/02/2026", status: "New" },
    { id: 3, leadId: "1770363070401", customerName: "ayush", serviceType: "Service", productModel: "N/A", orderDate: "06/02/2026", status: "New" },
    { id: 4, leadId: "1770362647618", customerName: "ayush", serviceType: "Service", productModel: "N/A", orderDate: "06/02/2026", status: "New" },
    { id: 5, leadId: "1770298351708", customerName: "ayush", serviceType: "Service", productModel: "N/A", orderDate: "05/02/2026", status: "New" },
    { id: 6, leadId: "1770443352376", customerName: "rahul", serviceType: "AMC", productModel: "Premium Service", orderDate: "07/02/2026", status: "In Progress" },
    { id: 7, leadId: "1770443352377", customerName: "priya", serviceType: "Service", productModel: "Basic RO", orderDate: "08/02/2026", status: "Completed" },
    { id: 8, leadId: "1770443352378", customerName: "amit", serviceType: "AMC", productModel: "Gold Service", orderDate: "09/02/2026", status: "New" },
    { id: 9, leadId: "1770443352379", customerName: "neha", serviceType: "Service", productModel: "N/A", orderDate: "10/02/2026", status: "New" },
    { id: 10, leadId: "1770443352380", customerName: "vikram", serviceType: "AMC", productModel: "Platinum Service", orderDate: "11/02/2026", status: "In Progress" },
    { id: 11, leadId: "1770443352381", customerName: "sonia", serviceType: "Service", productModel: "Advanced RO", orderDate: "12/02/2026", status: "New" },
    { id: 12, leadId: "1770443352382", customerName: "karan", serviceType: "AMC", productModel: "Standard Service", orderDate: "13/02/2026", status: "Completed" },
  ];

  // Filter data
  const filteredData = leadsData.filter((lead) => {
    const matchesSearch = 
      lead.leadId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.serviceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.productModel.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "" || lead.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-3 md:p-6 bg-white rounded-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <button onClick={() => navigate("/dashboard")} className="text-gray-600 hover:text-gray-800">
          <FiArrowLeft size={18} />
        </button>
        <span className="text-blue-500">Lead Management</span>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Lead Management</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6">
        {/* Entries dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-sm">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-2 md:px-3 py-2 text-sm"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm">Entries</span>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm w-full sm:w-64"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded px-3 md:px-4 py-2 text-sm w-full sm:w-auto"
          >
            <option value="">Select Status</option>
            <option value="New">New</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Add Lead Button */}
        <button 
          onClick={() => navigate("/add-lead")}
          className="bg-[#7EC1B1] text-white px-4 md:px-6 py-2 rounded hover:bg-[#6db09f] transition w-full sm:w-auto"
        >
          Add lead
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg -mx-3 md:mx-0">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Sr.No</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Lead ID</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Customer Name</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden sm:table-cell">Service Type</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden md:table-cell">Product Model</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700 hidden lg:table-cell">Order Date</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Status</th>
              <th className="px-2 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((lead, index) => (
                <tr key={lead.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{startIndex + index + 1}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm text-blue-600">{lead.leadId}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">{lead.customerName}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden sm:table-cell">{lead.serviceType}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden md:table-cell">{lead.productModel}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm hidden lg:table-cell">{lead.orderDate}</td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">
                    <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs ${
                      lead.status === "New" ? "bg-blue-100 text-blue-700" :
                      lead.status === "In Progress" ? "bg-yellow-100 text-yellow-700" :
                      "bg-green-100 text-green-700"
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FiEye size={16} className="md:w-5 md:h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm">
                  No leads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
        <div className="text-xs md:text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 md:px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 md:px-3 py-1 border rounded text-xs md:text-sm ${
                currentPage === i + 1
                  ? "bg-[#7EC1B1] text-white border-[#7EC1B1]"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 md:px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadManagement;

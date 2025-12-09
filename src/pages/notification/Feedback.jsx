import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

const Feedbacks = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    const feedbackData = [
        {
            id: 1,
            feedbackId: "R254789",
            customerName: "Rahul Sharma",
            vendor: "Amit Jay",
            area: "Pune",
            date: "10-05-2025",
            feedback: "Product was good",
            rating: 3,
        },
        {
            id: 2,
            feedbackId: "R254789",
            customerName: "Rahul Sharma",
            vendor: "Amit Jay",
            area: "Pune",
            date: "10-05-2025",
            feedback: "Product was good",
            rating: 3,
        },
        {
            id: 3,
            feedbackId: "R254789",
            customerName: "Rahul Sharma",
            vendor: "Amit Jay",
            area: "Pune",
            date: "10-05-2025",
            feedback: "Product was good",
            rating: 3,
        },
        {
            id: 4,
            feedbackId: "R254789",
            customerName: "Rahul Sharma",
            vendor: "Amit Jay",
            area: "Pune",
            date: "10-05-2025",
            feedback: "Product was good",
            rating: 3,
        },
        {
            id: 5,
            feedbackId: "R254789",
            customerName: "Rahul Sharma",
            vendor: "Amit Jay",
            area: "Pune",
            date: "10-05-2025",
            feedback: "Product was good",
            rating: 3,
        },
    ];

    const StarRating = ({ rating }) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                        key={star}
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill={star <= rating ? "#FFCC00" : "none"}
                        stroke={star <= rating ? "#FFCC00" : "#FFCC00"}
                        strokeWidth="2"
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                ))}
            </div>
        );
    };

    const totalPages = Math.ceil(feedbackData.length / entriesPerPage);

    return (
        <div className="min-h-screen bg-white p-4">
            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="text-gray-500 font-medium">
                    <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
                </span>
                <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
                <span
                    onClick={() => navigate("/notifications")}
                    className="text-gray-900 cursor-pointer"
                >
                    Notification
                </span>
                <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
                <span className="text-[#4A90E2] font-medium cursor-pointer">
                    Feedback
                </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-900">Feedbacks</h2>
            <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

            {/* Search and Entries */}
            <div className="py-4 flex items-center justify-between">
                <div className="relative border border-grey-900 rounded-[8px]">
                    <svg
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="11" cy="11" r="8" strokeWidth="2" />
                        <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
                    </svg>

                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 text-sm focus:outline-none focus:border-gray-400"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-700">Show</span>
                    <select
                        value={entriesPerPage}
                        onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-gray-400"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="text-sm text-gray-700">Entries</span>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Sr.No.
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Feedback ID
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Customer Name
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Vendor
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Area
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Date
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Feedback
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">
                                Performance
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {feedbackData.map((item) => (
                            <tr key={item.id} className="">
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {item.id}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {item.feedbackId}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {item.customerName}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {item.vendor}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {item.area}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4 text-center text-sm text-gray-900">
                                    {item.feedback}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center">
                                        <StarRating rating={item.rating} />
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="py-4 flex items-center justify-between border-t border-gray-200">
                <span className="text-sm text-gray-700">
                    Showing 1 to 5 of 30 Entries
                </span>

                <div className="flex items-center gap-2">
                    <button className="px-4 py-2 text-sm text-teal-500 border border-[#7EC1B1] rounded-md transition-colors">
                        Previous
                    </button>
                    <button className="px-3 py-2 text-sm bg-[#7EC1B1] text-white rounded-md">
                        1
                    </button>
                    <button className="px-3 py-2 text-sm text-teal-500 border border-[#7EC1B1] rounded-md transition-colors">
                        2
                    </button>
                    <button className="px-3 py-2 text-sm text-teal-500 border border-[#7EC1B1] rounded-md transition-colors">
                        3
                    </button>
                    <button className="px-4 py-2 text-sm text-teal-500 border border-[#7EC1B1] rounded-md transition-colors">
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Feedbacks;
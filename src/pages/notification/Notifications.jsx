import React from "react";
import { FaCheckCircle, FaBoxOpen, FaTruck, FaSmile, FaClipboardList } from "react-icons/fa";
import Dashboard from "../../assets/images/Dashboard.svg";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

const notifications = [
  {
    id: 1,
    icon: <FaClipboardList className="text-green-600 text-2xl" />,
    title: "New Order Received",
    message: "Vendor AquaFlow Distributors placed an order for 25 RO Filters.",
    time: "Just now",
    action: "Check Now",
    bg: "bg-green-50",
  },
  {
    id: 2,
    icon: <FaCheckCircle className="text-blue-600 text-2xl" />,
    title: "Order Approved",
    message: "Order #ORD/2025/056 has been successfully approved",
    time: "10 mins ago",
    action: "Check Now",
    bg: "bg-blue-50",
  },
  {
    id: 3,
    icon: <FaTruck className="text-indigo-600 text-2xl" />,
    title: "Delivered Successfully",
    message: "Order #ORD/2025/041 delivered to “HydroTech Traders”.",
    time: "1 hour ago",
    action: "Seen",
    bg: "bg-indigo-50",
  },
  {
    id: 4,
    icon: <FaBoxOpen className="text-purple-600 text-2xl" />,
    title: "Shipment Dispatched",
    message: "Shipment #SHP/2025/0038 dispatched to Vendor “PureFlow Systems”.",
    time: "Today, 11:15 AM",
    action: "Seen",
    bg: "bg-purple-50",
  },
  {
    id: 5,
    icon: <FaSmile className="text-yellow-500 text-2xl" />,
    title: "Feedback Submitted",
    message: "Vendor BlueDrop Systems rated the shipment 5★",
    time: "Yesterday, 1:00 PM",
    action: "Seen",
    bg: "bg-yellow-50",
  },
];

const Notifications = () => {

  const navigate = useNavigate();
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span
          onClick={() => navigate("/notifications")}
          className="text-[#4A90E2] font-medium cursor-pointer"
        >
          Notification
        </span>
      </div>
        <h2 className="text-2xl font-semibold text-gray-800">Notifications</h2>
        <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      {/* Notification List */}
      <div className="flex flex-col gap-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex justify-between items-center p-4 rounded-lg ${n.bg}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">{n.icon}</div>
              <div>
                <h3 className="font-semibold text-gray-800">{n.title}</h3>
                <p className="text-gray-600 text-sm">{n.message}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">{n.time}</p>
              <button
                className={`text-sm font-medium ${n.action === "Check Now"
                  ? "text-blue-500"
                  : "text-green-500"
                  }`}
              >
                {n.action}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;

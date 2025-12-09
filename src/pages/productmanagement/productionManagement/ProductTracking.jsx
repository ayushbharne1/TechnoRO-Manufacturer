import React from "react";
import { FaDownload, FaComments, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

const ProductTracking = () => {
  const navigate = useNavigate();
  const order = {
    id: "125120",
    vendor: "Kartik Ray",
    mobile: "89xxxxxxxx",
    shippedDate: "25.03.25",
    item: {
      name: "Domestic RO Membrane set of 1",
      warranty: "6 Months",
      qty: 1,
      price: "Rs. 1900",
      serviceTime: "1hr 30min",
      image: "https://placehold.co/112x112/e2e8f0/94a3b8?text=Product",
    },
    timeline: [
      {
        title: "Order Confirmed",
        desc: "Your Order has been placed.",
        time: "Wed, 1st Oct 2025 - 10:30 am",
        active: true,
      },
      {
        title: "Item has been picked up by delivery partner.",
        desc: "Manufacturer has given your parcel to delivery partner",
        time: "Wed, 1st Oct 2025 - 10:00 am",
        active: true,
      },
      {
        title: "Shipped",
        desc: "Ekart Logistics - FMPC5FDG5G4\nItem has been shipped",
        time: "Fri, 1st Oct 2025 - 10:30 am",
        active: true,
      },
      {
        title: "Out for Delivery",
        desc: "Item is out for delivery",
        time: "Fri, 1st Oct 2025 - 12:30 pm",
        active: true,
      },
      {
        title: "Delivered",
        desc: "Your item has been delivered",
        time: "Sat, 1st Oct 2025 - 10:30 am",
        active: true,
        delivered: true,
      },
    ],
  };

  return (
    <div className="p-4 bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 flex items-center mb-2">
        <span className="text-gray-500 font-medium">
          <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
        </span>
         
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-gray-900 font-medium cursor-pointer">Management</span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span onClick={() => navigate("/production-management")} className="text-gray-900 font-medium cursor-pointer">Production Management</span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-blue-500 font-medium cursor-pointer">Product Tracking</span>
      </div>

      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-2">Product Tracking</h2>
      <hr className="mb-2 mt-4 border-gray-400 border-1" />

      {/* Order Info Header */}
      <div className="mb-6">
        <div className="gap-10 text-sm flex justify-between items-center flex-wrap">
          <div className="flex gap-4">
            <span className="font-medium text-black">Order ID:</span>
            <span className="text-gray-700">{order.id}</span>
          </div>
          <div>
            <span className="font-medium text-black">Vendor Name:</span>
            <span className="text-gray-700"> {order.vendor}</span>
          </div>
          <div className="flex gap-6">
            <span className="font-medium text-black">Shipped date:</span>
            <span className="text-gray-700">{order.shippedDate}</span>
          </div>
          <div>
            <a href="#" onClick={() => navigate("/batch-tracking")} className="text-blue-500 font-medium">
              Track Batch ID
            </a>
          </div>
        </div>

        <div className="text-sm mt-4 flex justify-between items-center flex-wrap">
          <div className="text-gray-900 font-medium">
            <span className="font-medium text-black">Mobile Number:</span>
            <span className="text-gray-700"> {order.mobile}</span>
          </div>

          <div className="md:w-1/2 w-full flex justify-end mt-3 md:mt-0">
            <div
              onClick={() => navigate("/invoice")}
              className="w-full md:w-[98%] border border-gray-300 px-4 py-2 rounded hover:bg-gray-50 transition text-sm flex items-center justify-between gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FaDownload className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">Download Invoice</span>
              </div>
              <FaDownload className="w-5 h-5 text-gray-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="grid md:grid-cols-2 gap-6 items-start">
        {/* Left Section - Order Details */}
        <div className="bg-white">
          <div className="flex items-start justify-between gap-4 mb-6 mt-0">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2 mt-2 text-black">
                Order Items
              </h3>
              <p className="font-medium text-black mb-2 ml-2">
                1. {order.item.name}
              </p>
              <p className="text-gray-600 text-sm mb-1 ml-3">
                Warranty: {order.item.warranty}
              </p>
              <p className="text-gray-600 text-sm mb-2 ml-2">
                Qty: {order.item.qty}
              </p>
              <p className="font-bold text-gray-900 text-lg mb-1 ml-2">
                {order.item.price}
              </p>
              <p className="text-gray-500 text-sm ml-2">
                Service time: {order.item.serviceTime}
              </p>
            </div>
            <div>
              <img
                src={order.item.image}
                alt="Product"
                className="w-28 h-28 object-contain"
              />
            </div>
          </div>

          <button className="w-[50%] border border-gray-300 rounded py-2.5 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FaComments className="text-gray-600" />
            <span className="text-gray-700 font-medium">Chat With Vendor</span>
          </button>
        </div>

        {/* Right Section - Order Tracking Bar */}
        <div className="border border-gray-300 rounded p-6 bg-white">
          <h3 className="font-semibold text-lg mb-6">Order Status</h3>

          {/* Vertical Tracking Bar */}
          <div className="relative pl-6">
            <div className="space-y-6">
              {order.timeline.map((step, idx) => (
                <div key={idx} className="relative flex items-start">
                  {/* Circle with checkmark for delivered */}
                  <div
                    className={`absolute -left-[17px] w-4 h-4 rounded-full ${step.delivered
                      ? "bg-green-500 flex items-center justify-center"
                      : "bg-green-500"
                      } z-10`}
                  >
                    {step.delivered && (
                      <FaCheck className="text-white w-2.5 h-2.5" />
                    )}
                  </div>

                  {/* Vertical Line - connects to next circle */}
                  {idx < order.timeline.length - 1 && (
                    <div className="absolute -left-[12px] top-4 w-[4px] h-[calc(100%+8px)] bg-green-500"></div>
                  )}

                  {/* Content */}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1 text-sm">
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-600 whitespace-pre-line mb-1">
                      {step.desc}
                    </p>
                    <p className="text-xs text-gray-400">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTracking;
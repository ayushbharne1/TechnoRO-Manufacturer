import React, { useState, useEffect, useRef } from "react";
import { MdArrowForwardIos, MdLocationOn, MdPhone, MdLocalShipping, MdCalendarToday, MdHome, MdChevronRight, MdDescription, MdCheck } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../assets/images/Dashboard.svg";

const OrderDetails = () => {
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState("new");
  const [showDeliveryPartner, setShowDeliveryPartner] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showRejectedSuccess, setShowRejectedSuccess] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js";
    script.async = true;

    script.onload = () => {
      if (mapRef.current && !mapInstanceRef.current && window.L) {
        const map = window.L.map(mapRef.current).setView([35.0844, -106.6504], 13);
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);
        const marker = window.L.marker([35.0844, -106.6504]).addTo(map);
        marker.bindPopup("<b>Delivery Address</b><br>4140 Parker Rd, Allentown, New Mexico 31134").openPopup();
        mapInstanceRef.current = map;
      }
    };

    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleAccept = () => {
    setOrderStatus("confirmed");
  };

  const handleReject = () => {
    setShowRejectConfirm(true);
  };

  const handleConfirmReject = () => {
    setShowRejectConfirm(false);
    setShowRejectedSuccess(true);
    
    // Auto close after 2 seconds and navigate back
    setTimeout(() => {
      setShowRejectedSuccess(false);
      navigate("/order-management");
    }, 2000);
  };

  const handleCancelReject = () => {
    setShowRejectConfirm(false);
  };

  const handleMarkAction = (status) => {
    if (status === "picked") {
      setShowDeliveryPartner(true);
    } else {
      setOrderStatus(status);
    }
  };

  const handleDeliveryPartnerDone = () => {
    if (selectedPartner) {
      setShowDeliveryPartner(false);
      setOrderStatus("picked");
    }
  };

  const handleGenerateInvoice = () => {
    navigate("/invoice");
  };

  const statusMap = {
    new: [],
    confirmed: ["confirmed"],
    picked: ["confirmed", "picked"],
    shipped: ["confirmed", "picked", "shipped"],
    out: ["confirmed", "picked", "shipped", "out"],
    delivered: ["confirmed", "picked", "shipped", "out", "delivered"],
  };

  const product = {
    id: "MG678",
    name: "Kent Grand Plus RO",
    qty: 1,
  };

  const getStatusColor = (status) => {
    return statusMap[orderStatus].includes(status) ? "bg-green-600" : "bg-gray-300";
  };

  const isStatusActive = (status) => statusMap[orderStatus].includes(status);

  const getLineColor = (fromStatus) => {
    const statusOrder = ["confirmed", "picked", "shipped", "out", "delivered"];
    const currentIndex = statusOrder.indexOf(orderStatus);
    const fromIndex = statusOrder.indexOf(fromStatus);
    return fromIndex < currentIndex ? "bg-green-600" : "bg-gray-300";
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="mx-auto">
        <div className="flex items-center text-sm text-gray-900 pb-3">
          <span className="text-gray-500 font-medium">
            <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
          </span>
           
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span
            className="font-medium cursor-pointer text-gray-900"
            onClick={() => navigate("/order-management")}
          >
            Order Management
          </span> 
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span className="font-medium text-blue-600 cursor-pointer">
            Order Details
          </span>
        </div>

        <div className="bg-white mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Details</h2>
          <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kathryn Murphy</h1>
              <p className="text-sm text-gray-500 mt-1">Order ID: OD54875</p>
            </div>
            {orderStatus === "new" ? (
              <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-xs px-6 py-2 rounded-full">NEW</button>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-6 py-2 rounded-full">In-Progress</button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-start gap-2 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-[#7EC1B1] fill-current"
                >
                  <path d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
                </svg>

                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Delivery Address</h3>
                  <p className="text-[#7EC1B1]">4140 Parker Rd, Allentown, New Mexico 31134</p>
                </div>
              </div>
              <div ref={mapRef} className="w-full h-48 bg-gray-200 rounded-lg border border-gray-300" style={{ zIndex: 0 }} />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <MdPhone className="w-5 h-5 text-[#7EC1B1] mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 cursor-pointer">Phone No.</h3>
                  <p className="text-[#7EC1B1] cursor-pointer">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MdLocalShipping className="w-5 h-5 text-[#7EC1B1] mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Product Ordered</h3>
                  <p
                    className="text-[#7EC1B1] cursor-pointer"
                    onClick={() => navigate(`/product-detail/${product.id}`)}
                  >
                    {product.name} - Quantity:{product.qty}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MdCalendarToday className="w-5 h-5 text-[#7EC1B1] mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900 mb-1 cursor-pointer">Order Date & Time</h3>
                  <p className="text-[#7EC1B1] cursor-pointer">21 Oct 2025, 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 ${orderStatus !== "new" ? "lg:grid-cols-2" : ""} gap-6`}>
          {orderStatus !== "new" && (
            <div className="bg-white border border-gray-300 p-4">
              <div className="space-y-.7">
                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor("confirmed")}`}>
                      {isStatusActive("confirmed") && <MdCheck className="w-3 h-3 text-white" />}
                    </div>
                    <div className={`w-0.5 h-16 ${getLineColor("confirmed")}`}></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Order Confirmed</h3>
                    <p className="text-sm text-gray-600">Order has been placed.</p>
                    <p className="text-xs text-gray-500">Wed, 21 Oct '2025 - 10:00 am</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor("picked")}`}>
                      {isStatusActive("picked") && <MdCheck className="w-3 h-3 text-white" />}
                    </div>
                    {(orderStatus !== "picked" || showDeliveryPartner) && <div className={`w-0.5 h-16 ${getLineColor("picked")}`}></div>}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Item has been picked up by delivery partner.</h3>
                    {orderStatus !== "confirmed" && (
                      <>
                        <p className="text-sm text-gray-600">Manufacturer has given parcel to delivery partner</p>
                        <p className="text-xs text-gray-500">Wed, 21 Oct '2025 - 10:00 am</p>
                      </>
                    )}
                    {orderStatus === "confirmed" && !showDeliveryPartner && (
                      <button onClick={() => handleMarkAction("picked")} className="mt-2 bg-[#7EC1B1] text-white px-4 py-1.5 rounded text-sm">Mark Picked Up</button>
                    )}
                    {showDeliveryPartner && (
                      <div className="mt-3 space-y-3">
                        <h4 className="font-semibold text-gray-900 text-center">Select Delivery Partner</h4>
                        <select value={selectedPartner} onChange={(e) => setSelectedPartner(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
                          <option value="">Select</option>
                          <option value="DLPL Logistics">DLPL Logistics</option>
                          <option value="Blue Dart">Blue Dart</option>
                          <option value="Delhivery">Delhivery</option>
                        </select>
                        <div className="flex gap-3">
                          <button onClick={() => setShowDeliveryPartner(false)} className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-50">Cancel</button>
                          <button onClick={handleDeliveryPartnerDone} className="flex-1 bg-[#7EC1B1] text-white px-4 py-2 rounded text-sm">Done</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {orderStatus !== "confirmed" && !showDeliveryPartner && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor("shipped")}`}>
                        {isStatusActive("shipped") && <MdCheck className="w-3 h-3 text-white" />}
                      </div>
                      {orderStatus !== "picked" && <div className={`w-0.5 h-16 ${getLineColor("shipped")}`}></div>}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Shipped</h3>
                      {orderStatus !== "picked" && (
                        <>
                          <p className="text-sm text-gray-600">DLPL Logistics - FMPC5FDG5G4</p>
                          <p className="text-sm text-gray-600">Item has been shipped</p>
                          <p className="text-xs text-gray-500">Fri 23 Oct '2025 - 10:30 am</p>
                        </>
                      )}
                      {orderStatus === "picked" && (
                        <button onClick={() => handleMarkAction("shipped")} className="mt-2 bg-[#7EC1B1] text-white px-4 py-1.5 rounded text-sm">Mark Shipped</button>
                      )}
                    </div>
                  </div>
                )}

                {["shipped", "out", "delivered"].includes(orderStatus) && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor("out")}`}>
                        {isStatusActive("out") && <MdCheck className="w-3 h-3 text-white" />}
                      </div>
                      {orderStatus !== "shipped" && <div className={`w-0.5 h-16 ${getLineColor("out")}`}></div>}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Out for Delivery</h3>
                      {orderStatus !== "shipped" && (
                        <>
                          <p className="text-sm text-gray-600">Item is out for delivery</p>
                          <p className="text-xs text-gray-500">Fri 23 Oct '2025 - 12:30 pm</p>
                        </>
                      )}
                      {orderStatus === "shipped" && (
                        <button onClick={() => handleMarkAction("out")} className="mt-2 bg-[#7EC1B1] text-white px-4 py-1.5 rounded text-sm">Mark Out For Delivery</button>
                      )}
                    </div>
                  </div>
                )}

                {["out", "delivered"].includes(orderStatus) && (
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${getStatusColor("delivered")}`}>
                        {isStatusActive("delivered") && <MdCheck className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Delivered</h3>
                      {orderStatus === "delivered" && (
                        <>
                          <p className="text-sm text-gray-600">Item has been delivered</p>
                          <p className="text-xs text-gray-500">Sat 1st Oct '2025 - 10:30 am</p>
                        </>
                      )}
                      {orderStatus === "out" && (
                        <button onClick={() => handleMarkAction("delivered")} className="mt-2 bg-[#7EC1B1] text-white px-4 py-1.5 rounded text-sm">Mark Delivered</button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-white border border-gray-400 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Price Details</h2>
            <hr className="text-gray-300 mb-3" />
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Price (1 items)</span>
                <span>₹24999</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Discount</span>
                <span className="text-green-700">-₹5000</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span>
                <span>₹1</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Debit Card Off</span>
                <span className="text-green-700">-₹1000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Delivery Charges</span>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm mr-2">₹100</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <div className="flex justify-between text-gray-900">
                  <span className="font-medium text-lg">Total Amount</span>
                  <span>₹19000</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-[#7EC1B1] text-sm mb-4">Total saved on this order ₹700</p>
                <hr className="text-gray-300 mb-1" />
                <div className="flex items-center gap-3 py-3">
                  <div className="w-8 h-8 bg-[#7EC1B1] rounded-full flex items-center justify-center text-white font-semibold">%</div>
                  <div>
                    <p className="font-medium text-sm text-gray-900">1 Offer Applied On This Order</p>
                    <p className="text-sm text-gray-600">Debit Card Off ₹100</p>
                  </div>
                </div>
                <hr className="text-gray-300 mb-2" />
                <div className="mt-2">
                  <p className="text-sm text-gray-700">Payment Mode : Debit Card</p>
                </div>
              </div>
              {orderStatus === "delivered" && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button onClick={handleGenerateInvoice} className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-2.5 rounded hover:bg-gray-50 transition-colors">
                    <MdDescription className="w-4 h-4" />
                    Generate Invoice
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {orderStatus === "new" && (
          <div className="flex items-center gap-4 mt-6 max-w-md m-auto">
            <button onClick={handleReject} className="flex-1 border border-[#7EC1B1] text-[#7EC1B1] font-medium py-2 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer">Reject</button>
            <button onClick={handleAccept} className="flex-1 bg-[#7EC1B1] text-white font-medium py-2 rounded-sm transition-colors cursor-pointer">Accept</button>
          </div>
        )}
      </div>

      {/* Confirm Rejection Modal */}
      {showRejectConfirm && (
        <>
          <div 
            className="fixed inset-0 bg-opacity-50 z-40"
            onClick={handleCancelReject}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">Confirm Rejection</h2>
            <p className="text-gray-600 text-center mb-6">Are you sure you want to reject this order ?</p>
            <div className="flex gap-4">
              <button 
                onClick={handleCancelReject}
                className="flex-1 border border-[#7EC1B1] text-[#7EC1B1] font-medium py-3 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmReject}
                className="flex-1 bg-[#7EC1B1] text-white font-medium py-3 rounded hover:bg-[#6da99d] transition-colors"
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </>
      )}

      {/* Order Rejected Success Modal */}
      {showRejectedSuccess && (
        <>
          <div className="fixed inset-0 bg-opacity-50 z-40" />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 p-8 max-w-sm w-full mx-4 text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 10v4h2v-4h-2zm0 6v2h2v-2h-2z"/>
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Order Rejected</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
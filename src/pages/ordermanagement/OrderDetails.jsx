import React, { useState, useEffect, useRef } from "react";
import { MdArrowForwardIos, MdPhone, MdLocalShipping, MdCalendarToday, MdCheck, MdDescription, MdLocationOn } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../../assets/images/Dashboard.svg";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { 
  fetchOrderById, confirmOrder, rejectOrder, assignPartner, updateOrderStatus, resetOrderState 
} from "../../redux/orderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Ref for Map
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const { currentOrder, isLoading, successMessage, error } = useSelector((state) => state.orders);

  const [showDeliveryPartner, setShowDeliveryPartner] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [showRejectConfirm, setShowRejectConfirm] = useState(false);
  const [showRejectedSuccess, setShowRejectedSuccess] = useState(false);

  // 1. Fetch Details
  useEffect(() => { if (id) dispatch(fetchOrderById(id)); }, [id, dispatch]);

  // 2. Map Logic 
  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && !mapInstanceRef.current && window.L) {
        const coords = [18.5204, 73.8567]; 
        
        const map = window.L.map(mapRef.current).setView(coords, 13);
        
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);
        
        window.L.marker(coords).addTo(map)
          .bindPopup("<b>Delivery Location</b><br>" + (currentOrder?.shippingAddress?.city || "Pune"))
          .openPopup();
          
        mapInstanceRef.current = map;
      }
    };

    if (window.L) {
      initMap();
    } else {
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      if (!document.getElementById("leaflet-js")) {
        const script = document.createElement("script");
        script.id = "leaflet-js";
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.onload = initMap;
        document.body.appendChild(script);
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [currentOrder]); 

  useEffect(() => {
    if (successMessage) {
        if(successMessage !== "Order Updated Successfully!") toast.success(successMessage);
        dispatch(resetOrderState());
        if (currentOrder?.orderStatus === "rejected") {
            setShowRejectedSuccess(true);
            setTimeout(() => { setShowRejectedSuccess(false); navigate("/order-management"); }, 2000);
        }
    }
    if (error) { toast.error(error); dispatch(resetOrderState()); }
  }, [successMessage, error, currentOrder, navigate, dispatch]);

  if (isLoading || !currentOrder) return <div className="p-10 text-center text-gray-500">Loading...</div>;

  const customer = currentOrder.customer || {};
  const items = currentOrder.items || [];
  const address = currentOrder.shippingAddress || {};
  const statusHistory = currentOrder.statusHistory || [];

  const normalizeStatus = (status) => {
      if (!status) return "new";
      const s = status.toLowerCase();
      if (s === "assigned") return "new";
      if (s === "assigned_deliverypartner") return "confirmed";
      if (s === "pickedup_by_deliverypartner") return "picked-up";
      if (s === "out_for_delivery") return "out-for-delivery";
      return s; 
  };

  const currentStep = normalizeStatus(currentOrder.orderStatus);
  const isNew = currentStep === "new";

  const formatHistoryDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString('en-GB', { 
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', 
        hour: 'numeric', minute: 'numeric', hour12: true 
    }).replace(',', ' -');
  };

  const getStepInfo = (uiStepId) => {
      let apiStatusKey = uiStepId;
      if (uiStepId === "picked-up") apiStatusKey = "pickedUp_by_deliveryPartner";
      if (uiStepId === "out-for-delivery") apiStatusKey = "out_for_delivery";
      
      const entry = statusHistory.find(h => h.status === apiStatusKey) || statusHistory.find(h => h.status === uiStepId);
      
      let extraInfo = "";
      if (uiStepId === "shipped") {
          const partnerEntry = statusHistory.find(h => h.status === "assigned_deliveryPartner");
          if (partnerEntry && partnerEntry.note) {
              const parts = partnerEntry.note.split(":");
              extraInfo = parts.length > 1 ? parts[1].trim() : "Partner Assigned";
          }
      }
      return { date: entry ? formatHistoryDate(entry.timestamp) : "", extra: extraInfo };
  };

  const handleAccept = () => dispatch(confirmOrder(id));
  const handleConfirmReject = () => { setShowRejectConfirm(false); dispatch(rejectOrder(id)); };
  
  const handlePartnerAssign = () => {
    if(!selectedPartner) return toast.error("Select Partner!");
    dispatch(assignPartner({ id, partnerName: selectedPartner })).then((res) => {
       if(!res.error) { setShowDeliveryPartner(false); dispatch(updateOrderStatus({ id, status: "picked" })); }
    });
  };

  const statusFlow = ["confirmed", "picked-up", "shipped", "out-for-delivery", "delivered"];
  const isStatusActive = (step) => {
      if (currentStep === "rejected") return false;
      const currentIndex = statusFlow.indexOf(currentStep);
      return currentIndex >= statusFlow.indexOf(step);
  };

  const getStatusColor = (step) => isStatusActive(step) ? "bg-[#4CAF50]" : "bg-gray-300"; 
  const getLineColor = (step) => isStatusActive(step) ? "bg-[#4CAF50]" : "bg-gray-300";

  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-[#4A90E2] font-medium mb-4">
          <span className="cursor-pointer flex items-center text-gray-500" onClick={() => navigate("/dashboard")}>
            <img src={Dashboard} alt="Dashboard" className="w-4 h-4 mr-2" />
          </span>
          <MdArrowForwardIos className="text-gray-400 mx-2" />
          <span className="cursor-pointer text-gray-900" onClick={() => navigate("/order-management")}>Order Management</span> 
          <MdArrowForwardIos className="text-gray-400 mx-2" />
          <span className="text-[#4A90E2]">Order Details</span>
        </div>

        {/* Header */}
        <div className="bg-white mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{customer.name}</h1>
              <p className="text-sm text-gray-500">Order ID: {currentOrder.orderId}</p>
            </div>
            <button className={`text-white text-sm px-6 py-2 rounded-full font-bold shadow-sm ${
                isNew ? 'bg-[#FFC107]' : currentStep === 'delivered' ? 'bg-[#2ECC71]' : currentStep === 'rejected' ? 'bg-red-500' : 'bg-[#007BFF]'
            }`}>
               {isNew ? "NEW" : currentStep === 'out-for-delivery' ? 'Out for Delivery' : currentStep === 'picked-up' ? 'Picked Up' : currentStep.charAt(0).toUpperCase() + currentStep.slice(1)}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-b pb-6 mb-6 border-gray-200">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <MdLocationOn className="w-6 h-6 text-[#7EC1B1]" />
                <div><h3 className="font-semibold text-gray-700">Delivery Address</h3><p className="text-[#7EC1B1] text-lg">{address.addressLine1}, {address.city} - {address.pincode}</p></div>
              </div>
              
              <div ref={mapRef} className="w-full h-48 rounded-xl border border-gray-300 overflow-hidden relative z-0"></div>
            </div>
            
            <div className="space-y-6 lg:pl-10">
              <div className="flex gap-3"><MdPhone className="text-[#7EC1B1] w-6 h-6" /><div><h3 className="font-semibold text-gray-700">Phone No.</h3><p className="text-[#7EC1B1] text-lg">{customer.phone}</p></div></div>
              <div className="flex gap-3"><MdLocalShipping className="text-[#7EC1B1] w-6 h-6" /><div><h3 className="font-semibold text-gray-700">Product</h3>{items.map((i,x)=><p key={x} className="text-[#7EC1B1] text-lg">{i.name} (Qty:{i.quantity})</p>)}</div></div>
              <div className="flex gap-3"><MdCalendarToday className="text-[#7EC1B1] w-6 h-6" /><div><h3 className="font-semibold text-gray-700">Date</h3><p className="text-[#7EC1B1] text-lg">{new Date(currentOrder.orderedDate).toLocaleString()}</p></div></div>
            </div>
          </div>
        </div>

        {/* --- DYNAMIC SECTION --- */}
        {isNew && (
            <div className="flex items-center gap-6 max-w-lg mx-auto mt-12">
                <button onClick={() => setShowRejectConfirm(true)} className="flex-1 border border-[#7EC1B1] text-[#7EC1B1] font-bold py-3 rounded-md hover:bg-gray-50">Reject</button>
                <button onClick={() => dispatch(confirmOrder(id))} className="flex-1 bg-[#7EC1B1] text-white font-bold py-3 rounded-md hover:bg-[#68a89b] shadow-md">Accept</button>
            </div>
        )}

        {!isNew && currentStep !== "rejected" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Timeline */}
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
                    {[{id:'confirmed', l:'Order Confirmed', d:'Order has been placed.'}, 
                      {id:'picked-up', l:'Picked Up', d:'Item picked up by delivery partner.'}, 
                      {id:'shipped', l:'Shipped', d:'Item has been shipped.'}, 
                      {id:'out-for-delivery', l:'Out for Delivery', d:'Item is out for delivery.'}, 
                      {id:'delivered', l:'Delivered', d:'Item has been delivered.'}].map((step, idx, arr) => {
                        const info = getStepInfo(step.id);
                        const isDone = isStatusActive(step.id);
                        return (
                            <div key={step.id} className="flex gap-4 relative pb-8 last:pb-0">
                                <div className="flex flex-col items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white z-10 ${isDone?'bg-[#4CAF50]':'bg-gray-300'}`}>{(isDone||step.id==='confirmed')&&<MdCheck className="w-4 h-4"/>}</div>
                                    {idx < arr.length-1 && <div className={`w-1 h-full absolute top-6 -z-0 ${isStatusActive(arr[idx+1].id)?'bg-[#4CAF50]':'bg-gray-300'}`}></div>}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-gray-900">{step.l}</h3>
                                    <p className="text-sm text-gray-600">{step.id === 'shipped' && info.extra ? `${info.extra} - Tracking Available` : step.d}</p>
                                    {isDone && info.date && <p className="text-xs text-gray-500 mt-1">{info.date}</p>}
                                    
                                    {/* Actions */}
                                    {step.id === 'picked-up' && currentStep === 'confirmed' && !showDeliveryPartner && <button onClick={()=>setShowDeliveryPartner(true)} className="mt-2 bg-[#8DC9BE] text-white px-4 py-1.5 rounded text-sm">Mark Picked Up</button>}
                                    {step.id === 'picked-up' && showDeliveryPartner && <div className="mt-2 bg-gray-50 p-2 rounded border"><select className="border p-1 w-full mb-2 text-sm bg-white" onChange={e=>setSelectedPartner(e.target.value)}><option value="">Select Partner</option><option>DLPL Logistics</option><option>Blue Dart</option></select><div className="flex gap-2"><button onClick={()=>setShowDeliveryPartner(false)} className="border px-3 py-1 text-xs rounded">Cancel</button><button onClick={handlePartnerAssign} className="bg-blue-600 text-white px-3 py-1 text-xs rounded">Save</button></div></div>}
                                    {step.id === 'shipped' && currentStep === 'picked-up' && <button onClick={()=>dispatch(updateOrderStatus({id, status:'shipped'}))} className="mt-2 bg-[#8DC9BE] text-white px-4 py-1.5 rounded text-sm">Mark Shipped</button>}
                                    {step.id === 'out-for-delivery' && currentStep === 'shipped' && <button onClick={()=>dispatch(updateOrderStatus({id, status:'out'}))} className="mt-2 bg-[#8DC9BE] text-white px-4 py-1.5 rounded text-sm">Mark Out</button>}
                                    {step.id === 'delivered' && currentStep === 'out-for-delivery' && <button onClick={()=>dispatch(updateOrderStatus({id, status:'delivered'}))} className="mt-2 bg-[#8DC9BE] text-white px-4 py-1.5 rounded text-sm">Mark Delivered</button>}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Price Details */}
                <div className="bg-white border border-gray-400 p-4 h-fit">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Price Details</h2>
                    <hr className="text-gray-300 mb-3" />
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex justify-between"><span>Price ({items.length} items)</span> <span>₹{currentOrder.subtotal}</span></div>
                        <div className="flex justify-between"><span>Taxes</span> <span>+₹{currentOrder.taxesAndFees}</span></div>
                        <div className="flex justify-between"><span>Shipping</span> <span className="text-green-700">+₹{currentOrder.shippingCost}</span></div>
                        <div className="border-t pt-4 mt-2 flex justify-between text-gray-900 font-bold text-lg"><span>Total Amount</span><span>₹{currentOrder.totalAmount}</span></div>
                    </div>
                    {currentStep === "delivered" && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <button onClick={() => navigate(`/invoice/${id}`)} className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 font-medium py-2.5 rounded hover:bg-gray-50 transition-colors">
                                <MdDescription className="w-4 h-4" /> Generate Invoice
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {/* --- MODALS --- */}
        {showRejectConfirm && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
                    <h2 className="text-xl font-bold mb-4">Confirm Rejection</h2>
                    <div className="flex gap-4"><button onClick={() => setShowRejectConfirm(false)} className="flex-1 border py-2 rounded">Cancel</button><button onClick={handleConfirmReject} className="flex-1 bg-red-500 text-white py-2 rounded">Yes, Reject</button></div>
                </div>
            </div>
        )}
        {showRejectedSuccess && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
                    <div className="mb-4 flex justify-center"><div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"><MdCheck className="w-8 h-8 text-red-600" /></div></div>
                    <h2 className="text-2xl font-bold text-gray-900">Order Rejected</h2>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
import React, { useEffect } from "react";
import { FiPrinter } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../../assets/images/Dashboard.svg";

// --- REDUX IMPORTS ---
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "../../redux/orderSlice";

const InvoicePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Matches route /invoice/:id
  const dispatch = useDispatch();

  // 1. Get Real Data
  const { currentOrder, isLoading } = useSelector((state) => state.orders);

  // 2. Fetch Data on Load
  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [id, dispatch]);

  if (isLoading) return <div className="p-10 text-center text-gray-500">Generating Invoice...</div>;
  if (!currentOrder) return <div className="p-10 text-center text-red-500">Invoice details not found.</div>;

  // --- DATA MAPPING ---
  const customer = currentOrder.customer || {};
  const address = currentOrder.shippingAddress || {};
  const manufacturer = currentOrder.assignedManufacturerId || {};
  const items = currentOrder.items || [];
  
  // Dates
  const invoiceDate = currentOrder.orderedDate 
    ? new Date(currentOrder.orderedDate).toLocaleDateString("en-GB", { day: 'numeric', month: 'short', year: 'numeric' })
    : "N/A";

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-section, #invoice-section * {
            visibility: visible;
          }
          #invoice-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="p-4 bg-white min-h-screen">
        {/* Breadcrumb - Will not print */}
        <div className="flex items-center text-sm text-gray-500 mb-4 no-print">
          <span className="text-gray-500 font-medium">
            <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1 cursor-pointer" />
          </span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span onClick={() => navigate("/order-management")} className="text-gray-900 font-medium cursor-pointer">Order Management</span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span onClick={() => navigate(`/order-details/${id}`)} className="text-gray-900 font-medium cursor-pointer">Order Details</span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span className="text-blue-600 font-medium cursor-pointer">
            Generate Invoice
          </span>
        </div>

        {/* Invoice Section - Only this will print */}
        <div id="invoice-section" className="bg-white p-1">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-3 mb-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Invoice</h2>
            <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-teal-600 border border-teal-500 px-4 py-1 rounded-md transition no-print hover:bg-teal-50"
            >
              <FiPrinter />
              Print
            </button>
          </div>

          {/* Invoice Info */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <p><span className="font-semibold text-gray-700">Name: </span>{customer.name || "N/A"}</p>
              <p><span className="font-semibold text-gray-700">Email: </span>{customer.email || "N/A"}</p>
              <p><span className="font-semibold text-gray-700">Number: </span>{customer.phone || address.phone || "N/A"}</p>
            </div>
            <div className="text-right">
              <p><span className="font-semibold text-gray-700">Invoice No.: </span>{currentOrder.orderId}</p>
              <p><span className="font-semibold text-gray-700">Invoice Date: </span>{invoiceDate}</p>
            </div>
          </div>

          {/* Billed Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Manufacturer (Billed By) */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Billed by</h3>
              <p className="font-semibold">{manufacturer.name || "Techno RO Manufacturer"}</p>
              <p>S1234 3rd Floor, Maharashtra, Nagpur, India</p>
              <p className="text-sm mt-2 text-gray-600">
                <span className="font-semibold text-green-600">GSTIN:</span> 2TR2025123456Z123
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">PAN:</span> TRI2345TRMN
              </p>
            </div>

            {/* Customer (Billed To) */}
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Billed to</h3>
              <p className="font-semibold">{customer.name || address.fullName}</p>
              <p>{address.addressLine1}, {address.city}, {address.state} - {address.pincode}</p>
              <p className="text-sm mt-2 text-gray-600">
                <span className="font-semibold text-green-600">Phone:</span> {address.phone}
              </p>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name & Description</th>
                  <th className="px-4 py-2 text-left">HSN</th>
                  <th className="px-4 py-2 text-left">GST Rates</th>
                  <th className="px-4 py-2 text-left">Discount</th>
                  <th className="px-4 py-2 text-left">QTY.</th>
                  <th className="px-4 py-2 text-left">Rate</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {items.map((item, index) => {
                  // Calculate dynamic values
                  const rate = item.price || 0;
                  const qty = item.quantity || 1;
                  const amount = rate * qty; // Amount before discount
                  const discount = item.discount || 0;
                  const total = item.subtotal || (amount - discount);

                  return (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">8421</td> {/* Static HSN */}
                      <td className="px-4 py-3">18%</td> {/* Static GST */}
                      <td className="px-4 py-3 text-red-500">{discount > 0 ? `-₹${discount}` : '0'}</td>
                      <td className="px-4 py-3">{qty}</td>
                      <td className="px-4 py-3">₹{rate}</td>
                      <td className="px-4 py-3">₹{amount}</td>
                      <td className="px-4 py-3 font-semibold">₹{total}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Total Summary */}
          <div className="flex justify-end mt-4 px-4">
             <div className="w-1/3 space-y-2">
                <div className="flex justify-between text-gray-600">
                   <span>Subtotal:</span>
                   <span>₹{currentOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span>Taxes & Fees:</span>
                   <span>+ ₹{currentOrder.taxesAndFees}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span>Shipping:</span>
                   <span>+ ₹{currentOrder.shippingCost}</span>
                </div>
                {currentOrder.plateformFess > 0 && (
                    <div className="flex justify-between text-gray-600">
                        <span>Platform Fee:</span>
                        <span>+ ₹{currentOrder.plateformFess}</span>
                    </div>
                )}
                <div className="flex justify-between border-t border-gray-300 pt-2 text-lg font-bold text-gray-800">
                   <span>Grand Total:</span>
                   <span className="text-blue-600">₹{currentOrder.totalAmount}</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default InvoicePage;
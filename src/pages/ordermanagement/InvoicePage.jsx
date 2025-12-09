import React from "react";
import { FiPrinter } from "react-icons/fi";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../../assets/images/Dashboard.svg";

const InvoicePage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const invoiceItems = [
    {
      name: "Water Purifier Ultra UV",
      hsn: "WP123",
      gst: "18%",
      discount: 500,
      qty: 200,
      rate: 5000,
      amount: "10,00,000",
      total: "50,00,000",
    },
    {
      name: "Prefilter RO Service Kit",
      hsn: "WP123",
      gst: "18%",
      discount: 500,
      qty: 200,
      rate: 5000,
      amount: "10,00,000",
      total: "50,00,000",
    },
    {
      name: "Water Softener",
      hsn: "WP123",
      gst: "18%",
      discount: 500,
      qty: 200,
      rate: 5000,
      amount: "10,00,000",
      total: "50,00,000",
    },
    {
      name: "Smart RO UV Purifier",
      hsn: "WP123",
      gst: "18%",
      discount: 500,
      qty: 200,
      rate: 5000,
      amount: "10,00,000",
      total: "50,00,000",
    },
    {
      name: "Water Ionizer",
      hsn: "WP123",
      gst: "18%",
      discount: 500,
      qty: 200,
      rate: 5000,
      amount: "10,00,000",
      total: "50,00,000",
    },
  ];

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
            <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
          </span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span onClick={() => navigate("/order-management")} className="text-gray-900 font-medium cursor-pointer">Order Management</span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span onClick={() => navigate(`/order-details/${orderId}`)} className="text-gray-900 font-medium cursor-pointer">Order Details</span>
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
              <p><span className="font-semibold text-gray-700">Name: </span>Nilson</p>
              <p><span className="font-semibold text-gray-700">Email: </span>Nilson@vendor.com</p>
              <p><span className="font-semibold text-gray-700">Number: </span>+91 987654321</p>
            </div>
            <div className="text-right">
              <p><span className="font-semibold text-gray-700">Invoice No.: </span>NC-23432</p>
              <p><span className="font-semibold text-gray-700">Invoice Date: </span>Dec 25, 2025</p>
            </div>
          </div>

          {/* Billed Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Billed by</h3>
              <p className="font-semibold">Techno RO Manufacturer</p>
              <p>S1234 3rd Floor, Maharashtra, Nagpur, India</p>
              <p className="text-sm mt-2 text-gray-600">
                <span className="font-semibold text-green-600">GSTIN:</span> 2TR2025123456Z123
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">PAN:</span> TRI2345TRMN
              </p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 mb-2">Billed to</h3>
              <p className="font-semibold">Techno RO Vendors</p>
              <p>S1234 3rd Floor, Delhi, Noida, India</p>
              <p className="text-sm mt-2 text-gray-600">
                <span className="font-semibold text-green-600">GSTIN:</span> 2TR2025123456Z123
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-blue-600">PAN:</span> TRI2345TRMN
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
                  <th className="px-4 py-2 text-left">Discount%</th>
                  <th className="px-4 py-2 text-left">QTY.</th>
                  <th className="px-4 py-2 text-left">Rate</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                  <th className="px-4 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white text-gray-700">
                {invoiceItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="px-4 py-3">{item.name}</td>
                    <td className="px-4 py-3">{item.hsn}</td>
                    <td className="px-4 py-3">{item.gst}</td>
                    <td className="px-4 py-3">{item.discount}</td>
                    <td className="px-4 py-3">{item.qty}</td>
                    <td className="px-4 py-3">{item.rate}</td>
                    <td className="px-4 py-3">{item.amount}</td>
                    <td className="px-4 py-3 font-semibold">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoicePage;   
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaExclamationTriangle, FaTimes, FaMinus } from "react-icons/fa";
import product4 from "../../../assets/images/product4.png";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../assets/images/Dashboard.svg";
import Alert from "../../../assets/icons/alert.svg";
import * as XLSX from "xlsx";

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(100);

  const products = [
    {
      id: 1,
      name: "Whole house filter with two replacement cartridges",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 2,
      name: "3000 Gallon Replacement Water Filter",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 3,
      name: "Domestic RO Membrane",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 4,
      name: "Water Filter Cartridge Set of 1",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 5,
      name: "Kent complete filter replacement",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 6,
      name: "KENT Gold Spare Kit Gold Pleated Filter",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 7,
      name: "MG678",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 8,
      name: "Kent Grand Plus RO",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 9,
      name: "MG678",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
    {
      id: 10,
      name: "Kent Grand Plus RO",
      category: "Spare Parts",
      price: "₹200",
      quantity: 63,
      image: product4,
    },
  ];

  // Mock low stock items
  const lowStockItems = [
    {
      id: 1,
      name: "Kent complete filter",
      quantity: 20,
      time: "1h ago",
      image: product4,
    },
    {
      id: 2,
      name: "Kent complete filter",
      quantity: 20,
      time: "5h ago",
      image: product4,
    },
    {
      id: 3,
      name: "Kent complete filter",
      quantity: 20,
      time: "11h ago",
      image: product4,
    },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddInventoryClick = (product) => {
    setSelectedProduct(product);
    setQuantity(100);
    setShowAddInventoryModal(true);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddInventory = () => {
    console.log(`Adding ${quantity} units to ${selectedProduct.name}`);
    setShowAddInventoryModal(false);
  };

  const handleExport = () => {
    try {
      console.log("Export button clicked");
      console.log("XLSX library:", XLSX);
      console.log("Filtered products:", filteredProducts);

      // Get the current page data (filtered and limited by entriesPerPage)
      const dataToExport = filteredProducts.slice(0, entriesPerPage).map((product, index) => ({
        "Sr.No.": index + 1,
        "Product Name": product.name,
        "Category": product.category,
        "Price": product.price,
        "Quantity": product.quantity
      }));

      console.log("Data to export:", dataToExport);

      // Create a new workbook
      const wb = XLSX.utils.book_new();

      // Convert data to worksheet
      const ws = XLSX.utils.json_to_sheet(dataToExport);

      // Set column widths for better formatting
      ws['!cols'] = [
        { wch: 10 },  // Sr.No.
        { wch: 50 },  // Product Name
        { wch: 15 },  // Category
        { wch: 12 },  // Price
        { wch: 12 }   // Quantity
      ];

      // Add worksheet to workbook
      XLSX.utils.book_append_sheet(wb, ws, "Inventory");

      // Generate filename with current date
      const date = new Date().toISOString().split('T')[0];
      const filename = `Inventory_${date}.xlsx`;

      console.log("Attempting to save file:", filename);

      // Save file
      XLSX.writeFile(wb, filename);

      console.log("Export completed successfully");
    } catch (error) {
      console.error("Export error:", error);
      alert("Error exporting data: " + error.message);
    }
  };

  return (
    <>
      <motion.div
        className="p-4 bg-white max-w-full mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="text-gray-500 font-medium">
            <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
          </span>

          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span className="text-[#4A90E2] font-medium cursor-pointer">
            Inventory Management
          </span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Inventory Management</h2>
        <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

        <div className="flex items-center justify-between mb-6 gap-4">
          {/* Left: Show Entries */}
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              className="border border-gray-900 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400"
            >
              <option>10</option>
              <option>20</option>
              <option>30</option>
            </select>
            <span className="text-gray-700">Entries</span>
          </div>

          {/* Center: Search */}
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-900 rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Right: Export Button and Warning Icon */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="bg-[#7EC1B1] text-white px-10 py-2 rounded-md font-medium cursor-pointer"
            >
              Export
            </button>

            <button
              onClick={() => setShowLowStockModal(true)}
              className="text-orange-500 transition mx-8"
            >
              <img src={Alert} alt="Alert" className="w-8 h-8" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="w-full text-sm text-left border border-[#CACACA] border-separate border-spacing-0 rounded-md overflow-hidden">
            <thead className="bg-[#F5F5F5] text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Sr.No.</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Image</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product Name</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Category</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Price</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Quantity</th>
                <th className="px-4 py-3 border-b border-[#CACACA] text-center">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filteredProducts.slice(0, entriesPerPage).map((product, index) => (
                <tr key={product.id} className="">
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{index + 1}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-8 h-8 object-contain mx-auto "
                    />
                  </td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 truncate max-w-xs text-center">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{product.category}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{product.price}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{product.quantity}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                    <button
                      onClick={() => handleAddInventoryClick(product)}
                      className="bg-blue-500 text-white p-1.5 transition mx-auto"
                    >
                      <FaPlus size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
          <p>
            Showing 1 to {entriesPerPage} of {products.length} Entries
          </p>
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 px-3 py-1 rounded-md">
              Previous
            </button>
            <button className="border border-[#8DC9BE] text-[#8DC9BE] px-3 py-1 rounded-md">
              1
            </button>
            <button className="border border-gray-300 px-3 py-1 rounded-md">
              2
            </button>
            <button className="border border-gray-300 px-3 py-1 rounded-md">
              3
            </button>
            <button className="border border-gray-300 px-3 py-1 rounded-md">
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Low Stock Alert Modal */}
      <AnimatePresence>
        {showLowStockModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-transparent z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLowStockModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 w-full max-w-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-center gap-3 py-6 border-b border-gray-200 relative">
                <FaExclamationTriangle className="text-red-600 text-3xl" />
                <h2 className="text-2xl font-bold text-red-600">Low Stock Alert</h2>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200 last:border-b-0"
                  >
                    {/* Left: Image and Details */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                    </div>

                    {/* Right: Time and Button */}
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{item.time}</span>
                      <button onClick={() => handleAddInventoryClick(item)} className="bg-[#7AB5AD] text-white px-6 py-2 rounded transition text-sm font-medium">
                        Add Inventory
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Inventory Modal */}
      <AnimatePresence>
        {showAddInventoryModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-transparent z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddInventoryModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 p-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quantity Controls */}
              <div className="flex items-center gap-0 mb-6">
                <button
                  onClick={handleDecrement}
                  className="w-14 h-14 border border-gray-300 rounded-l flex items-center justify-center transition text-gray-600 text-xl"
                >
                  <FaMinus />
                </button>
                <div className="w-24 h-14 border-t border-b border-gray-300 flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#5DBFAF]">{quantity}</span>
                </div>
                <button
                  onClick={handleIncrement}
                  className="w-14 h-14 border border-gray-300 rounded-r flex items-center justify-center transition text-gray-600 text-xl"
                >
                  <FaPlus />
                </button>
              </div>

              {/* Add Inventory Button */}
              <button
                onClick={handleAddInventory}
                className="w-full bg-[#7AB5AD] text-white px-6 py-3 rounded transition font-medium"
              >
                Add Inventory
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InventoryManagement;
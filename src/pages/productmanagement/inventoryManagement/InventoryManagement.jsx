import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaExclamationTriangle, FaMinus } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../assets/images/Dashboard.svg";
import Alert from "../../../assets/icons/alert.svg";
import product4 from "../../../assets/images/product4.png"; 
import * as XLSX from "xlsx";
import { toast } from "react-toastify";
import Loader from "../../../component/loader/Loader";

// --- REDUX IMPORTS ---
import { useDispatch, useSelector } from "react-redux";
import { fetchInventory, updateStock, fetchLowStock, resetInventoryState } from "../../../redux/inventorySlice";

const InventoryManagement = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 1. Get Real Data
  const { products, lowStockList, isLoading, successMessage, error } = useSelector((state) => state.inventory);

  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Modals
  const [showLowStockModal, setShowLowStockModal] = useState(false);
  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false); // Using your var name
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(100); // Default to 100 like your static code

  // 2. Fetch Data
  useEffect(() => {
    dispatch(fetchInventory());
    dispatch(fetchLowStock());
  }, [dispatch]);

  // 3. Handle Messages
  useEffect(() => {
    if (successMessage) {
        toast.success(successMessage);
        dispatch(resetInventoryState());
        setShowAddInventoryModal(false);
    }
    if (error) {
        toast.error(error);
        dispatch(resetInventoryState());
    }
  }, [successMessage, error, dispatch]);

  // 4. Filtering
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter((p) => {
    const term = searchTerm.toLowerCase();
    const name = p.name?.toLowerCase() || "";
    const category = p.category?.toLowerCase() || "";
    return name.includes(term) || category.includes(term);
  });

  // 5. Pagination
  const totalPages = Math.ceil(filteredProducts.length / entriesPerPage);
  const displayedProducts = filteredProducts.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // --- HANDLERS ---
  const handleAddInventoryClick = (product) => {
    setSelectedProduct(product);
    setQuantity(product.stock || 0); // Default start value
    setShowAddInventoryModal(true);
  };

  const handleLowStockClick = () => {
    dispatch(fetchLowStock());
    setShowLowStockModal(true);
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => { if (quantity > 1) setQuantity(prev => prev - 1); };

  const handleAddInventory = () => {
    if (!selectedProduct) return;
    dispatch(updateStock({ id: selectedProduct._id, quantity: quantity }));
  };

  const handleExport = () => {
    try {
      const dataToExport = filteredProducts.map((p, index) => ({
        "Sr.No.": index + 1,
        "Product Name": p.name,
        "Category": p.category,
        "Price": p.price,
        "Quantity": p.stock
      }));
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(dataToExport);
      ws['!cols'] = [{ wch: 10 }, { wch: 50 }, { wch: 15 }, { wch: 12 }, { wch: 12 }];
      XLSX.utils.book_append_sheet(wb, ws, "Inventory");
      XLSX.writeFile(wb, `Inventory_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) { alert("Export error"); }
  };

  return (
    <>
      <motion.div 
        className="p-4 bg-white max-w-full mx-auto" 
        initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{ duration: 0.4 }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="text-gray-500 font-medium">
            <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
          </span>
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
          <span className="text-[#4A90E2] font-medium cursor-pointer">Inventory Management</span>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Inventory Management</h2>
        <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

        {/* Controls */}
        <div className="flex items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">Show</span>
            <select value={entriesPerPage} onChange={(e) => setEntriesPerPage(Number(e.target.value))} className="border border-gray-900 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400">
              {[10, 20, 30].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
            <span className="text-gray-700">Entries</span>
          </div>

          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input type="text" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border border-gray-900 rounded pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:border-gray-400" />
          </div>

          <div className="flex items-center gap-3">
            <button onClick={handleExport} className="bg-[#7EC1B1] text-white px-10 py-2 rounded-md font-medium cursor-pointer hover:bg-[#6da99d]">Export</button>
            <button onClick={handleLowStockClick} className="text-orange-500 transition mx-8 relative">
              <img src={Alert} alt="Alert" className="w-8 h-8" />
              {lowStockList.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{lowStockList.length}</span>}
            </button>
          </div>
        </div>

        {/* Table */}
        {isLoading && products.length === 0 ? (
          <Loader />
        ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="w-full text-sm text-left border border-[#CACACA] border-separate border-spacing-0 rounded-md overflow-hidden">
            <thead className="bg-[#F5F5F5] text-gray-600 font-medium">
              <tr>
                {["Sr.No.", "Image", "Product Name", "Category", "Price", "Quantity", "Action"].map(h => <th key={h} className="px-4 py-3 border-b border-[#CACACA] text-center">{h}</th>)}
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading && products.length === 0 ? <tr><td colSpan="7" className="text-center py-6 text-gray-500">Loading...</td></tr> :
               displayedProducts.map((product, index) => (
                <tr key={product._id} className="">
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                    <img src={product.images?.[0] || product4} alt={product.name} className="w-8 h-8 object-contain mx-auto" onError={(e)=>{e.target.src=product4}}/>
                  </td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 truncate max-w-xs text-center">{product.name}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{product.category}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">₹{product.price}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{product.stock}</td>
                  <td className="px-4 py-3 border-b border-[#CACACA] text-center">
                    <button onClick={() => handleAddInventoryClick(product)} className="bg-blue-500 text-white p-1.5 transition mx-auto rounded hover:bg-blue-600">
                      <FaPlus size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-gray-600 text-sm">
          <p>Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filteredProducts.length)} of {filteredProducts.length} Entries</p>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="border border-gray-300 px-3 py-1 rounded-md disabled:opacity-50 hover:bg-gray-50">Previous</button>
            <button className="border border-[#8DC9BE] text-[#8DC9BE] px-3 py-1 rounded-md">{currentPage}</button>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="border border-gray-300 px-3 py-1 rounded-md disabled:opacity-50 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </motion.div>

      {/* Low Stock Modal */}
      <AnimatePresence>
        {showLowStockModal && (
          <>
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowLowStockModal(false)} />
            <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 w-full max-w-2xl" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}>
              <div className="flex items-center justify-center gap-3 py-6 border-b border-gray-200">
                <FaExclamationTriangle className="text-red-600 text-3xl" />
                <h2 className="text-2xl font-bold text-red-600">Low Stock Alert</h2>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {lowStockList.length === 0 ? <p className="text-center text-gray-500">No items running low.</p> : 
                 lowStockList.map((item) => (
                  <div key={item._id} className="flex items-center justify-between gap-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 border border-gray-300 rounded flex items-center justify-center bg-white p-2">
                        <img src={item.images?.[0] || product4} alt={item.name} className="w-full h-full object-contain" onError={(e)=>{e.target.src=product4}}/>
                      </div>
                      <div><h3 className="font-medium text-gray-800">{item.name}</h3><p className="text-sm text-gray-600">Qty: {item.stock}</p></div>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => { setShowLowStockModal(false); handleAddInventoryClick(item); }} className="bg-[#7AB5AD] text-white px-6 py-2 rounded transition text-sm font-medium hover:bg-[#6aa099]">Add Inventory</button>
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
            <motion.div className="fixed inset-0 bg-black/40 z-40" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setShowAddInventoryModal(false)} />
            <motion.div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl z-50 p-8" initial={{opacity:0, scale:0.9}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.9}}>
              <h3 className="text-center font-bold text-lg mb-6">Add Inventory</h3>
              <p className="text-center text-sm text-gray-500 mb-4">{selectedProduct?.name}</p>
              <div className="flex items-center gap-0 mb-6">
                <button onClick={handleDecrement} className="w-14 h-14 border border-gray-300 rounded-l flex items-center justify-center transition text-gray-600 text-xl hover:bg-gray-50"><FaMinus /></button>
                <div className="w-24 h-14 border-t border-b border-gray-300 flex items-center justify-center"><span className="text-3xl font-bold text-[#5DBFAF]">{quantity}</span></div>
                <button onClick={handleIncrement} className="w-14 h-14 border border-gray-300 rounded-r flex items-center justify-center transition text-gray-600 text-xl hover:bg-gray-50"><FaPlus /></button>
              </div>
              <button onClick={handleAddInventory} disabled={isLoading} className="w-full bg-[#7AB5AD] text-white px-6 py-3 rounded transition font-medium hover:bg-[#6aa099] disabled:opacity-50">
                {isLoading ? "Adding..." : "Add Inventory"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InventoryManagement;
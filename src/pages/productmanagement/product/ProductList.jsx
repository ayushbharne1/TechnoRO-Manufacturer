import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";
import { MdArrowForwardIos } from "react-icons/md";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/productSlice";
import Loader from "../../../component/loader/Loader";

const ProductList = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { products, pagination, isLoading, error } = useSelector((state) => state.product);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  useEffect(() => {
    // trim search to avoid sending blank whitespace
    const s = search?.trim();
    dispatch(getAllProducts({ page, limit, search: s }));
  }, [dispatch, page, limit, search]);

  useEffect(() => {
    setVisibleProducts(products ?? []);
  }, [products]);

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    product: null,
  });

  const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, productName }) => {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black  z-40"
              onClick={onClose}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-96 p-6"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 text-center mb-2">
                Are you sure you want to delete this?
              </p>
              <p className="text-gray-500 text-sm text-center mb-6">
                This action cannot be undone.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="px-8 py-2 border border-gray-300 text-gray-700 rounded-md transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-8 py-2 bg-[#8DC9BE] text-white rounded-md transition font-medium"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  const handleDeleteClick = (product) => {
    setDeleteModal({
      isOpen: true,
      product: product,
    });
  };

  const handleDeleteConfirm = () => {
    if (deleteModal.product) {
      setVisibleProducts(visibleProducts.filter((p) => p.id !== deleteModal.product.id));
    }
    setDeleteModal({ isOpen: false, product: null });
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, product: null });
  };

  return (
    <>
      <motion.div
        className="bg-white p-4 border border-gray-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <span className="text-gray-500 font-medium">
            <img src={Dashboard} onClick={() => navigate("/dashboard")} alt="Dashboard Icon" className="inline w-5 h-5 mr-1" />
          </span>
           
          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />

          <span className="text-gray-900 font-medium cursor-pointer">Product Management</span> 

          <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />

          <span className="text-[#4A90E2] font-medium cursor-pointer">Product List</span>
        </div>


        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Product List</h2>
        <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <span>Show</span>
            <select
              value={limit}
              onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
              className="border rounded-md px-2 py-1 text-gray-700 focus:ring-1 focus:ring-[#8DC9BE]"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>Entries</span>
          </div>
          <div className="relative flex-1 max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded-md px-2 py-1 pl-8 w-64 focus:ring-1 focus:ring-[#8DC9BE] text-gray-700 border-[#263138]"
            />
          </div>

          <div className=" ">
            <button onClick={() => navigate("/add-product")} className="bg-[#7EC1B1] text-white px-4 py-2 rounded-md font-medium cursor-pointer">
              Add Product
            </button>
          </div>
        </div>

        {/* Table Component - Pass onDelete handler */}
        {isLoading ? (
          <Loader />
        ) : (
          <ProductTable products={visibleProducts.length ? visibleProducts : products} onDelete={handleDeleteClick} />
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
          {(() => {
            const start = pagination.total === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1;
            const end = start === 0 ? 0 : start + products.length - 1;
            return (
              <p>
                Showing {start} to {end} of {pagination.total} Entries
              </p>
            );
          })()}
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="border rounded-md px-3 py-1 text-gray-600"
            >
              Previous
            </button>
            {Array.from({ length: pagination.pages || 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`rounded-md px-3 py-1 ${page === i + 1 ? 'bg-[#8DC9BE] text-white' : 'border text-gray-600'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(pagination.pages || 1, p + 1))}
              disabled={page >= (pagination.pages || 1)}
              className="border rounded-md px-3 py-1 text-gray-600"
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        productName={deleteModal.product?.name}
      />
    </>
  );
};

export default ProductList;
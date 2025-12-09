import React from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon, EyeIcon } from "../../../assets/icons/AllIcons";

const ProductTable = ({ products, onDelete }) => {  // Add onDelete prop here
  const navigate = useNavigate();
  
  const handleView = (productId) => navigate(`/product-detail/${productId}`);
  const handleEdit = (productId) => navigate(`/product-edit/${productId}`);

  return (
    <div className="overflow-x-auto border border-gray-200 rounded-md">
      <table className="w-full text-sm text-left border border-[#CACACA] border-separate border-spacing-0 rounded-md overflow-hidden">
        <thead className="bg-[#F5F5F5] text-gray-600 font-medium">
          <tr>
            <th className="px-4 py-3 border-b border-[#CACACA] text-center">Sr.No.</th>
            <th className="px-4 py-3 border-b border-[#CACACA] text-center">Category</th>
            <th className="px-4 py-3 border-b border-[#CACACA] text-center">Product Name</th>
            <th className="px-4 py-3 border-b border-[#CACACA] text-center">Price</th>
            <th className="px-4 py-3 border-b border-[#CACACA] text-center">Warranty</th>
            <th className="px-4 py-3 border-b border-[#CACACA] text-center">Description</th>
            <th className="px-4 py-3 border-b border-[#CACACA] text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item, index) => (
            <tr key={item.id} className="">
              <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{index + 1}</td>
              <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.category}</td>
              <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center truncate max-w-[150px]">
                {item.name}
              </td>
              <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 text-center">{item.price}</td>
              <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700  text-center">{item.warranty}</td>
              <td className="px-4 py-3 border-b border-[#CACACA] text-gray-700 truncate max-w-[200px] text-center">
                {item.description}
              </td>
              <td className="px-2 py-3 border-b border-[#CACACA] flex items-center gap-1 justify-center">
                {/* View Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleView(item.id);
                  }}
                  title="View"
                  className="p-2 rounded-full transition-transform cursor-pointer"
                >
                  <EyeIcon size={18} />
                </button>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(item.id);
                  }}
                  title="Edit"
                  className="p-2 rounded-full transition-transform cursor-pointer"
                >
                  <EditIcon size={18} />
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (typeof onDelete === "function") onDelete(item);
                  }}
                  title="Delete"
                  className="p-2 rounded-full transition-transform transform cursor-pointer"
                >
                  <DeleteIcon size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
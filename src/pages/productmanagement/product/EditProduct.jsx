import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
import product1 from "../../../assets/images/product1.jpg";
import product2 from "../../../assets/images/product2.jpg";
import product3 from "../../../assets/images/product3.jpg";
import Dashboard from "../../../assets/images/Dashboard.svg";

const EditProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([product1, product2, product3]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };
  const initialValues = {
    category: "Spare Parts",
    productName: "KENT ACE Plus- B 8 L RO + UV + UF + Alkaline + Copper + TDS",
    price: "₹ 899.00",
    warranty: "2 Years",
    discount: "10 %",
    description:
      "Lorem ipsum dolor sit amet consectetur. Eros lacus sit posuere netus pharetra suspendisse. Semper augue elit pellentesque aliquam. Malesuada porttitor convallis mauris tempor pretium pellentesque. Facilisi consectetur eleifend vel integer lorem sit. Ornare tempor risus ipsum rhoncus vel rhoncus elit in lectus. Tristique neque mauris nascetur sem eget quam etiam egestas massa. Orci sed diam nunc pellentesque porttitor dui tellus. Est nec cum eros vel. In ultricies accumsan donec tellus. Nunc dui dignissim sem luctus ac congue. Dignissim mauris imperdiet netus porta. Donec ornare faucibus et aliquam rhoncus aenean.",
  };

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    productName: Yup.string().required("Product name is required"),
    price: Yup.string().required("Price is required"),
    warranty: Yup.string().required("Warranty is required"),
    discount: Yup.string().required("Discount is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values) => {
    console.log("Edited Product:", values);
    alert("Product updated successfully!");
  };

  return (
    <motion.div
      className="p-4 bg-white w-full mx-auto"
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
        <span
          onClick={() => navigate("/product-list")}
          className="text-gray-900 font-medium cursor-pointer"
        >
          Product Management
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">
          Edit Products
        </span>
      </div>


      <h2 className="text-2xl font-semibold mb-2">Edit Product</h2>

      <div className="border-b-2 border-gray-400 mb-3"></div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]"
                >
                  <option>Spare Parts</option>
                  <option>RO Machines</option>
                  <option>Accessories</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Product Name
                </label>
                <Field
                  type="text"
                  name="productName"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Price + Warranty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Price
                </label>
                <div className="flex items-center border border-gray-300 rounded-md p-2 bg-[#F5F5F5]">
                  <FaRupeeSign className="text-gray-600 mr-1" />
                  <Field
                    type="text"
                    name="price"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Warranty
                </label>
                <Field
                  type="text"
                  name="warranty"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="warranty"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* Discount */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Discount (%)
              </label>
              <Field
                type="text"
                name="discount"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]"
              />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="6"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Product Images */}
            <label className="block text-gray-700 font-medium mb-3">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              {/* Images Row */}
              <div className="flex gap-4 overflow-x-auto mb-4">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-60 h-32 rounded-md overflow-hidden border border-gray-200"
                  >
                    <img
                      src={img}
                      alt={`Product ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Upload photo box - centered */}
              <label className="flex flex-col items-center justify-center py-8 cursor-pointer transition-all rounded-lg">
                <FaUpload className="text-gray-400 text-3xl mb-2" />
                <p className="text-gray-700 font-medium">Upload photo</p>
                <p className="text-gray-400 text-sm">Upload clear photo of Product</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {/* + Add More Image - centered below */}
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={() => document.querySelector('input[type=file]')?.click()}
                  className="text-[#7EC1B1] text-sm"
                >
                  + Add More Image
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="submit"
                className="bg-[#7EC1B1] text-white text-md px-15 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditProduct;

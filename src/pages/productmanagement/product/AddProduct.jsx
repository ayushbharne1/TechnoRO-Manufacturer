import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdArrowForwardIos } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../../../assets/images/Dashboard.svg";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  const validationSchema = Yup.object({
    category: Yup.string().required("Category is required"),
    productName: Yup.string().required("Product name is required"),
    price: Yup.number().typeError("Must be a number").required("Price is required"),
    warranty: Yup.string().required("Warranty is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    if (images.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }
    const formData = { ...values, images };
    console.log("Submitted Data:", formData);
    toast.success("Product added successfully!");
    resetForm();
    setImages([]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-white w-full mx-auto"
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

        <span className="text-[#4A90E2] font-medium cursor-pointer">Add Product</span>
      </div>


      <h2 className="text-2xl font-semibold mb-2">Add Product</h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      <Formik
        initialValues={{
          category: "",
          productName: "",
          price: "",
          warranty: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Category</label>
                <Field
                  as="select"
                  name="category"
                  className="w-full bg-[#F5F5F5] border border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="">Select Category</option>
                  <option value="Water Purifier">Water Purifier</option>
                  <option value="Spare Parts">Spare Parts</option>
                  <option value="Filters">Filters</option>
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Product Name</label>
                <Field
                  name="productName"
                  placeholder="Enter Product Name"
                  className="w-full border bg-[#F5F5F5] border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Price</label>
                <div className="flex items-center border border-gray-300 bg-[#F5F5F5] p-2">
                  <span className="text-gray-500 mr-2">₹</span>
                  <Field
                    name="price"
                    type="number"
                    placeholder="Enter Price"
                    className="w-full focus:outline-none bg-[#F5F5F5]"
                  />
                </div>
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">Warranty</label>
                <Field
                  name="warranty"
                  placeholder="Enter Warranty"
                  className="w-full border bg-[#F5F5F5] border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="warranty"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">Description</label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                placeholder="Enter Description"
                className="w-full border bg-[#F5F5F5] border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Product Image</h3>
              <div className="flex flex-wrap gap-4 mb-4">
                {images.map((img, index) => (
                  <div key={index} className="relative w-32 h-24 rounded-md overflow-hidden border border-gray-300">
                    <img src={img} alt="Product" className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full shadow"
                    >
                      <FaTrashAlt size={14} />
                    </button>
                  </div>
                ))}
              </div>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer">
                <FaUpload className="text-gray-500 text-2xl mb-2" />
                <p className="text-gray-600 font-medium">Upload photo</p>
                <p className="text-gray-400 text-sm">Upload clear photo of Product</p>
                <input type="file" multiple accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              <div className="flex justify-center mt-2">
                <label className="text-[#7EC1B1] text-md">+ Add More Image</label>
              </div>
            </div>

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

export default AddProduct;
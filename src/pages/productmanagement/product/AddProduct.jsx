import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from 'react-redux';
import { createProduct } from '../../../redux/productSlice';
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdArrowForwardIos } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "../../../assets/images/Dashboard.svg";

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newPreviews]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handleDelete = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  }; 

  const validationSchema = Yup.object({
    brand: Yup.string().required('Brand name is required'),
    category: Yup.string().required('Category is required'),
    productName: Yup.string().required('Product name is required'),
    color: Yup.string().required('Color is required'),
    stock: Yup.number().typeError('Stock quantity is required').required('Stock quantity is required'),
    warrantyPeriod: Yup.number().typeError('Warranty period is required').required('Warranty period is required'),
    price: Yup.number().typeError('Must be a number').required('Price is required'),
    discountPercent: Yup.number().min(0).max(100),
    material: Yup.string().required('Material is required'),
    description: Yup.string().required('Description is required'),
    offers: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm, setErrors }) => {
    if (imageFiles.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    const formData = new FormData();
    formData.append('brand', values.brand);
    formData.append('category', values.category);
    formData.append('name', values.productName);
    formData.append('color', values.color);
    formData.append('stock', values.stock);
    formData.append('warrantyPeriod', values.warrantyPeriod);
    formData.append('price', values.price);
    if (values.discountPercent) formData.append('discountPercent', values.discountPercent);
    formData.append('material', values.material);
    formData.append('description', values.description);
    if (values.offers) {
      values.offers.split(',').map((o) => o.trim()).filter(Boolean).forEach((o) => formData.append('offers', o));
    }
    imageFiles.forEach((file) => formData.append('images', file));

    try {
      const res = await dispatch(createProduct(formData)).unwrap();
      toast.success(res?.message ?? 'Product added successfully!');
      resetForm();
      setImages([]);
      setImageFiles([]);
      navigate('/product-list');
    } catch (err) {
      if (err && typeof err === 'object') {
        if (Array.isArray(err.errors) && err.errors.length) {
          const formErrors = err.errors.reduce((acc, e) => ({ ...acc, [e.field]: e.message }), {});
          setErrors(formErrors);
          toast.error(err.message || 'Validation error');
          return;
        }
        if (err.message) {
          toast.error(err.message);
          return;
        }
      }
      toast.error(err || 'Failed to add product');
    }
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
          brand: '',
          category: "",
          productName: "",
          color: '',
          stock: '',
          warrantyPeriod: '',
          price: "",
          discountPercent: '',
          material: '',
          description: "",
          offers: '',
        }} 
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ resetForm }) => (
          <Form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Brand</label>
                <Field
                  name="brand"
                  placeholder="Enter Brand Name"
                  className="w-full border bg-[#F5F5F5] border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="brand"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

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

              <div className="md:col-span-2">
                <label className="block font-medium text-gray-700 mb-2">Warranty Period (months)</label>
                <Field
                  name="warrantyPeriod"
                  type="number"
                  placeholder="Enter Warranty Period in months"
                  className="w-full border bg-[#F5F5F5] border-gray-300  p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="warrantyPeriod"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Color</label>
                <Field
                  name="color"
                  placeholder="Enter Color"
                  className="w-full border bg-[#F5F5F5] border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">Stock</label>
                <Field
                  name="stock"
                  type="number"
                  placeholder="Enter Stock Quantity"
                  className="w-full border bg-[#F5F5F5] border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block font-medium text-gray-700 mb-2">Discount Percent</label>
                <Field
                  name="discountPercent"
                  type="number"
                  placeholder="Enter Discount Percent"
                  className="w-full border bg-[#F5F5F5] border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage name="discountPercent" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label className="block font-medium text-gray-700 mb-2">Material</label>
                <Field
                  name="material"
                  placeholder="Enter Material"
                  className="w-full border bg-[#F5F5F5] border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage name="material" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-medium text-gray-700 mb-2">Offers (comma separated)</label>
              <Field
                name="offers"
                placeholder="Enter offers, e.g., Free Installation, 2 Year Warranty"
                className="w-full border bg-[#F5F5F5] border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <ErrorMessage name="offers" component="div" className="text-red-500 text-sm mt-1" />
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
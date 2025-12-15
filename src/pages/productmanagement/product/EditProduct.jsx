import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUpload } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductById, updateProduct } from "../../../redux/productSlice";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { MdArrowForwardIos } from "react-icons/md";
import { FaRupeeSign, FaTrash } from "react-icons/fa";
// import product1 from "../../../assets/images/product1.jpg";
// import product2 from "../../../assets/images/product2.jpg";
// import product3 from "../../../assets/images/product3.jpg";
import Dashboard from "../../../assets/images/Dashboard.svg";

const EditProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [existingImgUrls, setExistingImgUrls] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { productDetail } = useSelector((state) => state.product);
  useEffect(() => {
    if (id) dispatch(getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (productDetail) {
      setExistingImgUrls(productDetail.images || []);
      setImages((productDetail.images || []).map((u) => u));
    }
  }, [productDetail]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newPreviews]);
    setImageFiles((prev) => [...prev, ...files]);
  };

  const handleDeleteNewImage = (newIndex) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
    setImages((prev) => prev.filter((_, i) => i !== (existingImgUrls.length + newIndex)));
  };

  const handleRemoveImage = (index) => {
    // index refers to the combined images view: existing URLs first, then new previews
    if (index < existingImgUrls.length) {
      // remove existing
      setExistingImgUrls((prev) => prev.filter((_, i) => i !== index));
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // remove new file
      const newIndex = index - existingImgUrls.length;
      setImageFiles((prev) => prev.filter((_, i) => i !== newIndex));
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  }; 
  const initialValues = {
    brand: productDetail?.brand || '',
    category: productDetail?.category || 'Spare Parts',
    productName: productDetail?.name || '',
    price: productDetail?.price || '',
    warrantyPeriod: productDetail?.warrantyPeriod || '',
    discountPercent: productDetail?.discountPercent || '',
    material: productDetail?.material || '',
    color: productDetail?.color || '',
    stock: productDetail?.stock ?? '',
    description: productDetail?.description || '',
    offers: Array.isArray(productDetail?.offers) ? productDetail.offers.join(', ') : (productDetail?.offers || ''),
    isActive: productDetail?.isActive ?? true,
    isFeatured: productDetail?.isFeatured ?? false,
    existingImgUrls: productDetail?.images || [],
  };

  const validationSchema = Yup.object({
    brand: Yup.string().required('Brand name is required'),
    category: Yup.string().required('Category is required'),
    productName: Yup.string().required('Product name is required'),
    warrantyPeriod: Yup.number().typeError('Warranty period is required').required('Warranty period is required'),
    price: Yup.number().typeError('Must be a number').required('Price is required'),
    description: Yup.string().required('Description is required'),
  });

  const handleSubmit = async (values, { setErrors }) => {
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
      // send offers as array (split comma-separated string)
      const offersArr = values.offers.split(',').map(o => o.trim()).filter(Boolean);
      offersArr.forEach(o => formData.append('offers[]', o));
    }
    // append existing image urls (if any)
    (existingImgUrls || []).forEach((url) => {
      if (url) formData.append('existingImgUrls', url);
    });
    // append new files
    imageFiles.forEach((file) => formData.append('images', file));
    // append booleans as strings
    formData.append('isActive', String(values.isActive));
    formData.append('isFeatured', String(values.isFeatured));

    try {
      const res = await dispatch(updateProduct({ productId: id, productData: formData })).unwrap();
      // success
      toast.success(res?.message ?? 'Product updated successfully!');
      // clear local image state
      setImages([]);
      setImageFiles([]);
      navigate('/product-list');
    } catch (err) {
      if (err && typeof err === 'object') {
        if (Array.isArray(err.errors) && err.errors.length) {
          const formErrors = err.errors.reduce((acc, e) => ({ ...acc, [e.field]: e.message }), {});
          setErrors(formErrors);
          return;
        }
      }
      toast.error(err?.message || 'Failed to update product');
    }
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
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Brand</label>
                <Field type="text" name="brand" className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]" />
                <ErrorMessage name="brand" component="div" className="text-red-500 text-sm mt-1" />
              </div>
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
                    type="number"
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
                  Warranty Period (months)
                </label>
                <Field
                  type="number"
                  name="warrantyPeriod"
                  className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]"
                />
                <ErrorMessage
                  name="warrantyPeriod"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            {/* (discountPercent field provided below) */}

            {/* Color + Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Color</label>
                <Field name="color" className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]" />
                <ErrorMessage name="color" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Stock</label>
                <Field type="number" name="stock" className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]" />
                <ErrorMessage name="stock" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Discount Percent + Material */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Discount Percent</label>
                <Field type="number" name="discountPercent" className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]" />
                <ErrorMessage name="discountPercent" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Material</label>
                <Field name="material" className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]" />
                <ErrorMessage name="material" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>

            {/* Offers */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">Offers (comma separated)</label>
              <Field name="offers" className="w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-200 bg-[#F5F5F5]" />
              <ErrorMessage name="offers" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* IsActive / IsFeatured */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <Field type="checkbox" name="isActive" />
                <span>Is Active</span>
              </label>
              <label className="flex items-center gap-2">
                <Field type="checkbox" name="isFeatured" />
                <span>Is Featured</span>
              </label>
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

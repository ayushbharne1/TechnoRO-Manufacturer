import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

const CreateNewBatch = () => {
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    batchId: Yup.string().required("Batch ID is required"),
    productName: Yup.string().required("Product Name is required"),
    productCode: Yup.string().required("Product Code is required"),
    quantity: Yup.number().required("Quantity is required").positive().integer(),
    productionDate: Yup.date().required("Production Date is required"),
    plantName: Yup.string().required("Plant Name is required"),
    supervisorName: Yup.string().required("Supervisor Name is required"),
    description: Yup.string().required("Description is required"),
  });

  // Handle form submit
  const handleSubmit = (values, { resetForm }) => {
    console.log("Form Submitted:", values);
    toast.success("Batch created successfully!");
    resetForm();
    setPreview(null);
  };

  // Handle image upload
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue("productImage", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div
      className="p-4 bg-white"
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
          onClick={() => navigate("/production-management")}
          className="text-gray-900 font-medium cursor-pointer"
        >
          Product Management
        </span> 
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#4A90E2] font-medium cursor-pointer">
          Create New Batch
        </span>
      </div>

      <h2 className="text-2xl font-semibold mb-2">Create New Batch</h2>
      <div className="border-b-2 border-gray-400 mb-2 mt-4"></div>

      <Formik
        initialValues={{
          productImage: null,
          batchId: "",
          productName: "",
          productCode: "",
          quantity: "",
          productionDate: "",
          plantName: "",
          supervisorName: "",
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-6">
            {/* Product Image */}
            <div>
              <h3 className="font-medium mb-2">Batch Product Image</h3>
              <div className="flex items-center gap-6 border border-gray-300 rounded-lg p-4 w-fit">
                <label className="bg-gray-200 px-4 py-2 rounded cursor-pointer transition text-sm font-medium">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                </label>

                <span className="text-gray-500 text-sm">
                  {preview && preview !== "https://via.placeholder.com/100" ? "File Uploaded" : "No File Uploaded"}
                </span>

                <img
                  src={preview || "https://via.placeholder.com/100"}
                  alt="Product"
                  className="w-24 h-24 object-contain border border-gray-200 rounded"
                />
              </div>
            </div>
            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Batch ID</label>
                <Field
                  name="batchId"
                  placeholder="ROF-2025-01"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="batchId" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <Field
                  as="select"
                  name="productName"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  <option value="">Select Product</option>
                  <option value="RO Filter Cartridge">RO Filter Cartridge</option>
                  <option value="RO Housing Set">RO Housing Set</option>
                </Field>
                <ErrorMessage name="productName" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Product Code / Model</label>
                <Field
                  name="productCode"
                  placeholder="RFC-101"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="productCode" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <Field
                  name="quantity"
                  type="number"
                  placeholder="500"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Production Date</label>
                <Field
                  name="productionDate"
                  type="date"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="productionDate" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Manufactured By / Plant Name
                </label>
                <Field
                  name="plantName"
                  placeholder="Plant A"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="plantName" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Supervisor Name</label>
                <Field
                  name="supervisorName"
                  placeholder="Rahul Sharma"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="supervisorName" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Description / Note</label>
                <Field
                  name="description"
                  as="textarea"
                  rows="3"
                  placeholder="Additional batch details..."
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex justify-between items-center">
              {/* Left - View Batches */}
              <button
                type="button"
                className="bg-[#7AB5AD] text-white px-8 py-2.5 rounded-md transition font-medium"
              >
                View Batches
              </button>

              {/* Center - Reset */}
              <button
                type="button"
                className="bg-[#7AB5AD] text-white px-8 py-2.5 rounded-md transition font-medium"
              >
                Reset
              </button>

              {/* Right - Create Batch */}
              <button
                type="submit"
                className="bg-[#7AB5AD] text-white px-8 py-2.5 rounded-md transition font-medium"
              >
                Create Batch
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default CreateNewBatch;

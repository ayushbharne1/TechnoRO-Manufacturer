import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { MdArrowForwardIos } from "react-icons/md";

const UpdateBatchTracking = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("https://via.placeholder.com/100");

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
    console.log("Form Updated:", values);
    alert("Batch updated successfully!");
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
          onClick={() => navigate("/product-list")}
          className="text-gray-900 font-medium cursor-pointer"
        >
          Product Management
        </span>

        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />

        <span
          onClick={() => navigate("/create-new-batch")}
          className="text-gray-900 font-medium cursor-pointer"
        >
          Create New Batch
        </span>

        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />

        <span className="text-[#4A90E2] font-medium cursor-pointer">
          Update Batch Tracking
        </span>
      </div>


      <h2 className="text-2xl font-semibold mb-2">Update Batch Tracking</h2>
      <hr className="mb-6" />

      <Formik
        initialValues={{
          productImage: null,
          batchId: "ROF-2025-01",
          productName: "RO Filter Cartridge",
          productCode: "RFC-101",
          quantity: "500",
          productionDate: "2025-10-09",
          plantName: "Plant A",
          supervisorName: "Rahul Sharma",
          description: "For Model X filter units",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, resetForm }) => (
          <Form className="space-y-6">
            {/* Product Image */}
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

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Update Batch ID</label>
                <Field
                  name="batchId"
                  placeholder="ROF-2025-01"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="batchId" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Update Product Name</label>
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
                <label className="block text-sm font-medium mb-1">Update Product Code / Model</label>
                <Field
                  name="productCode"
                  placeholder="RFC-101"
                  className="border border-gray-300 w-full rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <ErrorMessage name="productCode" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Change Quantity</label>
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
                onClick={() => navigate("/batch-tracking")}
                className="bg-[#7AB5AD] text-white px-8 py-2.5 rounded-md transition font-medium"
              >
                View Batches
              </button>

              {/* Center - Reset */}
              <button
                type="button"
                onClick={() => resetForm()}
                className="bg-[#7AB5AD] text-white px-8 py-2.5 rounded-md transition font-medium"
              >
                Reset
              </button>

              {/* Right - Update Batch */}
              <button
                type="submit"
                onClick={() => navigate("/production-management")}
                className="bg-[#7AB5AD] text-white px-8 py-2.5 rounded-md transition font-medium"
              >
                Update Batch
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default UpdateBatchTracking;
import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AddLead = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    alternatePhone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    serviceType: "Service",
    serviceCategory: "Service Category",
    productBrand: "",
    productModel: "",
    leadSource: "Select Lead Source",
    priority: "Medium",
    preferredDate: "",
    preferredTime: "",
    assignTo: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm mb-4">
        <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800">
          <FiArrowLeft size={18} />
        </button>
        <span className="text-gray-600">Lead Management</span>
        <span className="text-gray-400">›</span>
        <span className="text-blue-500">Add</span>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Add</h1>

      {/* Form Section */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Add New Lead</h2>
        <button
          onClick={() => navigate("/lead-management")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <FiArrowLeft size={16} />
          Back to Leads
        </button>
      </div>

      {/* Customer Information Form */}
      <form onSubmit={handleSubmit}>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-6">Customer Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder="Enter customer name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
                required
              />
            </div>

            {/* Alternate Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alternate Phone
              </label>
              <input
                type="tel"
                name="alternatePhone"
                value={formData.alternatePhone}
                onChange={handleChange}
                placeholder="Enter alternate phone number"
                maxLength="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-6">Address Information</h3>

          <div className="space-y-6">
            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none resize-none"
              />
            </div>

            {/* City, State, Pincode */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  maxLength="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-6">Service Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service type
              </label>
              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              >
                <option value="Service">Service</option>
                <option value="AMC">AMC</option>
                <option value="Installation">Installation</option>
              </select>
            </div>

            {/* Service Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Category
              </label>
              <select
                name="serviceCategory"
                value={formData.serviceCategory}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              >
                <option value="Service Category">Service Category</option>
                <option value="Repair">Repair</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Installation">Installation</option>
              </select>
            </div>

            {/* Product/Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product/Brand
              </label>
              <input
                type="text"
                name="productBrand"
                value={formData.productBrand}
                onChange={handleChange}
                placeholder="Enter product brand"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              />
            </div>

            {/* Product Model */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Model
              </label>
              <input
                type="text"
                name="productModel"
                value={formData.productModel}
                onChange={handleChange}
                placeholder="Enter product model"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Lead Information */}
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-6">Lead Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lead Source <span className="text-red-500">*</span>
              </label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
                required
              >
                <option value="Select Lead Source">Select Lead Source</option>
                <option value="Website">Website</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Referral">Referral</option>
                <option value="Social Media">Social Media</option>
                <option value="Walk-in">Walk-in</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign To
            </label>
            <input
              type="text"
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              placeholder="Enter engineer/staff name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 rounded-lg mt-6">
          <h3 className="text-lg font-semibold mb-6">Additional Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description / Notes
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter any additional details or requirements"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7EC1B1] focus:border-transparent outline-none resize-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate("/lead-management")}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#7EC1B1] text-white rounded-lg hover:bg-[#6db09f] transition"
          >
            Save Lead
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLead;

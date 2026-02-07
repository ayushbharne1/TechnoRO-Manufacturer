import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerManufacturer,
  sendRegistrationOtp,
  verifyRegistrationOtp,
  clearError,
  clearMessage,
  resetRegistration,
} from '../../redux/Manufacturerregistrationslice';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, message, otpSent, otpVerified, registrationSuccess } = useSelector(
    (state) => state.manufacturerRegistration
  );

  const [formData, setFormData] = useState({
    // Basic Details
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',

    // Business Information
    businessType: '',
    experience: '',
    servicesOffered: [],

    // Address
    officeAddress: '',
    city: '',
    state: '',
    pinCode: '',
    serviceRadius: '',
    serviceCities: '',

    // Verification
    panNumber: '',
    gstNumber: '',
    aadharNumber: '',

    // Bank Details
    accountHolderName: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: '',
  });

  const [files, setFiles] = useState({
    panFile: null,
    gstFile: null,
    aadharFile: null,
  });

  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);

  useEffect(() => {
    return () => {
      dispatch(resetRegistration());
    };
  }, [dispatch]);

  useEffect(() => {
    if (registrationSuccess) {
      alert('Registration successful! Please wait for admin verification.');
      navigate('/auth/login');
    }
  }, [registrationSuccess, navigate]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (message && !error) {
      // Auto-clear success messages after 3 seconds
      const timer = setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, error, dispatch]);

  const serviceOptions = [
    'RO Manufacturing',
    'Spare Parts',
    'RO Installation',
    'RO Repair',
    'RO Maintenance',
    'AMC Services',
  ];

  const businessTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'proprietorship', label: 'Proprietorship' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'pvt_ltd', label: 'Private Limited' },
    { value: 'ltd', label: 'Limited' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      servicesOffered: prev.servicesOffered.includes(service)
        ? prev.servicesOffered.filter((s) => s !== service)
        : [...prev.servicesOffered, service],
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.phone || !formData.email || !formData.password) {
          alert('Please fill all required fields');
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          alert('Passwords do not match');
          return false;
        }
        if (formData.phone.length !== 10) {
          alert('Please enter a valid 10-digit phone number');
          return false;
        }
        return true;

      case 2:
        if (!formData.businessType || !formData.experience) {
          alert('Please fill all required fields');
          return false;
        }
        return true;

      case 3:
        if (!formData.officeAddress || !formData.city || !formData.state || !formData.pinCode) {
          alert('Please fill all required fields');
          return false;
        }
        if (formData.pinCode.length !== 6) {
          alert('Please enter a valid 6-digit pincode');
          return false;
        }
        return true;

      case 4:
        if (!formData.panNumber || !formData.aadharNumber) {
          alert('Please fill all required verification fields');
          return false;
        }
        if (formData.panNumber.length !== 10) {
          alert('Please enter a valid 10-character PAN number');
          return false;
        }
        if (formData.aadharNumber.length !== 12) {
          alert('Please enter a valid 12-digit Aadhar number');
          return false;
        }
        if (!files.panFile || !files.aadharFile) {
          alert('Please upload PAN and Aadhar documents');
          return false;
        }
        return true;

      case 5:
        if (!formData.accountHolderName || !formData.bankName || !formData.accountNumber || !formData.ifscCode) {
          alert('Please fill all required bank details');
          return false;
        }
        if (formData.ifscCode.length !== 11) {
          alert('Please enter a valid 11-character IFSC code');
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSendOtp = async () => {
    if (formData.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    await dispatch(sendRegistrationOtp(formData.phone));
    setShowOtpModal(true);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert('Please enter a valid 6-digit OTP');
      return;
    }
    await dispatch(verifyRegistrationOtp({ phone: formData.phone, otp }));
    setShowOtpModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(5)) return;

    // Create FormData object for file upload
    const submitData = new FormData();

    // Basic fields
    submitData.append('name', formData.name);
    submitData.append('phone', formData.phone);
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    submitData.append('companyName', formData.companyName || formData.name);

    // Business Info
    const businessInfo = {
      businessType: formData.businessType,
      experience: parseInt(formData.experience),
      servicesOffered: formData.servicesOffered,
    };
    submitData.append('businessInfo', JSON.stringify(businessInfo));

    // Address Info
    const addressInfo = {
      officeAddress: formData.officeAddress,
      city: formData.city,
      state: formData.state,
      pinCode: formData.pinCode,
      serviceRadius: parseInt(formData.serviceRadius) || 10,
      serviceCities: formData.serviceCities
        ? formData.serviceCities.split(',').map((city) => city.trim())
        : [formData.city],
    };
    submitData.append('addressInfo', JSON.stringify(addressInfo));

    // Bank Details
    const bankDetails = {
      accountHolderName: formData.accountHolderName,
      accountNumber: formData.accountNumber,
      ifscCode: formData.ifscCode,
      bankName: formData.bankName,
      upiId: formData.upiId || '',
    };
    submitData.append('bankDetails', JSON.stringify(bankDetails));

    // Document Numbers
    submitData.append('panNumber', formData.panNumber);
    submitData.append('aadharNumber', formData.aadharNumber);
    if (formData.gstNumber) {
      submitData.append('gstNumber', formData.gstNumber);
    }

    // Files
    if (files.panFile) submitData.append('panFile', files.panFile);
    if (files.aadharFile) submitData.append('aadharFile', files.aadharFile);
    if (files.gstFile) submitData.append('gstFile', files.gstFile);

    // Dispatch registration action
    await dispatch(registerManufacturer(submitData));
  };

  const steps = ['Basic Details', 'Business Info', 'Address & Service Area', 'Verification', 'Bank Details'];

  return (
    <div className="min-h-screen bg-[#7EC1B1] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Success/Error Messages */}
        {message && !error && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep > index + 1
                        ? 'bg-green-500 text-white'
                        : currentStep === index + 1
                        ? 'bg-[#7EC1B1] text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {currentStep > index + 1 ? <Check size={20} /> : index + 1}
                  </div>
                  <span className="text-xs mt-2 text-center hidden sm:block">{step}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Manufacturer Registration</h2>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Details */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Basic Manufacturer Details</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Manufacturer/Business Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="10-digit mobile number"
                      maxLength="10"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={loading || otpVerified}
                      className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:bg-gray-400 whitespace-nowrap"
                    >
                      {otpVerified ? 'Verified' : 'Send OTP'}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">OTP verification required</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Business Information */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Business Information</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Business Type</option>
                    {businessTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered</label>
                  <div className="space-y-2">
                    {serviceOptions.map((service) => (
                      <label key={service} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.servicesOffered.includes(service)}
                          onChange={() => handleServiceToggle(service)}
                          className="w-4 h-4 text-teal-500 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address & Service Area */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Address & Service Area</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Office Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="officeAddress"
                    value={formData.officeAddress}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    maxLength="6"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Coverage Radius (KM)
                  </label>
                  <select
                    name="serviceRadius"
                    value={formData.serviceRadius}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select Radius</option>
                    <option value="5">5 KM</option>
                    <option value="10">10 KM</option>
                    <option value="20">20 KM</option>
                    <option value="30">30 KM</option>
                    <option value="50">50 KM</option>
                    <option value="100">100 KM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Service Cities (Optional)
                  </label>
                  <input
                    type="text"
                    name="serviceCities"
                    value={formData.serviceCities}
                    onChange={handleInputChange}
                    placeholder="Enter cities separated by commas (e.g., Indore, Ujjain)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">For multi-city service providers</p>
                </div>
              </div>
            )}

            {/* Step 4: Verification */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Identity & Business Verification</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadharNumber"
                    value={formData.aadharNumber}
                    onChange={handleInputChange}
                    maxLength="12"
                    placeholder="12-digit Aadhaar number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    maxLength="10"
                    placeholder="10-character PAN"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">GST Number (Optional)</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    maxLength="15"
                    placeholder="15-character GST number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <h4 className="font-medium text-gray-700 mb-3">Upload Documents</h4>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        Aadhaar Card <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="aadharFile"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        required
                      />
                      {files.aadharFile && (
                        <p className="text-xs text-green-600 mt-1">✓ {files.aadharFile.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        PAN Card <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        name="panFile"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                        required
                      />
                      {files.panFile && <p className="text-xs text-green-600 mt-1">✓ {files.panFile.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">
                        GST Certificate (Optional)
                      </label>
                      <input
                        type="file"
                        name="gstFile"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                      />
                      {files.gstFile && <p className="text-xs text-green-600 mt-1">✓ {files.gstFile.name}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Bank Details */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">Bank & Payment Details</h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Holder Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    maxLength="11"
                    placeholder="11-character IFSC code"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID (Optional)</label>
                  <input
                    type="text"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    placeholder="yourname@upi"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-teal-800">
                    <strong>Note:</strong> All information will be verified before account activation. False
                    information may lead to account rejection or termination.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={loading}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Previous
                </button>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={loading}
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors ml-auto disabled:opacity-50"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-auto disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Submitting...
                    </>
                  ) : (
                    'Submit Registration'
                  )}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white">
          <p className="text-sm">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="font-semibold underline hover:text-teal-100"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Verify OTP</h3>
            <p className="text-gray-600 mb-4">Enter the 6-digit OTP sent to {formData.phone}</p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-teal-500"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowOtpModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//Saumya code
import React, { useEffect, useMemo } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaUniversity } from "react-icons/fa";
import Dashboard from "../../../assets/images/Dashboard.svg";
import { useNavigate } from "react-router-dom";
import { MdArrowForwardIos } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../../redux/profileSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { profile, loading, error } = useSelector((state) => state.profile);
  // const userId = localStorage.getItem("userId");
  const userId = localStorage.getItem("manufacturerId");


  useEffect(() => {
    if (userId) dispatch(getProfile(userId));
  }, [userId, dispatch]);

  const initialValues = useMemo(() => {
    if (!profile)
      return {
        manufacturer: "",
        phone: "",
        email: "",
        address: "",
        aadhaar: "",
        pan: "",
        gstin: "",
        bank: "",
        accountNo: "",
        ifsc: "",
        accountType: "Current",
      };

    return {
      manufacturer: profile.name || "",
      phone: profile.phone || "",
      email: profile.email || "",
      address: profile.address || "",
      aadhaar: profile.aadharNo || "",
      pan: profile.panNo || "",
      gstin: profile.gst || "",
      bank: profile.bankDetails?.bankName || "",
      accountNo: profile.bankDetails?.accountNumber || "",
      ifsc: profile.bankDetails?.ifscCode || "",
      accountType: "Current",
    };
  }, [profile]);

  const validationSchema = Yup.object({
    manufacturer: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    address: Yup.string().required("Required"),
    aadhaar: Yup.string().required("Required"),
    pan: Yup.string().required("Required"),
    gstin: Yup.string().required("Required"),
    bank: Yup.string().required("Required"),
    accountNo: Yup.string().required("Required"),
    ifsc: Yup.string().required("Required"),
  });

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm font-medium text-gray-500 mb-4">
        <img
          src={Dashboard}
          alt="Dashboard"
          className="inline w-5 h-5 mr-1 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span
          onClick={() => navigate("/profile")}
          className="text-[#263138] cursor-pointer"
        >
          Profile
        </span>
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#007AFF] font-semibold">Edit Profile</span>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6 border-[#A5A5A5]">
        Edit Profile
      </h2>

      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          const payload = {
            name: values.manufacturer,
            phone: values.phone,
            email: values.email,
            address: values.address,
            aadharNo: values.aadhaar,
            panNo: values.pan,
            gst: values.gstin,
            bankDetails: {
              bankName: values.bank,
              accountNumber: values.accountNo,
              ifscCode: values.ifsc,
            },
          };

          dispatch(updateProfile(payload))
            .unwrap()
            .then(() => {
              alert("Profile updated successfully!");
              navigate("/profile"); // Optionally redirect after update
            })
            .catch((err) => {
              alert(err || "Failed to update profile");
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-6">
            {/* 2 Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Manufacturer */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Manufacturer Name
                </label>
                <Field
                  name="manufacturer"
                  className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                />
                {errors.manufacturer && touched.manufacturer && (
                  <div className="text-red-500 text-sm">{errors.manufacturer}</div>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Phone No.</label>
                <Field
                  name="phone"
                  className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                />
                {errors.phone && touched.phone && (
                  <div className="text-red-500 text-sm">{errors.phone}</div>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Email</label>
                <Field
                  name="email"
                  className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm">{errors.email}</div>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Address</label>
                <Field
                  name="address"
                  className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                />
                {errors.address && touched.address && (
                  <div className="text-red-500 text-sm">{errors.address}</div>
                )}
              </div>

              {/* Aadhaar */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">Aadhaar No.</label>
                <Field
                  name="aadhaar"
                  className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                />
                {errors.aadhaar && touched.aadhaar && (
                  <div className="text-red-500 text-sm">{errors.aadhaar}</div>
                )}
              </div>

              {/* PAN */}
              <div>
                <label className="block text-gray-700 mb-1 font-medium">PAN No.</label>
                <Field
                  name="pan"
                  className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                />
                {errors.pan && touched.pan && (
                  <div className="text-red-500 text-sm">{errors.pan}</div>
                )}
              </div>

              {/* GST */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-1 font-medium">GSTIN</label>
                <Field
                  name="gstin"
                  className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                />
                {errors.gstin && touched.gstin && (
                  <div className="text-red-500 text-sm">{errors.gstin}</div>
                )}
              </div>
            </div>

            {/* Bank Section */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <FaUniversity className="text-teal-500 text-lg" />
                <h3 className="text-lg font-semibold text-gray-800">Bank Details</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bank Name */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Select Bank</label>
                  <Field
                    as="select"
                    name="bank"
                    className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                  >
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>Axis Bank</option>
                    <option>SBI</option>
                  </Field>
                  {errors.bank && touched.bank && (
                    <div className="text-red-500 text-sm">{errors.bank}</div>
                  )}
                </div>

                {/* Account Number */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Account No.</label>
                  <Field
                    name="accountNo"
                    className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                  />
                  {errors.accountNo && touched.accountNo && (
                    <div className="text-red-500 text-sm">{errors.accountNo}</div>
                  )}
                </div>

                {/* IFSC */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">IFSC</label>
                  <Field
                    name="ifsc"
                    className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                  />
                  {errors.ifsc && touched.ifsc && (
                    <div className="text-red-500 text-sm">{errors.ifsc}</div>
                  )}
                </div>

                {/* Account Type */}
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">Select Account Type</label>
                  <Field
                    as="select"
                    name="accountType"
                    className="w-full border rounded-sd p-2.5 bg-[#F5F5F5]"
                  >
                    <option>Current</option>
                    <option>Savings</option>
                  </Field>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-teal-500 text-white px-6 py-2 rounded-md"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
              <button
                type="reset"
                className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>

            {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfile;







// Sir

// import React from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import { FaUniversity } from "react-icons/fa";
// import Dashboard from "../../../assets/images/Dashboard.svg";
// import { useNavigate } from "react-router-dom";

// import { MdArrowForwardIos } from "react-icons/md";

// const EditProfile = () => {
//   const navigate = useNavigate();
//   const initialValues = {
//     manufacturer: "KENT PVT. LTD.",
//     phone: "9876543210",
//     email: "example@kent.com",
//     address: "4140 Parker Rd. Allentown, New Mexico 31134",
//     aadhaar: "1234 4567 8901",
//     pan: "XXXXX1234X",
//     gstin: "36479564585",
//     bank: "HDFC Bank",
//     accountNo: "32345678910",
//     ifsc: "HDFC0001234",
//     accountType: "Current",
//   };

//   const validationSchema = Yup.object({
//     manufacturer: Yup.string().required("Required"),
//     phone: Yup.string().required("Required"),
//     email: Yup.string().email("Invalid email").required("Required"),
//     address: Yup.string().required("Required"),
//     aadhaar: Yup.string().required("Required"),
//     pan: Yup.string().required("Required"),
//     gstin: Yup.string().required("Required"),
//     bank: Yup.string().required("Required"),
//     accountNo: Yup.string().required("Required"),
//     ifsc: Yup.string().required("Required"),
//     accountType: Yup.string().required("Required"),
//   });

//   const handleSubmit = (values) => {
//     console.log("Submitted:", values);
//     alert("Profile updated successfully!");
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md w-full  mx-auto">
//       {/* Breadcrumb */}
//       <div className="flex items-center text-sm font-medium text-gray-500 mb-4">
//         <img
//           src={Dashboard}
//           alt="Dashboard Icon"
//           className="inline w-5 h-5 mr-1 cursor-pointer"
//           onClick={() => navigate("/dashboard")}
//         />

//         {/* Arrow */}

//         <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />

//         {/* Profile */}
//         <span
//           onClick={() => navigate("/profile")}
//           className="text-[#263138] cursor-pointer"
//         >
//           Profile
//         </span>

//         {/* Arrow */}
//         <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />

//         {/* Edit Profile */}
//         <span className="text-[#007AFF] font-semibold ">
//           Edit Profile
//         </span>
//       </div>

//       {/* Title */}
//       <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-6 border-[#A5A5A5] font-[Poppins]">
//         Edit Profile
//       </h2>

//       <Formik
//         initialValues={initialValues}
//         validationSchema={validationSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ errors, touched }) => (
//           <Form className="space-y-6">
//             {/* 2 Column Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-gray-700 mb-1 font-medium">
//                   Manufacturer Name
//                 </label>
//                 <Field
//                   name="manufacturer"
//                   className="w-full border text-[#606060] rounded-sd p-2.5 focus:ring-2 focus:ring-teal-400 outline-none bg-[#F5F5F5] border-[#606060]"
//                 />
//                 {errors.manufacturer && touched.manufacturer && (
//                   <div className="text-red-500 text-sm mt-1">
//                     {errors.manufacturer}
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1 font-medium">
//                   Phone No.
//                 </label>
//                 <Field
//                   name="phone"
//                   className="w-full border text-[#606060] rounded-sd p-2.5 focus:ring-2 focus:ring-teal-400 outline-none bg-[#F5F5F5] border-[#606060]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1 font-medium">
//                   Email
//                 </label>
//                 <Field
//                   name="email"
//                   className="w-full border text-[#606060] rounded-sd p-2.5 focus:ring-2 focus:ring-teal-400 outline-none bg-[#F5F5F5] border-[#606060]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1 font-medium">
//                   Address
//                 </label>
//                 <Field
//                   name="address"
//                   className="w-full border text-[#606060] rounded-sd p-2.5 focus:ring-2 focus:ring-teal-400 outline-none bg-[#F5F5F5] border-[#606060]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1 font-medium">
//                   Aadhaar No.
//                 </label>
//                 <Field
//                   name="aadhaar"
//                   className="w-full border text-[#606060] rounded-sd p-2.5 focus:ring-2 focus:ring-teal-400 outline-none bg-[#F5F5F5] border-[#606060]"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700 mb-1 font-medium">
//                   PAN No.
//                 </label>
//                 <Field
//                   name="pan"
//                   className="w-full border text-[#606060] rounded-sd p-2.5 focus:ring-2 focus:ring-teal-400 outline-none bg-[#F5F5F5] border-[#606060]"
//                 />
//               </div>

//               <div className="md:col-span-2">
//                 <label className="block text-gray-700 mb-1 font-medium">
//                   GSTIN
//                 </label>
//                 <Field
//                   name="gstin"
//                   className="w-full border text-[#606060] rounded-sd p-2.5 focus:ring-2 focus:ring-teal-400 outline-none bg-[#F5F5F5] border-[#606060]"
//                 />
//               </div>
//             </div>

//             {/* Bank Section */}
//             <div className="mt-8">
//               <div className="flex items-center gap-2 mb-3">
//                 <FaUniversity className="text-teal-500 text-lg" />
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Bank Details
//                 </h3>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 mb-1 font-medium">
//                     Select Bank
//                   </label>
//                   <Field
//                     as="select"
//                     name="bank"
//                     className="w-full border text-[#606060] rounded-sd p-2.5 bg-[#F5F5F5] focus:ring-2 focus:ring-teal-400 outline-none border-[#606060]"
//                   >
//                     <option>HDFC Bank</option>
//                     <option>ICICI Bank</option>
//                     <option>Axis Bank</option>
//                     <option>SBI</option>
//                   </Field>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1 font-medium">
//                     Account No.
//                   </label>
//                   <Field
//                     name="accountNo"
//                     className="w-full border rounded-sd p-2.5 bg-[#F5F5F5] focus:ring-2 focus:ring-teal-400 outline-none border-[#606060]"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1 font-medium">
//                     IFSC
//                   </label>
//                   <Field
//                     name="ifsc"
//                     className="w-full border rounded-sd p-2.5 bg-[#F5F5F5] focus:ring-2 focus:ring-teal-400 outline-none border-[#606060]"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1 font-medium">
//                     Select Account Type
//                   </label>
//                   <Field
//                     as="select"
//                     name="accountType"
//                     className="w-full border rounded-sd p-2.5 bg-[#F5F5F5] focus:ring-2 focus:ring-teal-400 outline-none border-[#606060]"
//                   >
//                     <option>Current</option>
//                     <option>Savings</option>
//                   </Field>
//                 </div>
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-center gap-4 mt-8">
//               <button
//                 type="submit"
//                 className="bg-teal-500 text-white px-6 py-2 rounded-md transition"
//               >
//                 Update
//               </button>
//               <button
//                 type="reset"
//                 className="border border-gray-400 text-gray-700 px-6 py-2 rounded-md transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default EditProfile;

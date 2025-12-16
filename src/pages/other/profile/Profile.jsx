//  saumya 
import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdCard,
  FaUniversity,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../../redux/profileSlice";

import kentLogo from "../../../assets/images/kent2.png";
import roadmap from "../../../assets/images/roadmap.png";
import { MdArrowForwardIos } from "react-icons/md";
import Dashboard from "../../../assets/images/Dashboard.svg";
import ChangePasswordModal from "../../../component/overlay/ChangePasswordModal";
import ChangeSuccessModal from "../../../component/overlay/ChangeSuccessModal";



const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.profile);

  const [showChangeModal, setShowChangeModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // GET ID from localStorage
 const phone = localStorage.getItem("phone");

  //CALL API on load
  
useEffect(() => {
  if (phone) {
    dispatch(getProfile(phone));
  }
}, [dispatch, phone]);



  const handlePasswordChange = () => {
    setShowChangeModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full mx-auto">

      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <img
          src={Dashboard}
          alt="Dashboard Icon"
          className="inline w-5 h-5 mr-1 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        />
        <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
        <span className="text-[#007AFF] font-medium">Profile</span>
      </div>

      {/* Header */}
      <div className="border-b-2 pb-3 mb-4 border-gray-400">
        <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
      </div>

      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <img
            src={kentLogo}
            alt="Logo"
            className="w-22 h-22 rounded-full object-cover border border-gray-200"
          />
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              {profile?.name || "Manufacturer Name"}
            </h3>
          </div>
        </div>

        <button
          onClick={() => navigate("/edit-profile")}
          className="px-5 py-2 text-sm border border-teal-500 text-teal-500 rounded-md"
        >
          Edit Profile
        </button>
      </div>

      {/* Address + Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT SIDE */}
        <div>
          <div className="flex items-center gap-2 text-gray-700 mb-2">
            <FaMapMarkerAlt className="text-teal-500" />
            <h4 className="font-medium">Address</h4>
          </div>
          <p className="text-[#7EC1B1] mb-4">
            {profile?.address || "--"}
          </p>

          <img src={roadmap} alt="Map" className="w-full h-100 object-cover" />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-5 text-gray-700 p-2">

          {/* Phone */}
          <div>
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-teal-500 opacity-60" />
              <span className="font-medium text-[#263138]">Phone No.</span>
            </div>
            <p className="text-[#7EC1B1]">{profile?.phone || "--"}</p>
          </div>

          {/* Email */}
          <div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-teal-500" />
              <span className="font-medium text-[#263138]">Email</span>
            </div>
            <p className="text-[#7EC1B1]">{profile?.email || "--"}</p>
          </div>

          {/* Aadhaar */}
          <div>
            <div className="flex items-center gap-2">
              <FaIdCard className="text-teal-500" />
              <span className="font-medium text-[#263138]">Aadhaar No</span>
            </div>
            <p className="text-[#7EC1B1]">{profile?.aadharNo || "--"}</p>
          </div>

          {/* PAN */}
          <div>
            <div className="flex items-center gap-2">
              <FaIdCard className="text-teal-500" />
              <span className="font-medium text-[#263138]">PAN No.</span>
            </div>
            <p className="text-[#7EC1B1]">{profile?.panNo || "--"}</p>
          </div>

          {/* GST */}
          <div>
            <div className="flex items-center gap-2">
              <FaIdCard className="text-teal-500" />
              <span className="font-medium text-[#263138]">GSTIN</span>
            </div>
            <p className="text-[#7EC1B1]">{profile?.gst || "--"}</p>
          </div>

          {/* BANK DETAILS */}
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <FaUniversity className="text-teal-500" />
              <span className="font-medium text-[#263138]">Bank Details</span>
            </div>

            <div className="mt-1 space-y-1 w-full">
              <div className="flex justify-between text-[14px]">
                <span className="text-[#606060] font-medium">Bank Name :</span>
                <span className="text-[#7EC1B1]">
                  {profile?.bankDetails?.bankName || "--"}
                </span>
              </div>

              <div className="flex justify-between text-[14px]">
                <span className="text-[#606060] font-medium">Account No :</span>
                <span className="text-[#7EC1B1]">
                  {profile?.bankDetails?.accountNumber || "--"}
                </span>
              </div>

              <div className="flex justify-between text-[14px]">
                <span className="text-[#606060] font-medium">IFSC :</span>
                <span className="text-[#7EC1B1]">
                  {profile?.bankDetails?.ifscCode || "--"}
                </span>
              </div>

              <div className="flex justify-between text-[14px]">
                <span className="text-[#606060] font-medium">Account Holder :</span>
                <span className="text-[#7EC1B1]">
                  {profile?.bankDetails?.accountHolderName || "--"}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Change Password Button */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => setShowChangeModal(true)}
          className="bg-[#7EC1B1] text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
        >
          Change Password
        </button>

        {showChangeModal && (
          <ChangePasswordModal
            onClose={() => setShowChangeModal(false)}
            onSuccess={handlePasswordChange}
          />
        )}

        {showSuccessModal && (
          <ChangeSuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
      </div>
    </div>
  );
};

export default Profile;

// import React, { useState } from "react";
// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaIdCard,
//   FaUniversity,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import kentLogo from "../../../assets/images/kent2.png";
// import roadmap from "../../../assets/images/roadmap.png";

// import { MdArrowForwardIos } from "react-icons/md";
// import Dashboard from "../../../assets/images/Dashboard.svg";
// import ChangePasswordModal from "../../../component/overlay/ChangePasswordModal";
// import ChangeSuccessModal from "../../../component/overlay/ChangeSuccessModal";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [showChangeModal, setShowChangeModal] = useState(false);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const handlePasswordChange = () => {
//     setShowChangeModal(false);
//     setShowSuccessModal(true);
//   };

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md w-full  mx-auto">
//       {/* ✅ Breadcrumb */}
//       <div className="flex items-center text-sm text-gray-500 mb-6">
//         <img
//           src={Dashboard}
//           alt="Dashboard Icon"
//           className="inline w-5 h-5 mr-1 cursor-pointer"
//           onClick={() => navigate("/dashboard")}

//         />

//         <MdArrowForwardIos className="text-gray-400 w-5 h-8 mx-1" />
//         <span className="text-[#007AFF] font-medium ">
//           Profile
//         </span>
//       </div>

//       {/* Header */}
//       <div className="border-b-2 pb-3 mb-4 border-gray-400">
//         <h2 className="text-xl font-semibold text-gray-800 ">
//           Profile
//         </h2>
//       </div>

//       {/* Top Section */}
//       <div className="flex justify-between items-start">
//         <div className="flex items-center gap-4">
//           <img
//             src={kentLogo}
//             alt="Logo"
//             className="w-22 h-22 rounded-full object-cover border border-gray-200"
//           />
//           <div>
//             <h3 className="text-2xl font-semibold text-gray-800">
//               KENT PVT. LTD.
//             </h3>
//           </div>
//         </div>

//         <button
//           onClick={() => navigate("/edit-profile")}
//           className="px-5 py-2 text-sm border border-teal-500 text-teal-500 rounded-md transition cursor-pointer"
//         >
//           Edit Profile
//         </button>
//       </div>

//       {/* Address + Details Section */}
//       <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Left Side */}
//         <div>
//           <div className="flex items-center gap-2 text-gray-700 mb-2">
//             <FaMapMarkerAlt className="text-teal-500" />
//             <h4 className="font-medium">Address</h4>
//           </div>
//           <p className="text-[#7EC1B1] mb-4">
//             4140 Parker Rd. Allentown, New Mexico 31134
//           </p>
//           <img
//             src={roadmap}
//             alt="Map"
//             className="w-full h-100  object-cover "
//           />
//         </div>

//         {/* Right Side */}
//         <div className="space-y-5 text-gray-700 p-2">
//           <div>
//             <div className="flex items-center gap-2">
//               <FaPhoneAlt className="text-teal-500 opacity-60" />
//               <span className="font-medium text-[#263138]">Phone No.</span>
//             </div>
//             <p className="text-[#7EC1B1] ">+91 98765 43210</p>
//           </div>

//           <div>
//             <div className="flex items-center gap-2">
//               <FaEnvelope className="text-teal-500" />
//               <span className="font-medium text-[#263138]">Email</span>
//             </div>
//             <p className="text-[#7EC1B1] ">example@kent.com</p>
//           </div>

//           <div>
//             <div className="flex items-center gap-2">
//               <FaIdCard className="text-teal-500" />
//               <span className="font-medium text-[#263138]">Aadhaar No</span>
//             </div>
//             <p className="text-[#7EC1B1] ">1234 4567 8901</p>
//           </div>

//           <div>
//             <div className="flex items-center gap-2">
//               <FaIdCard className="text-teal-500" />
//               <span className="font-medium text-[#263138]">PAN No.</span>
//             </div>
//             <p className="text-[#7EC1B1] ">XXXXX1234X</p>
//           </div>

//           <div>
//             <div className="flex items-center gap-2">
//               <FaIdCard className="text-teal-500" />
//               <span className="font-medium text-[#263138]">GSTIN</span>
//             </div>
//             <p className="text-[#7EC1B1] ">36479564585</p>
//           </div>

//           {/* Bank Details */}
//           <div className="mt-4">
//             <div className="flex items-center gap-2">
//               <FaUniversity className="text-teal-500" />
//               <span className="font-medium text-[#263138]">Bank Details</span>
//             </div>

//             <div className=" mt-1 space-y-1 w-full">
//               <div className="flex justify-between text-[14px]">
//                 <span className="text-[#606060] font-medium">Bank Name :</span>
//                 <span className="text-[#7EC1B1]">HDFC Bank</span>
//               </div>

//               <div className="flex justify-between text-[14px]">
//                 <span className="text-[#606060] font-medium">Account No :</span>
//                 <span className="text-[#7EC1B1]">32345678910</span>
//               </div>

//               <div className="flex justify-between text-[14px]">
//                 <span className="text-[#606060] font-medium">IFSC :</span>
//                 <span className="text-[#7EC1B1]">HDFC0001234</span>
//               </div>

//               <div className="flex justify-between text-[14px]">
//                 <span className="text-[#606060] font-medium">
//                   Account Type :
//                 </span>
//                 <span className="text-[#7EC1B1]">Current</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Button */}
//       <div className="mt-8 flex justify-center">
//         <button
//           onClick={() => setShowChangeModal(true)}
//           className="bg-[#7EC1B1] text-white px-6 py-2 rounded-md hover:bg-teal-600 transition"
//         >
//           Change Password
//         </button>

//         {/* Change Password Modal */}
//         {showChangeModal && (
//           <ChangePasswordModal
//             onClose={() => setShowChangeModal(false)}
//             onSuccess={handlePasswordChange}
//           />
//         )}

//         {/* Success Modal */}
//         {showSuccessModal && (
//           <ChangeSuccessModal onClose={() => setShowSuccessModal(false)} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;









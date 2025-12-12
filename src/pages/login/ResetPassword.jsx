import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // <--- Redux added
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetImage from "../../assets/images/resetpassword.png";

// Import Redux Action
import { resetPassword, clearMessage } from "../../redux/authSlice";

const ResetSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // 1. Get Phone from previous page
  const phone = location.state?.phone || location.state?.mobile;

  // 2. Get Redux State
  const { isLoading, error, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  // 3. Watch for Success
  useEffect(() => {
    if (message === "Password updated successfully" || message === "Password Reset Successful!") {
      toast.success("Password Changed! Please Login.");
      setTimeout(() => navigate("/"), 2000); // Redirect to Login
    }
  }, [message, navigate]);

  const handleSubmit = (values) => {
    if (!phone) {
      toast.error("Error: Phone number missing. Please start again.");
      return;
    }
    // 4. Dispatch Real Action
    dispatch(resetPassword({ 
        phone: phone, 
        newPassword: values.newPassword 
    }));
  };

  return (
    <div className="min-h-screen bg-[#8DC9BE] flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-5xl">
        {/* LEFT SIDE */}
        <div className="hidden md:flex md:w-1/2 bg-[#8DC9BE] items-center justify-center p-6">
          <img
            src={ResetImage}
            alt="Reset Password Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center p-10 shadow-xl bg-white rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Create a new password for <span className="font-bold text-[#8DC9BE]">{phone}</span>
          </p>

          {/* Show Server Error */}
          {error && (
             <div className="mb-4 text-red-600 bg-red-100 p-3 rounded text-sm w-full text-center">
               {typeof error === 'string' ? error : 'Failed to reset password'}
             </div>
          )}

          <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={ResetSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col items-center space-y-5 w-full">
                
                {/* New Password */}
                <div className="w-full">
                  <Field
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    className={`w-full border-2 rounded-lg py-3 px-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8DC9BE] ${
                      errors.newPassword && touched.newPassword
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Confirm Password */}
                <div className="w-full">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={`w-full border-2 rounded-lg py-3 px-4 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8DC9BE] ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-400"
                        : "border-gray-300"
                    }`}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-[#8DC9BE] text-white px-10 py-2 rounded-lg font-medium transition w-full ${
                    isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#7ab3a8]"
                  }`}
                >
                  {isLoading ? "Processing..." : "Done"}
                </button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default ResetPassword;
import React, { useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // <--- ADDED
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Import Redux Actions
import { verifyOtp, clearMessage } from "../../redux/authSlice"; // <--- ADDED
import OtpImage from "../../assets/images/verifyOtp.png";

// Validation schema for 6 digits
const OtpSchema = Yup.object().shape({
  otp1: Yup.string().required(""),
  otp2: Yup.string().required(""),
  otp3: Yup.string().required(""),
  otp4: Yup.string().required(""),
  otp5: Yup.string().required(""), // Added
  otp6: Yup.string().required(""), // Added
});

const VerifyOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  // 1. Get Phone Number from previous page
  // Note: We use optional chaining ?. just in case state is empty
  const phone = location.state?.phone || location.state?.mobile;

  const { isLoading, error, message } = useSelector((state) => state.auth);

  // 2. Clear messages on load
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  // 3. Watch for Success -> Navigate to Reset Password
  useEffect(() => {
    if (message === "OTP Verified!") {
      toast.success("OTP Verified Successfully!");
      setTimeout(() => {
        // Pass phone to the next page so we know who to reset
        navigate("/resetpassword", { state: { phone: phone } });
      }, 1000);
    }
  }, [message, navigate, phone]);

  const handleSubmit = (values) => {
    const otpString = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}`;

    if (!phone) {
      toast.error("Error: Phone number missing. Please start again.");
      return;
    }

    dispatch(verifyOtp({ 
        phone: phone, 
        otp: otpString 
    }));
  };

  const handleInputChange = (e, index, setFieldValue) => {
    const value = e.target.value;
    if (value && /^[0-9]$/.test(value)) {
      setFieldValue(`otp${index + 1}`, value);
      if (index < 5) {
        const nextInput = document.querySelector(`input[name="otp${index + 2}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (e, index, setFieldValue) => {
    if (e.key === "Backspace") {
      const currentValue = e.target.value;
      if (currentValue) {
        setFieldValue(`otp${index + 1}`, "");
        e.preventDefault();
      } else if (index > 0) {
        const prevInput = document.querySelector(`input[name="otp${index}"]`);
        if (prevInput) {
          setFieldValue(`otp${index}`, "");
          prevInput.focus();
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#8DC9BE] flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row rounded-2xl overflow-hidden w-full max-w-5xl">
        {/* LEFT SIDE IMAGE */}
        <div className="hidden md:flex md:w-1/2 bg-[#8DC9BE] items-center justify-center p-6">
          <img
            src={OtpImage}
            alt="Verify OTP Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* RIGHT SIDE FORM */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex flex-col justify-center items-center shadow-xl p-10 bg-white rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verify OTP
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Enter the 6-digit code sent to <span className="font-bold text-[#8DC9BE]">{phone}</span>
          </p>

          {/* Show Error Message if API Fails */}
          {error && (
            <div className="mb-4 text-red-600 bg-red-100 p-3 rounded text-sm text-center w-full">
              {error}
            </div>
          )}

          <Formik
            initialValues={{ otp1: "", otp2: "", otp3: "", otp4: "", otp5: "", otp6: "" }}
            validationSchema={OtpSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="flex flex-col items-center space-y-6 w-full">
                <div className="flex justify-center gap-2 sm:gap-3">
                  {["otp1", "otp2", "otp3", "otp4", "otp5", "otp6"].map((name, index) => (
                    <div key={index}>
                      <Field
                        name={name}
                        maxLength="1"
                        onChange={(e) => handleInputChange(e, index, setFieldValue)}
                        onKeyDown={(e) => handleKeyDown(e, index, setFieldValue)}
                        className={`w-10 h-12 sm:w-12 sm:h-12 text-center border-2 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#8DC9BE] ${
                          errors[name] && touched[name]
                            ? "border-red-400"
                            : "border-gray-300"
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`bg-[#8DC9BE] text-white px-10 py-2 rounded-lg font-medium transition w-full md:w-auto ${
                    isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#7ab3a8]"
                  }`}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyOtp;
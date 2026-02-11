import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { sendOtp, clearMessage } from "../../redux/authSlice";
import forgotpassword from "../../assets/images/forgot-password.png";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showOtpBanner, setShowOtpBanner] = useState(false);

  const { isLoading, error, message, otp } = useSelector((state) => state.auth);

  // 2. Clear old messages on load
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  useEffect(() => {
    if (message === "OTP Sent Successfully!" && otp) {
      setShowOtpBanner(true);
      toast.success(
        <div>
          <p className="font-semibold">OTP Sent Successfully!</p>
          <p className="text-lg font-bold mt-1">Your OTP: {otp}</p>
        </div>,
        { autoClose: 5000 }
      );
      setTimeout(() => {
        navigate("/verifyOtp", { state: { phone: formik.values.phone } });
      }, 5000);
    }
  }, [message, otp, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      phone: "", 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // 4. Dispatch the Send OTP action
      dispatch(sendOtp(values.phone));
    },
  });

  return (
    <div className="min-h-screen bg-[#90d4c0] flex items-center justify-center p-6">
      {/* Left illustration area */}
      <div className="absolute left-1/4 transform -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block w-[400px] h-[300px]">
        <div className="relative w-full h-full">
          <img
            src={forgotpassword}
            alt="Forgot Password Illustration"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 max-h-[110%] object-contain mt-12"
          />
        </div>
      </div>

      {/* Right form container */}
      <div className="relative bg-white p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md md:ml-[300px]">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Forgot Password?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Please enter your registered mobile number to continue.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Mobile Number:
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              maxLength="10"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-transparent bg-gray-100"
              placeholder="Enter 10-digit number"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.phone}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-[#82D9BC] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#6ec2a6]"
            }`}
          >
            {isLoading ? "Sending..." : "Get OTP"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Remember Password?{" "}
          <a href="/" className="text-[#64B5F6]">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
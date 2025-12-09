// src/ForgotPasswordForm.jsx
import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import forgotpassword from "../../assets/images/forgot-password.png";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "esteban_schiller@gmail.com", 
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
     

      console.log("Forgot password request for:", values.email);
      setTimeout(() => {
        navigate("/verifyOtp"); 
      }, 1000);
    },
  });

  return (
    <div className="min-h-screen bg-[#90d4c0] flex items-center justify-center p-6 ">
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
          Forgot Password ?
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Please enter your registered email to continue.
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Email address:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="shadow-sm appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-teal-200 focus:border-transparent bg-gray-100"
              placeholder="your.email@example.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-xs mt-1">
                {formik.errors.email}
              </div>
            ) : null}
          </div>

          <button
            type="submit"
            className="w-full bg-[#82D9BC] text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
          >
            Get OTP
          </button>
        </form>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Remember Password?{" "}
          <a href="/login" className="text-[#64B5F6]">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

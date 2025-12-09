import React from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import amico from "../../assets/images/amico.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "esteban_schiller@gmail.com",
    password: "12345678",
    remember: false,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

 const handleSubmit = (values, { resetForm }) => {
    
    if (
      values.email === "esteban_schiller@gmail.com" &&
      values.password === "12345678"
    ) {
      

      toast.success("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000); 
    } else {
      toast.error("Invalid email or password!");
    }
    resetForm();
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#88c4b9]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className=" rounded-2xl  flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden"
      >
        {/* Left Side Image */}
        <div className="hidden md:flex items-center justify-center w-1/2 bg-[#88c4b9]">
          <img
            src={amico}
            alt="Login Illustration"
            className="w-[80%] h-auto"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white  rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Manufacturer Portal
          </h2>
          <p className="text-gray-500 mb-6">
            Please enter your registered email and password to continue.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-gray-600 mb-1">
                    Email address:
                  </label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
                    <FaEnvelope className="text-gray-400 mr-2" />
                    <Field
                      type="email"
                      name="email"
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="esteban_schiller@gmail.com"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-gray-600 mb-1">Password</label>
                  <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50">
                    <FaLock className="text-gray-400 mr-2" />
                    <Field
                      type="password"
                      name="password"
                      className="w-full bg-transparent focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex justify-end text-sm mt-1">
                    <a
                      href="/forgotpassword"
                      className="text-blue-500 text-sm"
                    >
                      Forget Password?
                    </a>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500 mt-1"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center space-x-2">
                  <Field
                    type="checkbox"
                    name="remember"
                    className="accent-[#88c4b9]"
                  />
                  <label className="text-gray-600 text-sm">Remember Me</label>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#88c4b9] text-white py-2.5 rounded-md font-medium transition"
                >
                  Sign In
                </motion.button>
              </Form>
            )}
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

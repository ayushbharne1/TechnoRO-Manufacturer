import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaPhone, FaLock } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearMessage } from "../../redux/authSlice";

// Assets
import amico from "../../assets/images/amico.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, token } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  // Clear old redux messages on load
  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  // Show error toast
  useEffect(() => {
    if (error) {
      toast.error(typeof error === "string" ? error : "Login Failed");
      dispatch(clearMessage());
    }
  }, [error, dispatch]);

  // Formik initial values
  const initialValues = {
    phone: "",
    password: "",
    remember: false,
  };

  // Yup validation
  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
      .required("Phone number is required"),
    password: Yup.string().required("Password is required"),
  });

  // Submit handler
  const handleSubmit = (values) => {
    dispatch(
      loginUser({
        phone: values.phone,
        password: values.password,
      })
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#88c4b9]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl flex flex-col md:flex-row w-[90%] max-w-4xl overflow-hidden"
      >
        {/* Left Image */}
        <div className="hidden md:flex items-center justify-center w-1/2 bg-[#88c4b9]">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            src={amico}
            alt="Login Illustration"
            className="w-[80%]"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 bg-white rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to Manufacturer Portal
          </h2>
          <p className="text-gray-500 mb-6">
            Please enter your registered mobile number and password to continue.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-5">
              {/* Phone */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Phone Number
                </label>
                <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#88c4b9]">
                  <FaPhone className="text-gray-400 mr-2 rotate-90" />
                  <Field
                    type="tel"
                    name="phone"
                    maxLength="10"
                    placeholder="Enter 10-digit number"
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Password
                </label>
                <div className="flex items-center border rounded-md px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-[#88c4b9]">
                  <FaLock className="text-gray-400 mr-2" />
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="w-full bg-transparent focus:outline-none"
                  />
                </div>
                <div className="flex justify-end text-sm mt-1">
                  <Link
                    to="/forgot-password"
                    className="text-blue-500 hover:underline"
                  >
                    Forget Password?
                  </Link>
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
                  className="accent-[#88c4b9] w-4 h-4"
                />
                <label className="text-gray-600 text-sm">
                  Remember Me
                </label>
              </div>

              {/* Register */}
              <div className="text-sm">
                <Link to="/register">
                  Don’t have an account?
                  <span className="text-blue-500 hover:underline ml-1">
                    Register
                  </span>
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-2.5 rounded-md text-white font-medium ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#88c4b9]"
                }`}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </motion.button>
            </Form>
          </Formik>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

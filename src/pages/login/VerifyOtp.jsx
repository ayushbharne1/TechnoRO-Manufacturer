import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpImage from "../../assets/images/verifyOtp.png";
//  Validation schema
const OtpSchema = Yup.object().shape({
  otp1: Yup.string().required("Required"),
  otp2: Yup.string().required("Required"),
  otp3: Yup.string().required("Required"),
  otp4: Yup.string().required("Required"),
});

const VerifyOtp = () => {
  const navigate = useNavigate();
  const handleSubmit = (values, { resetForm }) => {
    const otp = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}`;
    if (otp === "1234") {
      toast.success("OTP Verified Successfully!");
      resetForm();
      navigate("/resetpassword");
    } else {
      toast.error("Invalid OTP. Please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-[#8DC9BE] flex items-center justify-center p-6">
      <div className="flex flex-col md:flex-row  rounded-2xl overflow-hidden  w-full max-w-5xl">
        {/* LEFT SIDE IMAGE */}
        <div className="md:w-1/2 bg-[#8DC9BE] flex items-center justify-center p-6">
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
          className="md:w-1/2 flex flex-col justify-center items-center shadow-xl p-10 bg-white rounded-2xl"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Verify OTP
          </h2>
          <p className="text-gray-500 mb-6 text-center">
            Please enter new password.
          </p>

          <Formik
            initialValues={{ otp1: "", otp2: "", otp3: "", otp4: "" }}
            validationSchema={OtpSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col items-center space-y-6 w-full">
                <div className="flex space-x-3">
                  {["otp1", "otp2", "otp3", "otp4"].map((name, index) => (
                    <div key={index}>
                      <Field
                        name={name}
                        maxLength="1"
                        className={`w-12 h-12 text-center border-2 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-[#8DC9BE] ${
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
                  className="bg-[#8DC9BE] text-white px-10 py-2 rounded-lg font-medium transition"
                >
                  Verify
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

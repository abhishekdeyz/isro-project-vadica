import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import { forgotPasswordApi } from "../../apiServices/authApiServices";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const initialValues = { email: "" };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await forgotPasswordApi(values);
      toast.success(res?.message || "Reset link sent!");
      resetForm();
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div
        className="absolute inset-0 min-h-screen h-full"
        style={{
          backgroundImage: "url('/bg2.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>{" "}
      <div className="bg-surface z-1 shadow-2xl rounded-lg p-8 md:p-10 max-w-xl w-full space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-primary mb-1">
            Recover Your Account
          </h1>
          <p className="text-sm text-muted">
            Enter your email to reset your password
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-muted" />
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your Auth email"
                  className="pl-10 pr-4 py-2 w-full border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 rounded-md text-white transition hover:cursor-pointer ${
                  isSubmitting
                    ? "bg-primary/50 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover "
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotPassword;

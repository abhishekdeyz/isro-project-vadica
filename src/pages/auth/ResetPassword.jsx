import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FiLock } from "react-icons/fi";
import { resetPasswordApi } from "../../apiServices/authApiServices";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm your password"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const res = await resetPasswordApi(token, values?.password);
      toast.success(res?.message || "Password reset successful");
      resetForm();
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center ">
      <div
        className="absolute inset-0 "
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
            Reset Your Password
          </h1>
          <p className="text-sm text-muted">
            Enter a new password to secure your account
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
                <FiLock className="absolute left-3 top-3 text-muted" />
                <Field
                  type="password"
                  name="password"
                  placeholder="New password"
                  className="pl-10 pr-4 py-2 w-full border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-muted" />
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="pl-10 pr-4 py-2 w-full border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-2 text-white rounded-md transition hover:cursor-pointer ${
                  isSubmitting
                    ? "bg-primary/60 cursor-not-allowed"
                    : "bg-primary hover:bg-primary-hover"
                }`}
              >
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;

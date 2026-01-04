import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiLock } from "react-icons/fi";
import { toast } from "react-toastify";
import { changePasswordApi } from "../../apiServices/authApiServices";
import { useSelector } from "react-redux";

const ChangePassword = ({ onClose }) => {
  const { token } = useSelector((state) => state.auth);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .min(6, "New password must be at least 6 characters")
      .required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm your new password"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const payload = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      };
      const res = await changePasswordApi(payload, token);
      toast.success(res?.message || "Password changed successfully");
      resetForm();
      if (onClose) onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Change Password
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Old Password */}
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="password"
                  name="oldPassword"
                  placeholder="Current password"
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
                <ErrorMessage
                  name="oldPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* New Password */}
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="password"
                  name="newPassword"
                  placeholder="New password"
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Confirm New Password */}
              <div className="relative">
                <FiLock className="absolute left-3 top-3 text-gray-400" />
                <Field
                  type="password"
                  name="confirmNewPassword"
                  placeholder="Confirm new password"
                  className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-400"
                />
                <ErrorMessage
                  name="confirmNewPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary text-white py-2 rounded-md transition hover:scale-105 ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-primary-hover"
                }`}
              >
                {isSubmitting ? "Updating..." : "Change Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;

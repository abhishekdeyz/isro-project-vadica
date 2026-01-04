// EditProfileForm.jsx
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import httpService from "../apiServices/httpService";
import axios from "axios";

const EditProfileForm = ({ userData, token, userId, onSuccess }) => {
  const editableFields = [
    "first_name",
    "last_name",
    "phone",
    "address",
    "pin_code",
    "state",
    "city",
    "district",
    "designation",
  ];

  const formik = useFormik({
    initialValues: editableFields.reduce((acc, field) => {
      acc[field] = userData[field] || "";
      return acc;
    }, {}),

    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Must be 10 digits")
        .required("Phone is required"),
      address: Yup.string().required("Address is required"),
      pin_code: Yup.string()
        .matches(/^\d{6}$/, "PIN must be 6 digits")
        .required("PIN code is required"),
      state: Yup.string().required("State is required"),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      try {
        await httpService.put(`/auth/user/update/${userId}`, values, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Profile updated successfully!");
        onSuccess();
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to update profile"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Auto-fetch city, district, and state when pin_code is 6 digits
  useEffect(() => {
    const fetchLocationData = async () => {
      const pin = formik.values.pin_code;
      if (pin.length === 6) {
        try {
          const res = await axios.get(
            `${
              import.meta.env.VITE_PIN_CODE_API
            }/getLocationByPincode.php?pincode=${pin}`
          );

          if (res.data?.status) {
            const { state, district, city } = res.data.data;
            formik.setFieldValue("state", state);
            formik.setFieldValue("district", district);
            formik.setFieldValue("city", city);
          }
        } catch (error) {
          console.error("Failed to fetch location data:", error);
        }
      }
    };

    fetchLocationData();
  }, [formik.values.pin_code]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
        Edit Profile
      </h2>
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {editableFields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
              {field.replace("_", " ")}
            </label>
            <input
              type="text"
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              readOnly={["state", "district", "city"].includes(field)}
              className={`w-full px-3 py-2 border ${
                formik.touched[field] && formik.errors[field]
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors[field]}
              </p>
            )}
          </div>
        ))}

        <div className="col-span-full">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-primary hover:cursor-pointer hover:scale-105 text-white py-2 rounded "
          >
            {formik.isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;

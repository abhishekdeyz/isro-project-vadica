import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
  FaIdCard,
  FaEdit,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import httpService from "../../apiServices/httpService";
import EditProfileForm from "../../forms/EditProfileForm";
import ChangePassword from "./ChangePassword";
import { FiLock } from "react-icons/fi";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";

const UserProfilePage = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

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
    "avatar",
  ];

  const fetchUserData = async () => {
    try {
      const res = await httpService.get(`/auth/user/me/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data.user;
      setUserData(data);

      const filledFields = editableFields.filter((field) => !!data[field]);
      const percent = (filledFields.length / editableFields.length) * 100;
      setProfileCompletion(percent);
    } catch (error) {
      toast.error("Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user?.id) fetchUserData();
  }, [token, user?.id]);

  const AvatarSchema = Yup.object().shape({
    avatar: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "File too large (max 1MB)",
        (value) => value && value.size <= 1024 * 1024
      )
      .test("fileType", "Unsupported file format", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          : false
      ),
  });

  if (loading) return <Loader />;
  if (!userData) return <p className="text-center">No user data found.</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 shadow-xl rounded-xl bg-white">
      {/* Main Profile Section */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-start gap-8">
        {/* Left Section */}
        <div className="md:w-2/3 space-y-3">
          <div className="mb-4">
            <img src="./ay_logo.png" alt="ayush-logo" className="w-42 mb-2" />
            <p className="text-sm text-gray-500">
              Empowering Digital Knowledge
            </p>
          </div>

          <h2 className="text-3xl font-bold text-primary mb-1">
            {userData.first_name} {userData.last_name}
          </h2>

          <p className="text-sm text-gray-500 mt-2">
            Role: <span className="font-medium">{userData.role}</span> | Status:{" "}
            <span
              className={userData.is_active ? "text-green-600" : "text-red-500"}
            >
              {userData.is_active ? "Active" : "Inactive"}
            </span>{" "}
            | Verified:{" "}
            {userData.is_verified ? (
              <FaCheckCircle className="inline text-green-500 ml-1" />
            ) : (
              <span className="text-yellow-500">Pending</span>
            )}
          </p>

          <div className="text-sm text-gray-700 mt-0 space-y-1">
            {userData.designation && (
              <p className="flex items-center">
                <FaIdCard className="mr-2 text-gray-500" />
                {userData.designation}
              </p>
            )}

            <p className="flex items-center">
              <FaEnvelope className="mr-2 text-gray-500" />
              {userData.email}
            </p>

            {userData.phone && (
              <p className="flex items-center">
                <FaPhoneAlt className="mr-2 text-gray-500" />
                {userData.phone}
              </p>
            )}

            {(userData.address ||
              userData.city ||
              userData.district ||
              userData.state ||
              userData.pin_code) && (
              <p className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-gray-500" />
                {[
                  userData.address,
                  userData.city,
                  userData.district,
                  userData.state,
                  userData.pin_code,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-primary text-white rounded hover:scale-105 transition-transform"
            >
              <FaEdit className="mr-2" />
              Edit Profile
            </button>

            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-secondary text-white rounded hover:scale-105 transition-transform"
            >
              <FiLock className="mr-2" />
              Change Password
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center md:w-1/3">
          <img
            src={
              userData.avatar
                ? `${import.meta.env.VITE_BASE_URL}/images/auth/${
                    userData.avatar
                  }`
                : "/dummy_profile.png"
            }
            alt="Avatar"
            className="w-56 h-56 rounded-full object-cover border-2 border-gray-300"
          />
          <button
            onClick={() => setIsEditingAvatar(true)}
            className="mt-4 px-3 py-1 text-xs font-medium border rounded border-gray-700 hover:bg-gray-100 transition-colors"
          >
            Edit Avatar
          </button>

          <div className="mt-4 w-11/12">
            <p className="text-xs text-gray-500 mb-1">Profile Completion</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-width"
                style={{ width: `${Math.round(profileCompletion)}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-primary">
              {Math.round(profileCompletion)}%
            </span>
          </div>
        </div>
      </div>

      {/* Avatar Modal */}
      <Modal isOpen={isEditingAvatar} onClose={() => setIsEditingAvatar(false)}>
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Edit Avatar
          </h2>

          <Formik
            initialValues={{ avatar: null }}
            validationSchema={AvatarSchema}
            onSubmit={(values, { setSubmitting }) => {
              const formData = new FormData();
              formData.append("avatar", values.avatar);

              httpService
                .patch(`/auth/user/upload-avatar/${user.id}`, formData, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                  toast.success("Avatar updated successfully!");
                  fetchUserData();
                  setIsEditingAvatar(false);
                })
                .catch((err) => {
                  toast.error(
                    err?.response?.data?.message || "Avatar update failed"
                  );
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {({ setFieldValue, values, errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setFieldValue("avatar", e.currentTarget.files[0]);
                    setPreviewUrl(
                      URL.createObjectURL(e.currentTarget.files[0])
                    );
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
                {errors.avatar && touched.avatar && (
                  <div className="text-red-500 text-sm">{errors.avatar}</div>
                )}
                {previewUrl && (
                  <div>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full border"
                    />
                  </div>
                )}
                <p className="text-xs text-gray-500">
                  File size must be below 1 MB
                </p>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-2 rounded hover:scale-105 transition-transform disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Uploading..." : "Upload Avatar"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <EditProfileForm
          userData={userData}
          token={token}
          userId={user.id}
          onSuccess={() => {
            setIsEditing(false);
            fetchUserData();
          }}
        />
      </Modal>

      {/* Change Password Modal */}
      <Modal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      >
        <ChangePassword onClose={() => setIsChangePasswordOpen(false)} />
      </Modal>
    </div>
  );
};

export default UserProfilePage;

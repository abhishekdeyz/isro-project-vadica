import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { signupApi } from "../../apiServices/authApiServices";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaMapPin,
  FaGlobe,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  authStart,
  authSuccess,
  authFailure,
} from "../../redux/slices/authSlice";

const inputFields = [
  { name: "first_name", icon: <FaUser />, label: "First Name" },
  { name: "last_name", icon: <FaUser />, label: "Last Name" },
  { name: "email", icon: <FaEnvelope />, label: "Email", type: "email" },
  { name: "phone", icon: <FaPhone />, label: "Phone" },
  { name: "address", icon: <FaHome />, label: "Address" },
  { name: "pin_code", icon: <FaMapPin />, label: "PIN Code" },
  { name: "city", icon: <FaHome />, label: "City" },
  { name: "district", icon: <FaHome />, label: "District" },
  { name: "state", icon: <FaGlobe />, label: "State" },
];

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/${user.role}${user.role === "user" ? `/${user.id}` : ""}`);
    }
  }, [user, isAuthenticated, navigate]);

  const handleRegistration = async (values, setSubmitting) => {
    dispatch(authStart());
    try {
      const response = await signupApi(values);
      if (response?.success) {
        toast.success("Registration successful! Please verify your email.");
        navigate("/registration-success");
      }
    } catch (error) {
      dispatch(
        authFailure(error?.response?.data?.message || "Registration failed")
      );
      toast.error("Registration failed. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      state: "",
      pin_code: "",
      city: "",
      district: "",
    },
    validationSchema: Yup.object({
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^\d{10}$/, "Phone must be 10 digits")
        .required("Phone is required"),
      address: Yup.string().required("Address is required"),
      pin_code: Yup.string()
        .matches(/^\d{6}$/, "PIN code must be 6 digits")
        .required("PIN code is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      await handleRegistration(values, setSubmitting);
    },
  });

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

  const handleLoginSuccess = async (response) => {
    try {
      dispatch(authStart());
      const { credential } = response;
      const decodedGoogleUser = jwtDecode(credential);
      const email = decodedGoogleUser.email;

      if (email) {
        const loginInfo = await signupApi({ token: credential });

        if (loginInfo?.success && loginInfo.token) {
          const decoded = jwtDecode(loginInfo.token);
          dispatch(authSuccess({ user: decoded, token: loginInfo.token }));
          toast.success("Login successful!");
          navigate(
            `/${decoded.role}${decoded.role === "user" ? `/${decoded.id}` : ""}`
          );
        } else if (loginInfo?.success) {
          toast.success("Registration successful! Please verify your email.");
          navigate("/registration-success");
        }
      }
    } catch (error) {
      dispatch(
        authFailure(error?.response?.data?.message || "Google login failed")
      );
      const errorMessage = error?.response?.data?.message;
      if (errorMessage === "Your account is deactivated.") {
        toast.error(
          "Your account is under verification. Please wait up to 24 hours.",
          { autoClose: 5000 }
        );
      } else {
        toast.error("Something went wrong during Google login.");
      }
      console.error(error);
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Google login error", error);
    toast.error("Google login failed.");
  };

  return (
    <div className="  flex justify-center items-center ">
      <div
        className=" min-h-screen h-full"
        style={{
          backgroundImage: "url('/bg2.avif')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="bg-surface z-1 shadow-2xl rounded-lg p-8 md:px-12 max-w-4xl w-full space-y-6 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center text-primary">
          Register
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map(({ name, icon, type, label }) => (
              <div className="relative" key={name}>
                <span className="absolute top-2.5 left-3 text-muted">
                  {icon}
                </span>
                <input
                  type={type || "text"}
                  name={name}
                  placeholder={label}
                  // readOnly={["city", "district", "state"].includes(name)}
                  className={`pl-10 w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 ${
                    formik.touched[name] && formik.errors[name]
                      ? "border-red-500 focus:ring-red-500"
                      : "border-border focus:ring-primary"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values[name]}
                />
                {formik.touched[name] && formik.errors[name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors[name]}
                  </p>
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full text-white py-2 rounded bg-primary hover:bg-primary-hover transition"
          >
            {formik.isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <div className="w-1/2 max-w-xs sm:max-w-sm md:max-w-md">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                shape="pill"
                text="signup_with"
              />
            </div>
          </GoogleOAuthProvider>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-primary hover:text-primary-hover transition-transform hover:scale-105"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

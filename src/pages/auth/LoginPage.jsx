import React, { useEffect } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useFormik } from "formik";
import { loginApi } from "../../apiServices/authApiServices.js";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  authStart,
  authSuccess,
  authFailure,
} from "../../redux/slices/authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/");
    }
  }, [user, isAuthenticated, navigate]);

  const handleLoginSuccess = async (response) => {
    try {
      dispatch(authStart());
      const { credential } = response;
      const decodedGoogleUser = jwtDecode(credential);
      const email = decodedGoogleUser.email;

      if (email) {
        const loginInfo = await loginApi({ googleToken: credential });
        if (loginInfo?.success && loginInfo?.token) {
          const decoded = jwtDecode(loginInfo.token);
          dispatch(authSuccess({ user: decoded, token: loginInfo.token }));
          toast.success("Login successful!");
          navigate("/");
        } else if (loginInfo?.success) {
          toast.success("Registration successful! Please verify your email.");
          navigate("/registration-success");
        }
      }
    } catch (error) {
      dispatch(authFailure(error?.response?.data?.message || "Login failed"));
      const errorMessage = error?.response?.data?.message;

      if (errorMessage === "Your account is deactivated.") {
        toast.error(
          "Your account is under verification. Kindly be patient and allow up to 24 hours for activation. Thank you!",
          { autoClose: 5000 }
        );
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const handleLoginFailure = (error) => {
    console.error("Login Failed:", error);
    toast.error("Login failed. Please try again.");
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        dispatch(authStart());
        const loginInfo = await loginApi(values);
        if (loginInfo?.success && loginInfo?.token) {
          const decoded = jwtDecode(loginInfo.token);
          dispatch(authSuccess({ user: decoded, token: loginInfo.token }));
          toast.success("Login successful!");
          navigate("/");
        } else if (loginInfo?.success) {
          toast.success("Registration successful! Please verify your email.");
          navigate("/registration-success");
        }
      } catch (error) {
        dispatch(authFailure(error?.response?.data?.message || "Login failed"));
        const errorMessage = error?.response?.data?.message;
        if (errorMessage === "Your account is deactivated.") {
          toast.error(
            "Your account is under verification. Kindly be patient and allow up to 24 hours for activation. Thank you!",
            { autoClose: 5000 }
          );
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      }
    },
  });

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
      ></div>
      <div className="bg-surface z-1 shadow-2xl rounded-lg p-8 md:p-12 max-w-xl w-full space-y-6 animate-fade-in">
        <h2 className="text-3xl font-extrabold text-center ">Login</h2>

        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="pl-10 w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 border-border focus:ring-primary"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <span className="absolute top-2.5 left-3 text-muted">
              <FaEnvelope />
            </span>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="pl-10 w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 border-border focus:ring-primary"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <span className="absolute top-2.5 left-3 text-muted">
              <FaLock />
            </span>
          </div>

          <button
            type="submit"
            className="w-full text-white py-2 rounded bg-primary hover:bg-primary-hover transition "
          >
            Login
          </button>
        </form>

        <div className="text-center">
          <Link className="text-sm  hover:underline" to="/forget-password">
            Forgotten password?
          </Link>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-border" />
          <span className="px-4 text-muted text-sm">OR</span>
          <div className="flex-grow h-px bg-border" />
        </div>

        <div className="flex w-full flex-col items-center justify-center">
          <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
            <div className="w-1/2  max-w-xs sm:max-w-sm md:max-w-md">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                shape="pill"
                text="signin_with"
                width="100%"
              />
            </div>
          </GoogleOAuthProvider>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-muted">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-accent font-semibold hover:text-accent-hover transition-transform hover:scale-105"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

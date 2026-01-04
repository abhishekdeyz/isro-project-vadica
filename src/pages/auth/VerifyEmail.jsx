import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { verifyToken } from "../../apiServices/authApiServices";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      if (token) {
        try {
          const response = await verifyToken(token);
          if (response?.success) {
            setStatus("success");
            setTimeout(() => {
              navigate("/login");
            }, 7000);
          } else {
            setStatus("error");
          }
        } catch (error) {
          console.error("Verification error:", error);
          setStatus("error");
        }
      } else {
        setStatus("error");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div
      style={{
        backgroundImage: "url('/bg2.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className=""
    >
      <div className="flex items-center min-h-screen justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-xl text-center">
          {status === "loading" && (
            <div className="flex flex-col bg-white justify-center items-center w-96 h-80">
              <p className="text-blue-600 text-xl font-semibold animate-pulse">
                Verifying...
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center">
              <AiOutlineCheckCircle className="text-primary text-6xl mb-4 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-800">
                Email Verified!
              </h2>
              <p className="text-gray-600 mt-2">
                Your email has been successfully verified.
              </p>
              <p className="text-gray-600 mt-1">
                A confirmation email with further instructions has been sent to
                your registered email address.
              </p>
              <p className="text-gray-600 mt-1">
                You will be redirected shortly. Please wait...
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center">
              <AiOutlineCloseCircle className="text-red-500 text-6xl mb-4 mx-auto" />
              <h2 className="text-2xl font-bold text-gray-800">
                Verification Unsuccessful
              </h2>
              <p className="text-gray-600 mt-2">
                The verification link you used is either invalid or has expired.
              </p>
              <p className="text-gray-600 mt-1">
                Please request a new verification email or reach out to our
                support team for assistance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;


import { AiOutlineCheckCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const RegistrationSuccess = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/bg2.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
          <AiOutlineCheckCircle className="text-primary text-6xl mx-auto mb-4" />

          <h1 className="text-2xl font-bold text-primary mb-2">
            Registered Successfully!
          </h1>

          <p className="text-gray-700">
            We've sent a verification email to your inbox.
          </p>

          <p className="text-gray-600 mt-2 text-sm">
            Please check your email and click on the verification link to
            confirm your identity.
          </p>

          <Link
            to="https://mail.google.com"
            className="inline-block mt-6 hover:cursor-pointer bg-primary text-white px-6 py-2 rounded hover:scale-105 transition"
          >
            Check your email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;

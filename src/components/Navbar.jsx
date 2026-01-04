import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <nav
        className={`w-full sticky top-0 z-50 h-16 px-6 flex justify-between items-center transition-colors duration-300
        ${
          scrolled
            ? "bg-primary/70 backdrop-blur-md shadow-lg"
            : "bg-primary/30 backdrop-blur-md shadow-md"
        }`}
      >
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold text-primary-1">
          Vadica AI
        </Link>

        {/* Center: Menu Links */}
        <div className="hidden md:flex gap-6  font-medium">
          <Link to="/features" className="hover:text-muted transition">
            Features
          </Link>
          <Link to="/mission" className="hover:text-muted transition">
            Mission
          </Link>
          <Link to="/contact" className="hover:text-muted transition">
            Contact
          </Link>
          <Link to="/about" className="hover:text-muted transition">
            About
          </Link>
        </div>

        {/* Right: Auth/Profile */}
        {isAuthenticated || user ? (
          <div className="relative group">
            <div className="flex items-center justify-center text-2xl bg-primary hover:scale-105 text-white font-semibold shadow-lg w-12 h-12 rounded-full cursor-pointer">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div className="absolute right-0 w-36 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-200 z-50">
              <Link
                to={`/user-profile/${user.id}`}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUser />
                <span>Profile</span>
              </Link>
              <div
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-primary transition duration-200"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 hover:text-primary transition duration-200"
            >
              Register
            </Link>
          </div>
        )}
      </nav>

      {/* Bottom Navigation or Footer Link */}
      <div className="w-full text-center py-3 bg-primary/20 shadow-inner">
        <Link to="/vadica" className="text-sm text-primary-1 hover:underline">
          Explore Vadica
        </Link>
      </div>
    </>
  );
};

export default Navbar;

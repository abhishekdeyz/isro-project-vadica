import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBook,
  FaClipboardList,
  FaSignOutAlt,
  FaTags,
  FaUsers,
  FaBars,
  FaUserPlus,
} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Sidebar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { categories, loading } = useSelector((state) => state.category);
  const location = useLocation();
  const dispatch = useDispatch();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [clickedDropdown, setClickedDropdown] = useState(null);
  const linkRefs = useRef({});

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleMouseEnter = (name) => {
    if (!clickedDropdown) setHoveredDropdown(name);
  };

  const handleMouseLeave = () => {
    if (!clickedDropdown) setHoveredDropdown(null);
  };

  const handleClick = (name) => {
    setHoveredDropdown(null);
    setClickedDropdown((prev) => (prev === name ? null : name));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sidebar-menu-item")) {
        setClickedDropdown(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      dispatch(logout());
      toast.success("You have been logged out.");
    }
  };

  const baseMenuItems = [];

  const adminMenuItems = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin/dashboard",
    },
    {
      name: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
  ];

  const menuItems =
    isAuthenticated && user?.role === "admin"
      ? [...baseMenuItems, ...adminMenuItems]
      : baseMenuItems;

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <div
      className={`min-h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-sidebar_bg text-nav_link transition-[width] duration-500 z-50`}
    >
      <div
        className={`fixed ${
          isCollapsed ? "w-20" : "w-64"
        } flex flex-col items-center justify-between h-full z-50 transition-[width] duration-500`}
      >
        {/* Header */}
        <div
          className={`fixed top-0 left-0 flex items-center transition-[width] justify-between h-16 px-4 shadow-md bg-white transition-width duration-500 z-50 ${
            isCollapsed ? "w-20" : "w-64"
          }`}
        >
          {!isCollapsed ? (
            <>
              <img
                src="./ay_logo"
                alt="ayush-logo"
                className="w-28 object-contain"
              />
              <button
                onClick={toggleSidebar}
                className="text-black text-2xl"
                aria-label="Toggle sidebar"
              >
                <FaBars />
              </button>
            </>
          ) : (
            <button
              onClick={toggleSidebar}
              className="text-black text-2xl mx-auto"
              aria-label="Toggle sidebar"
            >
              <FaBars />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <ul className="flex-grow w-full p-4 mt-16">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="relative sidebar-menu-item"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              <div onClick={() => handleClick(item.name)}>
                <Link
                  to={item.subMenu ? "#" : item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md mb-1 hover:text-white hover:shadow-2xl ${
                    isActive(item.path) && !item.subMenu
                      ? "text-white shadow-lg"
                      : ""
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>

                  {!isCollapsed && (
                    <div className="flex justify-between items-center w-full">
                      <span className="text-sm whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.subMenu && (
                        <span
                          className={`transition-transform ml-auto ${
                            clickedDropdown === item.name ? "rotate-90" : ""
                          }`}
                        >
                          ▸
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              </div>

              {/* Hover fly-out menu */}
              {item.subMenu &&
                hoveredDropdown === item.name &&
                !clickedDropdown &&
                !isCollapsed && (
                  <ul className="absolute top-2 left-full w-56 bg-sidebar_bg text-white rounded-md shadow-lg py-2 z-50">
                    {item.subMenu
                      .filter((sub) => sub.is_active && !sub.is_private)
                      .map((sub) => (
                        <li key={sub._id}>
                          <Link
                            to={`${item.path}/${sub.cat_name}/${sub._id}`}
                            className="block px-4 py-2 text-sm text-nav_link hover:text-white hover:shadow"
                          >
                            {sub.cat_name}
                            {item.name === "Training Materials"
                              ? ""
                              : " Assessment"}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}

              {/* Click inline submenu */}
              {item.subMenu && clickedDropdown === item.name && (
                <ul className="ml-6 mt-1 bg-sidebar_bg text-nav_link rounded-md shadow-inner py-2">
                  {item.subMenu
                    .filter((sub) => sub.is_active && !sub.is_private)
                    .map((sub) => (
                      <li key={sub._id}>
                        <Link
                          to={`${item.path}/${sub.cat_name}/${sub._id}`}
                          className="block px-4 py-2 text-sm hover:text-white hover:shadow"
                        >
                          {sub.cat_name}
                          {item.name === "Training Materials"
                            ? ""
                            : " Assessment"}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div
          onClick={handleLogout}
          className="mt-4 flex items-center gap-4 text-nav_link w-full border-t p-4 cursor-pointer hover:text-white"
        >
          <div className="flex items-center px-4 gap-4">
            <FaSignOutAlt className="text-xl" />
            {!isCollapsed && <span>Logout</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

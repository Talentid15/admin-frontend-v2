import  { useState } from "react";
import { NavLink} from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {  BiSolidCheckShield } from "react-icons/bi";
import { SiLens } from "react-icons/si";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaChevronDown, FaUsers } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { user_role } from "../utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState("Dashboard");

  const userData = useSelector((state) => state.user.data);
  const location = useLocation();
  const isOfferPunchActive = location.pathname === "/offer-punch";

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleUsers = () => {
    setIsUsersOpen(!isUsersOpen);
    setSelectedNav("Users");
  };

  return (
    <div className="relative h-screen overflow-hidden flex">
      {/* Tailwind CSS CDN */}
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />

      {/* Menu Icon for Mobile */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-white text-2xl md:hidden z-50"
      >
        {isOpen ? (
          <AiOutlineClose className="hover:scale-110 transition-transform duration-200" />
        ) : (
          <AiOutlineMenu className="hover:scale-110 transition-transform duration-200" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 md:w-64 lg:w-72 bg-gradient-to-b from-purple-800 to-indigo-900 text-white shadow-2xl transform transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-center py-6 border-b border-purple-600">
          <h1 className="text-xl font-bold tracking-tight">{selectedNav}</h1>
        </div>

        {/* Navigation */}
        <nav className="mt-4 space-y-2 px-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-purple-500 text-white shadow-lg border-l-4 border-purple-300"
                  : "hover:bg-purple-700 hover:text-white hover:scale-105"
              }`
            }
            onClick={() => setSelectedNav("Dashboard")}
          >
            <MdDashboard className="h-5 w-5 transform hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Dashboard</span>
          </NavLink>

          <div>
            <button
              onClick={toggleUsers}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                isUsersOpen || isOfferPunchActive
                  ? "bg-purple-500 text-white shadow-lg border-l-4 border-purple-300"
                  : "hover:bg-purple-700 hover:text-white hover:scale-105"
              }`}
            >
              <div className="flex items-center space-x-3">
                <BiSolidCheckShield className="h-5 w-5 transform hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Users</span>
              </div>
              <FaChevronDown
                className={`transition-transform duration-200 ${
                  isUsersOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isUsersOpen && (
              <div className="ml-4 mt-2 space-y-1">
                <NavLink
                  to="/recruiters"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-purple-400 text-white shadow-md"
                        : "hover:bg-purple-600 hover:text-white hover:scale-105"
                    }`
                  }
                >
                  <FaUsers className="h-5 w-5" />
                  <span className="text-sm">Recruiters List</span>
                </NavLink>
              </div>
            )}
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-purple-500 text-white shadow-lg border-l-4 border-purple-300"
                  : "hover:bg-purple-700 hover:text-white hover:scale-105"
              }`
            }
            onClick={() => setSelectedNav("Contact Queries")}
          >
            <SiLens className="h-5 w-5 transform hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Contact Queries</span>
          </NavLink>

          <NavLink
            to="/subscriptions"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-purple-500 text-white shadow-lg border-l-4 border-purple-300"
                  : "hover:bg-purple-700 hover:text-white hover:scale-105"
              }`
            }
            onClick={() => setSelectedNav("Subscriptions")}
          >
            <SiLens className="h-5 w-5 transform hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Subscriptions</span>
          </NavLink>

          {userData.role === user_role.Super_Admin && (
            <NavLink
              to="/teammanagement"
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-purple-500 text-white shadow-lg border-l-4 border-purple-300"
                    : "hover:bg-purple-700 hover:text-white hover:scale-105"
                }`
              }
              onClick={() => setSelectedNav("Team Management")}
            >
              <SiLens className="h-5 w-5 transform hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Team Management</span>
            </NavLink>
          )}

          <NavLink
            to="/notepad"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-purple-500 text-white shadow-lg border-l-4 border-purple-300"
                  : "hover:bg-purple-700 hover:text-white hover:scale-105"
              }`
            }
            onClick={() => setSelectedNav("Notepad")}
          >
            <SiLens className="h-5 w-5 transform hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">Notepad</span>
          </NavLink>

          <NavLink
            to="/todo"
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-purple-500 text-white shadow-lg border-l-4 border-purple-300"
                  : "hover:bg-purple-700 hover:text-white hover:scale-105"
              }`
            }
            onClick={() => setSelectedNav("To Do")}
          >
            <SiLens className="h-5 w-5 transform hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">To Do</span>
          </NavLink>
        </nav>
      </div>

      {/* Overlay for Mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { BsPersonBadge } from "react-icons/bs";
import { BiSolidCheckShield } from "react-icons/bi";
import { SiLens } from "react-icons/si";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { user_role } from "../utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCandidateTrackingOpen, setIsCandidateTrackingOpen] = useState(false);

  const [selectedNav, setSelectedNav] = useState("Candidate Tracking");

  const userData = useSelector((state) => state.user.data);

  console.log("user role in sidebar", userData.role);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCandidateTracking = () => {A
    setIsCandidateTrackingOpen(!isCandidateTrackingOpen);
  };

  const location = useLocation();
  const isOfferPunchActive = location.pathname === "/offer-punch";

  return (
    <div className="relative h-screen overflow-hidden flex lg: ">
      {/* Menu Icon */}
      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 text-black text-2xl md:hidden z-50"
      >
        {isOpen ? (
          <AiOutlineClose className="hover:scale-105 transition-all" />
        ) : (
          <AiOutlineMenu className="hover:scale-105 transition-all" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full sm:w-[70%]  lg:w-90   bg-gradient-to-b from-[#74449D] to-[#4B2775] text-white shadow-lg transform transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full "
          } md:relative md:translate-x-0 lg:w-80   `}
      >
        {/* Header */}
        <div >
          <h1 className="text-2xl font-bold text-center py-4 lg:border-b border-purple-400 mt-1">
            {selectedNav}
          </h1>

          {/* Navigation */}
          <nav className="mt-4 space-y-3 sm:space-y-0 sm:mt-[1px]  ">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 px-4 py-6 bg-purple-400  shadow-md "
                  : "flex items-center space-x-4 px-4 py-6 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95  transition-all duration-200"
              }
              onClick={() => setSelectedNav("Dashboard")}
            >
              <MdDashboard className="h-6 w-6" />
              <span className="text-sm font-medium">Dashboard</span>
            </NavLink>

            <div>
              <NavLink
                to="/users"
                onClick={(e) => {
                  e.preventDefault(); // Prevent NavLink default behavior
                  toggleCandidateTracking(); // Call your first function
                  setSelectedNav("Users"); // Call your second function
                  setIsCandidateTrackingOpen(!isCandidateTrackingOpen);
                }}
                className={({ isActive }) =>
                  isActive || isOfferPunchActive
                    ? "flex items-center space-x-4 pl-4 py-6 bg-purple-400 shadow-md"
                    : "flex items-center space-x-4 pl-4 py-6 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95 transition-all duration-200"
                }
              >
                <BiSolidCheckShield className="h-6 w-6" />
                <span className="text-sm font-medium mr-3 ml-3">Users</span>
                <FaChevronDown
                  className={`transition-transform ${isCandidateTrackingOpen ? "rotate-180 ml-auto" : "ml-auto"
                    }`}
                />
              </NavLink>

              {/* Sub-options for Candidate Tracking */}
              {isCandidateTrackingOpen && (
                <div className="w-full flex flex-col items-center justify-start">
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full flex items-center justify-center space-x-4 pl-4 py-3 pr-10 bg-purple-300 shadow-md"
                        : "w-full flex items-center justify-center space-x-4 pl-4 py-3 pr-10 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95 transition-all duration-200"
                    }
                  >
                    <BsPersonBadge className="h-5 w-5" />
                    <span className="text-center">Recruiters</span>
                  </NavLink>
                  <NavLink
                    to="/candidates"
                    className={({ isActive }) =>
                      isActive
                        ? "w-full flex items-center justify-center space-x-4 pl-4 py-3 pr-5 bg-purple-300 shadow-md"
                        : "w-full flex items-center justify-center space-x-4 pl-4 py-3 pr-5 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95 transition-all duration-200"
                    }
                  >
                    <BiEdit className="h-5 w-5" />
                    <span className="text-center">Candidates</span>
                  </NavLink>
                </div>
              )}
            </div>




            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 px-4 py-6 bg-purple-400  shadow-md"
                  : "flex items-center space-x-4 px-4 py-6 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95  transition-all duration-200"
              }
              onClick={() => setSelectedNav("Contact queries")}
            >
              <SiLens className="h-5 w-5" />
              <span className="text-sm font-medium">Contact queries</span>
            </NavLink>

            <NavLink
              to="/subscriptions"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 px-4 py-6 bg-purple-400  shadow-md"
                  : "flex items-center space-x-4 px-4 py-6 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95  transition-all duration-200"
              }
              onClick={() => setSelectedNav("Subscriptions")}
            >
              <SiLens className="h-5 w-5" />
              <span className="text-sm font-medium">Subscriptions</span>
            </NavLink>

            {

              userData.role === user_role.Super_Admin && (

                <NavLink
                  to="/teammanagement"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center space-x-4 px-4 py-6 bg-purple-400  shadow-md"
                      : "flex items-center space-x-4 px-4 py-6 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95  transition-all duration-200"
                  }
                  onClick={() => setSelectedNav("Team Management")}
                >
                  <SiLens className="h-5 w-5" />
                  <span className="text-sm font-medium">Team management</span>
                </NavLink>
              )
            }

            <NavLink
              to="/notepad"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 px-4 py-6 bg-purple-400  shadow-md"
                  : "flex items-center space-x-4 px-4 py-6 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95  transition-all duration-200"
              }
              onClick={() => setSelectedNav("Notepad")}
            >
              <SiLens className="h-5 w-5" />
              <span className="text-sm font-medium">Notepad</span>
            </NavLink>

            <NavLink
              to="/todo"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center space-x-4 px-4 py-6 bg-purple-400  shadow-md"
                  : "flex items-center space-x-4 px-4 py-6 hover:text-black hover:bg-[#E8DEF8] bg-opacity-95  transition-all duration-200"
              }
              onClick={() => setSelectedNav("To Do")}
            >
              <SiLens className="h-5 w-5" />
              <span className="text-sm font-medium">To Do</span>
            </NavLink>

          </nav>
        </div>

        {/* Footer Buttons */}

      </div>

      {/* Content Overlay for smaller screens */}
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

import React, { useState, useEffect, useRef } from 'react';
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { GiRingingBell } from "react-icons/gi";
import { ImInfo } from 'react-icons/im';
import logo from '../assets/logo.png';



import { useNavigate } from 'react-router-dom';




const Header = () => {

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();



 

  // Toggle notification dropdown
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setShowProfile(false); // Close profile dropdown if open
  };

  // Toggle profile dropdown
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowNotifications(false); // Close notification dropdown if open
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current && !notificationRef.current.contains(event.target) &&
        profileRef.current && !profileRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
        setShowProfile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between bg-white shadow-md px-6 py-4 relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logo} alt="TalentID Logo" className="h-8 w-auto" />
      </div>

      {/* Icons Section */}
      <div className="flex items-center space-x-6">
        {/* Info Icon */}
        <ImInfo className="text-gray-600 text-xl cursor-pointer hover:text-purple-900 transition duration-300" />

       

        {/* User Profile Icon with Dropdown */}
        <div className="relative" ref={profileRef}>
          <FaUserCircle
            className="text-gray-600 text-2xl cursor-pointer hover:text-purple-900 transition duration-300"
            onClick={toggleProfile}
          />
          {/* Profile Dropdown */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <p className="text-gray-800 font-semibold">User Profile</p>
                <FaTimes className="text-gray-600 cursor-pointer hover:text-red-500" onClick={() => setShowProfile(false)} />
              </div>
              <div className="p-4 text-center">
                {/* <img src={user.userImage} alt="User" className="w-16 h-16 rounded-full mx-auto" /> */}
                <p className="text-gray-800 font-semibold mt-2">Jai N</p>
                <p className="text-gray-500 text-sm">jai@TalentID</p>
              </div>
              <ul className="space-y-2 p-2" >
                <li className="flex items-center text-gray-600 border-b hover:bg-gray-100 p-2 cursor-pointer" onClick={() => {

                  navigate("/settings");

                }}>
                  <FaUserCircle className="mr-2" /> My Profile
                </li>
                <li className="flex items-center text-gray-600 border-b hover:bg-gray-100 p-2 cursor-pointer">
                  <FaCog className="mr-2" /> Settings
                </li>
                <li className="flex items-center text-gray-600 border-b hover:bg-gray-100 p-2 cursor-pointer" onClick={() => {

                  navigate("/settings/subscription");

                }}>
                  <MdOutlineCurrencyExchange className='mr-2' /> Subscription
                </li>
                <li className="flex items-center text-gray-600 hover:bg-gray-100 p-2 cursor-pointer" onClick={()=>{

                 

                  navigate("/login");

                }}>
                  <FaSignOutAlt className="mr-2 text-red-500" /> Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

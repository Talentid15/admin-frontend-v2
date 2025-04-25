import { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSignOutAlt, FaTimes } from "react-icons/fa";
import { ImInfo } from "react-icons/im";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import toast from "react-hot-toast";

const Header = () => {
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user data from Redux store
  const userData = useSelector((state) => state.user.data);

  // Toggle profile dropdown
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout function
  const handleLogout = () => {
    dispatch(logout()); // Clear user state
  };

  // Show success message & redirect after logout
  useEffect(() => {
    if (!userData) {
      toast.success("Logged Out Successfully");
      navigate("/login");
    }
  }, [userData]);

  return (
    <header className="flex items-center z-50 justify-between bg-white shadow-md px-6 py-4 relative">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="TalentID Logo" className="h-8 w-auto" />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-6">
        <ImInfo className="text-gray-600 text-xl cursor-pointer hover:text-purple-900 transition duration-300" />

        {/* User Profile */}
        <div className="relative" ref={profileRef}>
          <FaUserCircle
            className="text-gray-600 text-2xl cursor-pointer hover:text-purple-900 transition duration-300"
            onClick={toggleProfile}
          />
          {showProfile && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="flex justify-between items-center p-4 border-b">
                <p className="text-gray-800 font-semibold">User Profile</p>
                <FaTimes className="text-gray-600 cursor-pointer hover:text-red-500" onClick={() => setShowProfile(false)} />
              </div>
              <div className="p-4 text-center">
                <img src="https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U" alt="User" className="w-16 h-16 rounded-full mx-auto" />
                <p className="text-gray-800 font-semibold mt-2">{userData?.fullname}</p>
                <p className="text-gray-500 text-sm">{userData?.email}</p>
              </div>
              <ul className="space-y-2 p-2">
                <li className="flex items-center text-gray-600 hover:bg-gray-100 p-2 cursor-pointer" onClick={handleLogout}>
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

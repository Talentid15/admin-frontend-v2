import React, { useState } from "react";
import axios from "axios";
import { MdEmail, MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const ChangePassword = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentpass: "",
    newpassword: "",
    confirmpassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    currentpass: false,
    newpassword: false,
    confirmpassword: false,
  });

  const user = useSelector((state) => state.user.data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newpassword !== formData.confirmpassword) {
      toast.error(" new password and confirm new password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/resetPassword",
        {
          password: formData.currentpass,
          confirmPasswordValue: formData.newpassword,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Response Data:", response.data);
      alert("Password changed successfully!");

      setFormData({
        currentpass: "",
        newpassword: "",
        confirmpassword: "",
      });
    } catch (error) {
      console.error("Error", error);
      alert("Error saving profile, please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-[600px] min-h-[70vh] bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 mb-6 text-center sm:text-left">
          Password Change
        </h2>

        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center space-x-4">
            <img
              src={user.userImage}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-purple-400"
            />
            <div className="text-center sm:text-left">
              <div className="flex items-center border-b pb-1 sm:space-x-2">
                <h2 className="text-xl font-semibold">{user.fullName}</h2>
              </div>
              <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start mt-2">
                <MdEmail className="mr-1" /> {user.email}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="w-full flex flex-wrap gap-8">
            {["currentpass", "newpassword", "confirmpassword"].map((field, index) => (
              <div className="relative w-[70%]" key={field}>
                <label className="absolute -top-3 left-3 bg-white px-1 text-gray-600 text-sm">
                  {field === "currentpass" ? "Current Password" : field === "newpassword" ? "New Password" : "Confirm New Password"}
                </label>
                <input
                  type={showPassword[field] ? "text" : "password"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                />
                <span
                  className="absolute right-3 top-3 cursor-pointer text-gray-600"
                  onClick={() => togglePasswordVisibility(field)}
                >
                  {showPassword[field] ? <MdVisibilityOff /> : <MdVisibility />}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-start">
            <button
              type="submit"
              className="bg-purple-900 text-white py-2 px-6 rounded-full shadow-md hover:bg-purple-300 hover:text-black transition-all"
            >
              Continue
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 px-6 py-2 rounded-full"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;


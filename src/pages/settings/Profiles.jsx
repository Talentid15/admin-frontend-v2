import { useState } from "react";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ChangePassword from "../../components/settings/ChangePassword"; // Import ChangePassword modal
import { useSelector } from "react-redux";

const Profiles = () => {

  const { additionalDetails, data } = useSelector((state) => state.user);

  console.log("additional information ", additionalDetails);

  let user = data;

  const [formData, setFormData] = useState({
    email: user?.email || "",
    mobileNumber: user?.phone || "",
    company: user?.company || "",
    website: user?.website || "",
    state: additionalDetails?.state || "",
    bio: additionalDetails?.bio || "",
    role: user?.role || "",
    employees: additionalDetails?.noOfEmployees || "", 
});


  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      email: "",
      mobileNumber: "",
      company: "",
      website: "",
      state: "",
      bio: "",
      role: "",
      employees: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/profiles",
        formData
      );

      console.log("Response Data:", response.data);
      alert("Profile saved successfully!");

      setFormData({
        email: "",
        mobileNumber: "",
        company: "",
        website: "",
        state: "",
        bio: "",
        role: "",
        employees: "",
      });
    } catch (error) {
      console.error("There was an error saving the profile:", error);
      alert("Error saving profile, please try again.");
    }
  };

  return (
    <div className="w-[90%] sm:block h-[550px] overflow-y-auto shadow-xl rounded-2xl no-scrollbar">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full">
        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-900 border-b pb-3 mb-6">
          Personal Information
        </h2>

        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full p-4 mb-6">
          {/* Left Section: Profile Image & Info */}
          <div className="flex flex-col sm:flex-row items-center space-x-4">
            <img
              src={user.userImage}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-purple-400"
            />
            <div className="text-center sm:text-left">
              <div className="flex items-center border-b pb-1 sm:space-x-24">
                <h2 className="text-xl font-semibold">{user.fullname}</h2>
                <FaRegEdit className="text-gray-500 cursor-pointer" />
              </div>
              <p className="text-sm text-gray-600 flex items-center justify-center sm:justify-start mt-2">
                <MdEmail className="mr-1" /> {user.email}
              </p>
            </div>
          </div>

          {/* Right Section: Change Password Button */}
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="border border-gray-500 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-all mt-4 sm:mt-0"
          >
            Change Password
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Side Inputs */}
            <div className="space-y-6">
              {[
                { label: "Email Address", name: "email", type: "email" },
                { label: "Company", name: "company", type: "text" },
                { label: "Website", name: "website", type: "text" },
                { label: "State/Province", name: "state", type: "text" },
                { label: "Bio", name: "bio", type: "text" },
              ].map((input) => (
                <div className="relative w-full" key={input.name}>
                  <label className="absolute -top-3 left-3 bg-white px-1 text-gray-600 text-sm">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              ))}
            </div>

            {/* Right Side Inputs */}
            <div className="space-y-6">
              {[
                { label: "Mobile Number", name: "mobileNumber", type: "tel" },
                { label: "Role", name: "role", type: "text" },
                { label: "No of Employees", name: "employees", type: "text" },
              ].map((input) => (
                <div className="relative w-full" key={input.name}>
                  <label className="absolute -top-3 left-3 bg-white px-1 text-gray-600 text-sm">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center sm:justify-end gap-3">
            <button
              type="submit"
              className="bg-purple-900 text-white py-2 px-8 rounded-full shadow-md hover:bg-purple-300 hover:text-black transition-all"
            >
              Submit Information
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-white text-purple-900 border border-purple-900 py-2 px-8 rounded-full shadow-md hover:bg-purple-300 hover:text-black transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Modal */}
      {isModalOpen && (
        <ChangePassword onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Profiles;

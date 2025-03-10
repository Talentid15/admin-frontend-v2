import React from "react";

const AddUserModal = ({ isOpen, onClose, onSave, formData, handleChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-3xl shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-8">Invite a member to your team</h2>

        {/* Input Fields */}
        <div className="space-y-6 mb-6">
          <div className="relative w-full">
            <label className="absolute -top-3 left-3 bg-white px-1 text-gray-600 text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="relative w-full">
            <label className="absolute -top-3 left-3 bg-white px-1 text-gray-600 text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="relative w-full">
            <label className="absolute -top-3 left-3 bg-white px-1 text-gray-600 text-sm">Work Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* User Role Selection */}
        <div className="mb-8">
          <label className="font-bold">User Role</label>
          <div className="flex flex-col mt-2 space-y-1">
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="Owner" checked={formData.role === "Owner"} onChange={handleChange} />
              <span>Owner <span className="text-gray-500 text-sm">Full account access</span></span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="Administrator" checked={formData.role === "Administrator"} onChange={handleChange} />
              <span>Administrator <span className="text-gray-500 text-sm">No access to billing</span></span>
            </label>
            {/* <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="Custom" checked={formData.role === "Custom"} onChange={handleChange} />
              <span>Custom <span className="text-gray-500 text-sm">Permission in selected functions</span></span>
            </label> */}
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="flex justify-between">
          <button onClick={onClose} className="px-10 py-2 bg-gray-300 text-black rounded-full">Cancel</button>
          <button onClick={onSave} className="px-10 py-2 bg-purple-900 text-white rounded-full">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;

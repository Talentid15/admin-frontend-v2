import React, { useState } from "react";
import AddUserModal from "/src/components/settings/AddUserModal.jsx"; // Import the modal
import { FaPencilAlt } from "react-icons/fa";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: "Admin",
      date: "Jan 8, 2025",
    },
    {
      id: 2,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: "Admin",
      date: "Jan 8, 2025",
    },
    {
      id: 3,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: true,
      date: "Jan 8, 2025",
    },
    {
      id: 4,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: true,
      date: "Jan 8, 2025",
    },
    {
      id: 5,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: true,
      date: "Jan 8, 2025",
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: true,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding user
  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return;

    const newUser = {
      id: users.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
      date: new Date().toDateString(),
    };

    setUsers([...users, newUser]); // Add new user to table
    setIsModalOpen(false); // Close modal
    setFormData({ firstName: "", lastName: "", email: "", role: true }); // Reset form
  };

  // Handle user deletion
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

 
  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      {/* <div className="flex justify-end items-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-gray-200 hover:bg-gray-300 text-black font-medium px-4 py-2 rounded-full"
        >
          Add users +
        </button>
      </div> */}

      <div className="overflow-x-auto hidden md:block">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b ">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left pl-10">Status</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left pl-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className="bg-gray-200 rounded-full px-2 py-1"
                  >
                    <option value="open">Open</option>
                    <option value="pending">Pending</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="p-3">{user.date}</td>
                <td className="p-2 flex items-center space-x-3">
                  <button className="bg-white px-3 py-1 rounded-full"><FaPencilAlt /></button>
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 text-xl">🗑</button>
                  <button className="bg-gray-300 px-3 py-1 rounded-full">View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        {users.map((user) => (
          <div key={user.id} className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">
              <span className="px-2 py-1 bg-gray-200 rounded-full">{user.role}</span>
            </p>
            <p className="text-sm text-gray-400">{user.date}</p>
            <div className="mt-2 flex space-x-2">
              <button className="bg-gray-300 px-3 py-1 rounded-full">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="text-red-600">🗑</button>
              <button className="bg-gray-300 px-3 py-1 rounded-full">View More</button>
            </div>

          </div>
        ))}
      </div>

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        formData={formData}
        handleChange={handleChange}
      />
    </div>
  );
};

export default UserManagement;
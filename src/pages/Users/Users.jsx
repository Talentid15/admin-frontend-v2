import React, { useState } from "react";
import AddUserModal from "/src/components/settings/AddUserModal.jsx"; // Import the modal
import { FaPencilAlt } from "react-icons/fa";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [editValue, setEditValue] = useState("");
     // Handle double-click to start editing
  const handleDoubleClick = (id, field, value) => {
    setEditing({ id, field });
    setEditValue(value);
  };

  // Handle input change
  const handleEditChange = (e) => setEditValue(e.target.value);

  // Handle saving on enter or blur
  const handleEditSave = () => {
    if (!editing) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editing.id ? { ...user, [editing.field]: editValue } : user
      )
    );

    setEditing(null);
    setEditValue("");
  };
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: true,
      date: "Jan 8, 2025",
    },
    {
      id: 2,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: false,
      date: "Jan 8, 2025",
    },
    {
      id: 3,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: true,
      date: "Jan 8, 2025",
    },
    {
      id: 4,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: true,
      date: "Jan 8, 2025",
    },
    {
      id: 5,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: false,
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

  const toggleNotification = (id) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, enabled: !user.enabled } : user
        )
      );
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
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left pl-12">Status</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left pl-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "name", user.name)}
                >
                  {editing?.id === user.id && editing?.field === "name" ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                      onBlur={handleEditSave}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      autoFocus
                      className="border rounded px-2 py-1 w-[130px]"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "email", user.email)}
                >
                  {editing?.id === user.id && editing?.field === "email" ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleEditChange}
                      onBlur={handleEditSave}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      autoFocus
                      className="border rounded px-2 py-1 w-[130px]"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-3 text-center">
              <button
                onClick={() => toggleNotification(user.id)}
                className={`relative w-12 h-6 rounded-full transition duration-300 ${
                  user.enabled ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${
                    user.enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                ></span>
              </button>
              
            </td>
                <td className="p-3">{user.date}</td>
                <td className="p-2 flex items-center space-x-4">
                  
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 text-xl">🗑</button>
                  <button className="bg-gray-300 px-3 py-1 rounded-full">View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vertical cards for small screens */}
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
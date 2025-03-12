import React, { useState } from "react";
import { FaPencilAlt, FaSearch } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: "Enterprise",
      date: "Jan 8, 2025",
    },
    {
      id: 2,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: "Scale",
      date: "Jan 8, 2025",
    },
    {
      id: 3,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: "Starter",
      date: "Jan 8, 2025",
    },
    {
      id: 4,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: "Enterprise",
      date: "Jan 8, 2025",
    },
    {
      id: 5,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      role: "Scale",
      date: "Jan 8, 2025",
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: true,
  });

  const [searchTerm, setSearchTerm] = useState("");

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
    setFormData({ firstName: "", lastName: "", email: "", role: true }); // Reset form
  };

  // Handle user deletion
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      <div className="flex justify-end items-center mb-4">
       
        <div className="relative ">
          <input
            type="text"
            placeholder="Search "
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border-b rounded-lg "
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto hidden md:block">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left pl-10">Status</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left pl-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center">{user.role}</td>
                <td className="p-3">{user.date}</td>
                <td className="p-2 flex items-center space-x-3">
                  <button className="bg-white px-3 py-1 rounded-full">
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 text-xl"
                  >
                    🗑
                  </button>
                  <button className="bg-gray-300 px-3 py-1 rounded-full">
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="block md:hidden">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50"
          >
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">
              <span className="px-2 py-1 bg-gray-200 rounded-full">
                {user.role}
              </span>
            </p>
            <p className="text-sm text-gray-400">{user.date}</p>
            <div className="mt-2 flex space-x-2">
              <button className="bg-gray-300 px-3 py-1 rounded-full">Edit</button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600"
              >
                🗑
              </button>
              <button className="bg-gray-300 px-3 py-1 rounded-full">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;
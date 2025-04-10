import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Jainayak N", phone: "1234567890", email: "jai@talentid.app", role: "Enterprise", date: "Jan 8, 2025" },
    { id: 2, name: "Jainayak N", phone: "1234567890", email: "jai@talentid.app", role: "Scale", date: "Jan 8, 2025" },
    { id: 3, name: "Jainayak N", phone: "1234567890", email: "jai@talentid.app", role: "Starter", date: "Jan 8, 2025" },
    { id: 4, name: "Jainayak N", phone: "1234567890", email: "jai@talentid.app", role: "Enterprise", date: "Jan 8, 2025" },
    { id: 5, name: "Jainayak N", phone: "1234567890", email: "jai@talentid.app", role: "Scale", date: "Jan 8, 2025" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Handle search
  const handleSearch = (e) => setSearchTerm(e.target.value);

  // Handle double-click to start editing
  const handleDoubleClick = (id, field, value) => {
    setEditing({ id, field });
    setEditValue(value);
  };

  // Handle input change
  const handleChange = (e) => setEditValue(e.target.value);

  // Handle saving on enter or blur
  const handleSave = () => {
    if (!editing) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editing.id ? { ...user, [editing.field]: editValue } : user
      )
    );

    setEditing(null);
    setEditValue("");
  };

  // Handle user deletion
  const handleDelete = (id) => setUsers(users.filter((user) => user.id !== id));

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      {/* Search Bar */}
      <div className="flex justify-end items-center mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 border-b rounded-lg"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left pl-10">Role</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left pl-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b">
                {/* Editable Name */}
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "name", user.name)}
                >
                  {editing?.id === user.id && editing?.field === "name" ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleChange}
                      onBlur={handleSave}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      autoFocus
                      className="border rounded px-2 py-1 w-[130px]"
                    />
                  ) : (
                    user.name
                  )}
                </td>

                {/* Editable Phone */}
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "phone", user.phone)}
                >
                  {editing?.id === user.id && editing?.field === "phone" ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleChange}
                      onBlur={handleSave}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      autoFocus
                      className="border rounded px-2 py-1 w-[130px]"
                    />
                  ) : (
                    user.phone
                  )}
                </td>

                {/* Editable Email */}
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "email", user.email)}
                >
                  {editing?.id === user.id && editing?.field === "email" ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleChange}
                      onBlur={handleSave}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      autoFocus
                      className="border rounded px-2 py-1 w-[130px]"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                {/* Editable Role */}
                <td
                  className="p-3 cursor-pointer text-center "
                  onDoubleClick={() => handleDoubleClick(user.id, "role", user.role)}
                >
                  {editing?.id === user.id && editing?.field === "role" ? (
                    <input
                      type="text"
                      value={editValue}
                      onChange={handleChange}
                      onBlur={handleSave}
                      onKeyDown={(e) => e.key === "Enter" && handleSave()}
                      autoFocus
                      className="border rounded px-2 py-1 w-[130px]"
                    />
                  ) : (
                    user.role
                  )}
                </td>

                {/* Date */}
                <td className="p-3">{user.date}</td>

                {/* Actions */}
                <td className="p-2 flex items-center space-x-3">
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 text-xl">
                    🗑
                  </button>
                  <button className="bg-gray-300 px-3 py-1 rounded-full">View More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

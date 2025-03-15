import React, { useState } from "react";
import AddUserModal from "/src/components/settings/AddUserModal.jsx"; // Import the modal

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      status: "closed",
      date: "Jan 8, 2025",
    },
    {
      id: 2,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      status: "pending",
      date: "Jan 8, 2025",
    },
    {
      id: 3,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      status: "open",
      date: "Jan 8, 2025",
    },
    {
      id: 4,
      name: "Jainayak N",
      phone: "1234567890",
      email: "jai@talentid.app",
      status: "closed",
      date: "Jan 8, 2025",
    },
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleDoubleClick = (id, field, value) => {
    setEditingUser({ id, field });
    setEditedValue(value);
  };

  const handleStatusChange = (id, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleBlurOrEnter = (id, field) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, [field]: editedValue } : user
      )
    );
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left pl-10">Status</th>
              <th className="p-3 text-left">Date Added</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "name", user.name)}
                >
                  {editingUser?.id === user.id && editingUser.field === "name" ? (
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleChange}
                      onBlur={() => handleBlurOrEnter(user.id, "name")}
                      onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter(user.id, "name")}
                      autoFocus
                      className="border rounded px-2 py-1 w-[130px]"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "phone", user.phone)}
                >
                  {editingUser?.id === user.id && editingUser.field === "phone" ? (
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleChange}
                      onBlur={() => handleBlurOrEnter(user.id, "phone")}
                      onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter(user.id, "phone")}
                      autoFocus
                      className="border rounded px-2 py-1 w-[150px]"
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td
                  className="p-3 cursor-pointer"
                  onDoubleClick={() => handleDoubleClick(user.id, "email", user.email)}
                >
                  {editingUser?.id === user.id && editingUser.field === "email" ? (
                    <input
                      type="text"
                      value={editedValue}
                      onChange={handleChange}
                      onBlur={() => handleBlurOrEnter(user.id, "email")}
                      onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter(user.id, "email")}
                      autoFocus
                      className="border rounded px-2 py-1 w-[150px]"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="p-3 text-center">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                    className={`rounded-full px-2 py-1 text-white  font-medium
                      ${user.status === "open" ? "bg-green-500" : ""}
                      ${user.status === "pending" ? "bg-yellow-500" : ""}
                      ${user.status === "closed" ? "bg-red-500" : ""}
                    `}
                  >
                    <option value="open" className="text-black">Open</option>
                    <option value="pending" className="text-black">Pending</option>
                    <option value="closed" className="text-black">Closed</option>
                  </select>
                </td>

                <td className="p-3">{user.date}</td>
                <td className="p-2 flex items-center justify-center mr-6">
                  <button onClick={() => handleDelete(user.id)} className="text-red-600 text-xl">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add User Modal */}
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default UserManagement;

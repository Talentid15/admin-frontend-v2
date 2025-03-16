import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  async function fetchRecruiterData() {
    try {
      const response = await axios.get(`${backend_url}/api/admin/get-all-recruiters`);
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  const { refetch, isFetching } = useQuery({
    queryKey: ["recruiter-data"],
    queryFn: fetchRecruiterData,
    refetchOnWindowFocus: false,
  });

  const handleEdit = (userId, field, value) => {
    setEditedData({ ...editedData, [userId]: { ...editedData[userId], [field]: value } });
  };

  const saveChanges = (userId) => {
    axios
      .put(`${backend_url}/api/users/${userId}`, editedData[userId])
      .then((response) => {
        setUsers(users.map((user) => (user._id === userId ? response.data : user)));
        setEditingUser(null);
        setEditedData({});
      })
      .catch((error) => console.error("Error updating user:", error));
  };

  return (
    <div className="p-4 relative w-[90%] overflow-x-auto ">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded-md"
          onClick={refetch}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-max w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Company</th>
              <th className="p-2 border">Subscription Plan</th>
              <th className="p-2 border">Credits</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border">
                <td className="p-2 border whitespace-nowrap">{user.fullname}</td>
                <td className="p-2 border whitespace-nowrap">{user.email}</td>
                <td className="p-2 border whitespace-nowrap" onDoubleClick={() => setEditingUser(user._id)}>
                  {editingUser === user._id ? (
                    <input
                      className="text-center border p-1 w-full"
                      type="text"
                      value={editedData[user._id]?.role || user.role}
                      onChange={(e) => handleEdit(user._id, "role", e.target.value)}
                    />
                  ) : (
                    user.role
                  )}
                </td>
                <td className="p-2 border whitespace-nowrap" onDoubleClick={() => setEditingUser(user._id)}>
                  {editingUser === user._id ? (
                    <input
                      className="text-center border p-1 w-full"
                      type="text"
                      value={editedData[user._id]?.company || user.company}
                      onChange={(e) => handleEdit(user._id, "company", e.target.value)}
                    />
                  ) : (
                    user.company
                  )}
                </td>
                <td className="p-2 border whitespace-nowrap" onDoubleClick={() => setEditingUser(user._id)}>
                  {editingUser === user._id ? (
                    <input
                      type="text"
                      className="text-center border p-1 w-full"
                      value={editedData[user._id]?.subscriptionPlan || user.subscriptionPlan}
                      onChange={(e) => handleEdit(user._id, "subscriptionPlan", e.target.value)}
                    />
                  ) : (
                    user.subscriptionPlan
                  )}
                </td>
                <td className="p-2 border whitespace-nowrap" onDoubleClick={() => setEditingUser(user._id)}>
                  {editingUser === user._id ? (
                    <input
                      type="number"
                      className="text-center border p-1 w-full"
                      value={editedData[user._id]?.credits || user.credits}
                      onChange={(e) => handleEdit(user._id, "credits", e.target.value)}
                    />
                  ) : (
                    user.credits
                  )}
                </td>
                <td className="p-2 border whitespace-nowrap">
                  {editingUser === user._id ? (
                    <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => saveChanges(user._id)}>
                      Save
                    </button>
                  ) : (
                    <button className="bg-gray-500 text-white px-2 py-1 rounded" onClick={() => setEditingUser(user._id)}>
                      Edit
                    </button>
                  )}
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

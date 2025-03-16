import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const UserManagement = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchRecruiterData = async () => {
    const response = await axios.get(`${backend_url}/api/admin/get-all-recruiters`);
    return response.data.data;
  };

  const { data: users = [], refetch, isFetching } = useQuery({
    queryKey: ["recruiter-data"],
    queryFn: fetchRecruiterData,
    refetchOnWindowFocus: false,
  });

  const handleEdit = (userId, field, value) => {
    setEditedData({ ...editedData, [userId]: { ...editedData[userId], [field]: value } });
  };

  const saveChanges = async (userId) => {
    try {
      await axios.put(`${backend_url}/api/users/${userId}`, editedData[userId]);
      setEditingUser(null);
      setEditedData({});
      refetch();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="p-4 relative w-[80%] overflow-x-auto">
      <div className="flex w-full justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Management</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={refetch} disabled={isFetching}>
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-max w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {['Name', 'Email', 'Role', 'Company', 'Subscription Plan', 'Credits', 'Actions'].map(header => (
                <th key={header} className="p-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center border">
                {['fullname', 'email', 'role', 'company', 'subscriptionPlan', 'credits'].map((field) => (
                  <td key={field} className="p-2 border whitespace-nowrap" onDoubleClick={() => setEditingUser(user._id)}>
                    {editingUser === user._id ? (
                      <input
                        type={field === "credits" ? "number" : "text"}
                        className="text-center border p-1 w-full"
                        value={editedData[user._id]?.[field] ?? user[field]}
                        onChange={(e) => handleEdit(user._id, field, e.target.value)}
                      />
                    ) : (
                      user[field]
                    )}
                  </td>
                ))}
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
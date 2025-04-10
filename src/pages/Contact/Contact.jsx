import React, { useState } from "react";
import AddUserModal from "/src/components/settings/AddUserModal.jsx"; // Import the modal
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import * as XLSX from "xlsx"; // Import XLSX for Excel export

import { Dateformatter } from "../../utils";
import toast from "react-hot-toast";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState(null);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const fetchContactUsData = async () => {
    try {
      const response = await axios.get(`${backend_url}/api/contactus/getAllContactUsForm`, {
        withCredentials: true,
      });
      setUsers(response.data.data);
    } catch (error) {
      console.error("Error fetching contact us data:", error);
    }
  };

  useQuery({
    queryKey: ["contactUs-data"],
    queryFn: fetchContactUsData,
    refetchOnWindowFocus: false,
  });

  const [editingUser, setEditingUser] = useState(null);
  const [editedValue, setEditedValue] = useState("");

  const handleDoubleClick = (id, field, value) => {
    setEditingUser({ id, field });
    setEditedValue(value);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await axios.post(`${backend_url}/api/contactus/updateContactUsStatus`, {
        updatedStatus: newStatus,
        contactUsId: id,
      }, { withCredentials: true });

      toast.success("Status updated successfully");

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong! Please try again.");
    }
  };

  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleBlurOrEnter = (id, field) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === id ? { ...user, [field]: editedValue } : user
      )
    );
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "UserManagementData.xlsx");
  };

  const contactUsHeading = ["Full Name", "Company", "Email", "Phone Number", "Status", "Query Options", "Message", "Date Added", "Actions"];

  return (
    <div className="w-full max-w-5xl mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      {/* Refresh & Export Buttons */}
      <div className="flex justify-between mb-4">
        <button
          onClick={fetchContactUsData}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow"
        >
          🔄 Refresh
        </button>
        <button
          onClick={exportToExcel}
          className="bg-green-500 text-white px-4 py-2 rounded-md shadow"
        >
          📥 Export to Excel
        </button>
      </div>

      <div className="overflow-auto max-h-[500px] w-full">
        <table className="w-full bg-white rounded-lg min-w-[900px]">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b">
              {contactUsHeading.map((heading, index) => (
                <th key={index} className="p-3 text-left">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="p-3 cursor-pointer" onDoubleClick={() => handleDoubleClick(user._id, "fullname", user.fullname)}>
                    {editingUser && editingUser.id === user._id && editingUser.field === "fullname" ? (
                      <input
                        type="text"
                        value={editedValue}
                        onChange={handleChange}
                        onBlur={() => handleBlurOrEnter(user._id, "fullname")}
                        onKeyDown={(e) => e.key === "Enter" && handleBlurOrEnter(user._id, "fullname")}
                        autoFocus
                        className="border rounded px-2 py-1 w-[130px]"
                      />
                    ) : (
                      user.fullname
                    )}
                  </td>
                  <td className="p-3">{user.company}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3 text-center">
                    <select
                      value={user.status}
                      onChange={(e) => handleStatusChange(user._id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-white font-medium
                        ${user.status === "Pending" ? "bg-yellow-500" : ""}
                        ${user.status === "Solved" ? "bg-green-500" : ""}
                      `}
                    >
                      <option value="Pending" className="text-black">Pending</option>
                      <option value="Solved" className="text-black">Solved</option>
                    </select>
                  </td>
                  <td className="p-3">{user.queryOptions}</td>
                  <td className="p-3">
                    <textarea
                      className="border px-2 py-1 w-[150px] h-16 overflow-x-auto"
                      readOnly
                      value={user.message}
                    />
                  </td>
                  <td className="p-3">{Dateformatter(user.createdAt)}</td>
                  <td className="p-3 text-center">
                    <button onClick={() => handleDelete(user._id)} className="text-red-600 text-xl">🗑</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* Add User Modal */}
      <AddUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default UserManagement;

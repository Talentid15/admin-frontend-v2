import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaTrash } from "react-icons/fa";

const RecentUser = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data || {});
  const { token } = userData;
  const API_URL = import.meta.env.VITE_REACT_BACKEND_URL ?? "https://backend.talentid.app";

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    masterToggle: true,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setEditId] = useState(null); // Kept for future restoration
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch top 10 users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const response = await axios.get(`${API_URL}/api/users/fetchAllusers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const usersData = response.data.data;
      if (!Array.isArray(usersData)) {
        console.error("Expected array from fetchAllusers, got:", usersData);
        setUsers([]);
      } else {
        // Sort by createdAt (newest first) and take top 10
        const sortedUsers = usersData
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10);
        setUsers(sortedUsers);
      }
    } catch (error) {
      console.error("Error fetching users:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error fetching users.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "fetch-users-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullname.trim()) errors.fullname = "Full name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid";
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) errors.phone = "Phone must be 10 digits";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const payload = {
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone || undefined,
        notificationPreferences: { masterToggle: formData.masterToggle },
      };
      let response;
      // Note: Edit mode is commented out for now
      /* if (editId) {
        response = await axios.put(`${API_URL}/api/users/updateUser/${editId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.map((user) => (user._id === editId ? response.data : user)));
        toast.success("User updated successfully", { id: "update-user-success" });
      } else { */
      response = await axios.post(`${API_URL}/api/users/createUser`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(
        [...users, response.data]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
      ); // Keep top 10
      toast.success("User created successfully", { id: "create-user-success" });
      /* } */
      setFormData({ fullname: "", email: "", phone: "", masterToggle: true });
      setFormErrors({});
      setIsModalOpen(false);
      setEditId(null);
    } catch (error) {
      console.error("Error saving user:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error saving user.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "save-user-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      await axios.delete(`${API_URL}/api/users/deleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully", { id: "delete-user-success" });
    } catch (error) {
      console.error("Error deleting user:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error deleting user.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "delete-user-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNotification = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const user = users.find((u) => u._id === id);
      const newMasterToggle = !user.notificationPreferences.masterToggle;
      const response = await axios.put(
        `${API_URL}/api/users/updateUser/${id}`,
        { notificationPreferences: { masterToggle: newMasterToggle } },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map((user) => (user._id === id ? response.data : user)));
      toast.success(`Notifications ${newMasterToggle ? "enabled" : "disabled"}`, {
        id: "toggle-notification-success",
      });
    } catch (error) {
      console.error("Error toggling notification:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage =
        error.response?.data?.message || error.message || "Error toggling notification.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "toggle-notification-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Commented out for now as per request
  /*
  const handleEdit = (user) => {
    setFormData({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone || "",
      masterToggle: user.notificationPreferences.masterToggle,
    });
    setFormErrors({});
    setEditId(user._id);
    setIsModalOpen(true);
  };
  */

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-700">Recent Users</h2>
          {/* <button
            onClick={() => {
              setFormData({ fullname: "", email: "", phone: "", masterToggle: true });
              setFormErrors({});
              setEditId(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-all shadow-md"
          >
            <FaPlus /> Add User
          </button> */}
        </div>

        {isLoading && (
          <div className="flex justify-center items-center mb-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-purple-900"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        {/* Table for medium and larger screens */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full bg-white rounded-lg">
            <thead>
              <tr className="border-b border-t text-gray-600">
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                {/* <th className="p-3 text-left">Actions</th> */}
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !isLoading && (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-gray-500">
                    No users found. Add a new user to get started!
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-3">{user.fullname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone || "N/A"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleNotification(user._id)}
                      className={`relative w-12 h-6 rounded-full transition duration-300 ${
                        user.notificationPreferences.masterToggle ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${
                          user.notificationPreferences.masterToggle ? "translate-x-6" : "translate-x-0"
                        }`}
                      ></span>
                    </button>
                  </td>
                  <td className="p-3 flex gap-3">
                    {/* <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-600 hover:text-blue-800 transition-all"
                      title="Edit"
                    >
                      <FaEdit size={18} />
                    </button> */}
                    {/* <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 transition-all"
                      title="Delete"
                    >
                      <FaTrash size={18} />
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Vertical cards for small screens */}
        <div className="block md:hidden">
          {users.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No users found. Add a new user to get started!</p>
          )}
          {users.map((user) => (
            <div
              key={user._id}
              className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-all"
            >
              <p className="font-semibold text-lg text-gray-800">{user.fullname}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">{user.phone || "N/A"}</p>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(user.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">Notifications:</span>
                <button
                  onClick={() => toggleNotification(user._id)}
                  className={`relative w-12 h-6 rounded-full transition duration-300 ${
                    user.notificationPreferences.masterToggle ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${
                      user.notificationPreferences.masterToggle ? "translate-x-6" : "translate-x-0"
                    }`}
                  ></span>
                </button>
              </div>
              <div className="mt-3 flex gap-3">
                {/* <button
                  onClick={() => handleEdit(user)}
                  className="bg-purple-900 text-white px-3 py-1 rounded-lg hover:bg-purple-800 transition-all"
                >
                  Edit
                </button> */}
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Add User (Edit mode commented out) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-all">
              <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
                {/* {editId ? "Edit User" : "Add New User"} */}Add New User
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      formErrors.fullname ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter full name"
                  />
                  {formErrors.fullname && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.fullname}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      formErrors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                  {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      formErrors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number (optional)"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Notifications Enabled</label>
                  <input
                    type="checkbox"
                    name="masterToggle"
                    checked={formData.masterToggle}
                    onChange={(e) => setFormData({ ...formData, masterToggle: e.target.checked })}
                    className="h-5 w-5 text-purple-900 focus:ring-purple-500 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ fullname: "", email: "", phone: "", masterToggle: true });
                    setFormErrors({});
                    setEditId(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-all ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Saving..." : /* editId ? "Update User" : */ "Add User"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentUser;
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaEdit } from "react-icons/fa";

const RecentUser = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data || {});
  const { token, _id: adminUserId, role } = userData;
  const API_URL = import.meta.env.VITE_REACT_BACKEND_URL ?? "https://backend.talentid.app";

  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    verifiedDocuments: false,
  });
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState({ show: false, userId: null, newValue: null });

  const isAdmin = ["Admin", "Super_Admin"].includes(role);

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
        const sortedUsers = usersData;
                console.log(sortedUsers)
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

  const handleEdit = (user) => {
    if (!isAdmin) {
      toast.error("Only admins can edit users", { id: "edit-user-error" });
      return;
    }
    setFormData({
      fullname: user.fullname,
      email: user.email,
      phone: user.phone || "",
      verifiedDocuments: user.verifiedDocuments || false,
    });
    setFormErrors({});
    setEditId(user._id);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!isAdmin) {
      toast.error("Only admins can update users", { id: "save-user-error" });
      return;
    }
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");
    try {
      if (!token || !adminUserId) {
        throw new Error("Authentication token or admin user ID missing. Please log in.");
      }
      const payload = {
        adminUserId,
        userId: editId,
        fullname: formData.fullname,
        email: formData.email,
        phone: formData.phone || undefined,
        verifiedDocuments: formData.verifiedDocuments,
      };

      const response = await axios.post(`${API_URL}/api/admin/updateUserData`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(users.map((user) => (user._id === editId ? response.data.data : user)));
      toast.success("User updated successfully", { id: "update-user-success" });

      setFormData({ fullname: "", email: "", phone: "", verifiedDocuments: false });
      setFormErrors({});
      setIsModalOpen(false);
      setEditId(null);
    } catch (error) {
      console.error("Error updating user:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error updating user.";
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
    if (!isAdmin) {
      toast.error("Only admins can delete users", { id: "delete-user-error" });
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      if (!token || !adminUserId) {
        throw new Error("Authentication token or admin user ID missing. Please log in.");
      }
      await axios.delete(`${API_URL}/api/admin/deleteUserAccount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: { adminUserId, userId: id },
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

  const toggleVerification = async (id, newValue) => {
    if (!isAdmin) {
      toast.error("Only admins can toggle document verification", { id: "toggle-verification-error" });
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      if (!token || !adminUserId) {
        throw new Error("Authentication token or admin user ID missing. Please log in.");
      }
      const response = await axios.post(
        `${API_URL}/api/admin/updateUserData`,
        { adminUserId, userId: id, verifiedDocuments: newValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUsers(users.map((user) => (user._id === id ? response.data.data : user)));
      toast.success(`Document verification ${newValue ? "enabled" : "disabled"}`, {
        id: "toggle-verification-success",
      });
    } catch (error) {
      console.error("Error toggling document verification:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage =
        error.response?.data?.message || error.message || "Error toggling document verification.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "toggle-verification-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
      setShowConfirm({ show: false, userId: null, newValue: null });
    }
  };

  const handleToggleClick = (userId, currentValue) => {
    setShowConfirm({ show: true, userId, newValue: !currentValue });
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-700">Recent Users</h2>
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

        {/* Confirmation Popup */}
        {showConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Confirm Document Verification
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {showConfirm.newValue ? "verify" : "unverify"} this users documents?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirm({ show: false, userId: null, newValue: null })}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => toggleVerification(showConfirm.userId, showConfirm.newValue)}
                  className="bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800"
                >
                  Confirm
                </button>
              </div>
            </div>
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
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Document</th>
                <th className="p-3 text-left">Document Verification</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && !isLoading && (
                <tr>
                  <td colSpan="6" className="p-3 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 transition-all">
                  <td className="p-3">{user.fullname}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.phone || "N/A"}</td>
                  <td className="p-3">{user.role || "N/A"}</td>
                  <td className="p-3">
                    {user.documents ? 
                    <Link to={user.documents} target="_blank">
                      <img src="https://cdn-icons-png.flaticon.com/128/2258/2258853.png" alt="image"  className="size-5"/>
                    </Link>
                      : <img src="https://cdn-icons-png.flaticon.com/128/2782/2782973.png" className="w-5 h-5" />
                    }</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleToggleClick(user._id, user.verifiedDocuments)}
                      className={`relative w-12 h-6 rounded-full transition duration-300 ${user.verifiedDocuments ? "bg-green-500" : "bg-gray-300"
                        } ${!isAdmin ? "cursor-not-allowed opacity-50" : ""}`}
                      disabled={!isAdmin}
                    >
                      <span
                        className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${user.verifiedDocuments ? "translate-x-6" : "translate-x-0"
                          }`}
                      ></span>
                    </button>
                  </td>
                  <td className="p-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(user)}
                      className={`text-blue-600 hover:text-blue-800 transition-all ${!isAdmin ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      title="Edit"
                      disabled={!isAdmin}
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className={`text-red-600 hover:text-red-800 transition-all ${!isAdmin ? "cursor-not-allowed opacity-50" : ""
                        }`}
                      title="Delete"
                      disabled={!isAdmin}
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="block md:hidden">
          {users.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No users found.</p>
          )}
          {users.map((user) => (
            <div
              key={user._id}
              className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-all"
            >
              <p className="font-semibold text-lg text-gray-800">{user.fullname}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-gray-600 text-sm">{user.phone || "N/A"}</p>
              <p className="text-gray-600 text-sm">Role: {user.role || "N/A"}</p>
              <p className="text-sm text-gray-500 mt-1">
                Created: {new Date(user.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-600">Document Verification:</span>
                <button
                  onClick={() => handleToggleClick(user._id, user.verifiedDocuments)}
                  className={`relative w-12 h-6 rounded-full transition duration-300 ${user.verifiedDocuments ? "bg-green-500" : "bg-gray-300"
                    } ${!isAdmin ? "cursor-not-allowed opacity-50" : ""}`}
                  disabled={!isAdmin}
                >
                  <span
                    className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${user.verifiedDocuments ? "translate-x-6" : "translate-x-0"
                      }`}
                  ></span>
                </button>
              </div>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleEdit(user)}
                  className={`bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-all ${!isAdmin ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  disabled={!isAdmin}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className={`bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-all ${!isAdmin ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  disabled={!isAdmin}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Edit User */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-all">
              <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">Edit User</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.fullname ? "border-red-500" : "border-gray-300"
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
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.email ? "border-red-500" : "border-gray-300"
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
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${formErrors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone number (optional)"
                  />
                  {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Documents Verified</label>
                  <input
                    type="checkbox"
                    name="verifiedDocuments"
                    checked={formData.verifiedDocuments}
                    onChange={(e) => setFormData({ ...formData, verifiedDocuments: e.target.checked })}
                    className="h-5 w-5 text-purple-900 focus:ring-purple-500 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormData({ fullname: "", email: "", phone: "", verifiedDocuments: false });
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
                  className={`bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-all ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isLoading ? "Updating..." : "Update User"}
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
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTrash, FaEdit, FaArrowLeft, FaSearch } from "react-icons/fa";

const RecentUser = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.data || {});
  const { token, _id: adminUserId, role } = userData;
  const API_URL = import.meta.env.VITE_REACT_BACKEND_URL ?? "https://backend.talentid.app";

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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
    if (!selectedUser) {
      fetchUsers();
    }
  }, [selectedUser, token, navigate]);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const response = await axios.get(`${API_URL}/api/users/fetchAllusers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const usersData = response.data.data;
      if (!Array.isArray(usersData)) {
        console.error("Expected array from fetchAllusers, got:", usersData);
        setError("Invalid data format received from server.");
        setUsers([]);
      } else {
        setUsers(usersData);
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
      fullname: user.fullname || "",
      email: user.email || "",
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
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === editId ? response.data.data : user)));
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
        headers: { Authorization: `Bearer ${token}` },
        data: { adminUserId, userId: id },
      });
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers((prevUsers) => prevUsers.map((user) => (user._id === id ? response.data.data : user)));
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

  const handleViewMore = (user) => {
    setSelectedUser(user);
  };

  const handleBack = () => {
    setSelectedUser(null);
  };

  const formatDate = (date) => {
    return date
      ? new Date(date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "N/A";
  };

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-700">
            {selectedUser ? "User Details" : "User Management"}
          </h1>
          {!selectedUser && (
            <div className="mt-4 md:mt-0 flex items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled
                />
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {selectedUser ? (
            <div>
              <div className="flex items-center mb-6">
                <button
                  onClick={handleBack}
                  className="mr-4 text-purple-700 hover:text-purple-900 transition-all"
                  aria-label="Back to Users"
                >
                  <FaArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">{selectedUser.fullname || "User Details"}</h2>
              </div>

              <div className="space-y-8">
                {/* Personal Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Full Name</p>
                      <p className="text-gray-800 truncate">{selectedUser.fullname || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email</p>
                      <p className="text-gray-800 truncate">{selectedUser.email || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Phone</p>
                      <p className="text-gray-800">{selectedUser.phone || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Documents</p>
                      <p>
                        {selectedUser.documents ? (
                          <a
                            href={selectedUser.documents}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                          >
                            View Documents
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">User Image</p>
                      <p>
                        {selectedUser.userImage ? (
                          <a
                            href={selectedUser.userImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 hover:underline"
                          >
                            View Image
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Company</p>
                      <p className="text-gray-800">{selectedUser.company || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Role</p>
                      <p className="text-gray-800">{selectedUser.role || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Company Size</p>
                      <p className="text-gray-800">{selectedUser.companySize || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Industry</p>
                      <p className="text-gray-800">{selectedUser.industry || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Designation</p>
                      <p className="text-gray-800">{selectedUser.designation || "N/A"}</p>
                    </div>
                  </div>
                </div>

                {/* Verification & Credits */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Verification & Credits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Verified Documents</p>
                      <p className="text-gray-800">{selectedUser.verifiedDocuments ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Email Verified</p>
                      <p className="text-gray-800">{selectedUser.isEmailVerified ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Account Verified</p>
                      <p className="text-gray-800">{selectedUser.isVerified ? "Yes" : "No"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Credits</p>
                      <p className="text-gray-800">{selectedUser.credits ?? 0}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Offer Letters Sent</p>
                      <p className="text-gray-800">{selectedUser.offerLettersSent ?? 0}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Offer Releases</p>
                      <p className="text-gray-800">{selectedUser.OfferReleases ?? 0}</p>
                    </div>
                  </div>
                </div>

                {/* Subscription & Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">Subscription & Activity</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Subscription Plan</p>
                      <p className="text-gray-800">{selectedUser.subscriptionPlan || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Subscription Expiry</p>
                      <p className="text-gray-800">{formatDate(selectedUser.subscriptionExpiry)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Created At</p>
                      <p className="text-gray-800">{formatDate(selectedUser.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Updated At</p>
                      <p className="text-gray-800">{formatDate(selectedUser.updatedAt)}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Notification Preferences</p>
                      <p className="text-gray-800">
                        Master Toggle: {selectedUser.notificationPreferences?.masterToggle ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-sm font-medium text-gray-600">Activity Logs</p>
                      <p className="text-gray-800 break-words">
                        {selectedUser.activityLogs?.length > 0
                          ? selectedUser.activityLogs
                              .map((log) => `${log.action} at ${formatDate(log.timestamp)}`)
                              .join(", ")
                          : "None"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleBack}
                  className="bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-all flex items-center gap-2"
                  aria-label="Back to Users List"
                >
                  <FaArrowLeft /> Back to Users
                </button>
              </div>
            </div>
          ) : (
            <>
              {isLoading && (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-700"></div>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
                  <p>{error}</p>
                </div>
              )}

              {/* Confirmation Modal */}
              {showConfirm.show && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                  <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full animate-fade-in">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                      Confirm Document Verification
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Are you sure you want to {showConfirm.newValue ? "verify" : "unverify"} this user documents?
                    </p>
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => setShowConfirm({ show: false, userId: null, newValue: null })}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-all"
                        aria-label="Cancel Verification"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => toggleVerification(showConfirm.userId, showConfirm.newValue)}
                        className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-all"
                        aria-label="Confirm Verification"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* User Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.length === 0 && !isLoading && (
                  <p className="col-span-full text-center text-gray-500 text-lg">No users found.</p>
                )}
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">{user.fullname || "N/A"}</h3>
                      <span
                        className={`text-sm px-2 py-1 rounded-full ${
                          user.role === "Admin" || user.role === "Super_Admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.role || "N/A"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{user.email || "N/A"}</p>
                    <p className="text-sm text-gray-600">{user.phone || "N/A"}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-600">Document Verification:</span>
                      <button
                        onClick={() => handleToggleClick(user._id, user.verifiedDocuments)}
                        className={`relative w-12 h-6 rounded-full transition duration-300 ${
                          user.verifiedDocuments ? "bg-green-500" : "bg-gray-300"
                        } ${!isAdmin ? "cursor-not-allowed opacity-50" : ""}`}
                        disabled={!isAdmin}
                        aria-label={`Toggle document verification for ${user.fullname}`}
                      >
                        <span
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${
                            user.verifiedDocuments ? "translate-x-6" : "translate-x-0"
                          }`}
                        ></span>
                      </button>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-600">Documents:</span>
                      {user.documents ? (
                        <a
                          href={user.documents}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:underline"
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/128/2258/2258853.png"
                            alt="Document"
                            className="w-5 h-5"
                          />
                        </a>
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/2782/2782973.png"
                          alt="No Document"
                          className="w-5 h-5"
                        />
                      )}
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className={`p-2 rounded-full ${
                            isAdmin
                              ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          } transition-all`}
                          disabled={!isAdmin}
                          aria-label={`Edit user ${user.fullname}`}
                          title="Edit User"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className={`p-2 rounded-full ${
                            isAdmin
                              ? "bg-red-100 text-red-600 hover:bg-red-200"
                              : "bg-gray-100 text-gray-400 cursor-not-allowed"
                          } transition-all`}
                          disabled={!isAdmin}
                          aria-label={`Delete user ${user.fullname}`}
                          title="Delete User"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleViewMore(user)}
                        className="text-purple-600 hover:text-purple-800 font-medium transition-all"
                        aria-label={`View details for ${user.fullname}`}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Edit Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg animate-fade-in">
                <h2 className="text-2xl font-bold text-purple-700 mb-6">Edit User</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
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
                  <div className="flex items-center gap-3">
                    <label className="text-sm font-medium text-gray-700">Documents Verified</label>
                    <input
                      type="checkbox"
                      name="verifiedDocuments"
                      checked={formData.verifiedDocuments}
                      onChange={(e) => setFormData({ ...formData, verifiedDocuments: e.target.checked })}
                      className="h-5 w-5 text-purple-700 focus:ring-purple-500 rounded"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setFormData({ fullname: "", email: "", phone: "", verifiedDocuments: false });
                      setFormErrors({});
                      setEditId(null);
                    }}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-all"
                    aria-label="Cancel Edit"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className={`bg-purple-700 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-all ${
                      isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    aria-label="Update User"
                  >
                    {isLoading ? "Updating..." : "Update User"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Styles */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
};

export default RecentUser;
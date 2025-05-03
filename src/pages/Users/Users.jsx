import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaTrash, FaEdit, FaArrowLeft, FaSearch, FaFileCsv,
  FaSort, FaSortUp, FaSortDown, FaEye, FaFilter
} from "react-icons/fa";

const RecentUser = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.user?.data || {});
  const { token, _id: adminUserId, role } = userData;
  const API_URL = import.meta.env.VITE_REACT_BACKEND_URL ?? "https://backend.talentid.app";

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    company: "",
    companySize: "",
    industry: "",
    designation: "",
    role: "",
    verifiedDocuments: false,
    isEmailVerified: false,
    isVerified: false,
    credits: 0,
    subscriptionPlan: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingState, setLoadingState] = useState("idle"); // idle, loading, success, error
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState({ show: false, userId: null, newValue: null, action: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [selectedRows, setSelectedRows] = useState([]);
  const [bulkActionOpen, setBulkActionOpen] = useState(false);

  const isAdmin = ["Admin", "Super_Admin"].includes(role);

  useEffect(() => {
    if (!selectedUser) {
      fetchUsers();
    }
  }, [selectedUser, token, navigate]);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, users, sortConfig]);

  const filterUsers = () => {
    let tempUsers = [...users];

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      tempUsers = tempUsers.filter(user =>
        (user.fullname && user.fullname.toLowerCase().includes(searchLower)) ||
        (user.email && user.email.toLowerCase().includes(searchLower)) ||
        (user.phone && user.phone.toLowerCase().includes(searchLower)) ||
        (user.company && user.company.toLowerCase().includes(searchLower)) ||
        (user.role && user.role.toLowerCase().includes(searchLower))
      );
    }

    if (sortConfig.key) {
      tempUsers.sort((a, b) => {
        if (!a[sortConfig.key] && !b[sortConfig.key]) return 0;
        if (!a[sortConfig.key]) return 1;
        if (!b[sortConfig.key]) return -1;

        const aValue = typeof a[sortConfig.key] === 'string' ? a[sortConfig.key].toLowerCase() : a[sortConfig.key];
        const bValue = typeof b[sortConfig.key] === 'string' ? b[sortConfig.key].toLowerCase() : b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setPagination({
      ...pagination,
      total: tempUsers.length
    });

    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    const paginatedUsers = tempUsers.slice(startIndex, endIndex);

    setFilteredUsers(paginatedUsers);
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    setLoadingState("loading");
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
        setLoadingState("error");
      } else {
        setUsers(usersData);
        setLoadingState("success");
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
      setLoadingState("error");
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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked :
        type === 'number' ? Number(value) :
          value
    });
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
      company: user.company || "",
      companySize: user.companySize || "",
      industry: user.industry || "",
      designation: user.designation || "",
      role: user.role || "",
      verifiedDocuments: user.verifiedDocuments || false,
      isEmailVerified: user.isEmailVerified || false,
      isVerified: user.isVerified || false,
      credits: user.credits || 0,
      subscriptionPlan: user.subscriptionPlan || "",
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
        company: formData.company || undefined,
        companySize: formData.companySize || undefined,
        industry: formData.industry || undefined,
        designation: formData.designation || undefined,
        role: formData.role || undefined,
        verifiedDocuments: formData.verifiedDocuments,
        isEmailVerified: formData.isEmailVerified,
        isVerified: formData.isVerified,
        credits: formData.credits,
        subscriptionPlan: formData.subscriptionPlan || undefined,
      };

      const response = await axios.post(`${API_URL}/api/admin/updateUserData`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prevUsers) => prevUsers.map((user) => (user._id === editId ? response.data.data : user)));
      toast.success("User updated successfully", { id: "update-user-success" });

      setFormData({
        fullname: "", email: "", phone: "", company: "", companySize: "",
        industry: "", designation: "", role: "",
        verifiedDocuments: false, isEmailVerified: false, isVerified: false,
        credits: 0, subscriptionPlan: ""
      });
      setFormErrors({});
      setIsModalOpen(false);
      setEditId(null);
      window.location.reload();
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

  const confirmDelete = (userId) => {
    setShowConfirm({ show: true, userId, action: 'delete' });
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
      setShowConfirm({ show: false, userId: null, action: null });
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
      setShowConfirm({ show: false, userId: null, newValue: null, action: null });
    }
  };

  const handleToggleClick = (userId, currentValue) => {
    setShowConfirm({ show: true, userId, newValue: !currentValue, action: 'verify' });
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

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ml-1 text-gray-400" />;
    return sortConfig.direction === 'asc' ?
      <FaSortUp className="ml-1 text-purple-700" /> :
      <FaSortDown className="ml-1 text-purple-700" />;
  };

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  const handleLimitChange = (e) => {
    setPagination({ ...pagination, page: 1, limit: Number(e.target.value) });
  };

  const handleRowSelect = (userId) => {
    setSelectedRows(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredUsers.map(user => user._id));
    }
  };

  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      toast.error("No users selected", { id: "bulk-action-error" });
      return;
    }

    switch (action) {
      case 'delete':
        setShowConfirm({ show: true, userId: selectedRows, action: 'bulkDelete' });
        break;
      case 'verify':
        setShowConfirm({ show: true, userId: selectedRows, newValue: true, action: 'bulkVerify' });
        break;
      case 'unverify':
        setShowConfirm({ show: true, userId: selectedRows, newValue: false, action: 'bulkVerify' });
        break;
      default:
        break;
    }

    setBulkActionOpen(false);
  };

  const handleBulkDelete = async (userIds) => {
    if (!isAdmin) {
      toast.error("Only admins can delete users", { id: "bulk-delete-error" });
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      if (!token || !adminUserId) {
        throw new Error("Authentication token or admin user ID missing. Please log in.");
      }

      const successIds = [];
      const failedIds = [];

      for (const userId of userIds) {
        try {
          await axios.delete(`${API_URL}/api/admin/deleteUserAccount`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { adminUserId, userId },
          });
          successIds.push(userId);
        } catch (error) {
          console.log(error)
          failedIds.push(userId);
        }
      }

      if (successIds.length > 0) {
        setUsers((prevUsers) => prevUsers.filter((user) => !successIds.includes(user._id)));
        toast.success(`${successIds.length} users deleted successfully`, { id: "bulk-delete-success" });
      }

      if (failedIds.length > 0) {
        toast.error(`Failed to delete ${failedIds.length} users`, { id: "bulk-delete-partial-error" });
      }

      setSelectedRows([]);
    } catch (error) {
      console.error("Error during bulk delete:", error);
      toast.error("Error during bulk delete operation", { id: "bulk-delete-error" });
    } finally {
      setIsLoading(false);
      setShowConfirm({ show: false, userId: null, action: null });
    }
  };

  const handleBulkVerification = async (userIds, newValue) => {
    if (!isAdmin) {
      toast.error("Only admins can modify verification status", { id: "bulk-verify-error" });
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      if (!token || !adminUserId) {
        throw new Error("Authentication token or admin user ID missing. Please log in.");
      }

      const successIds = [];
      const failedIds = [];

      for (const userId of userIds) {
        try {
          const response = await axios.post(
            `${API_URL}/api/admin/updateUserData`,
            { adminUserId, userId, verifiedDocuments: newValue },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          successIds.push(userId);
          
          setUsers((prevUsers) => prevUsers.map((user) =>
            user._id === userId ? response.data.data : user
        ));
        window.location.reload();

        } catch (error) {
          console.log(error)
          failedIds.push(userId);
        }
      }

      if (successIds.length > 0) {
        toast.success(`${successIds.length} users ${newValue ? 'verified' : 'unverified'} successfully`,
          { id: "bulk-verify-success" });
      }

      if (failedIds.length > 0) {
        toast.error(`Failed to update ${failedIds.length} users`, { id: "bulk-verify-partial-error" });
      }

      setSelectedRows([]);
    } catch (error) {
      console.error("Error during bulk verification:", error);
      toast.error("Error during bulk verification operation", { id: "bulk-verify-error" });
    } finally {
      setIsLoading(false);
      setShowConfirm({ show: false, userId: null, newValue: null, action: null });
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Full Name', 'Email', 'Phone', 'Company', 'Role', 'Documents Verified',
      'Email Verified', 'Account Verified', 'Credits', 'Created At'
    ];

    const csvRows = [
      headers.join(','),
      ...users.map(user => [
        `"${user.fullname || ''}"`,
        `"${user.email || ''}"`,
        `"${user.phone || ''}"`,
        `"${user.company || ''}"`,
        `"${user.role || ''}"`,
        user.verifiedDocuments ? 'Yes' : 'No',
        user.isEmailVerified ? 'Yes' : 'No',
        user.isVerified ? 'Yes' : 'No',
        user.credits || 0,
        formatDate(user.createdAt)
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `users_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalPages = Math.ceil(pagination.total / pagination.limit);

  const noResults = loadingState === 'success' && users.length === 0;

  const noMatches = users.length > 0 && filteredUsers.length === 0;

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-8xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-5 mb-6 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-purple-700">
            {selectedUser ? "User Details" : "User Management"}
          </h1>
          {!selectedUser && (
            <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="relative">
                <button
                  onClick={() => setBulkActionOpen(!bulkActionOpen)}
                  disabled={selectedRows.length === 0}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${selectedRows.length > 0
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  <FaFilter size={14} />
                  Bulk Actions ({selectedRows.length})
                </button>

                {bulkActionOpen && (
                  <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                      <button
                        onClick={() => handleBulkAction('delete')}
                        className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        role="menuitem"
                      >
                        Delete Selected
                      </button>
                      <button
                        onClick={() => handleBulkAction('verify')}
                        className="block w-full text-left px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                        role="menuitem"
                      >
                        Verify Documents
                      </button>
                      <button
                        onClick={() => handleBulkAction('unverify')}
                        className="block w-full text-left px-4 py-2 text-sm text-orange-700 hover:bg-orange-50"
                        role="menuitem"
                      >
                        Unverify Documents
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaFileCsv size={14} />
                Export CSV
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {selectedUser ? (
            <div className="p-6">
              <div className="flex items-center mb-6">
                <button
                  onClick={handleBack}
                  className="mr-4 text-purple-700 hover:text-purple-900 transition-all"
                  aria-label="Back to Users"
                >
                  <FaArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold text-gray-800">{selectedUser.fullname || "User Details"}</h2>

                {isAdmin && (
                  <div className="ml-auto">
                    <button
                      onClick={() => handleEdit(selectedUser)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <FaEdit size={14} />
                      Edit User
                    </button>
                  </div>
                )}
              </div>

              {/* User Details Tabs */}
              <div className="mb-6 border-b">
                <div className="flex overflow-x-auto">
                  <button
                    className="px-4 py-2 text-purple-700 border-b-2 border-purple-700 font-medium"
                  >
                    User Information
                  </button>
                </div>
              </div>

              {/* User Details Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Personal Information</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Full Name</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.fullname || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Email</td>
                        <td className="text-sm text-gray-800 py-2 break-all">{selectedUser.email || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Phone</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.phone || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Documents</td>
                        <td className="text-sm text-gray-800 py-2">
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
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">User Image</td>
                        <td className="text-sm text-gray-800 py-2">
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
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Company Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Company Information</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Company</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.company || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Company Size</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.companySize || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Industry</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.industry || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Designation</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.designation || "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Account Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">Account Information</h3>
                  <table className="w-full">
                    <tbody>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Role</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.role || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Documents Verified</td>
                        <td className="text-sm text-gray-800 py-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                            ${selectedUser.verifiedDocuments ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedUser.verifiedDocuments ? "Verified" : "Not Verified"}
                          </span>
                          {isAdmin && (
                            <button
                              onClick={() => handleToggleClick(selectedUser._id, selectedUser.verifiedDocuments)}
                              className="ml-2 text-purple-600 hover:text-purple-800"
                            >
                              {selectedUser.verifiedDocuments ? "Unverify" : "Verify"}
                            </button>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Email Verified</td>
                        <td className="text-sm text-gray-800 py-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                            ${selectedUser.isEmailVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedUser.isEmailVerified ? "Verified" : "Not Verified"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Account Verified</td>
                        <td className="text-sm text-gray-800 py-2">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                            ${selectedUser.isVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {selectedUser.isVerified ? "Verified" : "Not Verified"}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Credits</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.credits || 0}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Subscription Plan</td>
                        <td className="text-sm text-gray-800 py-2">{selectedUser.subscriptionPlan || "N/A"}</td>
                      </tr>
                      <tr>
                        <td className="text-sm font-medium text-gray-600 py-2">Created At</td>
                        <td className="text-sm text-gray-800 py-2">{formatDate(selectedUser.createdAt)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              {isAdmin && (
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => confirmDelete(selectedUser._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
                  >
                    <FaTrash size={14} />
                    Delete User
                  </button>
                </div>
              )}
            </div>
          ) : (
            // User List View
            <>
              {/* Loading State */}
              {loadingState === "loading" && (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto"></div>
                  <p className="mt-2 text-gray-600">Loading users...</p>
                </div>
              )}

              {/* Error State */}
              {loadingState === "error" && (
                <div className="p-6 text-center">
                  <p className="text-red-600">{error}</p>
                  <button
                    onClick={fetchUsers}
                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Retry
                  </button>
                </div>
              )}

              {/* No Results */}
              {noResults && (
                <div className="p-6 text-center">
                  <p className="text-gray-600">No users found.</p>
                </div>
              )}

              {/* No Matches */}
              {noMatches && (
                <div className="p-6 text-center">
                  <p className="text-gray-600">No users match your search criteria.</p>
                </div>
              )}

              {/* Users Table */}
              {loadingState === "success" && filteredUsers.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === filteredUsers.length && filteredUsers.length > 0}
                            onChange={handleSelectAll}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("fullname")}
                        >
                          Full Name {getSortIcon("fullname")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("email")}
                        >
                          Email {getSortIcon("email")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("role")}
                        >
                          Role {getSortIcon("role")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("verifiedDocuments")}
                        >
                          Documents {getSortIcon("verifiedDocuments")}
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort("createdAt")}
                        >
                          Created At {getSortIcon("createdAt")}
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUsers.map((user) => (
                        <tr key={user._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(user._id)}
                              onChange={() => handleRowSelect(user._id)}
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.fullname || "N/A"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 break-all">{user.email || "N/A"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role || "N/A"}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold
                              ${user.verifiedDocuments ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {user.verifiedDocuments ? "Verified" : "Not Verified"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(user.createdAt)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleViewMore(user)}
                                className="text-purple-600 hover:text-purple-900"
                                title="View Details"
                              >
                                <FaEye size={16} />
                              </button>
                              {isAdmin && (
                                <>
                                  <button
                                    onClick={() => handleEdit(user)}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="Edit User"
                                  >
                                    <FaEdit size={16} />
                                  </button>
                                  <button
                                    onClick={() => confirmDelete(user._id)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete User"
                                  >
                                    <FaTrash size={16} />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              {loadingState === "success" && filteredUsers.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <span className="text-sm text-gray-700">
                      Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                      {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} entries
                    </span>
                    <select
                      value={pagination.limit}
                      onChange={handleLimitChange}
                      className="border rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className={`px-4 py-2 rounded-lg ${pagination.page === 1
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                    >
                      Previous
                    </button>
                    <div className="flex gap-1">
                      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-4 py-2 rounded-lg ${pagination.page === page
                              ? "bg-purple-600 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === totalPages}
                      className={`px-4 py-2 rounded-lg ${pagination.page === totalPages
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                        }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Edit User</h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${formErrors.fullname ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                      }`}
                  />
                  {formErrors.fullname && <p className="text-red-500 text-xs mt-1">{formErrors.fullname}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${formErrors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                      }`}
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${formErrors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
                      }`}
                  />
                  {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Size</label>
                  <input
                    type="text"
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Industry</label>
                  <input
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Select Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                    <option value="Super_Admin">Super Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Credits</label>
                  <input
                    type="number"
                    name="credits"
                    value={formData.credits}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subscription Plan</label>
                  <input
                    type="text"
                    name="subscriptionPlan"
                    value={formData.subscriptionPlan}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="verifiedDocuments"
                      checked={formData.verifiedDocuments}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Documents Verified</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isEmailVerified"
                      checked={formData.isEmailVerified}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Email Verified</span>
                  </label>
                </div>
                <div className="md:col-span-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isVerified"
                      checked={formData.isVerified}
                      onChange={handleChange}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">Account Verified</span>
                  </label>
                </div>
              </form>
              {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setFormErrors({});
                    setError("");
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isLoading
                      ? "bg-purple-400 text-white cursor-not-allowed"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirm.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                {showConfirm.action === "delete" ? "Confirm Delete" :
                  showConfirm.action === "verify" ? "Confirm Verification" :
                    showConfirm.action === "bulkDelete" ? "Confirm Bulk Delete" :
                      "Confirm Bulk Verification"}
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                {showConfirm.action === "delete" ?
                  "Are you sure you want to delete this user? This action cannot be undone." :
                  showConfirm.action === "verify" ?
                    `Are you sure you want to ${showConfirm.newValue ? "verify" : "unverify"} documents for this user?` :
                    showConfirm.action === "bulkDelete" ?
                      `Are you sure you want to delete ${Array.isArray(showConfirm.userId) ? showConfirm.userId.length : 1} selected users? This action cannot be undone.` :
                      `Are you sure you want to ${showConfirm.newValue ? "verify" : "unverify"} documents for ${Array.isArray(showConfirm.userId) ? showConfirm.userId.length : 1} selected users?`}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirm({ show: false, userId: null, newValue: null, action: null })}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (showConfirm.action === "delete") {
                      handleDelete(showConfirm.userId);
                    } else if (showConfirm.action === "verify") {
                      toggleVerification(showConfirm.userId, showConfirm.newValue);
                    } else if (showConfirm.action === "bulkDelete") {
                      handleBulkDelete(showConfirm.userId);
                    } else if (showConfirm.action === "bulkVerify") {
                      handleBulkVerification(showConfirm.userId, showConfirm.newValue);
                    }
                  }}
                  className={`px-4 py-2 rounded-lg ${showConfirm.action.includes("delete")
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                >
                  Confirm
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
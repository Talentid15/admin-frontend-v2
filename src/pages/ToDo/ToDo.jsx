import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import NewLoader from "../../components/Newloader";

const TodoList = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.data || {});
  const { token } = userData;
  const API_URL = import.meta.env.VITE_REACT_BACKEND_URL ?? "https://backend.talentid.app";

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "", date: "" });
  const [formErrors, setFormErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all todos on mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const response = await axios.get(`${API_URL}/api/todo/getAllTodos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Ensure response.data is an array
      if (!Array.isArray(response.data)) {
        console.error("Expected array from getAllTodos, got:", response.data);
        setTodos([]);
      } else {
        setTodos(response.data);
      }
    } catch (error) {
      console.error("Error fetching todos:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error fetching todos.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "fetch-todos-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!newTodo.title.trim()) errors.title = "Title is required";
    if (!newTodo.description.trim()) errors.description = "Description is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addTodo = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const payload = {
        title: newTodo.title,
        description: newTodo.description,
        isCompleted: false,
        date: newTodo.date || null,
      };
      let response;
      if (editId) {
        response = await axios.put(`${API_URL}/api/todo/update-todo/${editId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(todos.map((todo) => (todo._id === editId ? response.data : todo)));
        toast.success("Todo updated successfully", { id: "update-todo-success" });
      } else {
        response = await axios.post(`${API_URL}/api/todo/createNewTodo`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos([...todos, response.data]);
        toast.success("Todo created successfully", { id: "create-todo-success" });
      }
      setNewTodo({ title: "", description: "", date: "" });
      setFormErrors({});
      setEditId(null);
      setShowPopup(false);
    } catch (error) {
      console.error("Error saving todo:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error saving todo.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "save-todo-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      await axios.delete(`${API_URL}/api/todo/delete-todo/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully", { id: "delete-todo-success" });
    } catch (error) {
      console.error("Error deleting todo:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error deleting todo.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "delete-todo-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = async (id, currentIsCompleted) => {
    setIsLoading(true);
    setError("");
    try {
      if (!token) {
        throw new Error("Authentication token missing. Please log in.");
      }
      const newIsCompleted = !currentIsCompleted;
      const response = await axios.put(
        `${API_URL}/api/todo/update-todo/${id}`,
        { isCompleted: newIsCompleted },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
      toast.success(`Todo marked as ${newIsCompleted ? "completed" : "pending"}`, {
        id: "toggle-todo-success",
      });
    } catch (error) {
      console.error("Error toggling todo:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      const errorMessage = error.response?.data?.message || error.message || "Error toggling todo.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "toggle-todo-error" });
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const editTodo = (todo) => {
    setNewTodo({
      title: todo.title,
      description: todo.description,
      date: todo.date ? new Date(todo.date).toISOString().split("T")[0] : "",
    });
    setFormErrors({});
    setEditId(todo._id);
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen flex p-4">
      <div className="w-full bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-6">Todo List</h2>

        {isLoading && (
          <NewLoader/>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              showCompleted ? "bg-purple-900 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {showCompleted ? <FaEyeSlash /> : <FaEye />}
            {showCompleted ? "Show All" : "Show Completed"}
          </button>
          <button
            onClick={() => {
              setNewTodo({ title: "", description: "", date: "" });
              setFormErrors({});
              setEditId(null);
              setShowPopup(true);
            }}
            className="flex items-center gap-2 bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-all shadow-md"
          >
            <FaPlus /> Create New Task
          </button>
        </div>

        {/* Todo List */}
        <div className="grid gap-4">
          {Array.isArray(todos) && todos.length === 0 && !isLoading && (
            <p className="text-center text-gray-500">No todos found. Create a new task to get started!</p>
          )}
          {Array.isArray(todos) &&
            todos
              .filter((todo) => (showCompleted ? todo.isCompleted : true))
              .map((todo) => (
                <div
                  key={todo._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-800">{todo.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{todo.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {todo.date
                        ? new Date(todo.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "No due date"}
                    </p>
                  </div>
                  <div className="flex flex-col items-center gap-2 mt-4 sm:mt-0">
                    <div className="flex gap-3">
                      <button
                        onClick={() => editTodo(todo)}
                        className="text-blue-600 hover:text-blue-800 transition-all"
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => deleteTodo(todo._id)}
                        className="text-red-600 hover:text-red-800 transition-all"
                        title="Delete"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                    <button
                      onClick={() => toggleComplete(todo._id, todo.isCompleted)}
                      className={`px-3 py-1 rounded-lg text-sm transition-all ${
                        todo.isCompleted
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "border border-purple-500 text-purple-500 hover:bg-purple-50"
                      }`}
                    >
                      {todo.isCompleted ? "Completed" : "Mark as Completed"}
                    </button>
                  </div>
                </div>
              ))}
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md transform transition-all">
              <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
                {editId ? "Edit Task" : "Create New Task"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                  <input
                    type="text"
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      formErrors.title ? "border-red-500" : "border-gray-300"
                    }`}
                    value={newTodo.title}
                    onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                    placeholder="Enter task title"
                  />
                  {formErrors.title && <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                  <textarea
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      formErrors.description ? "border-red-500" : "border-gray-300"
                    }`}
                    value={newTodo.description}
                    onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                    placeholder="Enter task description"
                    rows={4}
                  ></textarea>
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={newTodo.date}
                    onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setShowPopup(false);
                    setNewTodo({ title: "", description: "", date: "" });
                    setFormErrors({});
                    setEditId(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={addTodo}
                  disabled={isLoading}
                  className={`bg-purple-900 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition-all ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Saving..." : editId ? "Update Task" : "Add Task"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoList;
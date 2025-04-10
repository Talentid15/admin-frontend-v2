import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    {
      title: "Call with Tech team",
      description:
        "Try React. React has been designed from the start for gradual adoption, and you can use as little or as much React as you need.",
      date: "5 Jan 2025",
      completed: true,
    },
    {
      title: "Complete website",
      description:
        "Try React. React has been designed from the start for gradual adoption, and you can use as little or as much React as you need.",
      date: "5 Jan 2025",
      completed: false,
    },
  ]);

  const [newTask, setNewTask] = useState({ title: "", description: "", date: "" });
  const [showPopup, setShowPopup] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showCompleted, setShowCompleted] = useState(false);

  const addTask = () => {
    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = newTask;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { ...newTask, completed: false }]);
    }
    setNewTask({ title: "", description: "", date: "" });
    setShowPopup(false);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
    setShowPopup(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
    
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className={`px-4 py-2 rounded-lg ${
          showCompleted ? "bg-black text-white" : "bg-gray-200 text-gray-600"
            } flex items-center gap-2`}
          >
            {showCompleted ? <FaEyeSlash /> : <FaEye />} {showCompleted ? "Show All" : "Completed"}
          </button>
          <button
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 bg-purple-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            <FaPlus /> Create new task
          </button>
        </div>

        {/* Filtered Tasks */}
      {tasks
        .filter((task) => (showCompleted ? task.completed : true))
        .map((task, index) => (
          <div
            key={index}
            className="border-2 border-black rounded-lg p-4 mb-4 shadow-md flex justify-between items-start"
          >
            <div>
              <h3 className="font-bold text-lg">{task.title}</h3>
              <p className="text-gray-600 text-sm">{task.description}</p>
              <p className="font-bold text-sm mt-2">{task.date}</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-4">
                <button onClick={() => editTask(index)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => deleteTask(index)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
              <div>
                <button
                  onClick={() => toggleComplete(index)}
                  className={`mt-4 px-3 py-1 rounded border ${
                    task.completed ? "bg-gray-400 text-white" : "border-black"
                  }`}
                >
                  {task.completed ? "Completed" : "Mark as completed"}
                </button>
              </div>
            </div>
          </div>
        ))}

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl text-center font-bold mb-4">{editIndex !== null ? "Edit Task" : "Create New Task"}</h2>
            <div className="mb-2">
              <label className="block mb-1">Task Title</label>
              <input
                type="text"
                className="w-full p-2 border rounded-full"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Task Description</label>
              <textarea
                className="w-full p-2 border rounded"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Due Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded-full"
                value={newTask.date}
                onChange={(e) => setNewTask({ ...newTask, date: e.target.value })}
              />
            </div>
            <div className="flex justify-between">
            <button onClick={() => setShowPopup(false)} className="bg-gray-400 text-white px-4 py-2 rounded-full">
                Cancel
              </button>
              <button onClick={addTask} className="bg-purple-900 text-white px-4 py-2 rounded-full">
                {editIndex !== null ? "Update Task" : "Add Task"}
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;

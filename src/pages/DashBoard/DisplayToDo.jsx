import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const DisplayToDo = () => {
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
    {
      title: "Complete website",
      description:
        "Try React. React has been designed from the start for gradual adoption, and you can use as little or as much React as you need.",
      date: "5 Jan 2025",
      completed: false,
    },
    
    
  ]);

  const [showCompleted, setShowCompleted] = useState(false);

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const editTask = (index) => {
    // Edit functionality can be implemented here if needed
  };

  return (
    <div className="p-6 max-w-5xl h-[690px] overflow-auto no-scrollbar mx-auto rounded-lg shadow-md">
     <h2 className="text-2xl font-semibold mb-5 border-b p-2">ToDo's</h2>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowCompleted(!showCompleted)}
          className={`px-4 py-2 rounded-lg ${
            showCompleted ? "bg-black text-white" : "bg-gray-200 text-gray-600"
          } flex items-center gap-2`}
        >
          {showCompleted ? <FaEyeSlash /> : <FaEye />} {showCompleted ? "Show All" : "Completed"}
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
    </div>
  );
};

export default DisplayToDo;

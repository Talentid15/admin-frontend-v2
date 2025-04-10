import React, { useState } from "react";

const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, type: "Added a new team member", description: "Receive a notification when you get added to a position as the hiring manager", enabled: true },
        { id: 2, type: "Added as a Hiring Manager", description: "Receive a notification when you get added to a position as the hiring manager", enabled: true },
        { id: 3, type: "Added a new team member", description: "Receive a notification when you get added to a position as the hiring manager", enabled: true },
        { id: 4, type: "Added a new team member", description: "Receive a notification when you get added to a position as the hiring manager", enabled: true },
    
      ]);

      const toggleNotification = (id) => {
        setNotifications((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, enabled: !item.enabled } : item
          )
        );
      };
  return (
    <div className="min-h-[90vh] flex items-start justify-start flex-col bg-white px-8 w-full">
      <div className="flex  justify-start items-start cursor-pointer mt-5 ">
        <h1 className="text-black text-2xl  font-semibold ">Notification Settings</h1>
      </div>
      <div className="bg-white shadow-2xl rounded-2xl p-4 w-full max-w-[66rem] mt-2 h-96 overflow-y-auto no-scrollbar">
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg">
      <thead>
        <tr className="bg-white  text-black border-b">
          <th className="text-left p-3">Type</th>
          <th className="text-left p-3">Description</th>
          <th className="text-center p-3">Emails</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map((item) => (
          <tr key={item.id} className="">
            <td className="p-3">{item.type}</td>
            <td className="p-3 text-gray-600">{item.description}</td>
            <td className="p-3 text-center">
              <button
                onClick={() => toggleNotification(item.id)}
                className={`relative w-12 h-6 rounded-full transition duration-300 ${
                  item.enabled ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${
                    item.enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                ></span>
              </button>
              <span className="ml-2 font-medium text-gray-700">
                {item.enabled ? "On" : "Off"}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </div>
  );
};

export default Notifications;

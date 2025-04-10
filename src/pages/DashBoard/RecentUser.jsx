import React, { useState } from "react";


const RecentUser = () => {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: true,
      phone: "1234567890",
    },
    {
      id: 2,
      name: "Jainayak N",
      email: "jai@talentid.app",
        enabled: true,
        phone: "1234567890",
    },
    {
      id: 3,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: false,
        phone: "1234567890",
    },
    {
      id: 4,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: true,
        phone: "1234567890",
    },
    {
      id: 5,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: false,
        phone: "1234567890",
    },
    {
      id: 7,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: false,
        phone: "1234567890",
    },
    {
      id: 8,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: true,
        phone: "1234567890",
    },
    {
      id: 6,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: true,
        phone: "1234567890",
    },
    {
      id: 9,
      name: "Jainayak N",
      email: "jai@talentid.app",
      enabled: false,
        phone: "1234567890",
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: true,
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding user
  const handleSave = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) return;

    const newUser = {
      id: users.length + 1,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
      date: new Date().toDateString(),
    };

    setUsers([...users, newUser]); // Add new user to table
    setIsModalOpen(false); // Close modal
    setFormData({ firstName: "", lastName: "", email: "", role: true }); // Reset form
  };

  // Handle user deletion
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleNotification = (id) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === id ? { ...user, enabled: !user.enabled } : user
        )
      );
    };
  return (
    <div className="w-full max-w-5xl mx-auto  p-4 bg-white rounded-xl shadow-lg">
     <h2 className="text-2xl font-semibold mb-5">Recent Users</h2>

      <div className="overflow-x-auto h-[600px] no-scrollbar hidden md:block">
        <table className="w-full bg-white rounded-lg">
          <thead>
            <tr className="border-b border-t ">
              <th className="p-2 text-left">Full Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left pl-5">Phone</th>
              <th className="p-3 text-left pl-5">Status</th>
           
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3 text-center">
              <button
                onClick={() => toggleNotification(user.id)}
                className={`relative w-12 h-6 rounded-full transition duration-300 ${
                  user.enabled ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition duration-300 ${
                    user.enabled ? "translate-x-6" : "translate-x-0"
                  }`}
                ></span>
              </button>
              
            </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Vertical cards for small screens */}
      <div className="block md:hidden">
        {users.map((user) => (
          <div key={user.id} className="mb-4 p-4 border rounded-lg shadow-md bg-gray-50">
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500">
              <span className="px-2 py-1 bg-gray-200 rounded-full">{user.role}</span>
            </p>
            <p className="text-sm text-gray-400">{user.date}</p>
            <div className="mt-2 flex space-x-2">
              <button className="bg-gray-300 px-3 py-1 rounded-full">Edit</button>
              <button onClick={() => handleDelete(user.id)} className="text-red-600">🗑</button>
              <button className="bg-gray-300 px-3 py-1 rounded-full">View More</button>
            </div>

          </div>
        ))}
      </div>

     
    </div>
  );
};

export default RecentUser;
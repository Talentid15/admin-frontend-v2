import React, { useState } from "react";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";

const TeamManagement = () => {
  const [team, setTeam] = useState([
    { name: "Adarsh Jain", email: "adarsh@talentid.app", tid: "TID1514", role: "Super admin" },
    { name: "Sami Shaikh", email: "sami@talentid.app", tid: "TID1505", role: "Sub admin" },
  ]);
  const [showPopup, setShowPopup] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", tid: "", role: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddMember = () => {
    if (editingIndex !== null) {
      const updatedTeam = [...team];
      updatedTeam[editingIndex] = newMember;
      setTeam(updatedTeam);
      setEditingIndex(null);
    } else {
      setTeam([...team, newMember]);
    }
    setNewMember({ name: "", email: "", tid: "", role: "" });
    setShowPopup(false);
  };

  const handleEditMember = (index) => {
    setNewMember(team[index]);
    setEditingIndex(index);
    setShowPopup(true);
  };

  const handleDeleteMember = (index) => {
    setTeam(team.filter((_, i) => i !== index));
  };

  return (
    <div className=" w-full flex flex-col items-center">
      <div className="w-full flex justify-end mt-4 mr-12">
        <button
          onClick={() => setShowPopup(true)}
          className="flex items-center gap-2 bg-purple-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
        >
          <FaUserPlus /> Add a team member
        </button>
      </div>

      {/* Team List */}
      <div className="mt-4 w-full max-w-5xl">
        {team.map((member, index) => (
          <div key={index} className="flex justify-between items-center border rounded-lg p-4 shadow-md my-2">
            <div>
              <h3 className="font-bold text-lg">{member.name}</h3>
              <p className="text-gray-600">{member.email}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-xl">TID: <span className="text-black">{member.tid}</span></p>
              <p className="text-gray-500">{member.role}</p>
              <div className="flex gap-2 items-end justify-end">
                <button onClick={() => handleEditMember(index)} className="text-blue-500">
                  <FaEdit />
                </button>
                <button onClick={() => handleDeleteMember(index)} className="text-red-500">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-3xl shadow-lg w-[550px] h-[500px] overflow-auto no-scrollbar">
            <h2 className="text-xl text-center font-bold mb-4">{editingIndex !== null ? "Edit" : "Add"} a team member to your team</h2>
            <div className="mb-2">
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-full"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">Work Email</label>
              <input
                type="email"
                className="w-full p-2 border rounded-full"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              />
            </div>
            <div className="mb-2">
              <label className="block mb-1">TID</label>
              <input
                type="text"
                className="w-full p-2 border rounded-full"
                value={newMember.tid}
                onChange={(e) => setNewMember({ ...newMember, tid: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Job Role</label>
              <input
                type="text"
                className="w-full p-2 border rounded-full"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1"> Password</label>
              <input
                type="text"
                className="w-full p-2 border rounded-full"
                value={newMember.role}
                onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              />
            </div>
             {/* User Role Selection */}
        <div className="mb-8">
          <label className="font-bold">User Role</label>
          <div className="flex flex-col mt-2 space-y-1">
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="Super Admin" checked={newMember.role === "Super Admin"} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} />
              <span>Super Admin <span className="text-gray-500 text-sm">Full account access</span></span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="Sub Admin" checked={newMember.role === "Sub Admin"} onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} />
              <span>Sub Admin <span className="text-gray-500 text-sm">No access to billing</span></span>
            </label>
            
          </div>
        </div>
            <div className="flex justify-between">
            <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-400 text-white px-10 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleAddMember}
                className="bg-purple-900 text-white px-10 py-2 rounded-full"
              >
                {editingIndex !== null ? "Update" : "Save"}
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;

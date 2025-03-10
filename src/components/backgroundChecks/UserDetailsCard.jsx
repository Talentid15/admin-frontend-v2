import React from "react";

const UserDetailsCard = ({ user }) => {
  return (
    <div className="grid grid-cols-3 border-b py-4">
      <div>
        <h4 className="font-bold">{user.name}</h4>
        <p>{user.email}</p>
        <p>{user.mobile}</p>
        <span className="bg-green-100 text-green-600 text-xs py-1 px-2 rounded">Staff ID: {user.staffId}</span>
      </div>
      <div>{user.joiningDate}</div>
      <div className="flex items-center gap-2">
        <button className="text-blue-600">Edit</button>
        <button className="text-red-600">Delete</button>
      </div>
    </div>
  );
};

export default UserDetailsCard;

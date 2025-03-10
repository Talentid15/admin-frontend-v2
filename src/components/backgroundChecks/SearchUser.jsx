import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";

const SearchHistoryTable = ({ users, onDelete, onEdit }) => {
  return (
    <>
      <div className="w-full h-[590px] overflow-y-auto border border-gray-300 rounded-lg">
      <table className="w-full border-collapse text-sm hidden sm:block md:table">
          <thead>
            <tr className="bg-white text-left text-black-600 font-medium text-base font-sans">
              <th className="p-5 w-[40%]">User Details</th>
              <th className="p-5 w-[30%]">Joining</th>
              <th className="p-5 w-[20%]">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {users.map((user) => (
              <tr key={user.id}>
                {/* User Details */}
                <td className="p-4 mt-5 ml-3 flex flex-col bg-white border border-gray-300 h-full rounded-2xl">
                  <span className="font-bold text-lg text-gray-800">
                    {user.name}
                  </span>
                  <span className="text-[#7C7C7C] text-sm">{user.email}</span>
                  <span className="text-[#7C7C7C] text-sm">
                    {user.code} - {user.phone}
                  </span>
                  <span className="w-[50%] mt-5 bg-[#3DBF284F] text-black-600 text-xs font-semibold py-1 p-2 rounded-md">
                    Staff ID: {user.staffId}
                  </span>
                </td>

                {/* Joining Date */}
                <td className="p-6 text-[#838383] font-semibold text-sm">
                  {user.joiningDate}
                </td>

                {/* Actions */}
                <td className="p-6 flex items-center content-center gap-2">
                  <button
                    className="text-black-500 hover:text-purple-600"
                    aria-label="Edit"
                    onClick={() => onEdit(user)}
                  >
                    <FaRegEdit size={18} />
                  </button>
                  <button
                    className="text-black-500 hover:text-red-600"
                    aria-label="Delete"
                    onClick={() => onDelete(user.id)}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="block md:hidden space-y-4 p-3">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
          >
            <div className="flex flex-col space-y-1">
              <span className="font-bold text-lg text-gray-800">{user.name}</span>
              <span className="text-[#7C7C7C] text-sm">{user.email}</span>
              <span className="text-[#7C7C7C] text-sm">
                {user.code} - {user.phone}
              </span>
              <span className="mt-2 bg-[#3DBF284F] text-black-600 text-xs font-semibold py-1 px-2 rounded-md w-fit">
                Staff ID: {user.staffId}
              </span>
            </div>

            <div className="mt-3 text-[#838383] font-semibold text-sm">
              <span>Joining Date: {user.joiningDate}</span>
            </div>

            <div className="mt-4 flex items-center justify-start gap-4">
              <button
                className="text-black-500 hover:text-purple-600"
                aria-label="Edit"
                onClick={() => onEdit(user)}
              >
                <FaRegEdit size={18} />
              </button>
              <button
                className="text-black-500 hover:text-red-600"
                aria-label="Delete"
                onClick={() => onDelete(user.id)}
              >
                <RiDeleteBin6Line size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
};

export default SearchHistoryTable;

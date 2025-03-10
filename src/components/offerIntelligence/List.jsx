import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import photo from "../../assets/photo.png";
import BackButton from "../../assets/backButton.png";
import { useNavigate } from "react-router-dom";

function CandidateList() {
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "Soham",
      email: "soham@example.com",
      phone: "+91-6575757575",
      joiningDate: "17 July 2024",
      offerDate: "10 August 2024",
      status: "Active",
    },
    {
      id: 2,
      name: "Aarav",
      email: "aarav@example.com",
      phone: "+91-9876543210",
      joiningDate: "20 July 2024",
      offerDate: "12 August 2024",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Priya",
      email: "priya@example.com",
      phone: "+91-9087654321",
      joiningDate: "22 July 2024",
      offerDate: "15 August 2024",
      status: "Active",
    },
    {
      id: 4,
      name: "Raj",
      email: "raj@example.com",
      phone: "+91-8765432109",
      joiningDate: "25 July 2024",
      offerDate: "18 August 2024",
      status: "Active",
    },
    {
      id: 5,
      name: "Meera",
      email: "meera@example.com",
      phone: "+91-7654321098",
      joiningDate: "28 July 2024",
      offerDate: "20 August 2024",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Karan",
      email: "karan@example.com",
      phone: "+91-6543210987",
      joiningDate: "30 July 2024",
      offerDate: "23 August 2024",
      status: "Active",
    },
    {
      id: 7,
      name: "Sanya",
      email: "sanya@example.com",
      phone: "+91-5432109876",
      joiningDate: "1 August 2024",
      offerDate: "25 August 2024",
      status: "Active",
    },
    {
      id: 8,
      name: "Vikram",
      email: "vikram@example.com",
      phone: "+91-4321098765",
      joiningDate: "3 August 2024",
      offerDate: "28 August 2024",
      status: "Inactive",
    },
    {
      id: 9,
      name: "Ananya",
      email: "ananya@example.com",
      phone: "+91-3210987654",
      joiningDate: "5 August 2024",
      offerDate: "30 August 2024",
      status: "Active",
    },
    {
      id: 10,
      name: "Dev",
      email: "dev@example.com",
      phone: "+91-2109876543",
      joiningDate: "7 August 2024",
      offerDate: "1 September 2024",
      status: "Active",
    },
  ];

  return (
    <div className="flex flex-col w-full h-[90vh] ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        {/* Left Section */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <button className="text-gray-600 hover:text-gray-800">
            <img src={BackButton} alt="Back" className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold ml-2">Candidate List</h1>
        </div>

        {/* Right Section (Button) */}
        <button
          className="flex items-center gap-2 bg-[#652D96] text-white px-4 py-2 rounded-xl w-full md:w-auto justify-center"
          onClick={() => navigate("addCandidate")}
        >
          <AiOutlineUsergroupAdd className="h-5 w-5" />
          Add Candidate
        </button>
      </div>

      {/* Large Screen Table View */}
      <div className="p-4 w-full mt-4">
        <div className="max-h-[500px] overflow-y-auto no-scrollbar">
          <table className="w-full table-auto border-collapse rounded-md text-sm hidden sm:table">
            <thead>
              <tr className="bg-white text-center text-gray-800 font-medium">
                <th className="p-4 w-1/4">Details</th>
                <th className="p-4">Offer Date</th>
                <th className="p-4">Joining Date</th>
                <th className="p-4">Personal Details</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-[#EEEEEE]">
                  <td className="p-4">
                    <div className="flex items-center gap-4 bg-white p-2 rounded-md">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                          src={photo}
                          alt="Photo"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between items-center">
                          <p className="font-semibold text-lg text-gray-800">
                            {user.name}
                          </p>
                          <div
                            className={`flex items-center gap-2 font-semibold px-3 rounded-md ${
                              user.status === "Active"
                                ? "bg-green-200 text-green-600"
                                : "bg-red-200 text-red-600"
                            }`}
                          >
                            <div className="h-2 w-2 rounded-full bg-current"></div>
                            {user.status}
                          </div>
                        </div>
                        <p className="text-sm text-[#7C7C7C]">{user.email}</p>
                        <p className="text-sm text-[#7C7C7C]">{user.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center text-[#525151]">
                    {user.offerDate}
                  </td>
                  <td className="p-4 text-center text-[#525151]">
                    {user.joiningDate}
                  </td>
                  <td className="p-4 text-center">
                    <button className="bg-white text-black border border-gray-300 font-semibold px-3 py-1 rounded-full">
                      View more
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Small Screen Vertical List */}
      <div className="sm:hidden block w-full mt-4 h-screen">
        {users.map((user) => (
          <div key={user.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src={photo}
                  alt="User"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user.name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-md text-sm font-semibold ${
                      user.status === "Active"
                        ? "bg-green-200 text-green-600"
                        : "bg-red-200 text-red-600"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
                <p className="text-sm text-[#7C7C7C]">{user.email}</p>
                <p className="text-sm text-[#7C7C7C]">{user.phone}</p>
              </div>
            </div>
            <div className="mt-4 text-sm text-[#525151]">
              <p>
                <strong>Offer Date:</strong> {user.offerDate}
              </p>
              <p>
                <strong>Joining Date:</strong> {user.joiningDate}
              </p>
            </div>
            <button className="mt-4 w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-md">
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CandidateList;

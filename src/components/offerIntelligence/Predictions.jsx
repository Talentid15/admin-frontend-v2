import React from "react";
import BackButton from "../../assets/backButton.png";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import BarChart from "../../assets/Bar Chart.png";
import photo from "../../assets/photo.png";
import { MdOutlineStopCircle } from "react-icons/md";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

const Predictions = () => {
  const users = [
    {
      id: 1,
      name: "Soham",
      email: "alma.lawson@example.com",
      phone: "+91-6575757575",
      location: "Portland, Illinois",
    },
    {
      id: 2,
      name: "Soham",
      email: "alma.lawson@example.com",
      phone: "+91-6575757575",
      location: "Portland, Illinois",
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full p-2">
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <button className="text-gray-600 hover:text-gray-800">
              <img src={BackButton} alt="Back" className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-medium ml-2">Predictions of candidate</h1>
          </div>
          <button className="flex items-center gap-2 bg-[#652D96] text-white p-2 rounded-xl mr-4">
            <AiOutlineUsergroupAdd className="h-5 w-5" />
            Add Candidate
          </button>
        </div>

        <div className="flex flex-1 bg-[#EEEEEE] py-8 justify-between mt-10 rounded-2xl">
          <div className="flex flex-col items-center ml-16">
            <div className="h-32 w-32 mr-32 rounded-full overflow-hidden">
              <img
                src={photo}
                alt="Photo"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="items-center ml-12 mt-4">
              <p className="font-bold text-xl">{users[0].name}</p>
              <p className="flex text-[#00000080] gap-2">
                <MdOutlineLocalPhone className="text-black mt-1"/>
                {users[0].phone}
              </p>
              <p className="flex text-[#00000080] gap-2">
                <MdOutlineMail className="text-black mt-1"/>
                {users[0].email}
              </p>
              <p className="flex text-[#00000080] gap-2">
                <MdOutlineLocationOn className="text-black mt-1"/>
                {users[0].location}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img src={BarChart} alt="barchart" className="w-2/3" />
            <button className="bg-[#652D96] text-white font-medium p-2 w-[230px] rounded-full gap-2 flex items-center justify-center mt-6 ml-40">
              <MdOutlineStopCircle className="w-5 h-5" />
              Pause Engagement
            </button>
          </div>  
        </div>
      </div>
    </>
  );
};

export default Predictions;

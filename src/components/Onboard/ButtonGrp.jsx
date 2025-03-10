import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserGroup } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";
import Insufficiency from "../../assets/insufficiency.png";
import { FaFileCircleQuestion } from "react-icons/fa6";

function ButtonGroup() {
  const [active, setActive] = useState("People"); // Default active button is "People"

  return (
    <div className="w-full h-12 max-w-lg mt-6 p-2 bg-white rounded-full shadow-md mx-auto">
      <div className="flex justify-around">
        {/* People Button */}
        <Link to="/onboarding">
          <button
            className={`px-4 py-2 font-medium text-sm rounded-full ${
              active === "People" ? "bg-[#74449E] text-white" : "text-gray-700"
            }`}
            onClick={() => setActive("People")}
          >
            <div className="flex flex-1 gap-2">
            <FaUserGroup className="mt-1"/>
              Offered
            </div>
          </button>
        </Link>

        {/* Insufficiency Button */}
        <Link to="/onboarding/onboardplan">
          <button
            className={`flex gap-2 px-4 py-2 font-medium text-sm rounded-full ${
              active === "Insufficiency"
                ? "bg-[#74449E] text-white"
                : "text-gray-700"
            }`}
            onClick={() => setActive("Insufficiency")}
          >
            {/* <img src={Insufficiency} alt="insufficiency" className="w-5 h-5 color-white-100"/> */}
            <FaFileCircleQuestion className="mt-1"/>
            Onboarding Plan
          </button>
        </Link>

        {/* Add Button */}
        <Link to="/onboarding/onboardingmaterial">
          <button
            className={`px-4 py-2 font-medium text-sm rounded-full ${
              active === "Add" ? "bg-[#74449E] text-white" : "text-gray-700"
            }`}
            onClick={() => setActive("Add")}
          >
            <div className="flex flex-1 gap-2">
            <IoMdAddCircleOutline className=" h-5 w-5"/>
            Onboarding Material
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ButtonGroup;

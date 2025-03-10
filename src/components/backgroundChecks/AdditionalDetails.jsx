import React from 'react';
import { LuMailPlus } from "react-icons/lu";

const AdditionalDetails = () => {
  return (
    <div className="bg-white p-6 w-full mt-4 rounded-lg shadow-md">
      {/* Responsive Flexbox */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4 md:gap-6">
        
        {/* Send Reminder Checkbox */}
        <div className="flex items-center">
          <input className="mr-2" type="checkbox" id="reminder" />
          <label htmlFor="reminder" className="text-sm md:text-base">Send Reminder</label>
        </div>

        {/* Date Input */}
        <input 
          className="border border-[#0000003D] rounded p-2 w-full md:w-auto text-sm md:text-base" 
          type="date" 
        />

        {/* Select Packages Dropdown */}
        <div className="border border-[#0000003D] rounded p-2 w-full md:w-auto">
          <label htmlFor="packages" className="block text-sm md:text-base mb-1">
            Select Packages / Checks:
          </label>
          <select name="packages" id="packages" className="w-full p-1 border border-gray-300 rounded">
            <option value="">Choose an option</option>
            <option value="package1">Package 1</option>
            <option value="package2">Package 2</option>
          </select>
        </div>

        {/* Send Invite Button */}
        <button className="bg-[#652D96] text-white py-2 px-6 rounded-lg text-sm md:text-base flex items-center w-full md:w-auto justify-center">
          <LuMailPlus className="mr-2 text-lg" />
          Send Invite    
        </button>

      </div>
    </div>
  );
}

export default AdditionalDetails;

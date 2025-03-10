import React from "react";
import { GoPlus } from "react-icons/go";

const ExperienceSection = () => {
  return (
        <div className="bg-white shadow rounded-lg p-6 m-4">
          {/* Experience Summary */}
          <h4 className="text-xl font-bold mb-4">Experience Summary</h4>
          <p className="text-[#00000080]">
            I'm a software engineer with over 5 years of experience building scalable web
            applications. At XYZ Tech, I led the development of an e-commerce platform cutting
            page load times by 30% and boosting user engagement by 15%. I specialize in JavaScript,
            React, and Node.js, and I enjoy collaborating with cross-functional teams to create
            user-focused solutions. My passion is delivering high-quality, efficient code that
            drives product success...<span className="text-[#00000099] cursor-pointer ms-3 font-bold">Read more</span>
          </p>
    
          {/* Education Summary */}
          <h4 className="text-xl font-bold mt-6">Education Summary</h4>
          <p className="text-gray-600">Bachelor of Science in Computer Science</p>
          <p className="text-gray-600">University of California, Berkeley</p>
          <p className="text-gray-600">2017-2021</p>
    
          {/* Engagement Preference */}
          <h4 className="text-xl font-bold mt-6">Engagement Preference</h4>
          <div className="flex gap-x-32 mt-4">
            <div className="flex flex-wrap gap-4 ">
            <button className="flex text-black font-semibold border-black border-2 px-4 py-2 rounded">Technology <i className="text-2xl ps-1 bolder"><GoPlus /></i>
            </button>
            <button className="flex text-black font-semibold border-black border-2 px-4 py-2 rounded">Education <i className="text-2xl ps-1 bolder"><GoPlus /></i>
            </button>
            <button className="flex text-black font-semibold border-black border-2 px-4 py-2 rounded">Personal Details <i className="text-2xl ps-1 bolder"><GoPlus /></i>
            </button>
            <button className="flex text-black font-semibold border-black border-2 px-4 py-2 rounded">Random <i className="text-2xl ps-1 bolder"><GoPlus /></i>
            </button>
            </div>
            <button className="bg-[#652D96] text-white font-semibold px-6 py-2 mx-5 rounded-full">
            Start Engagement
            </button>
          </div>
        </div>
  );
};

export default ExperienceSection;

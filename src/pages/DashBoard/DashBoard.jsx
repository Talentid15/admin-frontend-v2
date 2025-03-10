import React from "react";
import { Outlet } from "react-router-dom";

import BarChart from "./MultiLineChart";
import ActivityBar from "./ActivityBar";
import Card from './Card'

const stats = [
  { title: "Total Users", value: "680/1000", statusColor: "text-green-300", iconColor: "#4CAF50" },
  { title: "New Users", value: "38", statusColor: "text-white", iconColor: "#2196F3" },
  { title: "Customers", value: "8/20", statusColor: "text-yellow-300", iconColor: "#FFEB3B" },
  { title: "Total Candidates", value: "3/100", statusColor: "text-red-300", iconColor: "#F44336" }
];

const DashBoard = () => {
 

  return (
    <div className="h-[700px] overflow-auto bg-white p-5 no-scrollbar">
      <div className="p-4 bg-white rounded-lg shadow-md">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome, <span className="text-purple-700">V Jai</span> 👋
           
          </h1>
          
        </div>
        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
          <Card key={index} {...item} />
              ))}
          </div>
              </div>

             
          <div className="mt-8 flex gap-5 justify-between items-center">
            <div className="flex-[0.7]">
              <BarChart />
            </div>
            <div className="flex-[0.3]">
              <ActivityBar />
            </div>
          </div>

          {/* Outlet Section */}
      <div className="flex flex-col justify-center items-center p-3 md:p-5 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
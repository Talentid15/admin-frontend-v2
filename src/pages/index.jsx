import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login"; // Import Login Component

function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to handle successful login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Show Login Page Initially */}
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} /> 
      ) : (
        <>
          {/* Header */}
          <div className="fixed top-0 z-50 w-full">
            <Header />
          </div>

          {/* Main Layout */}
          <div className="flex flex-1 pt-14">
            {/* Sidebar */}
            <div
              className={`top-14 z-10 h-auto bg-[#652D96] text-white shadow-lg transition-all duration-300 ${
                isSidebarOpen ? "w-64" : "lg:w-[20%] h-auto"
              }`}
            >
              <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            </div>

            {/* Main Content */}
            <div
              className={`flex-1 overflow-auto p-4 transition-all duration-300 ${
                isSidebarOpen ? "ml-64" : "ml-0 mt-8 lg:mt-0"
              }`}
            >
              <Outlet />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;

import React from "react";
import { Outlet } from "react-router-dom";

import SettingsNav from "../../components/settings/SettingsNav";

function Settings() {
  return (
    <div className="w-full flex flex-col  md: font-poppins max-w-screen  ">
      <div className=" w-full flex flex-col md:items-center justify-center  ">
        <SettingsNav />
      </div>

      <div className="flex flex-col justify-center items-center p-3 md:p-5 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default Settings;

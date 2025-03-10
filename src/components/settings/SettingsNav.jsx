import React from "react";
import { NavLink } from "react-router-dom";

const SettingsNav = () => {
  return (
    <nav className="w-full flex space-x-28 ml-8">
      {[
        { name: "Profile", path: "/settings", exact: true },
        { name: "Users", path: "/settings/user" },
        { name: "Integrations", path: "/settings/integration" },
        { name: "Subscriptions", path: "/settings/subscription" },
        { name: "Notifications", path: "/settings/notification" },
      ].map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `py-2 text-lg font-medium ${
              isActive ? "text-black border-b-4 border-black" : "text-gray-500"
            }`
          }
          end={item.exact} // Only apply active styles when path exactly matches
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};

export default SettingsNav;

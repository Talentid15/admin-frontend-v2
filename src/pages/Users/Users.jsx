import React from 'react'
import { Outlet } from "react-router-dom";

const Users = () => {
  return (
      <div>Users
      
      <div className="flex flex-col justify-center items-center p-3 md:p-5 w-full">
            <Outlet />
          </div>
          </div>
  )
}

export default Users;
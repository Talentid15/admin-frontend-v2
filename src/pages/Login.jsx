import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import logo from "../assets/logo.png";


const Login = ({onLogin}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  async function submitHandler(data) {
    setLoading(true);
    try {
      console.log(data);
      // Dummy login logic
      if (data.email === "admin" && data.password === "123") {
        onLogin();
      } else {
      alert("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

return (
  <div className="flex h-screen">
    <div className="w-full bg-[#652D96] text-white flex flex-col justify-center items-center p-10 relative">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-[30rem] p-8 bg-white rounded-lg">
          <div className="flex flex-col justify-center items-center text-center gap-3 mb-6">
            <img src={logo} alt="TalentID Logo" width={200} height={200} />
            <h2 className="text-3xl font-normal mt-2 text-slate-700">
              Admin Login
            </h2>
            <p className="text-gray-500 text-md">
              Enter your email and password to access account
              mail-admin password-123
            </p>
          </div>
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div className="relative">
              <label className="text-gray-700 font-medium">Email</label>
              <div className="flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden">
                <span className="px-3 text-gray-500">
                  <FaEnvelope />
                </span>
                <input
                  {...register("email", { required: "Email is Required" })}
                  className="w-full text-black p-3 focus:outline-none"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-gray-700 font-medium">Password</label>
              <div className="flex items-center border-2 border-gray-300 focus-within:border-indigo-500 rounded-md overflow-hidden">
                <span className="px-3 text-gray-500">
                  <FaLock />
                </span>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is Required",
                  })}
                  className="w-full p-3 text-black focus:outline-none"
                  placeholder="Enter your password"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
             
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="bg-black w-1/2 hover:bg-gray-900 transition-all text-white text-lg rounded-full p-3 mt-4 shadow-md"
              >
                Login
              </button>
            </div>
          </form>
           
        </div>
      </div>
    </div>
  </div>
);
};

export default Login;
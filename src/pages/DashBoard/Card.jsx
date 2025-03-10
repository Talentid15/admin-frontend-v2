import { FaCircle } from "react-icons/fa6";

const Card = ({ title, value, statusColor, iconColor }) => {
  return (
    <div className="flex items-center justify-center p-6 py-8 bg-white border-opacity-25 text-white border-blue-900  rounded-3xl shadow-lg hover:shadow-xl transition duration-300 border-2 hover:scale-105  w-[250px] h-[150px] group">
      <div className="text-center w-[250px] h-[100px]">
        <h2 className="text-lg font-semibold text-black text-center">
          {title}
        </h2>

        <div className=" transition-all duration-500 ease-in-out">
          <p
            className={`mt-1 text-lg  font-medium ${statusColor} flex items-center justify-center animate-slide-down`}
          >
            <FaCircle
              className="h-4 w-4  rounded-full border-none text-gray-700 "
              
            />
            <span className="mr-2 m-2 text-gray-700 text-opacity-[65]">{value}</span>
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default Card;

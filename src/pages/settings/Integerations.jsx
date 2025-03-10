import React from "react";
import Image from "/src/assets/image.png";

const Integerations = () => {
  return (
    <div className="w-[90%] min-h-[80vh] sm:h-[400px] overflow-y-auto shadow-xl rounded-2xl no-scrollbar flex items-center justify-center p-4">
      <div className="flex flex-col items-center text-center">
        <h1 className="font-bold text-lg sm:text-4xl mb-2 sm:mb-4">
          We are working on integrations
        </h1>
        <p className="text-sm sm:text-2xl mb-4">We’ll notify you by email!</p>
        <img
          src={Image}
          alt="Decorative"
          className="w-[90%] sm:w-[50%] max-w-[90%] h-auto "
        />
      </div>
    </div>
  );
};

export default Integerations;

import React from "react";

const InputField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
  className = "",
}) => {
  return (
    <div className="w-full">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`w-full border-2 border-purple-300 rounded-lg p-3 focus:outline-none focus:border-purple-500 shadow-lg ${className}`}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;

import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }], // Headers
    ["bold", "italic", "underline", "strike"], // Bold, Italic, Underline, Strike
    [{ align: [] }], // Text Alignment
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    ["blockquote", "code-block"], // Blockquote & Code
    ["link", "image"], // Insert Link & Image
    [{ script: "sub" }, { script: "super" }], // Subscript/Superscript
    [{ indent: "-1" }, { indent: "+1" }], // Indent
    [{ direction: "rtl" }], // Text Direction
    [{ color: [] }, { background: [] }], // Color & Background
    ["clean"], // Remove Formatting
  ],
};

const Notepad = () => {
  const [content, setContent] = useState("");

  return (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-3">📝 Notepad</h2>
      <div className="max-w-5xl overflow-auto no-scrollbar h-[400px] mx-auto mt-10 p-5 border-2 border-black rounded-lg shadow-lg bg-white">
        {/* Quill Editor */}
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          className="h-[310px] mb-4"
          theme="snow" // Ensure this is set to 'snow'
        />
      </div>
      <div className="flex justify-end mt-4">
        <button className="bg-purple-900 text-white flex items-center gap-2 px-8 py-2 rounded-full shadow-md hover:bg-gray-800 transition">
          <span>💾</span> Save
        </button>
      </div>
    </div>
  );
};

export default Notepad;

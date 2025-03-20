import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Categories from "./components/Category";

import Dashboard from "./components/Dashboard";

import SubCategories from "./components/Subcategory";

function App() {
  return (

    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-5">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />

          <Route path="/subcategories" element={<SubCategories />} />
        </Routes>
      </div>
    </div>

  );
}

export default App;

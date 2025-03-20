import { Link } from "react-router-dom";
import { Home, LayoutGrid, List, ShoppingBag } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center p-3 hover:bg-gray-700 rounded">
            <Home className="mr-2" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/categories" className="flex items-center p-3 hover:bg-gray-700 rounded">
            <LayoutGrid className="mr-2" /> Categories
          </Link>
        </li>
        <li>
          <Link to="/subcategories" className="flex items-center p-3 hover:bg-gray-700 rounded">
            <List className="mr-2" /> Subcategories
          </Link>
        </li>
        <li>
          <Link to="/products" className="flex items-center p-3 hover:bg-gray-700 rounded">
            <ShoppingBag className="mr-2" /> Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

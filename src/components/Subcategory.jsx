import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button"; // ShadCN button
import { Input } from "../components/ui/input"; // ShadCN input
import { Card, CardContent } from "../components/ui/card"; // ShadCN card
import toast from "react-hot-toast";
import axios from "../api/Category";

import { FaPlus } from "react-icons/fa";



import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { LuTrash2 } from "react-icons/lu";



const Subcategory = () => {
  const [categories, setCategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [fetching, setFetching] = useState(false);

  // Fetch categories along with their subcategories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setFetching(true);
        const response = await axios.get("/categories/get-all-categories");
        setCategories(response.data.data);
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setFetching(false);
      }
    };
    fetchCategories();
  }, []);

  // Toggle subcategory expansion
  const toggleExpand = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  // Delete subcategory
  const handleDeleteSubcategory = async (categoryId, subcategoryId) => {
    try {
      await axios.delete(`/categories/${categoryId}/subcategories/${subcategoryId}`);
      toast.success("Subcategory deleted successfully");

      // Remove subcategory from state
      setCategories((prev) =>
        prev.map((category) =>
          category._id === categoryId
            ? {
              ...category,
              subCategories: category.subCategories.filter((sub) => sub._id !== subcategoryId),
            }
            : category
        )
      );
    } catch (error) {
      toast.error("Failed to delete subcategory");
    }
  };

  return (
    <div className="p-6 max-w-3xl relative min-h-screen w-full h-full overflow-y-auto mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage Subcategories</h1>

      {/* Add New Subcategory */}
      <div className="mb-6">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg font-medium mb-2">Add New Subcategory</h2>

          <div className="flex gap-3 justify-center items-center border rounded-lg p-2 bg-">

            <p>Add Multiple SubCategories </p>
            <FaPlus></FaPlus>

          </div>

        </div>

        <div className="flex gap-3">
          <Input
            type="text"
            placeholder="Enter new subcategory"
            value={newSubcategory}
            onChange={(e) => setNewSubcategory(e.target.value)}
            className="w-full"
          />

          <select
            className="border px-3 py-2 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <Button>Add</Button>
        </div>
      </div>

      {/* List of Categories and Their Subcategories */}
      {fetching ? (
        <p className="text-center">Loading categories...</p>
      ) : (
        categories.map((category) => (
          <div key={category._id} className="mb-6">
            <h2 className="text-xl font-medium flex justify-between items-center mb-3">
              {category.name}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleExpand(category._id)}
              >
                {expandedCategories[category._id] ? <FaChevronUp /> : <FaChevronDown />}
              </Button>
            </h2>

            {/* List of Subcategories under the category */}
            <div
              className={`transition-all duration-300 overflow-hidden ${expandedCategories[category._id] ? "max-h-[500px]" : "max-h-[100px]"
                }`}
            >
              {category.subCategories.length > 0 ? (
                category.subCategories.map((subcategory) => (
                  <Card key={subcategory._id} className="shadow-md">
                    <CardContent className="p-4 flex justify-between items-center">
                      <p className="text-lg">{subcategory.name}</p>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDeleteSubcategory(category._id, subcategory._id)}
                      >
                        <LuTrash2 />
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-gray-500">No subcategories available.</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Subcategory;

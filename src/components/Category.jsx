import { useState, useEffect } from "react";
import axios from "../api/Category";
import { Plus, Trash2, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true); // Loading for initial fetch

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return toast.error("Category name is required");
        setLoading(true);
        try {
            const response = await axios.post("/categories/create-category", { name });
            setCategories([...categories, response.data.data]);
            toast.success("Category added successfully");
            setShowModal(false);
            setName("");
        } catch (error) {
            toast.error("Error adding category");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.get(`/categories/delete-category/${id}`);
            setCategories(categories.filter((cat) => cat._id !== id));
            toast.success("Category deleted successfully");
        } catch (error) {
            toast.error("Failed to delete category");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">Categories</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center shadow hover:bg-blue-700 transition"
                >
                    <Plus className="mr-2" /> Add Category
                </button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md min-h-[150px] flex justify-center items-center">
                {fetching ? (
                    <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-700">
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.length > 0 ? (
                                categories.map((cat) => (
                                    <tr key={cat._id} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{cat.name}</td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleDelete(cat._id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="p-3 text-center text-gray-500">No categories found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            <X />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Category Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-3 border rounded w-full mb-4"
                            />
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="mr-2 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="animate-spin w-5 h-5 mr-2" /> Saving...
                                        </>
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Categories;

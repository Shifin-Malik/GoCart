import React, { useContext, useEffect, useState, useMemo } from "react";
import { AppContextData } from "../../context/AppContext";
import { IoSearch, IoFilter, IoCloseCircle } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { assets } from "../../assets/assets";

function AdminProducts() {
  const { products, setProducts } = useContext(AppContextData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    offerPrice: "",
    image1: "",
    image2: "",
    description: "",
  });

  
    
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data || []);
    } catch (error) {
      toast.error("Error fetching products!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter && categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (sortOrder === "lowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, sortOrder, categoryFilter]);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      offerPrice: "",
      image1: "",
      image2: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleOpenEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      offerPrice: product.offerPrice,
      description: product.description || "",
      image1: Array.isArray(product.image)
        ? product.image[0] || ""
        : product.image || "",
      image2: Array.isArray(product.image) ? product.image[1] || "" : "",
    });
    setEditingId(product.id);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted!");
    } catch (err) {
      toast.error("Error deleting product!");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category || !form.price || !form.offerPrice) {
      toast.error("Please fill all required fields!");
      return;
    }

    const formattedData = {
      ...form,
      price: Number(form.price),
      offerPrice: Number(form.offerPrice),
      image: [form.image1, form.image2].filter(Boolean),
    };

    setSaving(true);
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3000/products/${editingId}`,
          formattedData
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...formattedData } : p))
        );
        toast.success("Product updated successfully!");
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/products",
          formattedData
        );
        setProducts((prev) => [...prev, data]);
        toast.success("Product added successfully!");
      }

      setIsOpen(false);
      resetForm();
    } catch (err) {
      toast.error("Error saving product!");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 animate-pulse">
        Loading products...
      </p>
    );

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        <div className="relative w-full md:w-64">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="w-full h-10 bg-white rounded-md border border-gray-300 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Search products..."
          />
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={() => setFilterOpen((prev) => !prev)}
              className="w-24 h-10 bg-primary text-white font-medium rounded-md flex justify-center items-center gap-2 "
            >
              <IoFilter /> Filter
            </button>

            {filterOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-4 w-64 z-20 border">
                <h3 className="font-semibold mb-2 text-gray-700">
                  Sort By Price
                </h3>
                <select
                  className="w-full border p-2 rounded mb-3"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">None</option>
                  <option value="lowToHigh">Low to High</option>
                  <option value="highToLow">High to Low</option>
                </select>

                <h3 className="font-semibold mb-2 text-gray-700">
                  Filter by Category
                </h3>
                <select
                  className="w-full border p-2 rounded"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <button
            onClick={handleOpenAdd}
            className="w-24 h-10 bg-primary text-white font-semibold rounded-md flex justify-center items-center gap-2 hover:bg-primary/90"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Products</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Offer Price</th>
              <th className="border px-3 py-2 text-center">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="border px-3 py-2 text-center">{index + 1}</td>
                  <td className="border px-3 py-2 flex gap-2">
                    {item.image?.slice(0, 2).map((img, i) => (
                      <img
                        key={i}
                        src={
                          img?.startsWith("http")
                            ? img
                            : assets[img] || "/images/placeholder.jpg"
                        }
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                    ))}
                  </td>
                  <td className="border px-3 py-2 font-semibold text-gray-700">
                    {item.name}
                  </td>
                  <td className="border px-3 py-2 text-gray-600">
                    {item.category}
                  </td>
                  <td className="border px-3 py-2 text-gray-800 font-medium">
                    ₹{item.price}
                  </td>
                  <td className="border px-3 py-2 text-gray-800 font-medium">
                    ₹{item.offerPrice}
                  </td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1 border rounded text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 border rounded bg-red-500 text-white ml-2 hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="border px-3 py-4 text-center text-gray-500"
                >
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] md:w-[40%]">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold text-secondary">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setIsOpen(false)}>
                <IoCloseCircle size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                name="category"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                name="price"
                type="number"
                placeholder="Price (INR)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                name="offerPrice"
                type="number"
                placeholder="Offer Price (INR)"
                value={form.offerPrice}
                onChange={(e) =>
                  setForm({ ...form, offerPrice: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                name="image1"
                placeholder="Image 1 filename or URL"
                value={form.image1}
                onChange={(e) => setForm({ ...form, image1: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                name="image2"
                placeholder="Image 2 filename or URL"
                value={form.image2}
                onChange={(e) => setForm({ ...form, image2: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border p-2 rounded h-24 resize-none"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-4 py-2 rounded text-white ${
                    saving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-primary hover:bg-primary/90"
                  }`}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;



import React, { useContext, useEffect, useState, useMemo } from "react";
import { AppContextData } from "../../context/AppContext";
import { IoSearch, IoCloseCircle } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function AdminProducts() {
  const { products, setProducts } = useContext(AppContextData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    offerPrice: "",
    description: "",
    image1: "",
    image2: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data || []);
    } catch {
      toast.error("Error fetching products!");
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
    if (sortOrder === "lowToHigh")
      filtered = filtered.sort((a, b) => a.price - b.price);
    if (sortOrder === "highToLow")
      filtered = filtered.sort((a, b) => b.price - a.price);
    return filtered;
  }, [products, searchTerm, categoryFilter, sortOrder]);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      offerPrice: "",
      description: "",
      image1: "",
      image2: "",
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
      image1: product.image?.[0] || "",
      image2: product.image?.[1] || "",
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
    } catch {
      toast.error("Error deleting product!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.category || !form.price || !form.offerPrice) {
      toast.error("Please fill all required fields!");
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      offerPrice: Number(form.offerPrice),
      image: [form.image1, form.image2].filter(Boolean),
    };

    setSaving(true);
    try {
      if (editingId) {
        await axios.put(`http://localhost:3000/products/${editingId}`, payload);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? { ...p, ...payload } : p))
        );
        toast.success("Product updated!");
      } else {
        const { data } = await axios.post(
          "http://localhost:3000/products",
          payload
        );
        setProducts((prev) => [...prev, data]);
        toast.success("Product added!");
      }
      setIsOpen(false);
      resetForm();
    } catch {
      toast.error("Error saving product!");
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
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full md:w-64 h-10 bg-white rounded-md border border-gray-300 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 border rounded px-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="h-10 border rounded px-2"
          >
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
          <button
            onClick={handleOpenAdd}
            className="w-24 h-10 bg-primary text-white font-semibold rounded-md flex justify-center items-center gap-2 hover:bg-primary/90"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-3 py-2">No</th>
              <th className="border px-3 py-2">Images</th>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Category</th>
              <th className="border px-3 py-2">Price</th>
              <th className="border px-3 py-2">Offer</th>
              <th className="border px-3 py-2 text-center">Manage</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border px-3 py-2 text-center">{index + 1}</td>
                  <td className="border px-3 py-2 flex gap-2">
                    {item.image?.slice(0, 2).map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md border"
                      />
                    ))}
                  </td>
                  <td className="border px-3 py-2">{item.name}</td>
                  <td className="border px-3 py-2">{item.category}</td>
                  <td className="border px-3 py-2">₹{item.price}</td>
                  <td className="border px-3 py-2">₹{item.offerPrice}</td>
                  <td className="border px-3 py-2 text-center">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1 border rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border px-3 py-3 text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
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
                placeholder="Product Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border p-2 rounded"
              />
              <input
                type="number"
                placeholder="Offer Price"
                value={form.offerPrice}
                onChange={(e) =>
                  setForm({ ...form, offerPrice: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <div>
                <label>Image 1 URL</label>
                <input
                  type="text"
                  placeholder="Enter image 1 URL"
                  value={form.image1}
                  onChange={(e) => setForm({ ...form, image1: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                {form.image1 && (
                  <img
                    src={form.image1}
                    className="w-20 h-20 mt-2 rounded border object-cover"
                  />
                )}
              </div>
              <div>
                <label>Image 2 URL</label>
                <input
                  type="text"
                  placeholder="Enter image 2 URL"
                  value={form.image2}
                  onChange={(e) => setForm({ ...form, image2: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                {form.image2 && (
                  <img
                    src={form.image2}
                    className="w-20 h-20 mt-2 rounded border object-cover"
                  />
                )}
              </div>
              <textarea
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
                  className="bg-gray-200 px-4 py-2 rounded"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
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

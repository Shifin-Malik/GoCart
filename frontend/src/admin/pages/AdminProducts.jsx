import React, { useContext, useState } from "react";
import { AppContextData } from "../../context/AppContext";
import { IoCloseCircle } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function AdminProducts() {
  const { products, setProducts, deleteProduct } = useContext(AppContextData);

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });

    setEditingId(null);
  };

  const handleOpenAdd = () => {
    resetForm();
    setIsOpen(true);
  };

  const handleOpenEdit = (product) => {
    setForm({
      title: product.title,
      description: product.description || "",
      price: product.price,
      category: product.category,
      image: null,
    });

    setEditingId(product._id);
    setIsOpen(true);
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.title || !form.category || !form.price) {
    toast.error("All fields required");
    return;
  }

  const data = new FormData();

  data.append("title", form.title);
  data.append("category", form.category);
  data.append("price", form.price);
  data.append("description", form.description);

  if (form.image) {
    data.append("image", form.image);
  }

  try {
    setSaving(true);

    if (editingId) {
    
      const res = await axios.put(
        `/admin/product/${editingId}`,
        data
      );

      setProducts((prev) =>
        prev.map((p) =>
          p._id === editingId ? res.data.product : p
        )
      );

      toast.success("Product updated");

    } else {
      
      const res = await axios.post(
        "/admin/product",
        data
      );

      setProducts((prev) => [
        ...prev,
        res.data.product,
      ]);

      toast.success("Product added");
    }

    setIsOpen(false);
    resetForm();

  } catch (err) {
    console.log(err);
    toast.error("Save failed");

  } finally {
    setSaving(false);
  }
};

  return (
    <div className="p-4">
    
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Products</h1>

        <button
          onClick={handleOpenAdd}
          className="w-24 h-10 bg-primary text-white rounded-md flex items-center justify-center gap-2"
        >
          <FaPlus /> Add
        </button>
      </div>

  
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">No</th>
              <th className="border p-2">Images</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Manage</th>
            </tr>
          </thead>

          <tbody>
            {products.length ? (
              products.map((item, index) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  
                  <td className="border p-2 text-center">{index + 1}</td>

              
                  <td className="border p-2">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 rounded border object-cover"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>

                
                  <td className="border p-2">{item.title}</td>

               
                  <td className="border p-2">{item.category}</td>

              
                  <td className="border p-2">₹{item.price}</td>

                  
                  <td className="border p-2 text-center">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3 py-1 border rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="border p-3 text-center">
                  No products found
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
              <h2 className="text-xl font-bold">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>

              <button onClick={() => setIsOpen(false)}>
                <IoCloseCircle size={26} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
             
              <input
                placeholder="Product Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
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
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                className="w-full border p-2 rounded"
              />

             
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full border p-2 rounded h-24"
              />

            
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-200 px-4 py-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-primary text-white px-4 py-2 rounded"
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

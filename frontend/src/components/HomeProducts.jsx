import React, { useContext, useState, useMemo } from "react";
import { AppContextData } from "../context/AppContext";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import { IoSearch, IoFilter } from "react-icons/io5";

function HomeProducts() {
  const { products } = useContext(AppContextData);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  
  const categories = useMemo(() => {
    const cats = products.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(cats)];
  }, [products]);


  const filteredProducts = useMemo(() => {
    let filtered = products.filter((p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (sortOrder === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [products, searchTerm, sortOrder, categoryFilter]);

  return (
    <div className="flex flex-col items-center px-4 md:px-8 pt-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
        <p className="text-2xl text-secondary font-bold">GoCart Products</p>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 bg-zinc-50 rounded-md border-2 border-black pl-10 pr-4 focus:outline-none focus:border-secondary"
            placeholder="Search products..."
          />
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        <div className="relative">
          <button
            onClick={() => setFilterOpen((prev) => !prev)}
            className="w-24 h-10 bg-primary text-white font-medium rounded-md flex items-center justify-center gap-2"
          >
            <IoFilter /> Filter
          </button>

          {filterOpen && (
            <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg p-4 w-64 z-20 border">
              <h3 className="font-semibold mb-2 text-gray-700">
                Sort by Price
              </h3>

              <select
                className="w-full border p-2 rounded mb-4"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="">None</option>
                <option value="lowToHigh">Low → High</option>
                <option value="highToLow">High → Low</option>
              </select>

              <h3 className="font-semibold mb-2 text-gray-700">Category</h3>

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
      </div>

     
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 pb-14 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products found
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default HomeProducts;

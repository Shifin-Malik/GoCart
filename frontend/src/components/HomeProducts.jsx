import React, { useContext, useState, useEffect } from "react";
import { AppContextData } from "../context/AppContext";
import ProductCard from "./ProductCard";
import Footer from "./Footer";
import { IoSearch } from "react-icons/io5";

function HomeProducts() {
  const {
    products,
    searchProducts,
    loading,
    cat,
    getAllCategories,
    getProductsByCategory,
    fetchProducts,
  } = useContext(AppContextData);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="flex flex-col items-center px-4 md:px-8 pt-8 w-full">
    
      <div className="flex flex-col gap-6 w-full">
     
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <p className="text-2xl text-secondary font-bold">GoCart Products</p>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                const value = e.target.value;
                setSearchTerm(value);

                if (value.length >= 2 || value === "") {
                  searchProducts(value);
                  setActiveCategory("all");
                }
              }}
              className="w-full h-10 bg-zinc-50 rounded-md border-2 border-black pl-10 pr-10 focus:outline-none focus:border-secondary"
              placeholder="Search products..."
            />

            {searchTerm ? (
              <button
                onClick={() => {
                  setSearchTerm("");
                  searchProducts("");
                  setActiveCategory("all");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                ✕
              </button>
            ) : (
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            )}
          </div>
        </div>

    
        <div className="flex gap-3 flex-wrap justify-center md:justify-start">
        
          <button
            onClick={() => {
              fetchProducts(); 
              setActiveCategory("all");
              setSearchTerm("");
              searchProducts(""); 
            }}
            className={`px-4 py-1 rounded-full border
              ${
                activeCategory === "all"
                  ? "bg-secondary text-white"
                  : "bg-white"
              }`}
          >
            All
          </button>

          
          {cat?.map((item) => (
            <button
              key={item}
              onClick={() => {
                getProductsByCategory(item);
                setActiveCategory(item);
                setSearchTerm("");
              }}
              className={`px-4 py-1 rounded-full border capitalize
                ${
                  activeCategory === item
                    ? "bg-secondary text-white"
                    : "bg-white"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

     
      {loading && <p className="mt-6 text-gray-500">Searching...</p>}

   
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
        {!loading && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : !loading ? (
          <p className="text-gray-500 text-center col-span-full">
            No products found
          </p>
        ) : null}
      </div>

      <Footer />
    </div>
  );
}

export default HomeProducts;

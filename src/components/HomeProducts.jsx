import React, { useContext, useState } from "react";
import { AppContextData } from "../context/AppContext";
import ProductCard from "./ProductCard";
import { IoSearch } from "react-icons/io5";

function HomeProducts() {
  const { products } = useContext(AppContextData);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center px-4 md:px-8 pt-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full">
        <p className="text-2xl text-secondary font-bold text-center md:text-left">
          GoCart Products
        </p>

        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 bg-zinc-50 rounded-md border-2 border-black pl-10 pr-4 focus:outline-none focus:border-secondary"
            placeholder="Search"
          />
          <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="text-center md:text-right">
          <p className="text-xl md:text-2xl font-bold text-secondary leading-snug">
            The best way to buy the <br className="hidden md:block" /> products
            you love.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 mt-8 pb-14 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products found
          </p>
        )}
      </div>
    </div>
  );
}

export default HomeProducts;

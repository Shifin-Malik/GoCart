import React from "react";
import { useContext } from "react";
import { AppContextData } from "../context/AppContext";
import ProductCard from "./ProductCard";

function HomeProducts() {
  const { products } = useContext(AppContextData);
  return (
    <div className="flex flex-col items-center pt-14">
      <p className="text-left text-2xl text-secondary font-bold w-full">
        Popular products
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {products.map((product, idx) => (
          <ProductCard key={idx} product={product} />
        ))}
      </div>
      <button className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
  );
}

export default HomeProducts;

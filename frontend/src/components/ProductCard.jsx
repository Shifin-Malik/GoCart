import React, { useContext } from "react";
import { AppContextData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ProductCard = React.memo(({ product }) => {
  const navigate = useNavigate();
  const { currency } = useContext(AppContextData);

  return (
    <div
      onClick={() => {
        navigate(`/product/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-1 max-w-[200px] w-full cursor-pointer"
    >
      <div className="group relative rounded-lg w-full h-52 flex items-center justify-center overflow-hidden p-2 bg-white">
        <img
          src={product.image}
          alt={product.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </div>

      <p className="md:text-base text-secondary font-medium w-full truncate">
        {product.title}
      </p>

      <div className="flex items-center justify-between w-full mt-1">
        <p className="text-base font-semibold text-secondary">
          {currency}
          {product.price}
        </p>

        <button className="hidden sm:block px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
          Buy now
        </button>
      </div>
    </div>
  );
});

export default ProductCard;

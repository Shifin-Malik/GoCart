import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContextData } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
const ProductCard = React.memo(({ product }) => {
  const navigate = useNavigate();
  const { currency } = useContext(AppContextData);

  return (
    <div
      onClick={() => {
        navigate(`/GoCart/product/${product.id}`);
        window.scrollTo(0, 0);
      }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      <div className="group relative rounded-lg w-full h-52 flex items-center justify-center overflow-hidden p-2">
        <img
          className="group-hover:scale-105 transition-transform object-cover w-full h-full"
          src={
            product.image[0].startsWith("http")
              ? product.image[0]
              : assets[product.image[0]]
          }
          alt={product.name}
          width={800}
          height={800}
        />
        <button className="absolute top-2 right-2 p-1 rounded-full shadow-md">
          <FaHeart className="hover:text-red-500 text-black cursor-pointer" />
        </button>
      </div>

      <p className="md:text-base text-secondary font-medium pt-2 w-full truncate">
        {product.name}
      </p>

      <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
        {product.description}
      </p>

      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-medium text-secondary">
          {currency}
          {product.offerPrice || product.price}
        </p>
        <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
          Buy now
        </button>
      </div>
    </div>
  );
});

export default ProductCard;

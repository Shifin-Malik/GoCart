import React, { useContext, useEffect, useState } from "react";
import HomeProducts from "../HomeProducts";
import { IoIosFlash } from "react-icons/io";
import { IoCartSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { AppContextData } from "../../context/AppContext";
import swal from "sweetalert";
import { FaHeart } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { products, addToCart, user, currency, addWishlist, createOrder } =
    useContext(AppContextData);
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (products?.length > 0) {
      const product = products.find((p) => p._id === id);
      setProductData(product || null);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (!user) {
      swal("Login Required", "Please login to add items to cart", "warning");
      return;
    }

    addToCart(productData._id);
    navigate("/cart");
  };

  if (!productData) {
    return (
      <div className="text-center py-24 text-gray-500">Loading product...</div>
    );
  }

  return (
    <>
      <div className="px-6 md:px-16 lg:px-32 pt-10 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="px-5 lg:px-16 xl:px-20">
            <div className="relative rounded-lg overflow-hidden bg-gray-500/10">
              <button
                onClick={() => addWishlist(productData._id)}
                className="absolute top-3 right-3 z-10"
              >
                <FaHeart
                  className="
          w-8 h-8 lg:w-10 lg:h-10
          p-2
          rounded-full
          bg-zinc-200
          text-red-500
          hover:bg-zinc-300
          transition
          
        "
                />
              </button>
              <img
                src={productData.image}
                alt={productData.title}
                className="w-full h-auto object-cover transition duration-200 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              {productData.title}
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              ⭐⭐⭐⭐☆ <span>(4.5)</span>
            </div>

            <p className="text-gray-600 mt-4">{productData.description}</p>

            <p className="text-3xl font-bold mt-6 text-gray-800">
              {currency}
              {productData.price}
            </p>
            <hr className="my-6" />

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-gray-100 text-gray-800 hover:bg-gray-200 transition rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <IoCartSharp size={20} /> Add to Cart
              </button>

              <button
                onClick={() => createOrder()}
                className="w-full py-3.5 bg-primary text-white hover:bg-blue-800 transition rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                <IoIosFlash size={20} /> Buy Now
              </button>
            </div>
          </div>
        </div>
        <HomeProducts />
      </div>
    </>
  );
}

export default ProductDetails;

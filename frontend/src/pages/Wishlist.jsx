import React, { useContext, useEffect } from "react";
import NavBar from "../components/NavBar";
import { AppContextData } from "../context/AppContext";
import { FaHeartBroken } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoCartSharp } from "react-icons/io5";
import toast from "react-hot-toast";

function Wishlist() {
  const { wishlistItems, getWishlist, currency, toggleWishlist, addToCart } =
    useContext(AppContextData);

  // Fetch wishlist on mount
  useEffect(() => {
    getWishlist();
  }, []);

  // Handle Add to Cart with proper toast
  const handleAddToCart = async (productId) => {
    await addToCart(productId);
    toast.success("Added to cart");
  };

  return (
    <>
      <NavBar />

      <div className="px-6 md:px-16 lg:px-32 py-10">
        <h1 className="text-2xl font-semibold mb-6">My Wishlist</h1>

        {/* Empty state */}
        {wishlistItems.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <FaHeartBroken className="text-5xl mx-auto mb-4" />
            <p>Your wishlist is empty</p>
          </div>
        )}

        {/* Wishlist grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item._id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="relative">
                {/* Remove from wishlist button */}
                <button
                  onClick={() => toggleWishlist(item.productId._id)}
                  className="absolute top-2 right-2 z-10"
                >
                  <MdDelete className="w-6 h-6 text-red-500 hover:text-red-600 transition" />
                </button>

                {/* Product image */}
                <img
                  src={item.productId.image}
                  alt={item.productId.title}
                  className="h-40 w-full object-contain mb-3"
                />
              </div>

              {/* Product title */}
              <h3 className="font-medium truncate">{item.productId.title}</h3>

              {/* Product price */}
              <p className="text-gray-600 mt-1">
                {currency}
                {item.productId.price}
              </p>

              {/* Add to Cart */}
              <button
                onClick={() => handleAddToCart(item.productId._id)}
                className="mt-3 w-full flex items-center justify-center gap-2 text-sm bg-primary text-white py-2 rounded-lg hover:bg-blue-800 transition"
              >
                <IoCartSharp />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;

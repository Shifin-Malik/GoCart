import React, { useContext } from "react";
import OrderSummary from "../components/Product/OrderSummary";
import { AppContextData } from "../context/AppContext";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { assets } from "../assets/assets";
import { useNavigate, Link } from "react-router-dom";
import EmptyCart from "/public/Lottie/EmptyCart.json";
import Lottie from "lottie-react";
function Cart() {
  const {
    products,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    removeFromCart,
  } = useContext(AppContextData);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/GoCart/product");
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8 md:gap-4">
        <Lottie className="w-80 h-80" animationData={EmptyCart} />
        <h1 className="text-3xl font-semibold text-secondary">
          Your Cart Is Empty
        </h1>
        <p className="font-semibold text-secondary text-center">
          Looks like you haven't added anything to your cart yet. Start
          exploring products and add your favorites!
        </p>
        <Link
          to="/GoCart/product"
          className=" bg-primary text-white rounded-lg w-40 h-12 text-center flex justify-center items-center font-bold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }
  return (
    <div>
      <div className="p-4 w-full">
        <div className="flex flex-col lg:flex-row gap-4 h-screen">
          <div className="bg-zinc-200/30 w-full rounded-2xl p-6 lg:h-full h-1/2 overflow-auto">
            <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-4">
              <h1 className="text-3xl font-semibold text-secondary">
                Your <span className="text-secondaryf">Cart</span>
              </h1>
              <p className="text-lg text-gray-600">{getCartCount()} Items</p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead className="text-left">
                  <tr>
                    <th className="text-nowrap pb-4 px-2 text-secondary font-medium">
                      Product Details
                    </th>
                    <th className="pb-4 px-2 text-secondary font-medium">
                      Price
                    </th>
                    <th className="pb-4 px-2 text-secondary font-medium">
                      Quantity
                    </th>
                    <th className="pb-4 px-2 text-secondary font-medium">
                      Subtotal
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((cartItem, index) => {
                    const product = products.find(
                      (p) => p.id === cartItem.id
                    );
                    if (!product) return null;

                    const quantity = cartItem.quantity || 1;
                    const subtotal = (product.offerPrice * quantity).toFixed(2);

                    return (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="flex items-center gap-4 py-4 px-2">
                          <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                            <img
                              src={
                                product.image[0].startsWith("http")
                                  ? product.image[0]
                                  : assets[product.image[0]]
                              }
                              alt={product.name}
                              className="w-16 h-auto object-cover mix-blend-multiply"
                            />
                          </div>

                          <div className="text-sm">
                            <p className="text-gray-800">{product.name}</p>
                            <button
                              className="text-xs text-primary mt-1"
                              onClick={() => removeFromCart(product.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>

                        <td className="py-4 px-2 text-gray-600">
                          ₹{product.offerPrice}
                        </td>

                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(product.id, quantity - 1)
                              }
                            >
                              <FaMinus className="text-xl text-gray-600 hover:text-primary bg-zinc-200 rounded-full w-5 h-5 p-1" />
                            </button>

                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) =>
                                updateCartQuantity(
                                  product.id,
                                  Number(e.target.value)
                                )
                              }
                              className="w-10 border text-center rounded"
                              min="1"
                            />

                            <button onClick={() => addToCart(product.id)}>
                              <FaPlus className="text-xl text-gray-600 hover:text-primary bg-zinc-200 rounded-full w-5 h-5 p-1" />
                            </button>
                          </div>
                        </td>

                        <td className="py-4 px-2 text-gray-600">₹{subtotal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              onClick={handleClick}
              className="flex items-center mt-6 gap-2 text-primary hover:underline"
            >
              ← Continue Shopping
            </button>
          </div>

          <div className="">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

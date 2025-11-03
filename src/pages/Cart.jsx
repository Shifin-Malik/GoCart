import React, { useContext } from "react";
import OrderSummary from "../components/Product/OrderSummary";
import { AppContextData } from "../context/AppContext";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

function Cart() {
  const { products, cartItems, addToCart, updateCartQuantity, getCartCount } =
    useContext(AppContextData);

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
                  {Object.keys(cartItems).map((itemId) => {
                    const product = products.find((p) => p._id === itemId);

                    if (!product || cartItems[itemId] <= 0) return null;

                    const quantity = cartItems[itemId];
                    const subtotal = (product.offerPrice * quantity).toFixed(2);

                    return (
                      <tr key={itemId} className="border-b border-gray-200">
                        {/* Product Info */}
                        <td className="flex items-center gap-4 py-4 px-2">
                          <div>
                            <div className="rounded-lg overflow-hidden bg-gray-500/10 p-2">
                              <img
                                src={product.image[0]}
                                alt={product.name}
                                className="w-16 h-auto object-cover mix-blend-multiply"
                              />
                            </div>
                            <button
                              className="md:hidden text-xs text-primary mt-1"
                              onClick={() => updateCartQuantity(product._id, 0)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="text-sm hidden md:block">
                            <p className="text-gray-800">{product.name}</p>
                            <button
                              className="text-xs text-primary mt-1"
                              onClick={() => updateCartQuantity(product._id, 0)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-2 text-gray-600">
                          ${product.offerPrice}
                        </td>

                        {/* Quantity Controls */}
                        <td className="py-4 px-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(product._id, quantity - 1)
                              }
                            >
                              <IoMdArrowDropleft className="text-xl text-gray-600 hover:text-primary" />
                            </button>
                            <input
                              type="number"
                              value={quantity}
                              onChange={(e) =>
                                updateCartQuantity(
                                  product._id,
                                  Number(e.target.value)
                                )
                              }
                              className="w-10 border text-center rounded"
                              min="1"
                            />
                            <button onClick={() => addToCart(product._id)}>
                              <IoMdArrowDropright className="text-xl text-gray-600 hover:text-primary" />
                            </button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td className="py-4 px-2 text-gray-600">${subtotal}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <button
              onClick={() => (window.location.href = "/GoCart/product")}
              className="flex items-center mt-6 gap-2 text-primary hover:underline"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* Order Summary Section */}
          <div className="">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

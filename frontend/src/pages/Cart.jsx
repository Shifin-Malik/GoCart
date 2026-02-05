import React, { useContext } from "react";
import OrderSummary from "../components/Product/OrderSummary";
import { AppContextData } from "../context/AppContext";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate, Link } from "react-router-dom";
import EmptyCart from "/public/Lottie/EmptyCart.json";
import Lottie from "lottie-react";

function Cart() {
  const { cartItems, updateCartQuantity, getCartCount, removeFromCart } =
    useContext(AppContextData);

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8">
        <Lottie className="w-80 h-80" animationData={EmptyCart} />
        <h1 className="text-3xl font-semibold">Your Cart Is Empty</h1>
        <Link
          to="/product"
          className="bg-primary text-white px-6 py-3 rounded-lg font-bold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 w-full">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-zinc-200/30 w-full rounded-2xl p-6">
          <div className="flex justify-between border-b pb-4 mb-6">
            <h1 className="text-3xl font-semibold">Your Cart</h1>
            <p>{getCartCount()} Items</p>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => {
                const product = item.productId;
                const quantity = item.quantity;
                const subtotal = product.price * quantity;

                return (
                  <tr key={item._id} className="border-b">
                    <td className="flex gap-4 py-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 rounded"
                      />
                      <div>
                        <p>{product.title}</p>
                        <button
                          className="text-xs text-primary"
                          onClick={() => removeFromCart(item.productId._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>

                    <td>₹{product.price}</td>

                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateCartQuantity(item.productId._id, "dec")
                          }
                        >
                          <FaMinus />
                        </button>

                        <span>{quantity}</span>

                        <button
                          onClick={() =>
                            updateCartQuantity(item.productId._id, "inc")
                          }
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </td>

                    <td>₹{subtotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <button
            onClick={() => navigate("/product")}
            className="mt-6 text-primary"
          >
            ← Continue Shopping
          </button>
        </div>

        <OrderSummary />
      </div>
    </div>
  );
}

export default Cart;

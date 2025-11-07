import React, { useContext } from "react";
import { AppContextData } from "../../context/AppContext";
import swal from "sweetalert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const navigate = useNavigate();
  const {
    currency,
    getCartCount,
    getCartAmount,
    user,
    cartItems,
    setCartItems,
  } = useContext(AppContextData);

  const tax = Math.floor(getCartAmount() * 0.01);
  const totalAmount = getCartAmount() + tax;

  const createOrder = async () => {
    if (!cartItems.length) {
      return swal(
        "Your Cart is Empty",
        "Add items before ordering!",
        "warning"
      );
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${user.email}`
      );
      const dbUser = res.data[0];

      await axios.patch(`http://localhost:3000/users/${dbUser.id}`, {
        prurchase: [...(dbUser.prurchase || []), ...cartItems],
        cartProducts: [],
      });

      setCartItems([]);
      swal("Order Successful!", "Your purchase is complete!", "success");
      navigate("/GoCart/orderPlace");
    } catch (error) {
      console.log("Order Error:", error);
    }
  };

  return (
    <div className="w-full md:w-96 bg-gray-50 p-5 rounded-2xl shadow-sm">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Order Summary</h2>

      <div className="space-y-3">
        <div className="flex justify-between text-base">
          <p className="text-gray-600">Items ({getCartCount()})</p>
          <p>
            {currency}
            {getCartAmount()}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Shipping</p>
          <p className="font-medium">Free</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Tax (1%)</p>
          <p className="font-medium">
            {currency}
            {tax}
          </p>
        </div>

        <div className="flex justify-between text-lg font-semibold border-t pt-3">
          <p>Total</p>
          <p>
            {currency}
            {totalAmount}
          </p>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-primary text-white py-3 mt-5 rounded-2xl hover:bg-blue-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;

  import React, { useContext } from "react";
  import { AppContextData } from "../../context/AppContext";


  const OrderSummary = () => {
    

    const { currency, getCartCount, getCartAmount, createOrder } =
      useContext(AppContextData);

    const tax = Math.floor(getCartAmount() * 0.005);
    const DeliveryFree = 40;
    const totalAmount = getCartAmount() + tax + DeliveryFree;

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
            <p className="text-gray-600">Delivery free</p>
            <p className="font-medium">
              {currency}
              {DeliveryFree}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-600">Tax (0.5%)</p>
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
          onClick={() => createOrder()}
          className="w-full bg-primary text-white py-3 mt-5 rounded-2xl hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    );
  };

  export default OrderSummary;

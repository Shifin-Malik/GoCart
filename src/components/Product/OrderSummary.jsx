import { addressDummyData } from "../../assets/assets";
import React, { useEffect, useState, useContext } from "react";
import { AppContextData } from "../../context/AppContext";

const OrderSummary = () => {
  const { currency, getCartCount, getCartAmount } = useContext(AppContextData);
  const [userAddresses, setUserAddresses] = useState([]);

  const fetchUserAddresses = async () => {
    setUserAddresses(addressDummyData);
  };

  const createOrder = () => {
    console.log("Order created!");
  };

  useEffect(() => {
    fetchUserAddresses();
  }, []);

  return (
    <div className="w-full md:w-96 bg-gray-50 p-5 rounded shadow-sm">
      <h2 className="text-xl font-medium text-gray-700 mb-4">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-base font-medium">
          <p className="uppercase text-gray-600">Items {getCartCount()}</p>
          <p className="text-gray-800">
            {currency}
            {getCartAmount()}
          </p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Shipping Fee</p>
          <p className="font-medium text-gray-800">Free</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Tax (2%)</p>
          <p className="font-medium text-gray-800">
            {currency}
            {Math.floor(getCartAmount() * 0.02)}
          </p>
        </div>

        <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
          <p>Total</p>
          <p>
            {currency}
            {getCartAmount() + Math.floor(getCartAmount() * 0.02)}
          </p>
        </div>
      </div>

      <button
        onClick={createOrder}
        className="w-full bg-primary text-white py-3 mt-5 hover:bg-blue-700 transition rounded-2xl"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContextData } from "../context/AppContext";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function OrderHistory() {
  const { user, products } = useContext(AppContextData);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:3000/users?email=${user.email}`)
      .then((res) => setOrders(res.data[0].prurchase || []))
      .catch((err) => console.log(err));
  }, [user]);

  if (orders.length === 0) {
    return (
      <div className="p-6 w-full min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold text-secondary mb-3">
          No Orders Yet
        </h1>
        <Link
          to="/GoCart/product"
          className="px-5 py-2 bg-primary text-white rounded-lg"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-3xl font-semibold text-secondary mb-6">
        Your Orders
      </h1>

      <div className="flex flex-col gap-2 ">
        {orders.map((order, index) => {
          const product = products.find((p) => p._id === order._id);
          if (!product) return null;

          const productImage = assets[product.image[0]];
          return (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-100 p-2 rounded-xl px-20"
            >
              <div className="flex items-center gap-4">
                <img
                  src={productImage}
                  alt={product.name}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-secondary">{product.name}</p>
                  <p className="text-sm text-gray-500">
                    {order.date || "Date not available"}
                  </p>
                </div>
              </div>

              <p className="font-semibold text-secondary">
                ₹{product.offerPrice}
              </p>
              <p className="text-green-600 font-semibold">✅ Successful</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderHistory;

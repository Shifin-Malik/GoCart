import React, { useEffect, useState, useContext } from "react";
import { AppContextData } from "../context/AppContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import EmptyCart from "/public/Lottie/EmptyCart.json";

function OrderHistory() {
  const { user, currency } = useContext(AppContextData);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;


    const fetchOrders = async () => {
  try {
    if (!user) return;

    const token = user.token || localStorage.getItem("token");

    const { data } = await axios.get("/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setOrders(data.orders || []);

  } catch (err) {
    console.error("Fetch orders error:", err);

    if (err.response?.status === 401) {
      console.log("Session expired. Please login again.");
    }

  } finally {
    setLoading(false);
  }
};

fetchOrders();

  }, [user]);

  if (!loading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8 md:gap-4">
        <Lottie className="w-80 h-80" animationData={EmptyCart} />
        <h1 className="text-3xl font-semibold text-secondary">No Orders Yet</h1>
        <p className="font-semibold text-secondary text-center">
          Looks like you haven't placed any orders yet.
        </p>
        <Link
          to="/product"
          className="bg-primary text-white rounded-lg w-40 h-12 flex justify-center items-center font-bold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 w-full min-h-screen">
      <h1 className="text-3xl font-semibold text-secondary mb-6">
        Your Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="mb-8 bg-white shadow rounded-xl overflow-hidden"
        >
          <div className="flex justify-between p-4 bg-gray-100 text-sm">
            <p>
              <span className="font-semibold">Order ID:</span> {order.orderId}
            </p>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <table className="min-w-full">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-center">Quantity</th>
                <th className="px-4 py-3 text-center">Price</th>
                <th className="px-4 py-3 text-center">Total</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {order.products.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={item.productId.image}
                      alt={item.productId.title}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <p className="font-medium text-secondary">
                      {item.productId.title}
                    </p>
                  </td>

                  <td className="px-4 py-3 text-center">{item.quantity}</td>

                  <td className="px-4 py-3 text-center">
                    {currency}
                    {item.price}
                  </td>

                  <td className="px-4 py-3 text-center font-medium">
                    {currency}
                    {item.price * item.quantity}
                  </td>

                  <td className="px-4 py-3 text-center text-green-600 font-semibold">
                    Successful
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end p-4 font-semibold">
            Total: {currency}
            {order.totalPrice}
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;

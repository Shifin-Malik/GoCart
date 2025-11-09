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
      .then((res) => setOrders(res.data[0].purchase || []))
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

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-center">No</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-center">Quantity</th>
              <th className="px-4 py-3 text-center">Price</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => {
              const product = products.find((p) => p._id === order._id);
              if (!product) return null;
              const productImage = product.image[0].startsWith("http")
                ? product.image[0]
                : assets[product.image[0]];

              return (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-center font-semibold text-gray-700">
                    {index + 1}
                  </td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={productImage}
                      alt={product.name}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <p className="font-medium text-secondary">{product.name}</p>
                  </td>

                  <td className="px-4 py-3 text-center">{order.quantity}</td>

                  <td className="px-4 py-3 text-center font-medium text-secondary">
                    ₹{product.offerPrice * order.quantity}
                  </td>

                  <td className="px-4 py-3 text-center text-gray-600">
                    {order.date}
                  </td>

                  <td className="px-4 py-3 text-center text-green-600 font-semibold">
                    ✅ Successful
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;

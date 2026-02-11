import axios from "axios";
import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContextData } from "../../context/AppContext";

function AdminOrders() {
  const { orders } = useContext(AppContextData);

  console.log(orders);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-5">All Users' Orders</h1>

      {orders.length > 0 ? (
        <table className="w-full border-collapse shadow-md">
          <thead>
            <tr className="bg-primary/10 font-semibold">
              <th className="border p-3">No</th>
              <th className="border p-3">User</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Product</th>
              <th className="border p-3">Price</th>
              <th className="border p-3">Quantity</th>
              <th className="border p-3">Date</th>
              <th className="border p-3">Products</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id} className="hover:bg-gray-100">
                <td className="border p-3 text-center">{index + 1}</td>

                <td className="border p-3">
                  {order.userId?.username || "Guest"}
                </td>

                <td className="border p-3">{order.userId?.email || "-"}</td>

                <td className="border p-3 text-center">{order.totalItems}</td>

                <td className="border p-3 text-green-600 font-semibold">
                  ₹{order.totalPrice}
                </td>

                <td className="border p-3 text-center">{order.totalItems}</td>

                <td className="border p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="border p-3 flex gap-2">
                  {order.products.map((p, i) => (
                    <img
                      key={i}
                      src={p.productId?.image}
                      alt="product"
                      className="w-14 h-14 rounded-md object-cover"
                    />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
}

export default AdminOrders;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const API_URI = "http://localhost:3000/users";

  useEffect(() => {
    const userDataFetch = async () => {
      try {
        const { data } = await axios.get(API_URI);

        const allOrders = data.flatMap(
          (user) =>
            user.purchase?.map((p) => ({
              ...p,
              userName: user.userName,
              email: user.email,
            })) || []
        );

        setOrders(allOrders);
      } catch (error) {
        console.log(error);
      }
    };
    userDataFetch();
  }, []);

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
            {orders.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border p-3 text-center">{index + 1}</td>
                <td className="border p-3">{item.userName}</td>
                <td className="border p-3">{item.email}</td>
                <td className="border p-3">{item.name}</td>
                <td className="border p-3 text-green-600 font-semibold">
                  ₹{item.price}
                </td>
                <td className="border p-3 text-center">{item.quantity}</td>
                <td className="border p-3">{item.date}</td>
                <td className="border p-3">
                  <img
                    src={
                      item.image?.startsWith("http")
                        ? item.image
                        : assets[item.image] || "/images/placeholder.jpg"
                    }
                    alt={item.name}
                    className="w-14 h-14 rounded-md object-cover transition-transform hover:scale-110 delay-100 duration-100"
                  />
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

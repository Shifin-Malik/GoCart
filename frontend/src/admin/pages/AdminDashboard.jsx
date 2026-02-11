import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaRupeeSign, FaShoppingCart, FaBox } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { AppContextData } from "../../context/AppContext";
import { CChart } from "@coreui/react-chartjs";

function AdminDashboard() {
  const { products, setUser, totalOrders, totalRevenue, totalUsers } =
    useContext(AppContextData);
  const navigate = useNavigate();
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };

  const cardItems = [
    {
      id: 1,
      title: "Total Revenue",
      value: totalRevenue,
      days: "Last 30 Days",
      icon: <FaRupeeSign size={28} />,
      bgColor: "bg-red-500/40",
    },
    {
      id: 2,
      title: "Total Orders",
      value: totalOrders,
      days: "Last 30 Days",
      icon: <FaShoppingCart size={28} />,
      bgColor: "bg-green-500/40",
    },
    {
      id: 3,
      title: "Total Customers",
      value: totalUsers.length,
      days: "Last 30 Days",
      icon: <FaUsers size={28} />,
      bgColor: "bg-blue-500/40",
    },
    {
      id: 4,
      title: "Total Products",
      value: products.length,
      days: "Last 30 Days",
      icon: <FaBox size={28} />,
      bgColor: "bg-yellow-500/40",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-primary w-40 rounded-md h-10 font-bold text-white"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-wrap gap-6">
        {cardItems.map((item) => (
          <div
            key={item.id}
            className={`flex justify-between items-center w-56 h-32 rounded-2xl px-6 
  transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-xl 
  ${item.bgColor} shadow-md shadow-black/20`}
          >
            <div className="flex flex-col items-start">
              <h3 className="text-md font-semibold">{item.title}</h3>
              <p className="font-medium text-gray-700 text-sm">{item.days}</p>
              <p className="text-xl font-bold pt-3">{item.value}</p>
            </div>

            <div className="flex items-center justify-center text-black bg-white/45 w-10 h-10 rounded-full">
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-8 bg-whiterounded-xl shadow-md shadow-gray-300/50 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-secondary  dark:text-gray-100">
          Sales Overview
        </h2>
        <div className="h-64">
          {" "}
          <CChart
            type="line"
            data={{
              labels: ["Jan", "Apr", "Aug", "Dec"],
              datasets: [
                {
                  label: "Total Sales",
                  backgroundColor: "rgba(59,130,246,0.3)",
                  borderColor: "rgb(59,130,246)",
                  pointBackgroundColor: "#fff",
                  borderWidth: 2,
                  tension: 0.4,
                  data: [0, 30000, 60000, totalRevenue],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: "#1f2937",
                    font: { family: "Inter, sans-serif" },
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#4b5563" },
                  grid: { color: "#e5e7eb" },
                },
                y: {
                  ticks: { color: "#4b5563" },
                  grid: { color: "#e5e7eb" },
                },
              },
            }}
            style={{ height: "250px", width: "100%" }}
          />
        </div>
        <div className="h-64">
          <h2 className="text-2xl font-semibold mb-4 text-secondary  dark:text-gray-100">
            Orders Overview
          </h2>
          <CChart
            type="bar"
            data={{
              labels: ["Jan", "Apr", "Aug", "Dec"],
              datasets: [
                {
                  label: "Total Orders",
                  backgroundColor: "rgba(59,130,246,0.4)",
                  borderColor: "rgb(59,130,246)",
                  pointBackgroundColor: "#fff",
                  borderWidth: 2,
                  tension: 0.4,
                  data: [1, 3, 6, totalOrders],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: "#1f2937",
                    font: { family: "Inter, sans-serif" },
                  },
                },
              },
              scales: {
                x: {
                  ticks: { color: "#4b5563" },
                  grid: { color: "#e5e7eb" },
                },
                y: {
                  ticks: { color: "#4b5563" },
                  grid: { color: "#e5e7eb" },
                },
              },
            }}
            style={{ height: "250px", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import Login from "./Login";
import { AppContextData } from "../context/AppContext";
import { assets } from "../assets/assets";

function NavBar() {
  const { user, setUser, getCartCount } = useContext(AppContextData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setDropdownOpen(false);
  };

  const addToCart = () => {
    navigate("/GoCart/cart");
  };

  const links = [
    { id: 1, name: "Home", path: "/GoCart" },
    { id: 2, name: "Products", path: "/GoCart/product" },
    { id: 3, name: "Support", path: "/GoCart/Support" },
    { id: 4, name: "MyOrders", path: "/GoCart/orderPlace" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 py-3 border-b border-gray-200 text-secondary relative">
      <Link to="/GoCart">
        <h1 className="text-secondary font-bold text-3xl fugaz-one-regular">
          <span className="fugaz-one-regular text-primary">Go</span>Cart
        </h1>
      </Link>

      {/* Nav - Link = Home, Products, Support */}
      <div className="hidden md:flex items-center gap-4 lg:gap-8 font-bold">
        {links.map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            end={link.name === "Home"}
            className={({ isActive }) =>
              `transition ${
                isActive ? "text-blue-500 border-b-2" : "text-black"
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>

      <div className="flex gap-4 items-center justify-center relative">
        {user ? (
          <div className="relative">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <h2 className="text-secondary font-bold text-xl">
                Hi, {user.userName}
              </h2>
              <img
                src={assets.user}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                <div className="p-3 border-b border-gray-200">
                  <p className="font-bold">{user.userName}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 text-primary font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Login />
        )}

        <div className="relative cursor-pointer" onClick={addToCart}>
          <IoCartSharp
            size={30}
            className="w-10 h-10 bg-zinc-200 p-2 rounded-full hover:bg-zinc-300 transition"
          />
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {getCartCount()}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

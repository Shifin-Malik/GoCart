import React, { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { IoCartSharp } from "react-icons/io5";
import { HiOutlineMenu } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import Login from "./Login";
import { AppContextData } from "../context/AppContext";
import { assets } from "../assets/assets";
import { FaHeart } from "react-icons/fa";
function NavBar() {

  const { user, setUser, getCartCount, getWislistCount } = useContext(AppContextData);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const addToCart = () => {
    navigate("/GoCart/cart");
  };

  const addToWishList = () => {
    navigate("/GoCart/wishlist");
  };

  const links = [
    { id: 1, name: "Home", path: "/GoCart" },
    { id: 2, name: "Products", path: "/GoCart/product" },
    { id: 3, name: "Support", path: "/GoCart/support" },
    { id: 4, name: "MyOrders", path: "/GoCart/orderPlace" },
  ];

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 py-3 border-b border-gray-200 text-secondary relative">
        <Link to="/GoCart">
          <h1 className="text-secondary font-bold text-xl lg:text-3xl fugaz-one-regular">
            <span className="fugaz-one-regular text-primary">Go</span>Cart
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-6 font-bold">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              start={link.name === "Home" && link.path === "/GoCart"}
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
                <h2 className="text-secondary font-bold text-sm lg:text-xl">
                  Hi, {user.username}
                </h2>
                <img
                  src={assets.user}
                  alt="User"
                  className="w-6 h-6 lg:w-8 lg:h-8 rounded-full object-cover"
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                  <div className="p-3 border-b border-gray-200">
                    <p className="font-bold">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    {user?.role === "user" ? (
                      <div className="flex items-center gap-2 mt-2 cursor-pointer hover:text-red-500">
                        <FaHeart
                          onClick={() => navigate("/navigate")}
                          className="text-red-500"
                        />
                        <span className="text-sm font-bold">Wishlist</span>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <button
                          onClick={() => navigate("GoCart/admin")}
                          className="bg-blue-600 w-20 h-8 rounded-lg font-bold text-white cursor-pointer"
                        >
                          Admin
                        </button>
                      </div>
                    )}
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
              className="w-6 h-6 bg-zinc-200 p-1 lg:p-2 lg:w-10 lg:h-10 rounded-full hover:bg-zinc-300 transition"
            />
            {getCartCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {getCartCount()}
              </span>
            )}
          </div>
          <div className="relative cursor-pointer" onClick={addToWishList}>
            <FaHeart
              size={30}
              className="w-6 h-6 bg-zinc-200 p-1 lg:p-2 lg:w-10 lg:h-10 rounded-full hover:bg-zinc-300 transition"
            />
            {getWislistCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {getWislistCount()}
              </span>
            )}
          </div>
          <button
            className="md:hidden text-2xl lg:text-3xl"
            onClick={() => setMenuOpen(true)}
          >
            <HiOutlineMenu />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/60 bg-opacity-40 z-30 transition-opacity ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-secondary">Menu</h2>
          <button onClick={() => setMenuOpen(false)} className="text-3xl">
            <IoClose />
          </button>
        </div>

        <div className="flex flex-col p-4 gap-4 font-medium text-lg">
          {links.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="hover:text-primary transition"
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <button
              onClick={handleLogout}
              className="text-left text-red-600 font-semibold mt-6"
            >
              Logout
            </button>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </>
  );
}

export default NavBar;

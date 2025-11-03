import React from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import Login from "./Login";
import { IoCartSharp } from "react-icons/io5";

function NavBar() {
  const navigate = useNavigate();

  const addToCart = () => {
    navigate("/GoCart/cart");
  };

  const links = [
    { id: 1, name: "Home", path: "/GoCart" },
    { id: 2, name: "Products", path: "/GoCart/product" },
    { id: 5, name: "Support", path: "/GoCart/Support" },
  ];

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 py-3 border-b border-gray-200 text-secondary">
      <Link to="/GoCart">
        <h1 className="text-secondary font-bold text-3xl fugaz-one-regular">
          <span className="fugaz-one-regular text-primary">Go</span>Cart
        </h1>
      </Link>

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

      <div className="flex gap-4 items-center justify-center">
        <Login />
        <IoCartSharp
          onClick={addToCart}
          size={30}
          className="w-10 h-10 bg-zinc-200 p-2 rounded-full cursor-pointer hover:bg-zinc-300 transition"
        />
      </div>
    </nav>
  );
}

export default NavBar;

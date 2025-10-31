import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Login from "./Login";
import { IoCartSharp } from "react-icons/io5";
function NavBar() {
  const navigate = useNavigate()
  const addToCart = () => {
    navigate('/addtocart')
  }
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 py-3 border-b border-gray-200 text-secondary">
      <h1 className="text-secondary font-bold text-3xl fugaz-one-regular">
        <span className="fugaz-one-regular text-primary">Go</span>Cart
      </h1>

      <div className="hidden md:flex items-center gap-4 lg:gap-8 font-bold">
        {[
          { id: 1, name: "Home", path: "/GoCart" },
          { id: 2, name: "Products", path: "/product" },
          { id: 3, name: "About Us", path: "/about" },
          { id: 4, name: "Contact", path: "/contact" },
          { id: 5, name: "Services", path: "/services" },
        ].map((link) => (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) =>
              `transition font-vend-san ${
                isActive ? "border-b-2 border-secondary text-primary" : ""
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
          className="w-10 h-10 bg-zinc-200 p-2 rounded-full"
        />
      </div>
    </nav>
  );
}

export default NavBar;

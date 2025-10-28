import React from "react";
import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { assets } from "../assets/assets";

function NavBar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 py-3 border-b border-gray-200 text-secondary">
      <h1 className="text-secondary font-bold text-3xl fugaz-one-regular">
        <span className="fugaz-one-regular text-primary">Go</span>Cart
      </h1>

      <div className="hidden md:flex items-center gap-4 lg:gap-8 font-bold">
        {[
          { id:1,name: "Home", path: "/GoCart" },
          { id:2, name: "Shop", path: "/shop" },
          { id:3,name: "About Us", path: "/about" },
          { id:4,name: "Contact", path: "/contact" },
          { id:5,name: "Services", path: "/services" },
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

      <div className="hidden sm:flex relative w-80 justify-start items-center gap-6">
        <input
          type="text"
          className="h-8 w-60 rounded-lg border-2 border-black  px-8 text-sm"
          placeholder="Search"
        />
        <IoSearch size={18} className="absolute left-2" />
        <div className="hidden sm:flex">
          <img
            src={assets.user}
            className="rounded-full w-8 h-8 cursor-pointer"
            alt="User Profile"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 sm:hidden">
        <IoSearch size={22} className="cursor-pointer" />
        <img
          src={assets.user}
          className="rounded-full w-8 h-8 cursor-pointer"
          alt="User Profile"
        />
      </div>
    </nav>
  );
}

export default NavBar;

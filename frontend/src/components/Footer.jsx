import React from "react";
import { FaXTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa6";

function Footer() {
  return (
    <div className="h-80 w-full p-4  px-2">
      <div className="border border-zinc-200 shadow-lg rounded-2xl p-6 md:p-10">
        <div className="flex flex-col justify-center items-center gap-1 w-full">
          <h1 className="text-secondary font-semibold text-2xl text-center fugaz-one-regular">
            <span className="fugaz-one-regular text-primary">Go</span>Cart
          </h1>
          <p className="text-sm text-secondary">
            Shop smarter with GoCart — the easiest way to fill your cart with
            the things you love. Fast, reliable, and made for modern shoppers.
          </p>
        </div>
        <div className="flex gap-4 mt-5 text-gray-500 justify-center w-full">
          <a
            href="https://x.com/Shifinmalik"
            className="hover:text-gray-900 transition-colors"
          >
            <FaXTwitter size={18} />
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            <FaInstagram size={18} />
          </a>
          <a
            href="in/shifin-malik"
            className="hover:text-gray-900 transition-colors"
          >
            <FaLinkedin size={18} />
          </a>
          <a
            href="https://github.com/Shifin-Malik/"
            className="hover:text-gray-900 transition-colors"
          >
            <FaGithub size={18} />
          </a>
        </div>

        <div className="mt-10 w-full border border-zinc-200 shadow-lg"></div>
        <div className="flex justify-center p-2 text-secondary">
          <p className="text-xs"> © 2025 GoCart. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;

import React, { useState, useEffect, createContext } from "react";
import {
  productsDummyData,
  featuredItems,
  supportItems,
} from "../assets/assets";

export const AppContextData = createContext();

export const AppContext = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [support, setSupport] = useState([]);

  const [cartItems, setCartItems] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const fetchProductData = async () => {
    setProducts(productsDummyData);
  };

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
  };
  const updateCartQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      if (cartItems[items] > 0) {
        totalCount += cartItems[items];
      }
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  const fetchFeaturedItems = async () => {
    setFeatured(featuredItems);
  };
  const fetchSupportItems = async () => {
    setSupport(supportItems);
  };

  useEffect(() => {
    fetchFeaturedItems();
    fetchProductData();
    fetchSupportItems();
  }, []);

  const value = {
    currency,
    products,
    featured,
    support,
    formData,
    setFormData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return (
    <AppContextData.Provider value={value}>{children}</AppContextData.Provider>
  );
};

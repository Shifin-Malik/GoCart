import React, { useState, useEffect, createContext } from "react";
import { productsDummyData } from "../assets/assets";

export const AppContextData = createContext();

export const AppContext = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      setProducts(productsDummyData);
    };
    fetchProductData();
  }, []);

  const value = {
    currency,
    products,
  };

  return (
    <AppContextData.Provider value={value}>
      {children}
    </AppContextData.Provider>
  );
};

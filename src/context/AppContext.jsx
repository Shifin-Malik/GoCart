import React, { useState, useEffect, createContext } from "react";
import { productsDummyData, featuredItems } from "../assets/assets";

export const AppContextData = createContext();

export const AppContext = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);


   const fetchProductData = async () => {
      setProducts(productsDummyData);
    };

   const fetchFeaturedItems = async () => {
      setFeatured(featuredItems);
    };

   
  useEffect(() => {
    fetchFeaturedItems()
    fetchProductData();
  }, []);



  const value = {
    currency,
    products,
    featuredItems
  };

  return (
    <AppContextData.Provider value={value}>
      {children}
    </AppContextData.Provider>
  );
};

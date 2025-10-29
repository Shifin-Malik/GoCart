import React, { useState, useEffect, createContext } from "react";
import { productsDummyData, featuredItems, supportItems } from "../assets/assets";

export const AppContextData = createContext();

export const AppContext = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [support, setSupport] = useState([])

   const fetchProductData = async () => {
      setProducts(productsDummyData);
    };

   const fetchFeaturedItems = async () => {
      setFeatured(featuredItems);
    };
   const fetchSupportItems = async () => {
      setSupport(supportItems);
    };

   
  useEffect(() => {
    fetchFeaturedItems()
    fetchProductData();
    fetchSupportItems()
  }, []);



  const value = {
    currency,
    products,
    featured,
    support
  };

  return (
    <AppContextData.Provider value={value}>
      {children}
    </AppContextData.Provider>
  );
};

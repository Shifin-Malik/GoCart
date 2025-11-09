import React, { useState, useEffect, createContext } from "react";
import { featuredItems, supportItems } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContextData = createContext();

export const AppContext = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [support, setSupport] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [purchaseCount, setPurchaseCount] = useState(0)
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };



  useEffect(() => {
    fetchProducts();
    setFeatured(featuredItems);
    setSupport(supportItems);
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      axios
        .get(`http://localhost:3000/users?email=${user.email}`)
        .then((res) => {
          if (res.data.length > 0) {
            const dbUser = res.data[0];
            setCartItems(dbUser.cartProducts || []);
          }
        })
        .catch((err) => console.log("Error loading user cart:", err));
    } else {
      localStorage.removeItem("user");
      setCartItems([]);
    }
  }, [user]);

  const saveUserCartToDB = async (userEmail, updatedCart) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${userEmail}`
      );
      if (res.data.length > 0) {
        const currentUser = res.data[0];
        await axios.patch(`http://localhost:3000/users/${currentUser.id}`, {
          cartProducts: updatedCart,
        });
        console.log("Cart synced to backend");
      }
    } catch (err) {
      console.error("Error saving cart:", err);
    }
  };

  useEffect(() => {
    if (user) saveUserCartToDB(user.email, cartItems);
  }, [cartItems, user]);

  const addToCart = (productId) => {
    if (!user) return toast("Please login first!");

    const existing = cartItems.find((item) => item._id === productId);

    if (existing) {
      const updatedCart = cartItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { _id: productId, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) return removeFromCart(productId);

    const updatedCart = cartItems.map((item) =>
      item._id === productId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
  };

  const removeFromCart = (productId) => {
    const removeProduct = cartItems.filter((item) => item._id !== productId);
    setCartItems(removeProduct);
  };

  const getCartCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getCartAmount = () => {
    return cartItems.reduce((total, item) => {
      const product = products.find((p) => p._id === item._id);
      if (!product) return total;
      return total + product.offerPrice * (item.quantity || 1);
    }, 0);
  };

  const value = {
    currency,
    products,
    featured,
    support,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getCartCount,
    user,
    setUser,
    formData,
    setFormData,
    getCartAmount,
    updateCartQuantity,
    purchaseCount,
    setPurchaseCount
  };

  return (
    <AppContextData.Provider value={value}>{children}</AppContextData.Provider>
  );
};

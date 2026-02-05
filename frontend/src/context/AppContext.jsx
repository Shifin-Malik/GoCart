import React, { useState, useEffect, createContext } from "react";
import { featuredItems, supportItems } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import setupAxios from "../utils/setupAxios";

export const AppContextData = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const AppContext = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [support, setSupport] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const ejectAxios = setupAxios(backendUrl, () => {
      setUser(null);
      setCartItems([]);
      setWishlistItems([]);
      setTimeout(() => {
        navigate("/");
      }, 0);
    });

    return () => ejectAxios();
  }, [backendUrl, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data.products || []);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  const fetchProductsCategory = async (categoryId) => {
    try {
      const { data } = await axios.get(`/products/category/${categoryId}`);
      setProducts(data.products || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCart = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get("/cart");
      setCartItems(data.cart || []);
    } catch (err) {
      console.error("Fetch cart error:", err);
    }
  };

  const addToCart = async (productId) => {
    if (!user) return toast.error("Please login first");
    try {
      await axios.post("/cart", { productId, quantity: 1 });
      fetchCart();
    } catch (err) {
      toast.error(err.response?.data?.message || "Add to cart failed");
    }
  };

  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      await axios.delete(`/cart/${productId}`);
      fetchCart();
    } catch (err) {
      console.error("Remove cart error:", err);
    }
  };

  const updateCartQuantity = async (productId, action) => {
    if (!user) return;

    try {
      await axios.put(`/cart/${productId}`, { action });
      fetchCart();
    } catch (err) {
      console.error("Update quantity error:", err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("/cart");
      setCartItems([]);
    } catch (err) {
      console.error("Clear cart error:", err);
    }
  };

  const getCartCount = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const getCartAmount = () =>
    cartItems.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0,
    );

  const getWishlist = async () => {
    if (!user) return;

    try {
      const token = user.token || localStorage.getItem("token");

      const { data } = await axios.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlistItems(data.products || []);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        toast.error("Please login again");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to fetch wishlist",
        );
      }
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user) return toast.error("Please login first");

    try {
      const { data } = await axios.post(`/wishlist/toggle/${productId}`);
      toast.success(data.message);

      await getWishlist();
    } catch (error) {
      toast.error(error.response?.data?.message || "Wishlist action failed");
    }
  };

  const getWishlistCount = () => wishlistItems.length;

  const createOrder = async () => {
  if (!user) return swal("Login Required", "Please login first", "warning");
  if (!cartItems.length)
    return swal("Cart Empty", "Add some items", "warning");

  try {
    const token = user.token || localStorage.getItem("token");

    const products = cartItems.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
    }));

    const orderId = `ORD-${Date.now()}`;

    await axios.post(
      "/orders",
      { products, orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await clearCart();

    swal("✅ Order Placed", "Thanks for shopping!", "success");

    navigate("/orderPlace");

  } catch (err) {
    console.error(err);

    if (err.response?.status === 401) {
      swal("Session Expired", "Please login again", "warning");
    } else {
      swal("Error", err.response?.data?.message || "Order failed", "error");
    }
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
      fetchCart();
      getWishlist();
    } else {
      localStorage.removeItem("user");
      setCartItems([]);
      setWishlistItems([]);
    }
  }, [user]);

  const value = {
    currency,
    backendUrl,
    products,
    featured,
    support,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartCount,
    getCartAmount,
    user,
    setUser,
    formData,
    setFormData,
    createOrder,
    loading,
    setLoading,
    setProducts,
    getWishlist,
    wishlistItems,
    toggleWishlist,
    getWishlistCount,
    fetchProductsCategory,
  };

  return (
    <AppContextData.Provider value={value}>{children}</AppContextData.Provider>
  );
};

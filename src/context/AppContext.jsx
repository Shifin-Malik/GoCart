import React, { useState, useEffect, createContext } from "react";
import { featuredItems, supportItems } from "../assets/assets";
import axios from "axios";
import toast from "react-hot-toast";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

export const AppContextData = createContext();

export const AppContext = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [support, setSupport] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/products");
      setProducts(data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    setFeatured(featuredItems);
    setSupport(supportItems);
    usersDataFetch();
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
    const product = products.find((p) => p.id === productId);
    if (!product) return toast("Product not found!");

    const existing = cartItems.find((item) => item.id === productId);

    if (existing) {
      const updatedCart = cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([
        ...cartItems,
        {
          id: productId,
          quantity: 1,
          name: product.name,
          image: product.image[0],
          price: product.offerPrice,
        },
      ]);
    }
  };

  const createOrder = async () => {
    if (!user)
      return swal(
        "Login Required",
        "Please login to place an order",
        "warning"
      );

    if (!cartItems.length)
      return swal("Cart Empty", "Add some items first!", "warning");

    const cartAmount = getCartAmount();
    const tax = Math.floor(cartAmount * 0.005);
    const deliveryFee = 40;
    const totalAmount = cartAmount + tax + deliveryFee;

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${user.email}`
      );
      const dbUser = res.data[0];

      const ordersWithDate = cartItems.map((item) => ({
        id: item.id,
        quantity: item.quantity || 1,
        price: totalAmount,
        date: new Date().toLocaleString(),
        image: item.image,
        name: item.name,
      }));

      await axios.patch(`http://localhost:3000/users/${dbUser.id}`, {
        purchase: [...(dbUser.purchase || []), ...ordersWithDate],
        cartProducts: [],
      });

      setCartItems([]);
      swal("✅ Order Successful!", "Your purchase is complete!", "success");
      navigate("/GoCart/orderPlace");
    } catch (error) {
      console.log("Order Error:", error);
    }
  };


  const updateCartQuantity = (productId, newQty) => {
    if (newQty <= 0) return removeFromCart(productId);
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );
    setCartItems(updatedCart);
  };

  const removeFromCart = (productId) => {
    const removeProduct = cartItems.filter((item) => item.id !== productId);
    setCartItems(removeProduct);
  };

  const getCartCount = () =>
    cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const getCartAmount = () =>
    cartItems.reduce((total, item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return total;
      return total + product.offerPrice * (item.quantity || 1);
    }, 0);


  const usersDataFetch = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/users");
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleBlockUser = async (userId, userName, isBlocked) => {
    const confirm = await swal({
      title: `${isBlocked ? "Unblock" : "Block"} ${userName}?`,
      text: `This will ${isBlocked ? "unblock" : "block"} the user.`,
      icon: "warning",
      buttons: ["Cancel", `${isBlocked ? "Unblock" : "Block"}`],
      dangerMode: true,
    });

    if (confirm) {
      try {
        await axios.patch(`http://localhost:3000/users/${userId}`, {
          isBlocked: !isBlocked,
        });
        await usersDataFetch();
        swal(
          "✅ Success!",
          `${userName} has been ${isBlocked ? "unblocked" : "blocked"}.`,
          "success"
        );
      } catch (error) {
        swal("❌ Error", "Failed to update user status!", "error");
      }
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirm = await swal({
      title: `Delete ${userName}?`,
      text: "This action cannot be undone!",
      icon: "warning",
      buttons: ["Cancel", "Delete"],
      dangerMode: true,
    });

    if (confirm) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        await usersDataFetch();
        swal("✅ Deleted!", `${userName} has been removed.`, "success");
      } catch (error) {
        swal("❌ Error", "Failed to delete user. Try again!", "error");
      } finally {
        setLoading(false);
      }
    }
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
    createOrder,
    users,
    handleDeleteUser,
    handleBlockUser,
    loading,
    setLoading,
    setProducts,
  };

  return (
    <AppContextData.Provider value={value}>{children}</AppContextData.Provider>
  );
};

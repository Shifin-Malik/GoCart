import Cart from "../models/CartModel.js";
import mongoose from "mongoose";


export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity = 1 } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const cartItem = await Cart.findOne({ userId, productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();

      return res.json({
        success: true,
        message: "Cart updated",
        cart: cartItem,
      });
    }

    const newItem = await Cart.create({
      userId,
      productId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Product added to cart",
      cart: newItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({ userId })
      .populate("productId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      cart: cartItems,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    await Cart.findOneAndDelete({ userId, productId });

    res.json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;
    const { action } = req.body; 

    const cartItem = await Cart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    if (action === "inc") {
      cartItem.quantity += 1;
    } else if (action === "dec") {
      cartItem.quantity -= 1;
    }

    if (cartItem.quantity <= 0) {
      await cartItem.deleteOne();
      return res.json({
        success: true,
        message: "Item removed from cart",
      });
    }

    await cartItem.save();

    res.json({
      success: true,
      message: "Cart quantity updated",
      cart: cartItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    await Cart.deleteMany({ userId });

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

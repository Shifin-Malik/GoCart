import Wishlist from "../models/WishlistModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID required",
      });
    }

    await Wishlist.create({ userId, productId });

    res.status(201).json({
      success: true,
      message: "Product added to wishlist",
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const wishlist = await Wishlist.find({ userId }).populate("productId");

    res.status(200).json({
      success: true,
      products: wishlist,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    await Wishlist.findOneAndDelete({ userId, productId });

    res.status(200).json({
      status: "success",
      message: "Product removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

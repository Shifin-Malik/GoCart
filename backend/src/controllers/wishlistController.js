import Wishlist from "../models/WishlistModel.js";
import Product from "../models/ProductModel.js"; 


export const getWishlist = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;

    const wishlist = await Wishlist.find({ userId })
      .populate("productId");

    res.status(200).json({
      success: true,
      products: wishlist,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const toggleWishlist = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user._id;
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID required",
      });
    }

  
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const item = await Wishlist.findOne({ userId, productId });

    
    if (item) {
      await item.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Removed from wishlist",
        action: "removed",
      });
    }


    await Wishlist.create({ userId, productId });

    res.status(201).json({
      success: true,
      message: "Added to wishlist",
      action: "added",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

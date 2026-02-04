import Order from "../models/OrderModel.js";
import Product from "../models/ProductModel.js"; 


export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { products, orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products provided",
      });
    }

    const existingOrder = await Order.findOne({ orderId });
    if (existingOrder) {
      return res.status(409).json({
        success: false,
        message: "Order already exists",
      });
    }

    let totalPrice = 0;
    let totalItems = 0;
    const finalProducts = [];

    for (const item of products) {
      if (!item.productId || !item.quantity || item.quantity < 1) {
        return res.status(400).json({
          success: false,
          message: "Invalid product data",
        });
      }

      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      const itemTotal = product.price * item.quantity;

      totalPrice += itemTotal;
      totalItems += item.quantity;

      finalProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price, 
      });
    }

    const order = await Order.create({
      userId,
      products: finalProducts,
      orderId,
      totalPrice,
      totalItems,
    });

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate order ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ userId })
      .populate("products.productId", "title price image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

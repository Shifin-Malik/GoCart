import Order from "../../models/OrderModel.js";

export const getAllUsersTotalPurchased = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalPurchased: {
            $sum: "$totalItems",
          },
        },
      },
    ]);

    res.json({
      success: true,
      totalPurchased: result[0]?.totalPurchased || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTotalRevenue = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    res.json({
      success: true,
      totalRevenue: result[0].totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email")
      .populate("products.productId", "name price image")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

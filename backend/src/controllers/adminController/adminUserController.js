import User from "../../models/UserModel.js";
import mongoose from "mongoose";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "faild to fetch users",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user",
    });
  }
};

export const toggleUserBlock = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user || user.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "User not found or deleted",
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
      user,
    });
  } catch (error) {
    console.error("Toggle Block Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const permanentDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User permanently deleted",
    });
  } catch (error) {
    console.error("Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to permanently delete user",
    });
  }
};

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        return res.status(500).json({
          success: false,
          message: "JWT secret not configured",
        });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({
        _id: decoded.id,
        isDeleted: false,
      }).select("-password");

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.isBlocked) {
        return res.status(403).json({
          success: false,
          message: "Your account is blocked by admin",
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please login again.",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
});

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }
};

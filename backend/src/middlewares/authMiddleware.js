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

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded.id);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(401);
        throw new Error("User not found");
      }
          
      next();
    } catch (error) {
      res.status(401);

      if (error.name === "TokenExpiredError") {
        throw new Error("Token expired. Please login again.");
      }

      throw new Error("Not authorized. Invalid token.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized. No token provided.");
  }
});

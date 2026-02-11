import asyncHandler from "express-async-handler";
import User from "../../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";


export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  
  const admin = await User.findOne({
    email,
    role: "admin",
    isDeleted: false,
  }).select("+password");

  if (!admin) {
    res.status(401);
    throw new Error("Not authorized as admin");
  };

  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  res.status(200).json({
    success: true,
    message: "Admin login successful",
    data: {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id, admin.role),
    },
  });
});

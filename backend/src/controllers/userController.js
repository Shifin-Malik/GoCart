import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    },
  });
});


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }


  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid Email or Password");
  };

  res.json({
    success: true,
    data: {
      _id: user._id,
      username: user.username,
      email: user.email,
      profileImg: user.profileImg,
      profileThumbImg: user.profileThumbImg,
      token: generateToken(user._id),
    },
  });
});


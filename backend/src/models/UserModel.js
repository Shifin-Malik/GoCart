import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    profileImg: { type: String },
    profileThumbImg: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },

    accountCreatedDate: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;

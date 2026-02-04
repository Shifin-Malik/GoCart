import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/:productId", protect, removeFromCart);
router.put("/:productId", protect, updateCartQuantity);
router.delete("/", protect, clearCart);

export default router;

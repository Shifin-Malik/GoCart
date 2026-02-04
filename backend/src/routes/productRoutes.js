import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "../controllers/productController.js";
import uploadProduct from "../middlewares/uploadProduct.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/category/:categoryname", getProductsByCategory);
router.get("/:id", getProductById);
router.post("/", protect, uploadProduct.single("image"), createProduct);

export default router;

import express from "express";

import {
  getAllCategories,
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/categories", getAllCategories);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProductById);

export default router;

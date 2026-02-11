import express from "express";
import { adminLogin } from "../../controllers/adminController/adminController.js";
import {
  toggleUserBlock,
  getAllUsers,
  getUserById,
  permanentDeleteUser,
} from "../../controllers/adminController/adminUserController.js";
import { adminOnly, protect } from "../../middlewares/authMiddleware.js";
import {
  getAdminAllProducts,
  // getProductByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/adminController/adminProductController.js";
import {
  getAllUsersTotalPurchased,
  getTotalRevenue,
  getAllOrders,
} from "../../controllers/adminController/adminOrderController.js";
import uploadProduct from "../../middlewares/uploadProduct.js";

const router = express.Router();

router.post("/", adminLogin);
router.get("/users", protect, adminOnly, getAllUsers);
router.get("/users/:id", protect, adminOnly, getUserById);
router.put("/user/toggle/:id", protect, adminOnly, toggleUserBlock);
router.delete("/user/:id", protect, adminOnly, permanentDeleteUser);
// router.get("/category/:category", protect, adminOnly, getProductByCategory);
router.get("/products", protect, adminOnly, getAdminAllProducts);
router.get("/totalPurchase", protect, adminOnly, getAllUsersTotalPurchased);
router.get("/totalRev", protect, adminOnly, getTotalRevenue);
router.get("/allOrders", protect, adminOnly, getAllOrders);

router.post(
  "/product",
  protect,
  adminOnly,
  uploadProduct.single("image"),
  createProduct,
);
router.delete("/product/:id", protect, adminOnly, deleteProduct);
router.put(
  "/product/:id",
  protect,
  adminOnly,
  uploadProduct.single("image"),
  updateProduct,
);

export default router;

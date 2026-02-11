import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import connectCloudinary from "./config/cloudinary.js";
import cors from "cors";
import { apiLimiter } from "./middlewares/rateLimiter.js";

dotenv.config();
connectDB();
connectCloudinary();

const app = express();
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiLimiter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/admin", adminRoutes);

app.use((req, res) => {
  res.status(404);
  throw new Error("Route not found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

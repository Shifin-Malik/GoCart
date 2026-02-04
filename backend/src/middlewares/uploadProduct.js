import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { cloudinary } from "../config/cloudinary.js";

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const uploadProduct = multer({
  storage: productStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
});

export default uploadProduct;

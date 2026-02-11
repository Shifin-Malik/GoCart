import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../validators/userValidator.js";
const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);

export default router;

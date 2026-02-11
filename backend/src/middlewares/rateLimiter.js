import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 200,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

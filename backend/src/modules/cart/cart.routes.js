import express from "express";

import authUser from "../../shared/middleware/authUser.js";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "./cart.controller.js";

const router = express.Router();

router.get("/", authUser, getCart);
router.post("/add", authUser, addToCart);
router.delete("/remove/:productId", authUser, removeFromCart);
router.delete("/clear", authUser, clearCart);

export default router;

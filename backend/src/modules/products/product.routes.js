import express from "express";

import {
  addProduct,
  listProducts,
  removeProduct,
} from "./product.controller.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/list", listProducts);
router.delete("/remove/:id", removeProduct);

export default router;

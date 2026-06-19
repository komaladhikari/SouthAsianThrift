import express from 'express';
import authUser from "../../shared/middleware/authUser.js";

import {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
} from "./auth.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/admin/login", adminLogin);
router.get("/profile", authUser, getUserProfile);
router.put("/profile", authUser, updateUserProfile);

export default router;
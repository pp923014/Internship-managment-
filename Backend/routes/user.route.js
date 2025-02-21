import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  apply,
  updateProfile
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/apply", protectRoute, apply);
router.get("/check", protectRoute, checkAuth);
router.put("/update-profile", protectRoute, updateProfile);

// router.get("/check", protectRoute, checkAuth);

export default router;

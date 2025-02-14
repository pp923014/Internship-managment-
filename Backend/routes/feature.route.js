import express from "express";
import multer from "multer";
import Feature from "../models/feature.model.js";
import { sendpost, getpost } from "../controllers/feature.controller.js";
import { protectRoute, isUserAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();
const upload = multer();

// Upload an item with an image
router.post("/feature",protectRoute,isUserAdmin, upload.single("image"), sendpost);

// Fetch all items
router.get("/feature", getpost);

export default router;

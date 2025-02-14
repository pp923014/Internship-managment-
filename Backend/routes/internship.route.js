import express from "express";
import multer from "multer";
import Internship from "../models/internship.model.js";
import { sendpost, getpost } from "../controllers/internship.controller.js";
import { protectRoute, isUserAdmin } from "../middleware/auth.middleware.js";
const router = express.Router();
const upload = multer();

// Upload an item with an image
router.post("/internship",protectRoute,isUserAdmin, upload.single("image"), sendpost);

// Fetch all items
router.get("/internship", getpost);

export default router;

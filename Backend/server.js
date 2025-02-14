import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import featureRoute from "./routes/feature.route.js";
import internship from "./routes/internship.route.js";
import authRoutes from "./routes/user.route.js";
dotenv.config();
const app = express();

const PORT = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests

app.use("/api", featureRoute);
app.use("/api", internship);
app.use("/api/auth", authRoutes);
// MongoDB connection
app.listen(PORT, () => {
  console.log("server is running on PORT:" + PORT);
  connectDB();
});

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// ROUTES
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

console.log("🔥🔥🔥 THIS server.js IS RUNNING 🔥🔥🔥");

const app = express();

/* ================= FIX __dirname ================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true })); // 🔥 REQUIRED for FormData (multer)

/* ================= ENSURE UPLOADS FOLDER ================= */
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("📁 uploads folder created");
}

/* ================= HEALTH CHECK ================= */
app.get("/__health", (req, res) => {
  res.json({
    ok: true,
    server: "SweetTooth backend running",
  });
});

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(uploadsDir));

/* ================= API ROUTES ================= */
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/messages", messageRoutes);

/* ================= DB ================= */
mongoose
  .connect(
    "mongodb+srv://nithiish495:9884973235@nithish.scg7e1e.mongodb.net/sweettooth"
  )
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

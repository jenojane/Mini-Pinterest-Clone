// server/index.js
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { connectDB } from "./db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

// Set up multer for uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Database
let db;
const initDB = async () => {
  db = await connectDB();
  await db.execute(`
    CREATE TABLE IF NOT EXISTS images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255),
      image_path VARCHAR(255)
    )
  `);
};
initDB();

// Routes
app.get("/images", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM images ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const title = req.body.title || "Untitled";
    const imagePath = `/uploads/${req.file.filename}`;

    await db.execute(
      "INSERT INTO images (title, image_path) VALUES (?, ?)",
      [title, imagePath]
    );

    res.json({ success: true, message: "✅ Image uploaded successfully!" });
  } catch (err) {
    console.error("❌ Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);

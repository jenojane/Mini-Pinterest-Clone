// server/importImages.js
import fs from "fs";
import path from "path";
import { connectDB } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const db = await connectDB();
  const uploadsDir = path.join(process.cwd(), "uploads");

  if (!fs.existsSync(uploadsDir)) {
    console.log("⚠️ uploads/ folder not found!");
    return;
  }

  const files = fs.readdirSync(uploadsDir);
  for (const file of files) {
    const title = path.parse(file).name;
    const imagePath = `/uploads/${file}`;

    try {
      const [rows] = await db.execute(
        "SELECT id FROM images WHERE image_path = ?",
        [imagePath]
      );
      if (rows.length === 0) {
        await db.execute(
          "INSERT INTO images (title, image_path) VALUES (?, ?)",
          [title, imagePath]
        );
        console.log(`🖼️ Inserted: ${title}`);
      }
    } catch (err) {
      console.error(`❌ Error inserting ${title}:`, err.message);
    }
  }

  console.log("✅ Import completed!");
  await db.end();
};

run();

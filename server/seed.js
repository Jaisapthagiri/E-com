import path from "path";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import Product from "./models/Product.js";

dotenv.config();
const __dirname = path.resolve();

const products = [
  {
    name: "PANT",
    category: "pant",
    price: 899,
    description: ["Comfortable denim pants", "Perfect for daily wear"],
    images: ["pant1.png", "pant2.png"],
  },
  {
    name: "GIRL",
    category: "girl",
    price: 749,
    description: ["Trendy outfits for girls", "Soft and breathable fabric"],
    images: ["girl1.png", "girl2.png"],
  },
  {
    name: "WOMEN",
    category: "women",
    price: 999,
    description: ["Elegant women's wear", "Stylish and comfortable"],
    images: ["women1.png"],
  },
  {
    name: "MEN",
    category: "men",
    price: 899,
    description: ["Casual shirts for men", "Durable and premium cotton"],
    images: ["men1.png", "men2.png"],
  },
  {
    name: "MAGGI",
    category: "maggi",
    price: 49,
    description: ["Instant noodles pack", "Ready in 2 minutes"],
    images: ["maggi.png"],
  },
  {
    name: "BOTTLES",
    category: "bottles",
    price: 299,
    description: ["Reusable water bottle", "Leak proof and durable"],
    images: ["bottles.png"],
  },
  {
    name: "BREAD",
    category: "bread",
    price: 79,
    description: ["Freshly baked bread", "Soft and delicious"],
    images: ["bread.png"],
  },
];

const seedProducts = async () => {
  try {
    await connectDB();
    connectCloudinary();

    const existing = await Product.find();
    if (existing.length) {
      console.log("Products already exist. Skipping seeding...");
      process.exit(0);
    }

    const seedImagesFolder = path.join(__dirname, "seed_images");

    for (const item of products) {
      const uploaded = [];
      for (const img of item.images) {
        const filePath = path.join(seedImagesFolder, img);
        const res = await cloudinary.uploader.upload(filePath, {
          folder: "Ecommerce_Seed_Images",
        });
        uploaded.push(res.secure_url);
      }
      await Product.create({
        name: item.name,
        description: item.description,
        price: item.price,
        image: uploaded,
        category: item.category,
      });
      console.log(`Added: ${item.name}`);
    }

    console.log("Seeding completed.");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err.message);
    process.exit(1);
  }
};

seedProducts();

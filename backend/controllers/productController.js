import Product from "../models/Product.js";

/* =========================
   GET ALL PRODUCTS (FIXED 500)
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

    const safeProducts = products.map((p) => {
      let price = 0;

      if (
        p.priceByKg &&
        typeof p.priceByKg === "object" &&
        Object.keys(p.priceByKg).length > 0
      ) {
        price = Object.values(p.priceByKg)[0];
      }

      return {
        ...p,
        price, // frontend compatibility
      };
    });

    res.json(safeProducts);
  } catch (err) {
    console.error("❌ GET PRODUCTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   GET SINGLE PRODUCT
========================= */
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* =========================
   CREATE PRODUCT (FIXED)
========================= */
export const createProduct = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    const imagePaths = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    let priceByKg = {};
    try {
      priceByKg = JSON.parse(req.body.priceByKg);
    } catch {
      return res.status(400).json({ error: "Invalid priceByKg JSON" });
    }

    const product = new Product({
      title: req.body.title,
      priceByKg,
      images: imagePaths,
      category: req.body.category,
      flavor: req.body.flavor,
      occasion: req.body.occasion,
      eggless: req.body.eggless === "true",
      bestseller: req.body.bestseller === "true",
      rating: Number(req.body.rating) || 0,
      reviews: req.body.reviews || [],
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("❌ CREATE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

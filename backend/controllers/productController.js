import Product from "../models/Product.js";

/* =========================
   GET ALL PRODUCTS
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
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
   CREATE PRODUCT (KG BASED PRICE)
========================= */
export const createProduct = async (req, res) => {
  try {
    // 🔒 IMAGE CHECK
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images uploaded" });
    }

    // 🖼️ IMAGE PATHS
    const imagePaths = req.files.map(
      (file) => `/uploads/${file.filename}`
    );

    // ⚖️ KG PRICE PARSE (VERY IMPORTANT)
    // frontend should send JSON string
    // example: { "0.5": 450, "1": 800, "2": 1500 }
    const priceByKg = JSON.parse(req.body.priceByKg);

    const product = new Product({
      title: req.body.title,

      priceByKg, // 🔥 MAIN CHANGE

      rating: Number(req.body.rating),
      reviews: req.body.reviews,

      images: imagePaths,

      category: req.body.category,
      flavor: req.body.flavor,
      occasion: req.body.occasion,
      eggless: req.body.eggless === "true",
      bestseller: req.body.bestseller === "true",
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

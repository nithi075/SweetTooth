import Product from "../models/Product.js";

/* =========================
   GET ALL PRODUCTS
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();

    // 🔥 Convert priceByKg → price (for frontend compatibility)
    const formattedProducts = products.map((product) => {
      let displayPrice = 0;

      if (product.priceByKg && typeof product.priceByKg === "object") {
        const prices = Object.values(product.priceByKg);
        displayPrice = prices.length > 0 ? prices[0] : 0;
      }

      return {
        ...product,
        price: displayPrice, // 👈 frontend uses cake.price
      };
    });

    res.json(formattedProducts);
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
    const product = await Product.findById(req.params.id).lean();

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    let displayPrice = 0;
    if (product.priceByKg && typeof product.priceByKg === "object") {
      const prices = Object.values(product.priceByKg);
      displayPrice = prices.length > 0 ? prices[0] : 0;
    }

    res.json({
      ...product,
      price: displayPrice,
    });
  } catch (err) {
    console.error("❌ GET SINGLE PRODUCT ERROR:", err);
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

    // ⚖️ priceByKg MUST be JSON string
    const priceByKg = JSON.parse(req.body.priceByKg);

    const product = new Product({
      title: req.body.title,

      priceByKg, // 🔥 main price object

      rating: Number(req.body.rating) || 0,
      reviews: req.body.reviews || 0,

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
    console.error("❌ CREATE PRODUCT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

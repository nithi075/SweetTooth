import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,

  // 🔥 KG BASED PRICING
  priceByKg: {
    type: Map,
    of: Number, // { "0.5": 450, "1": 800 }
    required: true,
  },

  rating: Number,
  reviews: String,

  images: [String],

  category: String,
  flavor: String,
  occasion: String,
  eggless: Boolean,
  bestseller: Boolean,
});

export default mongoose.model("Product", productSchema);

import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    // 🔥 FIXED: Object instead of Map
    priceByKg: {
      type: Object,
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
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

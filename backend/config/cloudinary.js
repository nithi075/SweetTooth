import upload from "../middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

router.post("/", upload.array("images", 5), async (req, res) => {
  const imageUrls = [];

  for (const file of req.files) {
    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      { folder: "sweettooth_cakes" }
    );
    imageUrls.push(result.secure_url);
  }

  const product = new Product({
    ...req.body,
    images: imageUrls, // 🔥 URLs only
  });

  await product.save();
  res.json(product);
});

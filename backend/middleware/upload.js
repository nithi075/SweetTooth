import multer from "multer";

/*
  🔥 Cloudinary-ku local disk storage vendam
  🔥 Memory storage use pannrom
*/

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per image
    files: 5,                 // max 5 images
  },
  fileFilter: (req, file, cb) => {
    // allow only images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

export default upload;

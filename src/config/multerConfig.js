const multer = require("multer");
const path = require("path");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define upload folder dynamically based on the field name
    let folder = "";
    if (file.fieldname === "fee_receipt") {
      folder = "uploads/fee_receipts";
    } else if (file.fieldname === "id_proof") {
      folder = "uploads/id_proofs";
    } else if (file.fieldname === "profile_image") {
      folder = "uploads/profile_images";
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    // Create a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname); // Get the file extension
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// File filter to allow specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed!"), false);
  }
};

// Multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
});

module.exports = upload;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create folders automatically
const folders = [
  "uploads/covers",
  "uploads/gallery",
  "uploads/videos",
];

folders.forEach((folder) => {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }
});

// Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "coverImage") {
      cb(null, "uploads/covers");
    } else if (file.fieldname === "galleryImages") {
      cb(null, "uploads/gallery");
    } else if (file.fieldname === "video") {
      cb(null, "uploads/videos");
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.floor(Math.random() * 1000000) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// File Validation
const fileFilter = (req, file, cb) => {
  if (file.fieldname === "video") {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only video files are allowed."));
    }
  } else {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  }
};

// Upload
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB
  },
});

module.exports = upload;
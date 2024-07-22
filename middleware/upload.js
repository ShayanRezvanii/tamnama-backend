/** @format */

const path = require("path");
const multer = require("multer");
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `uploads/${req.params.id}`;

    // Check if directory exists, if not create it
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.params.id + "_" + Date.now() + ext);
  },
});

let upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      console.log("support only jpg,png,jpeg");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
}).single("image");

module.exports = upload;

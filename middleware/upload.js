/** @format */

const path = require("path");
const multer = require("multer");
const fs = require("fs");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir;
    // Determine the directory based on a key in the request
    if (req.query.storageKey === "profile") {
      dir = `uploads/profile/${req.params.id}`;
    } else if (req.query.storageKey === "file") {
      dir = `uploads/file/${req.params.id}`;
    } else {
      // Default or error handling if the key is not valid
      return cb(new Error("Invalid storage key"), null);
    }

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

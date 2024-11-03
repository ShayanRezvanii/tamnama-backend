/** @format */
const express = require("express");
const { createServer } = require("https"); // Change to HTTPS
const fs = require("fs"); // To read SSL certificate files
const post = require("./Routes/post-routes");
const users = require("./Routes/user-routes");
const category = require("./Routes/category-routes");
const app = express();
const cors = require("cors");
const upload = require("./middleware/upload");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

// Load SSL certificates
const sslOptions = {
  key: fs.readFileSync("./util/files/PV.key.txt"), // Adjust the path as necessary
  cert: fs.readFileSync("./util/files/CRT.crt.txt"), // Adjust the path as necessary
};

// List of allowed origins including 89.40.78.68
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "http://172.25.1.29:3000",
  "http://172.25.1.29:3001",
  "http://172.25.1.29:3002",
  "https://tamnama.nsjsoft.ir:3001",
  "http://tamnama.nsjsoft.ir:3002",
  "https://tamnama.nsjsoft.ir:3002",
  "http://tamnama.nsjsoft.ir",
  "https://tamnama.nsjsoft.ir",
  "http://tamnamaadmin.nsjsoft.ir:3001",
  "http://tamnamaadmin.nsjsoft.ir",
  "https://tamnamaadmin.nsjsoft.ir",
  "http://89.40.78.68", // Explicitly allow this IP
  "https://89.40.78.68",
  "https://172.67.170.113",
  "http://172.67.170.113",
  "https://tamback.nsjsoft.ir",
  "http://tamback.nsjsoft.ir"
];

// CORS configuration allowing specific origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow credentials (cookies, authentication headers)
};

app.use(cors(corsOptions));
app.use(express.json());

// Set Content Security Policy
app.use((req, res, next) => {
  res.setHeader("Content-Security-Policy", "default-src 'self' https:;");
  next();
});

// File upload route
app.post("/api/upload/:id", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ success: false, message: err });
    } else {
      if (!req.file) {
        res.status(400).json({ success: false, message: "No file selected!" });
      } else {
        res.status(200).json({
          success: true,
          message: "File uploaded!",
          file: `uploads/${req.query.storageKey}/${req.params.id}/${req.file.filename}`,
        });
      }
    }
  });
});

app.use("/api/uploads", express.static("uploads"));

// API routes
app.use("/api/products", post);
app.use("/api/client/products", post);
app.use("/api/users", users);
app.use("/api/client/users", users);
app.use("/api/category", category);
app.use("/api/client/category", category);

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Create HTTPS server
    const port = process.env.PORT || 8000;
    createServer(sslOptions, app).listen(port, '0.0.0.0', () => {
      console.log(`Server running on https://localhost:${port}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));

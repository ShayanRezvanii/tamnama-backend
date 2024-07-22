/** @format */
const express = require("express");
const post = require("./Routes/post-routes");
const users = require("./Routes/user-routes");
const category = require("./Routes/category-routes");
const app = express();
const mongoConnect = require("./util/database");
const cors = require("cors");
const upload = require("./middleware/upload");
const Products = require("./models/products");

const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const corsOptions = {
  origin: "http://localhost:3000", //  frontend host
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post("/api/upload/:id", (req, res) => {
  upload(req, res, (err) => {
    console.log(res);
    if (err) {
      res.status(400).json({ success: false, message: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ success: false, message: "No file selected!" });
      } else {
        res.status(200).json({
          success: true,
          message: "File uploaded!",
          file: `uploads/${req.params.id}/${req.file.filename}`,
        });
      }
    }
  });
});

app.use("/api/uploads", express.static("uploads"));
app.use("/api/products", post);
app.use("/api/users", users);
app.use("/api/category", category);

mongoose
  .connect(process.env.DATABASE_URL)
  .then((res) => {
    console.log("connected");
    app.listen(8000);
  })
  .catch((err) => console.log(err));

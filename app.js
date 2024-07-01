/** @format */
const express = require("express");
const post = require("./Routes/post-routes");
const users = require("./Routes/user-routes");
const category = require("./Routes/category-routes");
const app = express();
const mongoConnect = require("./util/database");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const corsOptions = {
  origin: "http://localhost:3000", //  frontend host
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

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

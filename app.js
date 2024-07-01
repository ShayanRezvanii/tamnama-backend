/** @format */
const express = require("express");
const post = require("./Routes/post-routes");
const users = require("./Routes/user-routes");
const app = express();
const mongoConnect = require("./util/database");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

app.use(express.json());
app.use("/api/products", post);
app.use("/api/users", users);

mongoose
  .connect(process.env.DATABASE_URL)
  .then((res) => {
    console.log("connected");
    app.listen(8000);
  })
  .catch((err) => console.log(err));

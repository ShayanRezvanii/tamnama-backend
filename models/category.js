/** @format */

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  shopName: { type: String, required: true },
  categories: [
    {
      name: { type: String, required: true },
    },
  ],
});

module.exports = mongoose.model("Category", categorySchema);

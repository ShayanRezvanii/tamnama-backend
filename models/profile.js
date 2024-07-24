/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  firstColor: { type: String, required: true },
  secondColor: { type: String, required: true },
  workTime: { type: String, required: true },
  phone: { type: String, required: true },
  shopName: { type: String, required: true },
  imageURL: { type: String, required: true },

  _id: Number,
});

module.exports = mongoose.model("profile", profileSchema);

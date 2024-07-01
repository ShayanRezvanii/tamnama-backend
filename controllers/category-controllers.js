/** @format */

const Category = require("../models/category");
require("dotenv").config({ path: "./config.env" });

const getCategory = async (req, res, next) => {
  try {
    const { shopName } = req.query; // Assume shopName is passed as a query parameter
    if (!shopName) {
      return res.status(400).json({ message: "shopName is required" });
    }
    const allCategory = await Category.find({ shopName });
    res.json({ allCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { shopName, categories } = req.body; // Assume shopName is passed as a query parameter
    if (!shopName) {
      return res.status(400).json({ message: "shopName is required" });
    }
    const createdCategory = new Category({
      shopName,
      categories,
    });

    await createdCategory.save();
    res.json({ createdCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategory,
  addCategory,
};

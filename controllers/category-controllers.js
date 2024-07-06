/** @format */

const Category = require("../models/category");
require("dotenv").config({ path: "./config.env" });
const UUID = require("uuid-int");

const getCategory = async (req, res, next) => {
  try {
    const { shopName } = req.query; // Assume shopName is passed as a query parameter
    if (!shopName) {
      return res.status(400).json({ message: "shopName is required" });
    }
    const allCategory = await Category.findOne({ shopName });
    console.log(allCategory);
    res.json({ allCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { shopName } = req.query;
    const { categoryName } = req.body;
    if (!shopName) {
      return res.status(400).json({ message: "shopName is required" });
    }

    const allCategory = await Category.findOne({ shopName });

    const updateWithDeletedItem = allCategory.categories.filter(
      (item) => item !== categoryName
    );
    console.log(updateWithDeletedItem);

    const updatedCategory = await Category.findOneAndUpdate(
      { shopName },
      {
        $set: { shopName, categories: updateWithDeletedItem },
        // $setOnInsert: { _id: uuid },
      },
      { new: true, upsert: true } // Return the updated document or create a new one if it doesn't exist
    );

    res.json({ updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { shopName, categories } = req.body;
    const id = 0;

    // Ensure shopName is provided
    if (!shopName) {
      return res.status(400).json({ message: "shopName is required" });
    }

    // Generate a UUID for the new category
    const generator = UUID(id);
    const uuid = generator.uuid();

    // Fetch the existing document (if any)
    const existingShop = await Category.findOne({ shopName });

    let updatedCategories;
    if (existingShop) {
      const existingCategories = existingShop.categories;

      updatedCategories = [...existingCategories, ...categories];
    } else {
      updatedCategories = categories;
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { shopName },
      {
        $set: { shopName, categories: updatedCategories },
        $setOnInsert: { _id: uuid },
      },
      { new: true, upsert: true } // Return the updated document or create a new one if it doesn't exist
    );

    res.json({ updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategory,
  addCategory,
  deleteCategory,
};

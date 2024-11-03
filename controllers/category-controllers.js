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
    res.json({ allCategory });

    console.log(allCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { shopName } = req.query;
    console.log(shopName);
    const { categoryId } = req.body;
    if (!shopName) {
      return res.status(400).json({ message: "shopName is required" });
    }

    const allCategory = await Category.findOne({ shopName });

    const updateWithDeletedItem = allCategory.categories.filter(
      (item) => item.id !== categoryId
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
    console.log("update" + updatedCategory);

    res.json({ updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCategory = async (req, res, next) => {
  try {
    const { shopName, categories } = req.body;
    const id = 0;

    // Ensure shopName and categories are provided
    if (!shopName || !categories) {
      return res
        .status(400)
        .json({ message: "shopName and categories are required" });
    }

    // Generate a UUID for the new category
    const generator = UUID(id);
    const uuid = generator.uuid();

    // Fetch the existing document (if any)
    const existingShop = await Category.findOne({ shopName });

    let updatedCategories;
    if (existingShop) {
      const existingCategories = existingShop.categories;

      // Generate priority for the new category
      const newCategory = {
        ...categories,
        priority: existingCategories.length + 1,
        id: uuid,
      };
      updatedCategories = [...existingCategories, newCategory];
    } else {
      // Generate priority for the new category
      updatedCategories = [{ ...categories, priority: 1, id: uuid }];
    }

    // Sort categories by priority
    updatedCategories.sort((a, b) => a.priority - b.priority);

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

const moveCategory = async (req, res, next) => {
  try {
    const { shopName, categoryId, newIndex } = req.body;

    // Ensure all required fields are provided
    if (!shopName || !categoryId || newIndex === undefined) {
      return res
        .status(400)
        .json({ message: "shopName, categoryId, and newIndex are required" });
    }

    // Fetch the existing document
    const existingShop = await Category.findOne({ shopName });
    if (!existingShop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const { categories } = existingShop;

    // Find the category to move
    const categoryIndex = categories.findIndex((cat) => cat.id === categoryId);
    if (categoryIndex === -1) {
      return res.status(404).json({ message: "Category not found" });
    }
    // Remove the category from its current position
    const [categoryToMove] = categories.splice(categoryIndex, 1);
    // Insert the category at the new position
    categories.splice(newIndex, 0, categoryToMove);
    // Update priorities based on the new order
    categories.forEach((cat, index) => {
      cat.priority = index + 1;
    });
    const updatedCategory = await Category.findOneAndUpdate(
      { shopName },
      { $set: { categories } },
      { new: true }
    );

    res.json({ updatedCategory });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategory,
  addCategory,
  moveCategory,
  deleteCategory,
};

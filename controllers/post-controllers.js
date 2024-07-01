/** @format */

const { v4: uuidv4 } = require("uuid");

const Products = require('../models/products')



const getProductById = async (req, res, next) => {
  const id = req.params.id;
  const foundedProduct = await Products.findById(id)
  res.json({ foundedProduct });
};

const createProduct = async (req, res, next) => {
  const { title, description } = req.body;

  // const createdPost = { title,  content};
  const createdProduct = new Products({title, description});

 await createdProduct.save()
  res.status(200).json({ Products: createdProduct });
};

const deleteproduct = async (req, res, next) => {
  const id = req.params.id;
  const foundedProduct = await Products.findByIdAndDelete(id)

  res.status(200).json({ message: "Post Deleted" });
};

exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.deleteproduct = deleteproduct;

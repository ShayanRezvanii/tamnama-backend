/** @format */

const { v4: uuidv4 } = require("uuid");

const Products = require("../models/products");

const getProductById = async (req, res, next) => {
  const id = req.params.id;
  const foundedProduct = await Products.findById(id);
  res.json({ foundedProduct });
};

const getProductByCategory = async (req, res, next) => {
  const { category } = req.body;
  console.log(category);
  const foundedProduct = await Products.find({ category: category });
  if (foundedProduct.length <= 0) {
    res.json({ message: "not founded product with this category " });
  } else {
    res.json({ foundedProduct });
  }
};

const createProduct = async (req, res, next) => {
  const { title, description, shopName, price, category, imageURL } = req.body;

  // const createdPost = { title,  content};
  const createdProduct = new Products({
    title,
    description,
    shopName,
    imageURL,
    price,
    category,
  });

  if (req.files) {
    let path = "";
    req.files.forEach((files, index, arr) => {
      path = path + files.path + ",";
    });
    path = path.substring(0, path.lastIndexOf(","));
    createdProduct.imageURL = path;
  }

  await createdProduct.save();
  res.status(200).json({ Products: createdProduct });
};

const deleteproduct = async (req, res, next) => {
  const id = req.params.id;
  const foundedProduct = await Products.findByIdAndDelete(id);

  res.status(200).json({ message: "Post Deleted" });
};

exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.deleteproduct = deleteproduct;
exports.getProductByCategory = getProductByCategory;

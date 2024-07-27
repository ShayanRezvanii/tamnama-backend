/** @format */

const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const Products = require("../models/products");
const UUID = require("uuid-int");

const getProductById = async (req, res, next) => {
  const id = req.params.id;
  const foundedProduct = await Products.findById(id);
  res.json({ foundedProduct });
};

const getProductList = async (req, res, next) => {
  const { shopName } = req.query;

  const foundedProduct = await Products.find({ shopName: shopName });
  res.json({ foundedProduct });
};

const getProductByCategory = async (req, res, next) => {
  const { shopName } = req.query;

  const { category } = req.body;
  const foundedProduct = await Products.find({ shopName: shopName });

  const filter = foundedProduct.find((item) => {
    return item.category === category;
  });
  console.log(filter);

  if (foundedProduct.length <= 0) {
    res.json({ message: "not founded product with this category " });
  } else {
    res.json({ foundedProduct: filter });
  }
};

const createProduct = async (req, res, next) => {
  const { title, description, shopName, price, category, imageURL } = req.body;
  const id = 0;

  const generator = UUID(id);
  const uuid = generator.uuid();

  const createdProduct = new Products({
    title,
    description,
    shopName,
    imageURL,
    price,
    _id: uuid,
    category,
  });

  if (req.file) {
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

const editProduct = async (req, res, next) => {
  const { title, description, shopName, price, category, imageURL } = req.body;

  const id = req.params.id;
  const update = { title, description, shopName, price, category, imageURL };
  const foundProduct = await Products.findOneAndUpdate({ _id: id }, update, {
    new: true,
  });
  console.log(foundProduct);

  res.json({ message: foundProduct });
  // const createdProduct = new Products({
  //   title,
  //   description,
  //   shopName,
  //   imageURL,
  //   price,
  //   category,
  // });

  // if (req.file) {
  //   let path = "";
  //   req.files.forEach((files, index, arr) => {
  //     path = path + files.path + ",";
  //   });
  //   path = path.substring(0, path.lastIndexOf(","));
  //   createdProduct.imageURL = path;
  // }

  // await createdProduct.save();
  // res.status(200).json({ Products: createdProduct });
};

const deleteproduct = async (req, res, next) => {
  const { productId } = req.body;
  const foundedProduct = await Products.findByIdAndDelete(productId);

  if (!foundedProduct) {
    return res.status(404).json({ message: "not found product" });
  }

  res.status(200).json({ message: "Post Deleted" });
};

// exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.editProduct = editProduct;
exports.deleteproduct = deleteproduct;
exports.getProductByCategory = getProductByCategory;
exports.getProductList = getProductList;
exports.getProductById = getProductById;

/** @format */

const express = require("express");
const postControllers = require("../controllers/post-controllers");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/auth");

// router.get("/:id", postControllers.getProductById);
router.use(auth);

router.post("/create", postControllers.createProduct);
router.get("/getProduct/:id", postControllers.getProductById);
router.get("/list", postControllers.getProductList);
router.post("/update/:id", postControllers.editProduct);
router.delete("/remove/:id", postControllers.deleteproduct);
router.post("/getProductByCategory", postControllers.getProductByCategory);

module.exports = router;

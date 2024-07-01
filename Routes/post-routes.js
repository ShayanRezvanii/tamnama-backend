/** @format */

const express = require("express");
const postControllers = require("../controllers/post-controllers");
const router = express.Router();

const auth = require("../middleware/auth")

router.get("/:id", postControllers.getProductById);

router.use(auth)
router.post("/create", postControllers.createProduct);
router.delete("/remove/:id", postControllers.deleteproduct);

module.exports = router;

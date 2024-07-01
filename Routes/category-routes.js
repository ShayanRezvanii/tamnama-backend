/** @format */

const express = require("express");
const categoryControllers = require("../controllers/category-controllers");
const router = express.Router();

const auth = require("../middleware/auth");

router.use(auth);

router.get("/getCategory", categoryControllers.getCategory);
router.post("/addCategory", categoryControllers.addCategory);

module.exports = router;

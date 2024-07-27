/** @format */

const express = require("express");
const categoryControllers = require("../controllers/category-controllers");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/list", categoryControllers.getCategory);
router.get("/gategoryList", categoryControllers.getCategory);

router.use(auth);

router.get("/getCategory", categoryControllers.getCategory);
router.post("/addCategory", categoryControllers.addCategory);
router.post("/moveCategory", categoryControllers.moveCategory);
router.post("/deleteCategory", categoryControllers.deleteCategory);

module.exports = router;

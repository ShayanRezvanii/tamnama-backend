/** @format */

const express = require("express");
const usersControllers = require("../controllers/user-controllers");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/list", usersControllers.getUsers);
router.post("/register", usersControllers.signUp);
router.post("/login", usersControllers.login);
router.post("/getUser", usersControllers.getUser);
router.get("/showInfo", usersControllers.getUserProfile);

router.use(auth);

router.post("/profile", usersControllers.profile);
router.get("/showProfile", usersControllers.getUserProfile);

module.exports = router;

/** @format */

const express = require("express");
const usersControllers = require("../controllers/user-controllers");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/list", usersControllers.getUsers);
router.post("/register", usersControllers.signUp);
router.post("/login", usersControllers.login);
router.post("/getUser", usersControllers.getUser);

router.use(auth);

router.post("/profile", usersControllers.profile);

module.exports = router;

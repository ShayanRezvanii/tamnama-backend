/** @format */

const express = require("express");
const usersControllers = require("../controllers/user-controllers");
const router = express.Router();

router.get("/list", usersControllers.getUsers);
router.post("/register", usersControllers.signUp);
router.post("/login", usersControllers.login);

module.exports = router;

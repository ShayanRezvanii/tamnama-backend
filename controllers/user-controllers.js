/** @format */
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json({ users });
};

const signUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const foundedUser = await User.findOne({ email: email });
  if (!foundedUser) {
    const newUser = await new User({ email, name, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY);
    res.status(201).json({ user: newUser, token });
  } else {
    res.json({ message: "user with this email exist" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const foundedUser = await User.findOne({ email: email });
  if (!foundedUser) {
    res.json({ message: "User Not Valid" });
  }
  const validPass = await bcrypt.compare(password, foundedUser.password);
  console.log(validPass);
  if (!validPass) {
    res.json({ message: "User Pass Not Valid" });
  }
  const token = jwt.sign({ email: foundedUser.email }, process.env.SECRET_KEY);
  res.json({ message: "User loggined", token });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;

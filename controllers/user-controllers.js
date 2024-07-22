/** @format */
const User = require("../models/user");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const UUID = require("uuid-int");

const getUsers = async (req, res, next) => {
  const users = await User.find();
  res.json({ users });
};

const getUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  res.json({ user });
};

const signUp = async (req, res, next) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const foundedUser = await User.findOne({ email: email });
  const id = 0;

  const generator = UUID(id);
  const uuid = generator.uuid();

  if (!foundedUser) {
    const newUser = await new User({
      email,
      name,
      password: hashedPassword,
      _id: uuid,
    });

    await newUser.save();
    const token = jwt.sign({ email: newUser.email }, process.env.SECRET_KEY);
    res.status(201).json({ user: newUser, token });
  } else {
    res.json({ message: "user with this email exist" });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundedUser = await User.findOne({ email: email });
    if (!foundedUser) {
      return res.status(401).json({ message: "User Not Valid" });
    }

    const validPass = await bcrypt.compare(password, foundedUser.password);
    if (!validPass) {
      return res.status(401).json({ message: "User Pass Not Valid" });
    }

    console.log(foundedUser);

    const token = jwt.sign(
      { email: foundedUser.email, name: foundedUser.name },
      process.env.SECRET_KEY
    );
    res.json({ message: "User logged in", token, name: foundedUser.name });
  } catch (err) {
    next(err); // Pass any unexpected errors to the next middleware
  }
};

const profile = async (req, res, next) => {
  const { firstColor, secondColor, workTime, phone } = req.body;
};

exports.getUsers = getUsers;
exports.getUser = getUser;
exports.profile = profile;
exports.signUp = signUp;
exports.login = login;

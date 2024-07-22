/** @format */

const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });
const User = require("../models/user");

module.exports = async (req, res, next) => {
  try {
    // Check if authorization header is present
    if (!req.headers.authorization) {
      return res.status(404).send("User does not have token.");
    }

    // Extract the token from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Check if token is present
    if (!token) {
      return res.status(404).send("User does not have token.");
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    // Attach user data to the request object
    req.userData = { email: decodedToken.email, name: decodedToken.name };

    // Optional: Example to verify the shop name against the database
    const shopName = decodedToken.name;
    // const shop = await User.findOne({ name: shopName });
    // if (!shop) {
    //   return res.status(404).send("Shop not found.");
    // }
    // if (shop.ownerId !== req.userId) {
    //   return res.status(403).send("Permission denied.");
    // }

    // If shopName validation is required
    console.log(decodedToken);
    console.log(shopName);
    console.log(shopName === decodedToken.name);

    if (decodedToken.name !== shopName) {
      return res
        .status(404)
        .send("User does not have permission to this shop.");
    }

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Handle token verification errors or any other errors
    console.error(error);
    res.status(403).send("Invalid or expired token.");
  }
};

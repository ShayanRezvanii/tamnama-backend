/** @format */

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://shayanrezvani5:Shayan1382@tamnama.gzlscr6.mongodb.net/?appName=tamnama";

const mongoConnect = (callBack) => {
  MongoClient.connect(uri)
    .then((result) => {
      console.log("connected");
      callBack(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;

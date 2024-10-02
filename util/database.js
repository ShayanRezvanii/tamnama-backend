/** @format */

const { MongoClient } = require("mongodb");

const uri = "mongodb://172.25.1.29:27017/tamnama";

const mongoConnect = (callBack) => {
  MongoClient.connect(uri)
    .then((result) => {
      console.log("connected");
      callBack(result);
    })
    .catch((err) => console.log(err));
};

module.exports = mongoConnect;

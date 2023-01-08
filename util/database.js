const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://vivek_kushwah:WBqvMhdpQpfxf5mh@cluster0.xvjanfb.mongodb.net/shop?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("Connected!");
      _db = client.db();
      console.log("Database>>>>>>>", _db);
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found!";
  }
};
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "vivek1608", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

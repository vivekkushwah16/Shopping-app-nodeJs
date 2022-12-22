const fs = require("fs");
const path = require("path");
const { rootDir } = require("../../util/path");
const filePath = path.join(rootDir, "data", "products.json");

const getProductsFromFile = (cb) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
};
module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
 
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (errors) =>
        console.log(errors)
      );
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
};

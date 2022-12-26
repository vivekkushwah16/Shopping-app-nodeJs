const fs = require("fs");
const path = require("path");
const { rootDir } = require("../../util/path");
const Cart = require("../../models/cart");

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
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProduct), (errors) =>
          console.log(errors)
        );
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(filePath, JSON.stringify(products), (errors) =>
          console.log(errors)
        );
      }
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const { price } = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, price);
        }
      });
    });
  }

  static findById(id, cb) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
};

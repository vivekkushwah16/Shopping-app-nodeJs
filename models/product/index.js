const Cart = require("../../models/cart");
const db = require("../../util/database");
module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    const { id, title, imageUrl, price, description } = this;
    return db.execute(
      "INSERT INTO products (title, imageUrl, price, description) VALUES (?, ?, ?, ?)", // ? for exactly add the value in right place
      [title, imageUrl, price, description]
    );
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static deleteById(id) {}

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "vivek1608", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

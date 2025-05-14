const Sequelize = require("sequelize");
const sequelize = new Sequelize("leitos", "root", "", {
  dialect: "mysql",
  host: "localhost",
  query: { raw: true },
  define: { timestamps: false },
});

module.exports = sequelize;

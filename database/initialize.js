const mysql = require("mysql2/promise");
const { sequelize } = require("../models");

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    await connection.query("CREATE DATABASE IF NOT EXISTS leitos");
    console.log("Banco de dados 'leitos' criado ou já existente.");

    await connection.end();

    await sequelize.sync({ alter: true });
    console.log("Tabelas sincronizadas com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o banco de dados:", error);
  } finally {
    process.exit();
  }
})();

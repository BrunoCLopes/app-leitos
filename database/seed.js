const {
  Role,
  Situation,
  Speciality,
  Employee,
  Bed,
  sequelize,
} = require("../models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida!");

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await Employee.destroy({ where: {} });
    await Bed.destroy({ where: {} });
    await Role.destroy({ where: {} });
    await Situation.destroy({ where: {} });
    await Speciality.destroy({ where: {} });
    console.log("Tabelas limpas!");

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    const roles = await Role.bulkCreate(
      [
        { name: "Médico" },
        { name: "Enfermeiro" },
        { name: "Técnico de Enfermagem" },
        { name: "Administrador" },
        { name: "Recepcionista" },
      ],
      { returning: true }
    );
    console.log("Tabela Role populada!");

    const situations = await Situation.bulkCreate(
      [
        { name: "Em plantão" },
        { name: "Intervalo" },
        { name: "Fora de Serviço" },
      ],
      { returning: true }
    );
    console.log("Tabela Situation populada!");

    const specialities = await Speciality.bulkCreate(
      [
        { name: "Cardiologia" },
        { name: "Neurologia" },
        { name: "Pediatria" },
        { name: "UTI" },
        { name: "Ortopedia" },
        { name: "Dermatologia" },
      ],
      { returning: true }
    );
    console.log("Tabela Speciality populada!");

    const beds = await Bed.bulkCreate(
      [
        { number: 101, last_cleaning: "2025-01-15 10:30:00", unit: 1 },
        { number: 102, last_cleaning: "2025-03-22 14:45:00", unit: 1 },
        { number: 201, last_cleaning: "2025-05-10 08:20:00", unit: 2 },
        { number: 202, last_cleaning: "2025-07-18 16:50:00", unit: 2 },
        { number: 301, last_cleaning: new Date(), unit: 3 },
      ],
      { returning: true }
    );
    console.log("Tabela Bed populada!");

    await Employee.bulkCreate([
      {
        name: "João Silva",
        role_fk: roles[0].id,
        situation_fk: situations[0].id,
        speciality_fk: specialities[0].id,
      },
      {
        name: "Maria Oliveira",
        role_fk: roles[1].id,
        situation_fk: situations[0].id,
        speciality_fk: specialities[1].id,
      },
      {
        name: "Carlos Souza",
        role_fk: roles[2].id,
        situation_fk: situations[1].id,
        speciality_fk: specialities[2].id,
      },
      {
        name: "Ana Paula",
        role_fk: roles[3].id,
        situation_fk: situations[2].id,
        speciality_fk: specialities[3].id,
      },
      {
        name: "Pedro Santos",
        role_fk: roles[4].id,
        situation_fk: situations[2].id,
        speciality_fk: specialities[4].id,
      },
    ]);
    console.log("Tabela Employee populada!");

    console.log("Seeds executados com sucesso!");
  } catch (error) {
    console.error("Erro ao executar seeds:", error);
  } finally {
    await sequelize.close();
    console.log("Conexão com o banco de dados encerrada.");
  }
})();

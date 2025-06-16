const {
  Role,
  Situation,
  Speciality,
  Employee,
  Bed,
  sequelize,
  Bed_status,
  Bed_unit,
  Occupied_bed,
  Available_bed,
  Maintenance_bed,
} = require("../models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco de dados estabelecida!");

    await Employee.destroy({ where: {} });
    await Bed.destroy({ where: {} });
    await Role.destroy({ where: {} });
    await Situation.destroy({ where: {} });
    await Speciality.destroy({ where: {} });
    await Bed_status.destroy({ where: {} });
    await Bed_unit.destroy({ where: {} });
    await Available_bed.destroy({ where: {} });
    await Maintenance_bed.destroy({ where: {} });
    await Occupied_bed.destroy({ where: {} });
    console.log("Tabelas limpas!");

    const roles = await Role.bulkCreate([
      { name: "Médico" },
      { name: "Enfermeiro" },
      { name: "Técnico de Enfermagem" },
      { name: "Enfermeiro" },
      { name: "Técnico de Enfermagem" },
    ]);
    console.log("Tabela Role populada!");

    const situations = await Situation.bulkCreate([
      { name: "Em plantão" },
      { name: "Intervalo" },
      { name: "Fora de Serviço" },
    ]);
    console.log("Tabela Situation populada!");

    const specialities = await Speciality.bulkCreate([
      { name: "Cardiologia" },
      { name: "Neurologia" },
      { name: "Pediatria" },
      { name: "UTI" },
      { name: "Ortopedia" },
      { name: "Dermatologia" },
    ]);
    console.log("Tabela Speciality populada!");

    const bed_status = await Bed_status.bulkCreate([
      { name: "Disponível" },
      { name: "Ocupado" },
      { name: "Em Manutenção" },
    ]);
    console.log("Tabela Bed_status populada!");

    const bed_units = await Bed_unit.bulkCreate([
      { name: "Ala Norte" },
      { name: "Ala Sul" },
      { name: "UTI Adulto" },
      { name: "UTI Pediátrica" },
    ]);
    console.log("Tabela Bed_unit populada!");

    const beds = await Bed.bulkCreate([
      { number: 101, last_cleaning: "2025-05-15 08:12:00", status_fk: bed_status[0].id, unit_fk: bed_units[0].id },
      { number: 102, last_cleaning: "2025-05-22 17:43:00", status_fk: bed_status[0].id, unit_fk: bed_units[0].id },
      { number: 201, last_cleaning: "2025-05-10 03:27:00", status_fk: bed_status[0].id, unit_fk: bed_units[1].id },
      { number: 202, last_cleaning: "2025-06-05 21:55:00", status_fk: bed_status[2].id, unit_fk: bed_units[1].id },
      { number: 301, last_cleaning: "2025-06-07 12:15:00", status_fk: bed_status[1].id, unit_fk: bed_units[2].id },
      { number: 302, last_cleaning: "2025-05-02 23:41:00", status_fk: bed_status[1].id, unit_fk: bed_units[2].id },
      { number: 401, last_cleaning: "2025-05-07 06:09:00", status_fk: bed_status[1].id, unit_fk: bed_units[3].id },
      { number: 402, last_cleaning: "2025-05-30 15:38:00", status_fk: bed_status[1].id, unit_fk: bed_units[3].id },
    ]);
    console.log("Tabela Bed populada!");

    await Available_bed.bulkCreate([
      { id_bed: beds[0].id, observations: "Leito próximo à janela, com boa iluminação natural durante o dia." },
      { id_bed: beds[1].id, observations: "Equipamento de monitoramento cardíaco recém-instalado neste leito, ideal para pacientes cardíacos." },
      { id_bed: beds[2].id }
    ]);
    console.log("Tabela Available_bed populada!");


    await Maintenance_bed.bulkCreate([
      {
        id_bed: beds[3].id,
        reason: "Reparo no painel elétrico do leito devido a falha detectada durante inspeção.",
        estimated_completion: "2025-06-12 16:00:00",
        responsible: "Marcos Pereira"
      }
    ]);
    console.log("Tabela Maintenance_bed populada!");

    await Occupied_bed.bulkCreate([
      {
        id_bed: beds[4].id,
        patient: "José Almeida",
        age_patient: 67,
        sex_patient: "M",
        time_occupied: "2025-06-01 09:00:00",
        hospitalization_reason: "Pneumonia grave, paciente necessita de monitoramento constante.",
        gravity: "Crítico"
      },
      {
        id_bed: beds[5].id,
        patient: "Luciana Costa",
        age_patient: 34,
        sex_patient: "F",
        time_occupied: "2025-06-02 15:30:00",
        hospitalization_reason: "Recuperação pós-cirúrgica de apendicite.",
        gravity: "Estável"
      },
      {
        id_bed: beds[6].id,
        patient: "Carlos Lima",
        age_patient: 41,
        sex_patient: "M",
        time_occupied: "2025-06-03 11:20:00",
        hospitalization_reason: "Acidente de trânsito, múltiplas fraturas.",
        gravity: "Moderado"
      },
      {
        id_bed: beds[7].id,
        patient: "Fernanda Souza",
        age_patient: 28,
        sex_patient: "F",
        time_occupied: "2025-06-04 18:45:00",
        hospitalization_reason: "Crise asmática aguda, em observação.",
        gravity: "Moderado"
      }
    ]);
    console.log("Tabela Occupied_bed populada!");

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

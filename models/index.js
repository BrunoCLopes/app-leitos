const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("leitos", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Role = require("./Role.model")(sequelize, DataTypes);
const Situation = require("./Situation.model")(sequelize, DataTypes);
const Speciality = require("./Speciality.model")(sequelize, DataTypes);
const Bed = require("./Bed.model")(sequelize, DataTypes);
const Employee = require("./Employee.model")(sequelize, DataTypes);

Employee.belongsTo(Role, { foreignKey: "role_fk" });
Employee.belongsTo(Situation, { foreignKey: "situation_fk" });
Employee.belongsTo(Speciality, { foreignKey: "speciality_fk" });

Role.hasMany(Employee, { foreignKey: "role_fk" });
Situation.hasMany(Employee, { foreignKey: "situation_fk" });
Speciality.hasMany(Employee, { foreignKey: "speciality_fk" });

module.exports = {
  sequelize,
  Role,
  Situation,
  Speciality,
  Bed,
  Employee,
};

require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_NAME || 'leitos',
  process.env.DATABASE_USER || 'root',
  process.env.DATABASE_PASSWORD || '',
  {
    host: process.env.DATABASE_HOST || 'localhost',
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    port: process.env.DATABASE_PORT || 3306,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    define: {
      timestamps: true,
      underscored: true,
      paranoid: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  }
);

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

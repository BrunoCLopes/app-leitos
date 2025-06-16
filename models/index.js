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
const Occupied_bed = require("./Occupied_bed.model")(sequelize, DataTypes);
const Available_bed = require("./Available_bed.model")(sequelize, DataTypes);
const Bed_status = require("./Bed_status.model")(sequelize, DataTypes);
const Bed_unit = require("./Bed_unit.model")(sequelize, DataTypes);
const Maintenance_bed = require("./Maintenance_bed.model")(sequelize, DataTypes);
const Request = require("./Request.model")(sequelize, DataTypes);

Employee.belongsTo(Role, { foreignKey: "role_fk" });
Employee.belongsTo(Situation, { foreignKey: "situation_fk" });
Employee.belongsTo(Speciality, { foreignKey: "speciality_fk" });

Bed.belongsTo(Bed_unit, { foreignKey: "unit_fk", as: "unit" });
Bed_unit.hasMany(Bed, { foreignKey: "unit_fk", as: "beds" });

Bed.belongsTo(Bed_status, { foreignKey: "status_fk" });

Available_bed.belongsTo(Bed, { foreignKey: "id_bed" });
Maintenance_bed.belongsTo(Bed, { foreignKey: "id_bed" });
Occupied_bed.belongsTo(Bed, { foreignKey: "id_bed", as: "bed" });

Bed.hasOne(Available_bed, { foreignKey: "id_bed" });
Bed.hasOne(Maintenance_bed, { foreignKey: "id_bed" });
Bed.hasOne(Occupied_bed, { foreignKey: "id_bed", as: "occupied_bed" });
Bed_status.hasMany(Bed, { foreignKey: "status_fk" });
Bed_unit.hasMany(Bed, { foreignKey: "unit_fk" }); 

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
  Occupied_bed,
  Maintenance_bed,
  Available_bed,
  Bed_status,
  Bed_unit,
  Request,
};

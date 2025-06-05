module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      situation_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      speciality_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "employee",
      timestamps: false,
    }
  );
  return Employee;
};

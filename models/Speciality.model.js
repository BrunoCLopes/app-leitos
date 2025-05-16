module.exports = (sequelize, DataTypes) => {
  const Speciality = sequelize.define(
    "Speciality",
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
    },
    {
      tableName: "speciality",
      timestamps: false,
    }
  );

  return Speciality;
};

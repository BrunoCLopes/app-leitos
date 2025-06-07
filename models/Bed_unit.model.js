module.exports = (sequelize, DataTypes) => {
  const Bed_unit = sequelize.define(
    "Bed_unit",
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
      }
    },
    {
      tableName: "bed_unit",
      timestamps: false,
    }
  );
  return Bed_unit;
};

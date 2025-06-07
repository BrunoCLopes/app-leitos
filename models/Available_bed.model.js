module.exports = (sequelize, DataTypes) => {
  const Available_bed = sequelize.define(
    "Available_bed",
    {
      id_bed: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      observations: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    },
    {
      tableName: "available_bed",
      timestamps: false,
    }
  );
  return Available_bed;
};

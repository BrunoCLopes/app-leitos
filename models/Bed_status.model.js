module.exports = (sequelize, DataTypes) => {
  const Bed_status = sequelize.define(
    "Bed_status",
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
      tableName: "bed_status",
      timestamps: false,
    }
  );
  return Bed_status;
};

module.exports = (sequelize, DataTypes) => {
  const Maintenance_bed = sequelize.define(
    "Maintenance_bed",
    {
      id_bed: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      estimated_completion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      responsible: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "maintenance_bed",
      timestamps: false,
    }
  );
  return Maintenance_bed;
};

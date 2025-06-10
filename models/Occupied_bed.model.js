module.exports = (sequelize, DataTypes) => {
  const Occupied_bed = sequelize.define(
    "Occupied_bed",
    {
      id_bed: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      patient: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age_patient: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      sex_patient: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time_occupied: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hospitalization_reason: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gravity: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "occupied_bed",
      timestamps: false,
    }
  );
  return Occupied_bed;
};

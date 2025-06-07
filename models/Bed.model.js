module.exports = (sequelize, DataTypes) => {
  const Bed = sequelize.define(
    "Bed",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      number: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      last_cleaning: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      observation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "bed",
      timestamps: false,
    }
  );

  return Bed;
};

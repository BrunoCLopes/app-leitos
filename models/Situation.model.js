module.exports = (sequelize, DataTypes) => {
  const Situation = sequelize.define(
    "Situation",
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
      tableName: "situation",
      timestamps: false,
    }
  );

  return Situation;
};

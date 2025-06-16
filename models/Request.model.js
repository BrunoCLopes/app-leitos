module.exports = (sequelize, DataTypes) => {
  const Request = sequelize.define(
    "Request",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      bed_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      professional:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      observations:{
        type: DataTypes.TEXT,
      }
    },
    {
      tableName: "request",
      timestamps: false,
    }
  );

  return Request;
};

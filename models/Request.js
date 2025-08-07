const { Model, DataTypes } = require("sequelize");

class Request extends Model {
  static initModel(sequelize) {
    Request.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        status: {
          type: DataTypes.ENUM(["active", "adopted", "cancelled"]),
          allowNull: false,
          defaultValue: "active",
        },
        requestContent: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "request", // Nombre del modelo en singular y en minúscula.
      },
    );
    return Request;
  }
}

module.exports = Request;

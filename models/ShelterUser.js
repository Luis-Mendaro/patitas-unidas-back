const { Model, DataTypes } = require("sequelize");

class ShelterUser extends Model {
  static initModel(sequelize) {
    ShelterUser.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        location: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        rating: {
          type: DataTypes.JSON,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "shelterUser", // Nombre del modelo en singular y en minúscula.
      },
    );
    return ShelterUser;
  }
}

module.exports = ShelterUser;

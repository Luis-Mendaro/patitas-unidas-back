const { Model, DataTypes } = require("sequelize");

class LikedPets extends Model {
  static initModel(sequelize) {
    LikedPets.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
      },
      {
        sequelize,
        modelName: "likedPets", // Nombre del modelo en singular y en minúscula.
      },
    );
    return LikedPets;
  }
}

module.exports = LikedPets;

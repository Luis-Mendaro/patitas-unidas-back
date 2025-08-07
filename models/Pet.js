const { Model, DataTypes } = require("sequelize");

class Pet extends Model {
  static initModel(sequelize) {
    Pet.init(
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
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        images: {
          type: DataTypes.JSON, //maybe Array or Json
          allowNull: false,
        },
        sex: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        size: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        color: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        isAdopted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        shelterUserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "pet", // Nombre del modelo en singular y en minúscula.
      },
    );
    return Pet;
  }
}

module.exports = Pet;

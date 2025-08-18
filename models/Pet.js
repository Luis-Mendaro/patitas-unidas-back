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
          type: DataTypes.TEXT,
          allowNull: false,
        },
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
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
        age: {
          type: DataTypes.SMALLINT,
          allowNull: false,
        },
        isAdopted: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "pet",
      },
    );
    return Pet;
  }
}

module.exports = Pet;

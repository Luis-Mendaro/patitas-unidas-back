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
        images: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        rating: {
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue: [],
        },
        roleCode: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "code",
          },
        },
        status: {
          type: DataTypes.ENUM(["new", "active", "rejected"]),
          allowNull: false,
          defaultValue: "new",
        },
      },
      {
        sequelize,
        modelName: "shelterUser",
        defaultScope: { attributes: { exclude: ["password"] } },
        scopes: { withPassword: { attributes: {} } },
      },
    );
    return ShelterUser;
  }
}

module.exports = ShelterUser;

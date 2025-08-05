const { Model, DataTypes } = require("sequelize");

class User extends Model {
  static initModel(sequelize) {
    User.init(
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
        profileImage: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: "/profileImages/defaultProfileImg.jpg",
        },
        roleCode: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: "roles",
            key: "code",
          },
        },
      },
      {
        sequelize,
        modelName: "user", // Nombre del modelo en singular y en minúscula.
        defaultScope: { attributes: { exclude: ["password"] } },
        scopes: { withPassword: { attributes: {} } },
      },
    );
    return User;
  }
}

module.exports = User;

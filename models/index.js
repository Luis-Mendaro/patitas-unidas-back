const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
    dialectModule: require("pg"),
    logging: false,
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false },
    },
  },
);

// Requerir todos los modelos:
const User = require("./User");
const Pet = require("./Pet");
const ShelterUser = require("./ShelterUser");
const Category = require("./Category");
const Product = require("./Product");
const Request = require("./Request");
const LikedPets = require("./LikedPets");
const Role = require("./Role");

// Inicializar todos los modelos:
User.initModel(sequelize);
Pet.initModel(sequelize);
ShelterUser.initModel(sequelize);
Category.initModel(sequelize);
Product.initModel(sequelize);
Request.initModel(sequelize);
LikedPets.initModel(sequelize);
Role.initModel(sequelize);

//Asociaciones entre los modelos
User.hasOne(LikedPets);
LikedPets.belongsTo(User);

User.hasMany(Request);
Request.belongsTo(User);

Category.hasMany(Pet);
Pet.belongsTo(Category);

LikedPets.belongsToMany(Pet, { through: "LikedPets_Pets" });
Pet.belongsToMany(LikedPets, { through: "LikedPets_Pets" });

Pet.hasMany(Request);
Request.belongsTo(Pet);

ShelterUser.hasMany(Pet);
Pet.belongsTo(ShelterUser);

ShelterUser.hasMany(Request);
Request.belongsTo(ShelterUser);

ShelterUser.hasMany(Product);
Product.belongsTo(ShelterUser);

Role.hasMany(User, { foreignKey: "roleCode", as: "users" });
User.belongsTo(Role, { foreignKey: "roleCode", as: "role" });

Role.hasMany(ShelterUser, { foreignKey: "roleCode", as: "shelterUsers" });
ShelterUser.belongsTo(Role, { foreignKey: "roleCode", as: "role" });

module.exports = {
  sequelize,
  User,
  Pet,
  ShelterUser,
  Category,
  Product,
  Request,
  LikedPets,
  Role,
};

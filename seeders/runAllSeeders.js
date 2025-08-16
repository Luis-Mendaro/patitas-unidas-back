require("dotenv").config();
const { sequelize } = require("../models/index");

async function runAllSeeders() {
  await sequelize.sync({ force: true });
  console.log("[Database] ¡Las tablas fueron creadas!");

  await require("./roleSeeder")();
  await require("./userSeeder")();
  await require("./shelterUserSeeder")();
  await require("./categorySeeder")();
  await require("./alternativePetSeeder")();
  await require("./likedPetsSeeder")();
  await require("./productSeeder")();
  await require("./requestSeeder")();

  console.log("[Database] ¡Los datos de prueba fueron insertados!");
  process.exit();
}

runAllSeeders();

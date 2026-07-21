const userRoutes = require("./userRoutes");
const shelterRoutes = require("./shelterRoutes");
const petRoutes = require("./petRoutes");
const authRoutes = require("./authRoutes");
const requestRoutes = require("./requestRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/shelters", shelterRoutes);
  app.use("/pets", petRoutes);
  app.use("/auth", authRoutes);
  app.use("/requests", requestRoutes);

  app.post("/seed", async (req, res) => {
    try {
      await require("../seeders/userSeeder")();
      await require("../seeders/shelterUserSeeder")();
      await require("../seeders/categorySeeder")();
      await require("../seeders/alternativePetSeeder")();
      await require("../seeders/likedPetsSeeder")();
      await require("../seeders/productSeeder")();
      await require("../seeders/requestSeeder")();
      res.json({ msg: "Seeders corridos correctamente." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Error al correr seeders.", error: error.message });
    }
  });
};

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
    const results = {};
    const seeders = [
      "userSeeder", "shelterUserSeeder", "categorySeeder",
      "alternativePetSeeder", "likedPetsSeeder", "productSeeder", "requestSeeder"
    ];
    for (const name of seeders) {
      try {
        await require(`../seeders/${name}`)();
        results[name] = "ok";
      } catch (e) {
        results[name] = e.message;
      }
    }
    res.json(results);
  });
};

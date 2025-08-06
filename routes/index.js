const userRoutes = require("./userRoutes");
const shelterRoutes = require("./shelterRoutes");
const petRoutes = require("./petRoutes");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/shelters", shelterRoutes);
  app.use("/pets", petRoutes);
  app.use("/auth", authRoutes);
};

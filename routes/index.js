const userRoutes = require("./userRoutes");
const petRoutes = require("./petRoutes");
const authRoutes = require("./authRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/pets", petRoutes);
  app.use("/auth", authRoutes);
};

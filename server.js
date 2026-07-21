require("dotenv").config();
const cors = require("cors");

const express = require("express");
const routes = require("./routes");
const { sequelize, Role } = require("./models");

const APP_PORT = process.env.APP_PORT || 3000;

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

routes(app);

sequelize.sync({ force: false }).then(async () => {
  const roleCount = await Role.count();
  if (roleCount === 0) {
    await Role.bulkCreate([
      { code: 100, name: "admin" },
      { code: 200, name: "shelter" },
      { code: 300, name: "user" },
    ]);
    console.log("[Database] Roles sembrados.");
  }
  app.listen(APP_PORT, () => {
    console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
    console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
  });
});

module.exports = app;

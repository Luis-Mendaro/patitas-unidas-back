const { Role } = require("../models");

module.exports = async () => {
  const roles = [
    { code: 100, name: "admin" },
    { code: 200, name: "shelter" },
    { code: 300, name: "user" },
  ];
  await Role.bulkCreate(roles);
  console.log("[Database] Se corrió el seeder de Role.");
};

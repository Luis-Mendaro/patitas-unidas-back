const faker = require("@faker-js/faker").fakerES;
const { ShelterUser, User } = require("../models");
const bcrypt = require("bcryptjs");
const { sheltersData, locations } = require("./seedersData/sheltersData");

module.exports = async () => {
  const shelterUsers = [];
  const hashedPassword = await bcrypt.hash("1234", 10);
  const users = await User.findAll();
  const status = ["new", "active", "rejected"];

  shelterUsers.push({
    name: "Animales Sin Hogar",
    email: "test@shelter.com",
    password: hashedPassword,
    phoneNumber: "098123456",
    location: "Treinta y Tres",
    images: ["https://blog.agrocampo.com.co/wp-content/uploads/2023/12/un-refugio-en-pensilvania-vivio-un-acontecimiento-inolvidable-3-768x374.jpg"],
    description:
      "Animales sin Hogar es una Asociación Civil sin fines de lucro, fundada el 16 de noviembre del 2003 en Montevideo – Uruguay. Al dia de hoy somos un santuario para cientos de animales de granja, caballos, ovejas, chivos, chanchos entre otros, además amparamos mas de 1000 perros y 300 gatos victimas del abandono y maltrato, que luego de recuperados les procuramos familias para el resto de sus vidas.",
    // rating: faker.helpers.arrayElements(users, { min: 0, max: 50 }).map((user) => user.id),
    roleCode: 200,
    status: "active",
  });

  for (let i = 1; i < 9; i++) {
    const name = sheltersData[i].name;
    const email =
      name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "") + "@gmail.com";
    shelterUsers.push({
      name,
      email,
      password: hashedPassword,
      phoneNumber: faker.phone.number(),
      location: faker.helpers.arrayElement(locations),
      images: [sheltersData[i].image],
      description: sheltersData[i].description,
      // rating: faker.helpers.arrayElements(users, { min: 0, max: 50 }).map((user) => user.id),
      roleCode: 200,
      status: "active",
    });
  }

  await ShelterUser.bulkCreate(shelterUsers);
  console.log("[Database] Se corrió el seeder de shelterUsers.");
};

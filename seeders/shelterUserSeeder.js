const faker = require("@faker-js/faker").fakerES;
const { ShelterUser, User } = require("../models");
const bcrypt = require("bcryptjs");
const { nameShelters, locations } = require("./seedersData/sheltersData");
const { petImages } = require("./seedersData/petsData");

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
    // image: "animales_sin_hogar.png",
    images: [
      faker.helpers.arrayElement(petImages.dog),
      "https://upload.wikimedia.org/wikipedia/commons/f/fc/Juan_Manuel_Blanes_-_Artigas_en_la_Ciudadela.jpg",
    ],
    description:
      "Animales sin Hogar es una Asociación Civil sin fines de lucro, fundada el 16 de noviembre del 2003 en Montevideo – Uruguay. Al dia de hoy somos un santuario para cientos de animales de granja, caballos, ovejas, chivos, chanchos entre otros, además amparamos mas de 1000 perros y 300 gatos victimas del abandono y maltrato, que luego de recuperados les procuramos familias para el resto de sus vidas.",
    rating: faker.helpers.arrayElements(users, { min: 0, max: 50 }).map((user) => user.id),
    roleCode: 200,
    status: "active",
  });

  for (let i = 1; i < 15; i++) {
    const name = nameShelters[i];
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
      images: [
        faker.helpers.arrayElement(petImages.dog),
        "https://upload.wikimedia.org/wikipedia/commons/f/fc/Juan_Manuel_Blanes_-_Artigas_en_la_Ciudadela.jpg",
      ],
      description: faker.lorem.paragraph(),
      rating: faker.helpers.arrayElements(users, { min: 0, max: 50 }).map((user) => user.id),
      roleCode: 200,
      status: faker.helpers.arrayElement(status),
    });
  }

  await ShelterUser.bulkCreate(shelterUsers);
  console.log("[Database] Se corrió el seeder de shelterUsers.");
};

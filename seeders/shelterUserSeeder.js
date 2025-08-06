/*
 * El seeder no es más que un archivo que contiene una función que se encarga
 * de insertar datos (generalmente de prueba) en una base de datos.
 *
 * El nombre "seeder" es una convención y significa "semillero".
 *
 * Además, en este caso, se está usando una librería llamada Faker
 * (https://fakerjs.dev/) para facilitar la creación de datos ficticios como
 * nombres, apellidos, títulos, direcciones y demás textos.
 *
 * Suele ser común que en los seeders exista un `for` donde se define la
 * cantidad de registros de prueba que se insertarán en la base de datos.
 *
 * En este ejemplo se están insertando 100 usuarios con nombres ficticios.
 */

const faker = require("@faker-js/faker").fakerES;
const { ShelterUser, User } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const shelterUsers = [];
  const hashedPassword = await bcrypt.hash("1234", 10);
  const locations = [
    "Artigas",
    "Canelones",
    "Cerro Largo",
    "Colonia",
    "Durazno",
    "Flores",
    "Florida",
    "Lavalleja",
    "Maldonado",
    "Montevideo",
    "Paysandú",
    "Río Negro",
    "Rivera",
    "Rocha",
    "Salto",
    "San José",
    "Soriano",
    "Tacuarembó",
    "Treinta y Tres",
  ];

  const users = await User.findAll();

  shelterUsers.push({
    name: "Animales Sin Hogar",
    email: "test@shelter.com",
    password: hashedPassword,
    phoneNumber: "098123456",
    location: "Treinta y Tres",
    image: "animales_sin_hogar.png",
    description:
      "Animales sin Hogar es una Asociación Civil sin fines de lucro, fundada el 16 de noviembre del 2003 en Montevideo – Uruguay. Al dia de hoy somos un santuario para cientos de animales de granja, caballos, ovejas, chivos, chanchos entre otros, además amparamos mas de 1000 perros y 300 gatos victimas del abandono y maltrato, que luego de recuperados les procuramos familias para el resto de sus vidas.",
    rating: faker.helpers.arrayElements(users, { min: 0, max: 50 }).map((user) => user.id),
    roleCode: 200,
  });

  for (let i = 1; i < 15; i++) {
    shelterUsers.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: hashedPassword,
      phoneNumber: faker.phone.number(),
      location: faker.helpers.arrayElement(locations),
      image: faker.image.avatarGitHub(),
      description: faker.lorem.paragraph(),
      rating: faker.helpers.arrayElements(users, { min: 0, max: 50 }).map((user) => user.id),
      roleCode: 200,
    });
  }

  await ShelterUser.bulkCreate(shelterUsers);
  console.log("[Database] Se corrió el seeder de shelterUsers.");
};

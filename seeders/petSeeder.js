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
const { Pet, Category, ShelterUser } = require("../models");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const pets = [];
  const sizes = ["small", "medium", "large"];
  const categories = Category.findAll();
  const shelters = ShelterUser.findAll();

  for (let i = 1; i < 100; i++) {
    pets.push({
      name: faker.animal.petName(),
      description: faker.lorem.paragraph(),
      images: [faker.image.avatarGitHub, faker.image.avatarGitHub, faker.image.avatarGitHub],
      sex: faker.person.sex(),
      size: faker.helpers.arrayElement(sizes),
      color: faker.color.human(),
      age: faker.number.int({ min: 3, max: 180 }),
      isAdopted: faker.datatype.boolean(),
      species: faker.helpers.arrayElement(categories).id,
      shelter: faker.helpers.arrayElement(shelters).id,
    });
  }

  await Pet.bulkCreate(pets);
  console.log("[Database] Se corrió el seeder de Pets.");
};

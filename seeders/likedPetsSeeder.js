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
const { LikedPets, User, Pet } = require("../models");

module.exports = async () => {
  const likedPets = [];
  const users = await User.findAll();
  const pets = await Pet.findAll();

  for (let i = 0; i < 30; i++) {
    likedPets.push({
      userId: users[i].id,
    });
  }

  await LikedPets.bulkCreate(likedPets);

  const likedPetsList = await LikedPets.findAll();

  for (let i = 0; i < likedPetsList.length; i++) {
    await likedPetsList[i].addPets(faker.helpers.arrayElements(pets, { min: 0, max: 4 }));
  }

  console.log("[Database] Se corrió el seeder de LikedPets.");
};

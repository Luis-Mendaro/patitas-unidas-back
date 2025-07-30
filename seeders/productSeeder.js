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
const { Product, ShelterUser } = require("../models");

module.exports = async () => {
  const products = [];
  const shelters = await ShelterUser.findAll();

  for (let i = 0; i < 100; i++) {
    products.push({
      name: faker.animal.petName(),
      description: faker.lorem.paragraph(),
      images: [faker.image.avatarGitHub(), faker.image.avatarGitHub(), faker.image.avatarGitHub()],
      price: faker.commerce.price(),
      isFeatured: faker.datatype.boolean(),
      slug: "product-" + i,
      externalLink: "https://www.animalessinhogar.net/product-page/tandem-cachorro",
      shelterUserId: faker.helpers.arrayElement(shelters).id,
    });
  }

  await Product.bulkCreate(products);
  console.log("[Database] Se corrió el seeder de Products.");
};

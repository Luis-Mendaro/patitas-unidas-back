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
const { Request, User, Pet, ShelterUser } = require("../models");

module.exports = async () => {
  const requests = [];
  const users = await User.findAll();
  const pets = await Pet.findAll();
  const shelters = await ShelterUser.findAll();
  const status = ["new", "pending", "cancelled", "completed"];

  for (let i = 0; i < 100; i++) {
    requests.push({
      userId: faker.helpers.arrayElement(users).id,
      petId: faker.helpers.arrayElement(pets).id,
      shelterUserId: faker.helpers.arrayElement(shelters).id,
      status: faker.helpers.arrayElement(status),
      requestContent: {
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.number(),
        physicalAddress: faker.location.streetAddress(),
        petsAllowed: faker.datatype.boolean(),
        outdoorSpace: faker.lorem.sentence(),
        hasKids: faker.number.int({ max: 15 }),
        willingToCoverMedical: faker.datatype.boolean(),
        adoptionReason: faker.lorem.sentence(),
        petExpectations: faker.lorem.sentence(),
        reasonForChoosingPet: faker.lorem.sentence(),
      },
      createdAt: faker.date.recent({ days: 3 }),
    });
  }

  await Request.bulkCreate(requests);
  console.log("[Database] Se corrió el seeder de Request.");
};

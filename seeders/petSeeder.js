const faker = require("@faker-js/faker").fakerES;
const { Pet, Category, ShelterUser } = require("../models");
const petImages = require("./petImages");

module.exports = async () => {
  const pets = [];
  const sizes = ["small", "medium", "large"];
  const categories = await Category.findAll();
  const shelters = await ShelterUser.findAll();

  const options = [
    { value: 1, weight: 0.5 },
    { value: 2, weight: 0.4 },
    { value: 3, weight: 0.1 },
  ];

  for (let i = 0; i < 100; i++) {
    const category = faker.helpers.arrayElement(categories);
    const species = category.species.toLowerCase();

    const imagePool = petImages[species] || petImages.other;

    const options = [
      { value: 1, weight: 0.6 },
      { value: 2, weight: 0.3 },
      { value: 3, weight: 0.1 },
    ];

    pets.push({
      name: faker.animal.petName(),
      description: faker.lorem.paragraph(),
      images: [
        faker.helpers.arrayElement(imagePool),
        "https://upload.wikimedia.org/wikipedia/commons/f/fc/Juan_Manuel_Blanes_-_Artigas_en_la_Ciudadela.jpg",
      ],
      sex: faker.person.sex(),
      size: faker.helpers.arrayElement(sizes),
      color: faker.color.human(),
      age: faker.number.int({ min: 3, max: 180 }),
<<<<<<< Updated upstream
      isAdopted: faker.datatype.boolean(0.2),
=======
      isAdopted: faker.datatype.boolean(),
>>>>>>> Stashed changes
      categoryId: faker.helpers.weightedArrayElement(options),
      shelterUserId: faker.helpers.arrayElement(shelters).id,
    });
  }

  await Pet.bulkCreate(pets);
  console.log("[Database] Se corrió el seeder de Pets.");
};

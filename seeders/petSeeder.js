const faker = require("@faker-js/faker").fakerES;
const { Pet, Category, ShelterUser } = require("../models");
const { petsNames, petsColors, petImages } = require("./seedersData/petsData");

module.exports = async () => {
  const pets = [];
  const sizes = ["small", "medium", "large"];
  const shelters = await ShelterUser.findAll();

  const options = [
    { value: 1, weight: 0.5 },
    { value: 2, weight: 0.4 },
    { value: 3, weight: 0.1 },
  ];

  const categoryDict = [
    { id: 1, name: "dog" },
    { id: 2, name: "cat" },
    { id: 3, name: "other" },
  ];

  for (let i = 0; i < 100; i++) {
    const categoryId = faker.helpers.weightedArrayElement(options);
    const category = categoryDict.find((cat) => cat.id === categoryId);

    const imagePool = petImages[category.name] || petImages.other;

    pets.push({
      name: faker.helpers.arrayElement(petsNames),
      description: faker.lorem.paragraph(),
      images: [
        faker.helpers.arrayElement(imagePool),
        "https://upload.wikimedia.org/wikipedia/commons/f/fc/Juan_Manuel_Blanes_-_Artigas_en_la_Ciudadela.jpg",
      ],
      sex: faker.person.sex(),
      size: faker.helpers.arrayElement(sizes),
      color: faker.helpers.arrayElement(petsColors),
      age: faker.number.int({ min: 3, max: 180 }),
      isAdopted: faker.datatype.boolean(0.2),
      categoryId,
      shelterUserId: faker.helpers.arrayElement(shelters).id,
    });
  }

  await Pet.bulkCreate(pets);
  console.log("[Database] Se corrió el seeder de Pets.");
};

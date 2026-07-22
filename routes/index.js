const userRoutes = require("./userRoutes");
const shelterRoutes = require("./shelterRoutes");
const petRoutes = require("./petRoutes");
const authRoutes = require("./authRoutes");
const requestRoutes = require("./requestRoutes");

module.exports = (app) => {
  app.use("/users", userRoutes);
  app.use("/shelters", shelterRoutes);
  app.use("/pets", petRoutes);
  app.use("/auth", authRoutes);
  app.use("/requests", requestRoutes);

  app.post("/fix-pet-images", async (req, res) => {
    const { Pet, Category } = require("../models");
    const pexels = {
      dog: [
        "https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg",
        "https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg",
        "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg",
        "https://images.pexels.com/photos/3687770/pexels-photo-3687770.jpeg",
        "https://images.pexels.com/photos/247937/pexels-photo-247937.jpeg",
        "https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg",
        "https://images.pexels.com/photos/1938126/pexels-photo-1938126.jpeg",
        "https://images.pexels.com/photos/1390784/pexels-photo-1390784.jpeg",
        "https://images.pexels.com/photos/686094/pexels-photo-686094.jpeg",
        "https://images.pexels.com/photos/1458916/pexels-photo-1458916.jpeg",
      ],
      cat: [
        "https://images.pexels.com/photos/1047369/pexels-photo-1047369.jpeg",
        "https://images.pexels.com/photos/1457792/pexels-photo-1457792.jpeg",
        "https://images.pexels.com/photos/800152/pexels-photo-800152.jpeg",
        "https://images.pexels.com/photos/751050/pexels-photo-751050.jpeg",
        "https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg",
        "https://images.pexels.com/photos/127028/pexels-photo-127028.jpeg",
        "https://images.pexels.com/photos/991831/pexels-photo-991831.jpeg",
        "https://images.pexels.com/photos/691583/pexels-photo-691583.jpeg",
        "https://images.pexels.com/photos/1521304/pexels-photo-1521304.jpeg",
        "https://images.pexels.com/photos/248350/pexels-photo-248350.jpeg",
      ],
      other: [
        "https://images.pexels.com/photos/110820/pexels-photo-110820.jpeg",
        "https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg",
      ],
    };
    const categories = await Category.findAll();
    const results = {};
    for (const cat of categories) {
      const urls = pexels[cat.species] || pexels.other;
      const pets = await Pet.findAll({ where: { categoryId: cat.id } });
      for (let i = 0; i < pets.length; i++) {
        await pets[i].update({ images: [urls[i % urls.length]] });
      }
      results[cat.species] = pets.length;
    }
    res.json(results);
  });

  app.post("/fix-images", async (req, res) => {
    const { ShelterUser } = require("../models");
    const images = {
      "Animales Sin Hogar":      ["https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg"],
      "Refugio Esperanza Viva":  ["https://images.pexels.com/photos/1629781/pexels-photo-1629781.jpeg"],
      "Hogar Patitas Felices":   ["https://images.pexels.com/photos/4587997/pexels-photo-4587997.jpeg"],
      "Manada Solidaria":        ["https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg"],
      "Corazón Animal":          ["https://images.pexels.com/photos/1543793/pexels-photo-1543793.jpeg"],
      "Puente de Vida":          ["https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg"],
      "Amigos de Cuatro Patas":  ["https://images.pexels.com/photos/3825589/pexels-photo-3825589.jpeg"],
      "Hogar Petropolis":        ["https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg"],
      "La Casa del Amigo":       ["https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"],
      "Nuevo Hogar":             ["https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg"],
    };
    const results = {};
    for (const [name, imgs] of Object.entries(images)) {
      const [updated] = await ShelterUser.update({ images: imgs }, { where: { name } });
      results[name] = updated ? "updated" : "not found";
    }
    res.json(results);
  });

  app.post("/seed", async (req, res) => {
    const results = {};
    const seeders = [
      "userSeeder", "shelterUserSeeder", "categorySeeder",
      "alternativePetSeeder", "likedPetsSeeder", "productSeeder", "requestSeeder"
    ];
    for (const name of seeders) {
      try {
        await require(`../seeders/${name}`)();
        results[name] = "ok";
      } catch (e) {
        results[name] = e.message;
      }
    }
    res.json(results);
  });
};

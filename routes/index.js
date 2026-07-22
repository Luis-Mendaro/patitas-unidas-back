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

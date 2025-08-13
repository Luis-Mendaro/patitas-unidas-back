const { Op } = require("sequelize");
const { Pet, ShelterUser, Category } = require("../models");
const formidable = require("formidable");

const { validateFieldsCreatePet } = require("../utils/validation");
const { uploadImage } = require("../utils/uploadImage");

// Display a listing of the resource.

async function index(req, res) {
  try {
    const {
      size,
      sex,
      isAdopted,
      ageMin,
      ageMax,
      location,
      species,
      page = 1,
      limit = 20,
      sortBy = "id",
      sortDir = "DESC",
    } = req.query;

    const order = [[sortBy, sortDir]];

    if (sortBy === "isAdopted") order.push(["createdAt", "DESC"]);

    const where = {};
    if (size) where.size = size;
    if (sex) where.sex = sex;

    if (typeof isAdopted !== "undefined") {
      where.isAdopted = isAdopted === "true";
    }

    if (ageMin || ageMax) {
      where.age = {};

      if (ageMin) where.age[Op.gte] = parseInt(ageMin) * 12;
      if (ageMax) where.age[Op.lte] = parseInt(ageMax) * 12;
    }

    const whereCategory = {};
    if (species) whereCategory.species = species;

    const whereLocation = {};
    if (location) whereLocation.location = location;

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const { count, rows } = await Pet.findAndCountAll({
      order,
      where,
      limit: parseInt(limit),
      offset,
      include: [
        {
          model: ShelterUser,
          where: Object.keys(whereLocation).length ? whereLocation : undefined,
        },
        {
          model: Category,
          where: Object.keys(whereCategory).length ? whereCategory : undefined,
        },
      ],
    });

    res.json({
      pets: rows,
      total: count,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching pets" });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const petId = req.params.id;
    const pet = await Pet.findByPk(petId, { include: [ShelterUser, Category] });

    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    return res.status(200).json({ pet });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  try {
    const form = formidable({
      multiples: true,
      keepExtensions: true,
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(400).json({ message: "Error processing the form" });
      }
      const missing = validateFieldsCreatePet(fields);
      if (missing) {
        return res.status(400).json({ message: "Missing fields" });
      }

      try {
        const newImageName = await uploadImage(files.images, "PetImages");

        await Pet.create({
          ...fields,
          images: [newImageName],
        });

        return res.status(200).json({ message: "A new pet was created" });
      } catch (uploadError) {
        console.error(uploadError);
        return res.status(500).json({ message: uploadError.message });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  try {
    const petId = req.params.id;
    const { name, description, images, sex, size, color, age, shelterUserId, categoryId } =
      req.body;
    const pet = await Pet.findByPk(petId);

    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }
    if (name) pet.name = name;
    if (description) pet.description = description;
    if (images) pet.images = images;
    if (sex) pet.sex = sex;
    if (size) pet.size = size;
    if (color) pet.color = color;
    if (age) pet.age = age;
    if (shelterUserId) pet.shelterUserId = shelterUserId;
    if (categoryId) pet.categoryId = categoryId;

    await pet.save();
    return res.status(200).json({ message: `${pet.name} fue actualizado/a correctamente`, pet });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const petId = req.params.id;
    const pet = await Pet.findByPk(petId);

    if (!pet) {
      return res.status(404).json({ message: "Mascota no encontrada" });
    }

    await pet.destroy();

    return res.status(200).json({ message: `Se borro a ${pet.name} correctamente` });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

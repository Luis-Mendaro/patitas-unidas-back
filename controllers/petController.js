const { Op } = require("sequelize");
const { Pet, ShelterUser, Category, Request } = require("../models");
const formidable = require("formidable");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const fs = require("fs");

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
    } = req.query;

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
    const pet = await Pet.findByPk(petId, { include: [ShelterUser, Category, Request] });

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
      const { name, description, sex, size, color, age, shelterUserId, categoryId } = fields;

      if (!Object.values(fields).every(Boolean)) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }

      //Uploading image to supabase
      const { data, error } = await supabase.storage
        .from("PetImages")
        .upload(files.images.newFilename, fs.createReadStream(files.images.filepath), {
          cacheControl: "3600",
          upsert: false,
          contentType: files.images.mimetype,
          duplex: "half",
        });

      // obtaining the url for said image from the bucket
      // const { data: publicUrlData } = supabase.storage
      //   .from("PetImages")
      //   .getPublicUrl(files.images.newFilename);

      // const imageUrl = publicUrlData?.publicUrl;

      await Pet.create({
        name,
        description,
        images: [files.images.newFilename],
        sex,
        size,
        color,
        age,
        shelterUserId,
        categoryId,
      });
      return res.status(200).json({ message: "Se creo una nueva mascota" });
    });
  } catch (error) {
    return res.status(500).json({ message: "Error del servidor" });
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

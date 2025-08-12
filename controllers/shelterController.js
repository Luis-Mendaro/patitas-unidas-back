const { ShelterUser } = require("../models");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const fs = require("fs");

async function index(req, res) {
  try {
    const shelters = await ShelterUser.findAll();
    return res.status(200).json({ shelters });
  } catch (error) {
    return res.status(500).json({ msg: "Error interno del servidor." });
  }
}

async function show(req, res) {
  const { id } = req.params;
  const shelter = await ShelterUser.findByPk(id, { include: ["pets", "requests", "products"] });
  return res.json({ shelter });
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error al procesar el formulario: ", err);
      return res.status(400).json({ msg: "Error interno del servidor" });
    }
    try {
      const { name, email, password, phoneNumber, location, description } = fields;
      const existingShelter = await ShelterUser.findOne({ where: { email } });
      if (existingShelter) return res.status(400).json({ msg: "Email ya en uso" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const shelterData = {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        location,
        description,
      };
      if (files.images) {
        shelterData.images = [files.images.newFilename];
        await supabase.storage
          .from("ShelterImages")
          .upload(files.images.newFilename, fs.readFileSync(files.images.filepath), {
            cacheControl: "3600",
            upsert: false,
            contentType: files.image.mimetype,
          });
      }

      // const { data: publicUrlData } = supabase.storage
      //   .from("PetImages")
      //   .getPublicUrl(files.images.newFilename);

      // const imageUrl = publicUrlData?.publicUrl;

      shelterData.roleCode = 200;
      await ShelterUser.create(shelterData);
      return res.status(201).json({ msg: "Usuario creado correctamente" });
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      return res.status(500).json({ msg: "Error interno del servidor" });
    }
  });
}

async function update(req, res) {
  const { id } = req.params;

  const allowedFields = [
    "name",
    "email",
    "password",
    "phoneNumber",
    "location",
    "image",
    "description",
  ];

  const fields = req.body;

  try {
    const shelterUser = await ShelterUser.findByPk(id);
    if (!shelterUser) {
      return res.status(404).json({ msg: "Refugio no encontrado" });
    }

    const filteredUpdates = {};
    for (const key of allowedFields) {
      if (fields.hasOwnProperty(key)) {
        filteredUpdates[key] = fields[key];
      }
    }

    if (filteredUpdates.password) {
      const hashedPassword = await bcrypt.hash(filteredUpdates.password, 10);
      filteredUpdates.password = hashedPassword;
    }

    await shelterUser.update(filteredUpdates);

    const shelterUserData = shelterUser.toJSON();
    delete shelterUserData.password;

    res
      .status(200)
      .json({ msg: "Usuario actualizado correctamente", shelterUser: shelterUserData });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
}

async function destroy(req, res) {
  const { id } = req.params;
  try {
    const shelterUser = await ShelterUser.findByPk(id);
    if (!shelterUser) {
      return res.status(404).json({ msg: "Refugio no encontrado" });
    }
    await shelterUser.destroy();
    return res.json({ msg: "Se borró el usuario" });
  } catch (error) {}
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

const { ShelterUser } = require("../models");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const fs = require("fs");
const { uploadImage } = require("../utils/uploadImage");

async function index(req, res) {
  try {
    const shelters = await ShelterUser.findAll();
    return res.status(200).json({ shelters });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error" });
  }
}

async function show(req, res) {
  const { id } = req.params;
  const shelter = await ShelterUser.findByPk(id, { include: ["pets", "requests", "products"] });
  return res.json({ shelter });
}

async function store(req, res) {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("There was an error trying to parse the form ", err);
      return res.status(400).json({ msg: "Internal server error" });
    }
    try {
      const { name, email, password, phoneNumber, location, description } = fields;
      if (!name || !email || !password || !phoneNumber || !location || !description) {
        return res.status(400).json({ msg: "Missing required fields" });
      }

      const image = files.image;
      if (!image || !image.filepath) {
        return res.status(400).json({ msg: "Image is required" });
      }

      // Validaciones de archivo
      if (!image.mimetype?.startsWith("image/")) {
        return res.status(400).json({ msg: "Only image files are allowed" });
      }
      if (image.size === 0) {
        return res.status(400).json({ msg: "Empty file" });
      }

      const existingShelter = await ShelterUser.findOne({ where: { email } });
      if (existingShelter) return res.status(400).json({ msg: "The email is already in use" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newImageName = await uploadImage(image, "ShelterImages");
      const shelterData = {
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        location,
        description,
        roleCode: 200,
        images: [newImageName],
      };

      const created = await ShelterUser.create(shelterData);
      return res.status(201).json({
        msg: "User created successfully",
        id: created.id,
      });
    } catch (error) {
      console.error("There was an error when trying to create a user:", error);
      return res.status(500).json({ msg: "Internal server error" });
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
    "images",
    "description",
  ];

  const fields = req.body;

  try {
    const shelterUser = await ShelterUser.findByPk(id);
    if (!shelterUser) {
      return res.status(404).json({ msg: "Shelter not found" });
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

    res.status(200).json({ msg: "User updated successfully ", shelterUser: shelterUserData });
  } catch (error) {
    console.error("There was an error when trying to update a user:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
}

async function destroy(req, res) {
  const { id } = req.params;
  try {
    const shelterUser = await ShelterUser.findByPk(id);
    if (!shelterUser) {
      return res.status(404).json({ msg: "Shelter not found" });
    }
    await shelterUser.destroy();
    return res.json({ msg: "User deleted" });
  } catch (error) {}
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

const { Op } = require("sequelize");
const { Pet, ShelterUser, Category } = require("../models");

// Display a listing of the resource.

async function index(req, res) {
  try {
    const { size, sex, ageMin, ageMax, location, species, page = 1, limit = 20 } = req.query;

    const where = {};
    if (size) where.size = size;
    if (sex) where.sex = sex;

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
    res.status(500).json({ error: "Error fetching pets" });
  }
}

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};

const { User, LikedPets, Pet, Category, ShelterUser } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  return res.json({ msg: "hola" });
}

// Display the specified resource.
async function show(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

async function likePet(req, res) {
  try {
    const { userId, petId } = req.params;
    let user = await User.findByPk(userId, {
      include: { model: LikedPets, include: Pet },
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    let userLikedPets = user.likedPet;
    if (!userLikedPets) {
      userLikedPets = await LikedPets.create({ userId: user.id });
    }

    const pet = await Pet.findByPk(petId);
    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    (await userLikedPets.hasPet(pet))
      ? await userLikedPets.removePet(pet)
      : await userLikedPets.addPet(pet);

    user = await User.findByPk(userId, {
      include: [
        {
          model: LikedPets,
          include: [{ model: Pet, include: [{ model: Category }, { model: ShelterUser }] }],
        },
      ],
    });

    return res.json(user.likedPet.pets);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
  likePet,
};

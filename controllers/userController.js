const bcrypt = require("bcryptjs");
const { User, LikedPets, Pet, Category, ShelterUser } = require("../models");

async function index(req, res) {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo encontrar el usuario" });
  }
}

async function show(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId, { include: { model: LikedPets, include: Pet } });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo encontrar lista" });
  }
}

async function store(req, res) {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo electrónico ya está registrado." });
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashpassword, roleCode: 300 });
    await LikedPets.create({ userId: user.id });
    return res.status(201).json({ user });
  } catch (error) {
    return res.status(500).json({ message: "error al crear usuario" });
  }
}

async function update(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, password, profileImage } = req.body;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (profileImage) {
      user.profileImage = `/profileImages/${profileImage}`;
    }

    await user.save();
    return res.status(200).json({ message: "Usuario actualizado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar usuario" });
  }
}

async function destroy(req, res) {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.destroy();
    return res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar usuario" });
  }
}

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

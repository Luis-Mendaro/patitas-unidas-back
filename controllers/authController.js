const { User, ShelterUser, Role, LikedPets, Pet, Category } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "You should specify an email and a password." });
    }

    let user = await User.scope("withPassword").findOne({
      include: [
        {
          model: LikedPets,
          include: [{ model: Pet, include: [{ model: Category }, { model: ShelterUser }] }],
        },
      ],
      where: { email },
    });

    if (!user) {
      user = await ShelterUser.scope("withPassword").findOne({
        where: { email },
      });
    }

    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ sub: user.id, roleCode: user.roleCode }, process.env.JWT_SECRET);

    const userData = user.toJSON();
    delete userData.password;

    return res.status(200).json({
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo hacer login", error: error.message });
  }
}

module.exports = {
  login,
};

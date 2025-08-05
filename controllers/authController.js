const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const user = await User.scope("withPassword").findOne({
      where: {
        email: req.body.email,
        isAdmin: false,
      },
    });

    if (!user) return res.status(401).json({ message: "Credenciales inválidas" });
    const userJson = user.toJSON();
    delete userJson.password;

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);

    if (!isValidPassword) return res.status(401).json({ message: "Credenciales inválidas" });

    const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET);
    return res.status(200).json({
      token,
      user: userJson,
    });
  } catch (error) {
    return res.status(500).json({ msg: "No se pudo hacer login", error: error.message });
  }
}

module.exports = {
  login,
};

const { Request } = require("../models");

async function index(req, res) {
  const requests = await Request.findAll({
    include: ["pet", "user"],
    limit: 20,
    order: [["createdAt", "DESC"]],
  });

  res.status(200).json({ requests });
}

async function show(req, res) {}

async function store(req, res) {
  try {
    const { userId, petId, shelterUserId, requestContent } = req.body;
    const newRequest = await Request.create({
      userId,
      petId,
      shelterUserId,
      status: "active",
      requestContent,
    });
    return res.status(201).json({ newRequest });
  } catch (error) {
    return res.status(500).json({ message: "error al crear nueva request" });
  }
}

async function update(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
};

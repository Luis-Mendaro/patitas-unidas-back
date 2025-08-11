const { Request } = require("../models");

async function index(req, res) {
  try {
    const {
      limit = 20,
      order = "DESC",
      page = 1,
      shelterUserId
    } = req.query;

    const where = {};

    if (shelterUserId) {
      where.shelterUserId = shelterUserId;
    }

    const requests = await Request.findAll({
      where,
      include: ["pet", "user"],
      limit: parseInt(limit, 10),
      offset: (page - 1) * parseInt(limit, 10),
      order: [["createdAt", order.toUpperCase()]],
    });

    res.status(200).json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error when trying to fetch all requests." });
  }
}



async function show(req, res) { }

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
    return res
      .status(500)
      .json({ message: "There was an error when trying to create the new request" });
  }
}

async function update(req, res) {
  try {
    const validStatusValues = ["active", "cancelled", "adopted"];
    const requestId = req.params.id;
    const { status } = req.body;
    if (!validStatusValues.includes(status)) {
      return res.status(400).json({
        msg: "There was an attempt to update a request's status to an invalid status value",
      });
    }

    const request = await Request.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ msg: "Request not found" });
    }

    await request.update({
      status,
    });

    const fullRequest = await Request.findByPk(requestId, { include: ["user", "pet"] });

    if (fullRequest.status === "adopted") {
      await fullRequest.pet.update({ isAdopted: true });
    }
    return res
      .status(200)
      .json({ msg: "Request status updated successfully", request: fullRequest });
  } catch (error) {
    return res.status(500).json({
      msg: "There was an error when trying to update the request's status",
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
};

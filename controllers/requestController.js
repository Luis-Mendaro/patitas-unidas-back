const { Request, User, Pet } = require("../models");
const nodemailer = require("nodemailer");

async function index(req, res) {
  try {

    const { limit = 20, page = 1, sortBy = "id", sortDir = "DESC", shelterUserId } = req.query;

    const order = [[sortBy, sortDir]];

    const where = {};

    if (shelterUserId) {
      where.shelterUserId = shelterUserId;
    }

    const requests = await Request.findAll({
      where,
      order,
      include: ["pet", "user"],
      limit: parseInt(limit, 10),
      offset: (page - 1) * parseInt(limit, 10),
    });

    res.status(200).json({ requests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error when trying to fetch all requests." });
  }
}

async function show(req, res) {}

async function store(req, res) {
  try {
    const { userId, petId, shelterUserId, requestContent } = req.body;
    const newRequest = await Request.create({
      userId,
      petId,
      shelterUserId,
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
    const validStatusValues = ["new", "pending", "cancelled", "completed"];
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

    const fullRequest = await Request.findByPk(requestId, {
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Pet,
          as: "pet",
          include: [Request],
        },
      ],
    });

    if (fullRequest.status === "completed") {
      await fullRequest.pet.update({ isAdopted: true });

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      //Sending an email to the user for which the adoption request was accepted
      const completedRequestMailOptions = {
        from: process.env.EMAIL_USER,
        to: fullRequest.user.email,
        subject: `Solicitud de adopcion aprobada!`,
        text: `Hola ${fullRequest.user.name},\n\n Estamos felices de informarte que tu solicitud de adopcion para ${fullRequest.pet.name} fue aprobada!`,
      };
      await transporter.sendMail(completedRequestMailOptions);

      //Sending an email to the other users that had an adoption request with either pending or new status for the same pet and setting those requests' status to cancelled
      for (const request of fullRequest.pet.requests) {
        if (request.status === "new" || request.status === "pending") {
          await request.update({
            status: "cancelled",
          });
          const cancelledRequestMailOptions = {
            from: process.env.EMAIL_USER,
            to: request.requestContent.email,
            subject: `Solicitud de adopcion`,
            text: `Hola ${request.requestContent.fullname},\n\n Te estamos contactando porque había una solicitud de adopción para ${fullRequest.pet.name} de tu parte en nuestro sistema. 
            Te queremos informar que ${fullRequest.pet.name} ya ha encontrado un hogar, por lo que se ha cancelado tu solicitud de adopción.`,
          };
          await transporter.sendMail(cancelledRequestMailOptions);
        }
      }
    }
    return res
      .status(200)
      .json({ msg: "Request status updated successfully", request: fullRequest });
  } catch (error) {
    return res.status(500).json({
      msg: "There was an error when trying to update the request's status",
      error: error,
    });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
};

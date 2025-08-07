const express = require("express");
const router = express.Router();
const requestController = require("../controllers/requestController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");

router.use(authMiddleware);
router.use(authorizeRoles(["admin", "user", "shelter"]));

router.get("/", requestController.index);
router.post("/", requestController.store);
router.get("/:id", requestController.show);
router.patch("/:id", requestController.update);

module.exports = router;

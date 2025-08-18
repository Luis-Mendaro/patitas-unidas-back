const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");

router.get("/", petController.index);
router.get("/:id", petController.show);

router.use(authMiddleware);
router.use(authorizeRoles(["admin", "shelter"]));

router.post("/", petController.store);
router.patch("/:id", petController.update);
router.delete("/:id", petController.destroy);

module.exports = router;

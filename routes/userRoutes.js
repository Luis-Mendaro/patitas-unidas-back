const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");

router.post("/", userController.store);

router.use(authMiddleware);
router.use(authorizeRoles(["admin", "user"]));

router.get("/", userController.index);
router.get("/:id", userController.show);
router.patch("/:id", userController.update);
router.delete("/:id", userController.destroy);
router.patch("/:userId/likePet/:petId", userController.likePet);

module.exports = router;

const express = require("express");
const router = express.Router();
const shelterController = require("../controllers/shelterController");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRolesMiddleware");

/*
 * API endpoints relacionados a los usuarios.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/users",
 * tal como se definió en el archivo `routes/index.js`.
 */
router.post("/", shelterController.store);

router.use(authMiddleware);

router.get("/", shelterController.index);
router.get("/:id", shelterController.show);
router.patch("/:id", shelterController.update);
router.delete("/:id", shelterController.destroy);

module.exports = router;

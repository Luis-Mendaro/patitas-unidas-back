const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

router.get("/", petController.index);
router.post("/", petController.store);
router.get("/:id", petController.show);
router.patch("/:id", petController.update);
router.delete("/:id", petController.destroy);

module.exports = router;

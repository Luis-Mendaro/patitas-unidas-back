const express = require("express");
const router = express.Router();
const petController = require("../controllers/petController");

router.get("/", petController.index);
// router.post("/", articleController.store);
// router.get("/:id", articleController.show);
// router.patch("/:id", articleController.update);
// router.delete("/:id", articleController.destroy);

module.exports = router;

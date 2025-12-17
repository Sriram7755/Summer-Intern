const router = require("express").Router();
const {
  searchBus,
  getBusById,
  getLocations
} = require("../controllers/busController");

router.get("/locations", getLocations);
router.get("/search", searchBus);
router.get("/:id", getBusById);

module.exports = router;

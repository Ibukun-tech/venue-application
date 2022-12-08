const express = require("express");
const {
  updateHouse,
  findAllHouse,
  createHouse,
  findOneHouse,
  deleteHouse,
} = require("./../Controller/houseController");
const reviewRoute = require("./reviewRoute");
const router = express.Router();

router.route("/").post(createHouse).get(findAllHouse);
router.use("/:houseId/review", reviewRoute);
router.route("/:id").get(findOneHouse).delete(deleteHouse).patch(updateHouse);

module.exports = router;

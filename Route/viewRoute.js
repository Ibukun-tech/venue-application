const express = require("express");
const { protect } = require("./../Controller/authController");
const {
  getAllHouse,
  account,
  getSingleHouse,
  logIn,
  checkOutSessionId,
} = require("./../Controller/viewController");
const router = express.Router();
router.get("/account", protect, account);
router.get("/", protect, getAllHouse);
router.get("/venue/:id", protect, getSingleHouse);
router.get("/login", logIn);
router.get("/checkout/:id'", protect, checkOutSessionId);
module.exports = router;

const { protect } = require("./../Controller/authController");
const { checkOutSessionId } = require("./../Controller/bookingController");
const express = require("express");
const router = express.Router();

router.route("/create-checkout-session").post(protect, checkOutSessionId);

module.exports = router;

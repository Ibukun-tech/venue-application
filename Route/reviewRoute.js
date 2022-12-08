const express = require("express");
const { protect, restrictTo } = require("./../Controller/authController");
const {
  settingParamId,
  getAllReview,
  creatingReview,
  getOneReview,
} = require("./../Controller/reviewController");
const router = express.Router({
  mergeParams: true,
});
router.route("/").post(creatingReview).get(getAllReview);
router.route("/:id").get(getOneReview);

// router.route("/:id").get(protect, restrictTo("user"), getOnlyUserReview);
// router
//   .route("/")
//   .post(protect, restrictTo("user"), settingParamId, creatingReview);
module.exports = router;

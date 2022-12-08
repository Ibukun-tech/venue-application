const express = require("express");
const {
  findAllUser,
  updatePhoto,
  reSizePhoto,
  updateUser,
} = require("./../Controller/userController");
const {
  changePassword,
  signUp,
  logIn,
  forgetPassword,
  protect,
  logOut,
  resetPassword,
} = require("./../Controller/authController");
const router = express.Router();
router.route("/logout").get(logOut);
router.route("/signup").post(signUp);
router.route("/forgetpassword").post(forgetPassword);
router.route("/resetpassword/:id").patch(resetPassword);
router.route("/login").post(logIn);
// router.route("/changepassword").post();
router
  .route("/updateUser")
  .patch(protect, updatePhoto, reSizePhoto, updateUser);
router.route("/updatePassword").patch(protect, changePassword);
router.route("/").get(findAllUser);
module.exports = router;

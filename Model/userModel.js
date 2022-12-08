const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    maxLength: 50,
    required: true,
  },
  email: {
    unique: true,
    type: String,
    validate: [validator.isEmail, "Please provide us with your email account"],
    required: [true, "Its required you input your email"],
    lowercase: [true, "emails are always in lowercase"],
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  select: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (val) {
        return this.password === val;
      },
      message: "passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
userSchema.methods.comparePassword = function (currentPassword, dbPassword) {
  return bcrypt.compare(currentPassword, dbPassword);
};
userSchema.methods.changePassword = function (jwtPasswordTime) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return jwtPasswordTime < changedTimestamp;
  }

  return false;
};
userSchema.methods.generatePasswordToken = function () {
  const token = crypto.randomBytes(32).toString("hex");
  const hashToken = crypto.createHash("sha256").update(token).digest("hex");
  this.passwordResetToken = hashToken;
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return token;
};
const UserModel = mongoose.model("UserModel", userSchema);
module.exports = UserModel;

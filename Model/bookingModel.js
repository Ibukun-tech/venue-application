const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  venue: {
    type: mongoose.Schema.ObjectId,
    ref: "HouseModel",
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModel",
  },
  paid: { type: String },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  price: {
    type: String,
  },
});
bookingSchema.pre(/^find/, function (next) {
  this.populate("venue").populate("user");
  next();
});
const BookingModel = mongoose.model("BookingModel", bookingSchema);

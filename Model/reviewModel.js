const mongoose = require("mongoose");
const HouseModel = require("./userModel");
const reviewSchema = new mongoose.Schema({
  review: {
    type: String,
    required: [true, "review cannot be empty"],
  },
  rating: {
    type: Number,
    max: 5,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  venue: {
    type: mongoose.Schema.ObjectId,
    ref: "HouseModel",
  },

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModel",
  },
});
reviewSchema.index({ venue: 1, user: 1 }, { unique: true });
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "venue",
  }).populate({
    path: "user",
  });
  next();
});
reviewSchema.statics.calcAverageRating = async function (id) {
  const stats = await this.aggregate([
    {
      $match: { venue: id },
    },
    {
      $group: {
        _id: "$venue",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);
  if (stats.length > 1) {
    await HouseModel.findByIdAndUpdate(id, {
      ratingsQuantity: stats[0].nRating,
      rating: stats[0].avgRating,
    });
  } else {
    await HouseModel.findByIdAndUpdate(id, {
      ratingsQuantity: 0,
      rating: 4.5,
    });
  }
};
reviewSchema.post("save", async function (next) {
  await this.constructor.calcAverageRating(this.venue);
  // next();
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  next();
});
reviewSchema.post(/^findOneAnd/, async function (next) {
  await this.r.constructor.calcAverageRating(this.r.venue);
  // next();
});
const ReviewModel = mongoose.model("ReviewModel", reviewSchema);
module.exports = ReviewModel;

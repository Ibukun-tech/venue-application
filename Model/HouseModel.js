const mongoose = require("mongoose");
const slugify = require("slugify");

const houseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
    ratingsQuantity: {
      type: Number,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    summary: {
      type: String,
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    NoOfPeople: {
      type: Number,
    },
    imageCover: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },

    price: {
      type: Number,
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discount price({VALUE}) should be less than the normal price",
      },
    },

    images: [String],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
houseSchema.virtual("reviews", {
  ref: "ReviewModel",
  foreignField: "venue",
  localField: "_id",
});
// houseSchema.pre(/^find/, function (next) {
//   console.log("aww far");
//   this.populate({ path: "reviews" });
//   console.log("aww far");
//   next();
// });
houseSchema.pre("save", function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });
  next();
});
const HouseModel = mongoose.model("HouseModel", houseSchema);
module.exports = HouseModel;

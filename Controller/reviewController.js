const ApiError = require("./../Utility/ApiError");
const ReviewModel = require("./../Model/reviewModel");
const { catchAsyncError } = require("./../Controller/errorController");
exports.settingParamId = catchAsyncError(async (req, res, next) => {
  if (!req.body.venue) req.body.venue = req.params.houseId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

exports.creatingReview = catchAsyncError(async (req, res, next) => {
  const review = await ReviewModel.create({
    review: req.body.review,
    rating: req.body.rating,
    user: req.body.rating,
    venue: req.body.venue,
  });
  res.status(200).json({
    status: "success",
    review,
  });
});
exports.getAllReview = catchAsyncError(async (req, res, next) => {
  const allReviews = await ReviewModel.find();
  res.status(200).json({
    status: "success",
    allReviews,
  });
});
exports.getOneReview = catchAsyncError(async (req, res, next) => {
  const oneReview = await ReviewModel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    oneReview,
  });
});

const HouseModel = require("./../Model/HouseModel");
const { catchAsyncError } = require("./errorController");
exports.findAllHouse = catchAsyncError(async (req, res, next) => {
  const data = await HouseModel.find();
  res.status(200).json({
    status: "success",
    data,
  });
});
exports.createHouse = catchAsyncError(async (req, res, next) => {
  console.log("create hoouse", req.body);
  const data = await HouseModel.create(req.body);
  console.log("create hoouse", data);
  res.status(200).json({
    status: "success",
    data,
  });
});
exports.findOneHouse = catchAsyncError(async (req, res, next) => {
  console.log(req.params);
  const data = await HouseModel.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data,
  });
});
exports.deleteHouse = catchAsyncError(async (req, res, next) => {
  await HouseModel.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.updateHouse = catchAsyncError(async (req, res, next) => {
  const data = await HouseModel.findByIdAndUpdate(req.params.id, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data,
  });
});

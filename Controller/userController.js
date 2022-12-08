const ApiError = require("./../Utility/ApiError");
const { catchAsyncError } = require("./errorController");
const multer = require("multer");
const sharp = require("sharp");
const UserModel = require("./../Model/userModel");
const multerStorage = multer.memoryStorage();

exports.findAllUser = catchAsyncError(async (req, res, next) => {
  const data = await UserModel.find();
  res.status(200).json({
    status: "success",
    data,
  });
});
const multiFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("imag")) {
    cb(null, true);
  } else {
    cb(new ApiError("not an image", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multiFilter,
});
exports.updatePhoto = upload.single("photo");
exports.reSizePhoto = catchAsyncError(async (req, res, next) => {
  if (!req.file) next();
  req.file.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.fileName}`);
  next();
});
const filterObject = (obj, arr) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (arr.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
exports.updateUser = catchAsyncError(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }
  const obj = filterObject(req.body, "name", "email");
  if (req.file) obj.photo = req.file.fileName;
  const user = await UserModel.findByIdAndUpdate(req.user.id, obj, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    user,
  });
});

const UserModel = require("./../Model/userModel");
const { promisify } = require("util");
const crypto = require("crypto");
const ApiError = require("./../Utility/ApiError");
const { catchAsyncError } = require("./errorController");
const jwt = require("jsonwebtoken");
const Email = require("./../Utility/Email");
const getToken = (id) => {
  return jwt.sign({ id }, process.env.PRIVATEKEY, {
    expiresIn: process.env.expiresDate,
  });
};
exports.signUp = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.create({
    email: req.body.email,
    password: req.body.password,
    userName: req.body.username,

    passwordConfirm: req.body.passwordConfirm,
  });
  if (!user) {
    return next(new ApiError("You Have not yet input your details", 400));
  }
  const token = getToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
  });

  res.status(200).json({
    status: "success",
    token,
  });
});
exports.logIn = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user || !user.comparePassword(req.body.password, user.password)) {
    return next(new ApiError("incorrect password or email", 400));
  }
  const token = getToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // Remove password from output
  user.password = undefined;

  res.status(200).json({
    status: "success",
    token,
  });
});
exports.logOut = catchAsyncError(async (req, res, next) => {
  res.cookies("jwt", "loggedOut", {
    secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 10 * 1000),
  });
  res.status(200).json({ status: "success" });
});
exports.protect = catchAsyncError(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.get("cookie")) {
    // console.log(req.get("cookie"))

    const value = req.get("cookie").split(";")[0];
    const tk = value.split("=")[1];
    console.log(value, tk);
    token = tk;
  }
  // let userId;
  // console.log(token, req, req.cookies, req.cookie);
  const userId = await promisify(jwt.verify)(token, process.env.PRIVATEKEY);
  const user = await UserModel.findById(userId.id);
  console.log(user);
  if (!user) {
    return next("you are not yet logged in", 400);
  }
  // console.log(userId.iat, user.passwordChangedAt, user);
  if (user.changePassword(userId.iat)) {
    return next(new ApiError("you have changed this password before", 400));
  }
  req.user = user;
  res.locals.user = user;
  console.log(res.locals.user);
  next();
});
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("You are  restricted from going to this place ", 400)
      );
    }
    next();
  };
};

exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ApiError("you are not a user in the database", 400));
  }
  const resetToken = user.generatePasswordToken();
  user.save({ validateBeforeSave: false });
  const message = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetpassword/${resetToken}`;
  try {
    await Email({
      email: user.email,
      subject: "To reset password",
      text: message,
    });
    res.status(200).json({
      status: "success",
      message: "Reset token has been sent to your email",
    });
  } catch {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.save({ validateBeforeSave: false });
    return new next(new ApiError("something happened to the network", 400));
  }
});
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.id)
    .digest("hex");

  const user = await UserModel.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ApiError(
        "Time has expired for you to change your password try again",
        400
      )
    );
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  const token = getToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});
exports.changePassword = catchAsyncError(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id);

  if (!user.comparePassword(req.body.passwordCurrent, user.password)) {
    return next(new ApiError("Incorrect password ", 401));
  }
  user.password = req.body.passwordNew;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  const token = getToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

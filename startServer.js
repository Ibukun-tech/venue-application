const express = require("express");
const morgan = require("morgan");
const path = require("path");
const ApiError = require("./Utility/ApiError");
const xss = require("xss-clean");
const cookieParse = require("cookie-parser");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const { errorController } = require("./Controller/errorController");
const bookingRouter = require("./Route/bookingRoute");
const viewRouter = require("./Route/viewRoute");
const helmet = require("helmet");
const compression = require("compression");
const reviewRouter = require("./Route/reviewRoute");
const venueRouter = require("./Route/houseRoute");
const userRouter = require("./Route/userRoute");
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log("you are in there");
  next();
});
app.use(helmet());
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);
app.use(xss());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  })
);
app.use(cookieParse());
app.use(mongoSanitize());
app.use(compression());
app.use("/", viewRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/house", venueRouter);
app.use("/api/v1/bookings", bookingRouter);
app.use((req, res, next) => {
  next(new ApiError("no route like this", 400));
});
app.use(errorController);
module.exports = app;

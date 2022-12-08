exports.catchAsyncError = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
exports.errorController = (err, req, res, next) => {
  if (process.env.NODE_ENV === "Development")
    return errorForDevelopment(err, res, req);
  if (process.env.NODE_ENV === "Production")
    return errorForProduction(err, res, req);
};

const errorForDevelopment = (err, res, req) => {
  // console.log(req)
  // if (req.originalUrl.startsWith("/api")) {
  console.log("here in the erro");
  if (err.operational) {
    res.status(err.statusCode || 500).json({
      message: err.message,
      status: err.status,
      operational: err.operational,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      message: err.message,
      status: err.status,
      operational: err.operational,
      stack: err.stack,
    });
    // }
  }
};

const errorForProduction = (err, res, req) => {
  if (req.originalUrl.startsWith("/api")) {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    } else {
      res.status(err.statusCode || 500).json({
        title: "something went wrong",
        msg: "Something went wrong please",
      });
    }
  }
  if (err.operational) {
    res.status(err.statusCode || 500).render("error", {
      message: err.message,
      status: err.status,
    });
  } else {
    res.status(err.statusCode || 500).render("error", {
      title: "something went wrong",
      message: "OOps! something went wrong ",
    });
  }
};

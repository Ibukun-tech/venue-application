const HouseModel = require("./../Model/HouseModel");
const { catchAsyncError } = require("./errorController");
// const HouseModel = require("./../Model/HouseModel");
const stripe = require("stripe")(process.env.STRIPE__KEY);
exports.getAllHouse = async (req, res) => {
  const venues = await HouseModel.find();
  res.status(200).render("overview", {
    venues,
    title: "overview",
  });
};
exports.venue;
exports.getSingleHouse = async (req, res) => {
  console.log(req.params.id.split("%20"));
  const house = req.params.id.split("%20").join(" ");
  const venue = await HouseModel.findOne({ name: house }).populate("reviews");
  console.log;
  console.log(venue, house);
  req.venue = venue;
  res.status(200).render("venue", {
    venue,
    title: house,
  });
};
exports.logIn = (req, res) => {
  res.status(200).render("login", {
    title: "log into your account",
  });
};
exports.account = (req, res) => {
  res.status(200).render("account");
};
exports.checkOutSessionId = catchAsyncError(async (req, res, next) => {
  console.log("here", req, process.env.STRIPE__KEY);
  const venue = await HouseModel.findById(req.params.id);
  console.log(venue);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/${venue.name}`,
    customer_email: req.user.email,
    client_reference_id: req.params.id,
    line_items: [
      {
        // name: `${tour.name} Tour`,
        description: `${venue.summary}`,
        price_data: {
          unit_amount: venue.price * 100,
          currency: "usd",
          product_data: {
            name: venue.name,
            description: `${venue.summary}`,
            // images: [tour.imageCover],
          },
        },
        quantity: 1,
      },
    ],
  });
  // res.redirect(303, session.url);
  res.status(200).json({
    status: "success",
    session,
  });
});

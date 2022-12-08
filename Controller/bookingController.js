const { catchAsyncError } = require("./errorController");
const HouseModel = require("./../Model/HouseModel");
const stripe = require("stripe")(process.env.STRIPE__KEY);
exports.checkOutSessionId = catchAsyncError(async (req, res, next) => {
  console.log("here", process.env.STRIPE__KEY);
  const venue = await HouseModel.findById(req.body.id);
  console.log(req.protocol, await stripe.checkout.sessions);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${req.protocol}://${req.get("host")}/`,
    cancel_url: `${req.protocol}://${req.get("host")}/${venue.name}`,
    customer_email: req.user.email,
    client_reference_id: req.body.id,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: venue.name,
          },
          unit_amount: venue.price,
        },
        quantity: 1,
      },
    ],
  });
  console.log(session, "GOTTEN HERE");

  res.status(200).json({
    status: "success",
    session,
  });
});

const pubLicKey =
  "pk_test_51MAk3lBjyYuT7Rfw1XOPlsvqLnbmvGXWn43pRNFmaa1GKyZEAT9PTtvxmtkngbg1040oSZ8oXgKTEpL2eGP3ysQp00yccipvFx";
const stripe = Stripe(pubLicKey);
export const booking = async (id) => {
  try {
    const session = await axios({
      method: "POST",
      data: {
        id: id,
      },
      url: `http://127.0.0.1:2000/api/v1/bookings/create-checkout-session`,
    });
    await stripe.directToCheckout({
      session: session.data.session.id,
    });
    // window.location.replace(session.data.session.url);
  } catch (err) {}
};

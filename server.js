const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Sriser Growth Plan",
          },
          unit_amount: 7900,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://sriser.netlify.app/?success=true",
    cancel_url: "https://sriser.netlify.app/?canceled=true",
  });

  res.json({ id: session.id });
});

app.listen(process.env.PORT || 4242, () => console.log("Server running"));

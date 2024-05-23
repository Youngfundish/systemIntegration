import stripePackage from 'stripe';
import express from 'express';

// Should be in an env
const stripe = stripePackage('sk_test_51PJBHk04vFgq7A3hjDYlBRDbXF5VPt7fTFi5wbZy7bmbNW1DzLOqJixcLssmUnxLjTEUJfA6sCd0DDN4N6UKh70j001fZlcJCA');
const app = express();
app.use(express.static('public'));

const localhost = 'http://localhost:8080';




// test card 4242424242424242
app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
        {
          price: 'price_1PJBWt04vFgq7A3hYxImAv8a',
          quantity: 1,
        },
      ],
    mode: 'payment',
    success_url: `${localhost}/success.html`,
    cancel_url: `${localhost}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(8080, () => console.log('Running on port 8080'));
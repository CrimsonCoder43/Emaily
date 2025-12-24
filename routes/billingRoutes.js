const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripe.secretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/create-checkout-session', requireLogin, async (_req, res) => {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Emaily Credits',
              description: '$5 for 5 credits',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${keys.redirectDomain}/api/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${keys.redirectDomain}/api/stripe/cancel`,
    });

    res.json({ url: session.url });
  });

  app.get('/api/stripe/success', requireLogin, async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(
      req.query.session_id
    );
    const paymentIntent = await stripe.paymentIntents.retrieve(
      session.payment_intent
    );

    if (paymentIntent.status === 'succeeded') {
      req.user.credits += 5;
      await req.user.save();
      res.redirect('/surveys');
    } else {
      res.status(400).send('Payment failed');
    }
  });

  app.get('/api/stripe/cancel', (_req, res) => {
    res.redirect('/');
  });
};

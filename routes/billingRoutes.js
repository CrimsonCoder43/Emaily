const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripe.secretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      source: req.body.id,
      description: '$5 for 5 credits',
    });

    req.user.credits += 5;
    res.send(await req.user.save());
  });
};

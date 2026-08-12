const mongoose = require('mongoose');
const keys = require('../config/keys');

module.exports = (app) => {
  app.get('/api/keepalive', async (req, res) => {
    if (req.query.token !== keys.keepaliveToken) {
      return res.status(403).send('Forbidden');
    }

    try {
      await mongoose.connection.db.admin().command({ ping: 1 });

      console.log(`[keepalive] pinged at ${new Date().toISOString()}`);

      res.status(200).send('OK');
    } catch (err) {
      console.error('[keepalive] failed:', err);

      res.status(500).send('Error');
    }
  });
};

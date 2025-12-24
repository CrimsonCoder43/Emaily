const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    const isYes = req.params.choice === 'yes';
    const emoji = isYes ? '🎉' : '💙';
    const color = isYes ? '#10b981' : '#ef4444';
    const icon = isYes
      ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />'
      : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />';

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You!</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fade-in {
            animation: fadeInUp 0.8s ease-out;
          }
          .animate-bounce-delay {
            animation: bounce 1s infinite;
          }
        </style>
      </head>
      <body class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
        <div class="max-w-2xl mx-auto text-center animate-fade-in">
          <div class="bg-white rounded-2xl shadow-2xl p-12">
            <div class="w-32 h-32 rounded-full mx-auto mb-8 flex items-center justify-center" style="background-color: ${color}20;">
              <svg class="w-20 h-20" style="color: ${color};" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                ${icon}
              </svg>
            </div>
            <h1 class="text-5xl font-bold text-gray-800 mb-4">Thank You! ${emoji}</h1>
            <p class="text-xl text-gray-600 mb-2">Your feedback has been recorded.</p>
            <p class="text-lg text-gray-500">We appreciate your response!</p>
            <div class="mt-8 pt-8 border-t border-gray-200">
              <p class="text-sm text-gray-400">This window can be safely closed.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
  });

  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    res.send(surveys);
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients, from } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      from,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;

      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map((item) => {
        const email = item.recipient;
        const url = item.url;

        if (url) {
          try {
            const urlObj = new URL(url);
            const match = p.test(urlObj.pathname);

            if (match) {
              return { email, surveyId: match.surveyId, choice: match.choice };
            }
          } catch (err) {
            return null;
          }
        }

        return null;
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: { $elemMatch: { email: email, responded: false } },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.delete('/api/surveys/:surveyId', requireLogin, async (req, res) => {
    try {
      const survey = await Survey.findOne({
        _id: req.params.surveyId,
        _user: req.user.id,
      });

      if (!survey) {
        return res.status(404).send({ error: 'Survey not found' });
      }

      await Survey.deleteOne({ _id: req.params.surveyId });
      res.send({ success: true });
    } catch (err) {
      res.status(500).send({ error: 'Error deleting survey' });
    }
  });
};

const axios = require('axios');
const config = require('./configg');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
// Endpoint for fetching FX rates
const getFxrates = async () => {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${config.fixerApiKey}`
    );

    const fxRates = response.data.rates;
    return fxRates;
  } catch (error) {
    console.error('Error fetching FX rates:', error);
    throw error; // Re-throw the error to be handled elsewhere
  }
};

const oauth2Client = new OAuth2(
  '454273591030-8aja7abvbsg0agb4d3vut03qenq0g7o5.apps.googleusercontent.com',
  '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',
  'urn:ietf:wg:oauth:2.0:oob'
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'online',
  scope: 'https://www.googleapis.com/auth/gmail.send',
});

module.exports = {
  oauth2Client,
  authUrl,
  getFxrates
};

const axios = require('axios');
const config = require('../configg');
const { google } = require('googleapis');
const AppError = require('../errors/AppError');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config()
// Endpoint for fetching FX rates
const getFxrates = async () => {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${config.fixerApiKey}`
    );
   // console.log('api key', config.fixerApiKey)
if (response.data.success !== true) {
      throw new AppError('Error fetching FX rates');
    }
    const fxRates = response.data.rates;
  
    console.log('response.data.rates', response.data)
    return fxRates;
  } catch (error) {
    console.error('Error fetching FX rates:', error);
    throw new AppError('Error fetching FX rates', 500); 
  }
};
const clientId = process.env.clientId
const clientSecret = process.env.clientSecret
const oauth2Client = new OAuth2(
  clientId,
  clientSecret,
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

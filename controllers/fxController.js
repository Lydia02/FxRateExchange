// fxRatesController.js
const axios = require('axios');
const config = require('../configg');

// Endpoint for fetching FX rates
const getFxrates = async (req, res) => {
  try {
    const response = await axios.get(
      `http://data.fixer.io/api/latest?access_key=${config.fixerApiKey}`
    );

    const fxRates = response.data.rates;
    console.log(fxRates)

    // Process and send the FX rante dta as needed
    res.json(fxRates);
  } catch (error) {
    console.error('Error fetching FX rates:', error);
    res.status(500)
    .json({ 
        error: 'Error fetching FX rates'
     });
  }
};

module.exports = {
  getFxrates
};

const UserPreference = require("../models/fxModel");
const FXController = require('../utilis.js'); // Import the FX controller
const userModel = require("../models/userModel"); // Import the user model
const emailNotifications = require('./rateController'); // Import the email module
const { oauth2Client } = require('../utilis.js');

// Save user's FX rate preference
async function savePreference(req, res) {
  const { userId, currencyPair, targetRate } = req.body;

  try {
    const preference = new UserPreference({
      userId,
      currencyPair,
      targetRate
    });
    await preference.save();

    // Check and notify if the target rate is already met
    checkAndNotify(userId, currencyPair, targetRate);

    res.status(201).json({ message: 'Preference saved successfully' });
  } catch (error) {
    console.error('Error saving preference:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Get user's FX rate preferences
async function getPreferences(req, res) {
  const userId = req.params.userId;

  try {
    const preferences = await UserPreference.find({ userId });
    res.status(200).json(preferences);
  } catch (error) {
    console.error('Error fetching preferences:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
// Function to check FX rates and send email notifications
async function checkAndNotify(userId, currencyPair, targetRate) {
  try {
    // Fetch current FX rates from your third-party source
    const fxRates = await FXController.getFxrates();

    const currentRate = fxRates[currencyPair]; // Adjust this based on your FX rate data structure

    if (currentRate >= targetRate) {
      const user = await userModel.findById(userId);
      if (user) {
        const userEmail = user.email;

        // Set up OAuth2 credentials for sending email
        oauth2Client.setCredentials({
          refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0ZGZlOTFlYmYwNDU4YTUwZWU2NmI5OCIsImVtYWlsIjoidXNlcjRAZ21haWwuY29tIn0sImlhdCI6MTY5MjQwNDUxMSwiZXhwIjoxNjkyNDA4MTExfQ.RWSNhmYOChdsmHJdzWBd3xWEd61KVQwIR-5x0nx3rgw', // Replace with actual refresh token
        });

        const subject = 'FX Rate Notification';
        const message = `The ${currencyPair} rate has reached ${currentRate}.`;
        emailNotifications.sendEmail(userEmail, subject, message);
      }
    }
  } catch (error) {
    console.error('Error checking and notifying:', error);
  }
}

module.exports = { savePreference, getPreferences, checkAndNotify };

module.exports = { savePreference, getPreferences };

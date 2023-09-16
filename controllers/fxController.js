const UserPreference = require("../models/fxModel");
const FXController = require('../utils/utilis.js'); 
const userModel = require("../models/userModel"); 
const emailNotifications = require('./emailNotificationController')
const { oauth2Client } = require('../utils/utilis.js');
const ErrorHandler = require('../middleware/errorHandler'); 

// Save user's FX rate preference
async function savePreference(req, res, next) {
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
    
    res.status(201).json({
      message: 'Preference saved successfully'
    });
  } catch (error) {
    
    next(new ErrorHandler('Error saving preference', 500));
  }
}

// Get user's FX rate preferences
async function getPreferences(req, res, next) {
  const userId = req.params.userId;

  try {
    const preferences = await UserPreference.find({ userId });
    res.status(200).json(preferences);
  } catch (error) {
    
    next(new ErrorHandler('Error fetching preferences', 500)); 
  }
}

// Function to check FX rates and send email notifications
async function checkAndNotify(userId, currencyPair, targetRate, res, next) {
  try {
    // Fetch current FX rates from your third-party source
    const fxRates = await FXController.getFxrates();
    console.log(fxRates)
    const currentRate = fxRates[currencyPair]; 

    if (currentRate >= targetRate) {
      const user = await userModel.findById(userId);
      if (user) {
        const userEmail = user.email;

        // Set up OAuth2 credentials for sending email
        oauth2Client.setCredentials({
          refresh_token: 'REFRESH_TOKEN'
        });

        const subject = 'FX Rate Notification';
        const message = `The ${currencyPair} rate has reached ${currentRate}.`;
        emailNotifications.sendEmail(userEmail, subject, message);
      }
    }
    
  } catch (error) {
    
    next(new ErrorHandler('Error checking and notifying', 500)); 
  }
}

module.exports = { savePreference, getPreferences, checkAndNotify };

const UserPreference = require("../models/fxModel");
const FXController = require('../utils/utilis.js'); 
const userModel = require("../models/userModel"); 
const emailNotifications = require('./emailNotificationController')
const { oauth2Client } = require('../utils/utilis.js');
const AppError = require('../errors/AppError'); 

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Save user's FX rate preference
async function savePreference(req, res, next) {
  try {
    const { currencyPair, targetRate } = req.body || {};
    
    if (!currencyPair || !targetRate) {
      return res.status(400).json({ 
        error: 'Invalid request body'
      });
    }

    const preference = new UserPreference({
      currencyPair,
      targetRate
    });

    const newPreference = await preference.save();

    // Check and notify if the target rate is already met
    await checkAndNotify(currencyPair, targetRate, res, next);

    res.status(201).json({
      status: true,
      message: 'Preference saved successfully',
      data: newPreference,
    });
  } catch (error) {
    next(new AppError('Something went wrong', 401));
  }
}

// // Get user's FX rate preferences
async function getPreferences(req, res, next) {
 

  
  try {
    const id = req.userId;

    const preferences = await UserPreference.find({ id });
    res.status(200).json(preferences);
  }  catch (error) {
  console.error('Error fetching preferences:', error);
  next(new AppError('Error fetching preferences', 500)); 
}
// catch (error) {
//     next( new AppError('Error fetching preferences', 500)); 
//   }
}
async function getPreferencesById(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const preferencesById = await UserPreference.findById(id); // Use _id field for searching

    if (!preferencesById) {
      return res.status(404).json({ error: 'Preference not found' });
    }

    res.status(200).json(preferencesById);
    console.log(preferencesById);
  } catch (error) {
    console.error('Error fetching preferences:', error);
    next(new AppError('Error fetching preferences', 500)); 
  }
}

async function updatePreference(req, res, next) {
  try {
    const { id } = req.params;
    console.log(id);
    const { currencyPair, targetRate } = req.body;

    // Check if the preference exists
    const existingPreference = await UserPreference.findByIdAndUpdate(id);

    if (!existingPreference) {
      return res.status(404).json({ error: 'Preference not found' });
    }

    // Update the preference fields
    existingPreference.currencyPair = currencyPair || existingPreference.currencyPair;
    existingPreference.targetRate = targetRate || existingPreference.targetRate;

    // Save the updated preference
    const updatedPreference = await existingPreference.save();

    res.status(200).json(updatedPreference);
  } catch (error) {
    console.error('Error updating preference:', error);
    next(new AppError('Error updating preference', 500)); 
  }
}
async function deletePreferenceById(req, res, next) {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    // Check if the preference exists
    const existingPreference = await UserPreference.findById(id);

    if (!existingPreference) {
      return res.status(404).json({ error: 'Preference not found' });
    }

    // Delete the preference
    await UserPreference.findByIdAndDelete(id);

    res.status(201).json('Deleted successfully'); // Respond with a 204 No Content status on successful deletion
  } catch (error) {
    console.error('Error deleting preference:', error);
    next(new AppError('Error deleting preference', 500)); 
  }
}


// Function to check FX rates and send email notifications
async function checkAndNotify(userId, currencyPair, targetRate, res, next) {
  try {
    // Fetch current FX rates from your third-party source
    const fxRates = await FXController.getFxrates();
    console.log(fxRates);
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
    next(new AppError('Error checking and notifying', 500)); 
  }
}

module.exports = { savePreference, getPreferences, getPreferencesById,updatePreference, deletePreferenceById,checkAndNotify };

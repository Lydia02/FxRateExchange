// const passport = require('passport')

const express = require('express')
const fxRouter = express.Router()

const fxRatesController = require('../controllers/fxController')



// API endpoint to save user's FX rate preference
fxRouter.post('/user/preference', fxRatesController.savePreference);

// API endpoint to fetch user's FX rate preferences
fxRouter.get('/user/preference/:userId', fxRatesController.getPreferences);

module.exports = fxRouter;

// fxRoute.js
const express = require('express');
const fxRouter = express.Router();

const { validateFxPreference } = require('../middleware/validationMiddleware'); 
const fxRatesController = require('../controllers/fxController');

fxRouter.post('/user/preference', validateFxPreference, fxRatesController.savePreference);
fxRouter.get('/user/preference/:userId', validateFxPreference, fxRatesController.getPreferences); 
module.exports = fxRouter;

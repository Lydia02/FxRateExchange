// const passport = require('passport')

// const express = require('express')
const fxRouter = express.Router()

const fxRatesController = require('../controllers/fxController')

// Route to fetch FX rates
fxRouter.get('/fx-rates', fxRatesController.getFxrates);

module.exports = fxRouter;

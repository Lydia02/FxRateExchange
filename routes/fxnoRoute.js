const express = require('express')
const preferenceRouter = express.Router()

const preferenceController = require('../controllers/preferncesController')
preferenceRouter.get('/preferences', preferenceController.getPreferences)
module.exports = preferenceRouter
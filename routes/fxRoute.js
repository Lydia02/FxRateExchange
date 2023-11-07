const express = require('express');
const fxRouter = express.Router();
const fxRatesController = require('../controllers/fxController');
const { validateFxPreference } = require('../middleware/validationMiddleware');
const verifyToken = require('../middleware/verifytoken');

fxRouter.use(verifyToken);

fxRouter.post('/user/preference', validateFxPreference, fxRatesController.savePreference);

fxRouter.get('/user/preference', validateFxPreference,fxRatesController.getPreferencesById);
fxRouter.put('/user/preference', validateFxPreference, fxRatesController.updatePreference);
fxRouter.delete('/user/preference', validateFxPreference, fxRatesController.deletePreferenceById);


module.exports = fxRouter;



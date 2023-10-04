const express = require('express');
const fxRouter = express.Router();
const fxRatesController = require('../controllers/fxController');
const { validateFxPreference } = require('../middleware/validationMiddleware');
const verifyToken = require('../middleware/verifytoken');

// Apply the token verification middleware before other middlewares
fxRouter.use(verifyToken);

fxRouter.post('/user/preference', validateFxPreference, fxRatesController.savePreference);
fxRouter.get('/user/preferences/userId', validateFxPreference, fxRatesController.getPreferences);
fxRouter.get('/user/preference', validateFxPreference,fxRatesController.getPreferencesById);
fxRouter.put('/user/preference/:id', validateFxPreference, fxRatesController.updatePreference);
fxRouter.delete('/user/preference/:id', validateFxPreference, fxRatesController.deletePreferenceById);


module.exports = fxRouter;


// ...

module.exports = fxRouter;

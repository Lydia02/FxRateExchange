require('dotenv').config();
const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const userRoute = require('./routes/authRoutes')
const errorHandler = require('./middleware/errorHandler'); 
const configureRateLimit = require('./utils/rateLimit')
const fxRatesRoutes = require('./routes/fxRoute');

const app = express();
const limiter = configureRateLimit();
app.use(limiter);


app.use(passport.initialize())
require("./middleware/auth")(passport)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRoute);
app.use('/api', fxRatesRoutes);
app.use(errorHandler);

module.exports = app
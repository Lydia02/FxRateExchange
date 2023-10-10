require('dotenv').config();
const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
const userRoute = require('./routes/authRoutes')
//const errorHandler = require('./errors'); 
const configureRateLimit = require('./utils/rateLimit')
const fxRatesRoutes = require('./routes/fxRoute');
require("./middleware/auth")(passport)

const app = express();
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize())
const limiter = configureRateLimit();
app.use(limiter);
app.use('/api', passport.authenticate('jwt', { session:false }), fxRatesRoutes)




app.use('/', userRoute);
// app.use('/api', fxRatesRoutes);
//app.use(errorHandler);

module.exports = app
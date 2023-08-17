require('dotenv').config();
const express = require('express');
const passport = require('passport')
const bodyParser = require('body-parser');
// const publicRoute = require('./routes/publicRoutes')
const userRoute = require('./routes/authRoutes')
// const blogRoute = require('./routes/blogRoutes')

const fxRatesRoutes = require('./routes/fxRoute');



//const authController= require('./controller/authController')
const app = express();
app.use(passport.initialize())
require("./middleware/auth")(passport)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', userRoute);
app.use('/api', fxRatesRoutes);
// app.use('/', publicRoute)

// app.use('/blog', passport.authenticate('jwt', { session:false }), blogRoute)

//
module.exports = app
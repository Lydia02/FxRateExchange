const passport = require('passport')

const express = require('express')
const userRouter = express.Router()
const { validateUser } = require('../middleware/validationMiddleware')
const authController = require('../controllers/authController')

userRouter.post('/signup', validateUser, passport.authenticate('signup', { session: false }), authController.signUp);
userRouter.post('/login', validateUser, passport.authenticate('login', { session: false }), authController.login);

module.exports = userRouter
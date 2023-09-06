// auth.js

const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local").Strategy;
require("dotenv").config();
const userModel = require("../models/userModel");
const errorHandler = require("./errorHandler"); 

module.exports = function (passport) {
  passport.use(
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          return done(null, token.user);
        } catch (error) {
          done(error);
        }
      }
    )
  );

  passport.use(
    "signup",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const { firstname, lastname } = req.body;
          const user = await userModel.create({
            email,
            firstname,
            lastname,
            password,
          });
          return done(null, user);
        } catch (err) {
          errorHandler(err, req, res, next); 
          return done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const user = await userModel.findOne({ email });

          if (!user) {
            return done(null, false, { message: "User not found" });
          }

          const validate = await user.isValidPassword(password);

          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }

          return done(null, user, { message: "Logged in Successfully" });
        } catch (error) {
          errorHandler(error, req, res, next); 
          return done(error);
        }
      }
    )
  );
};

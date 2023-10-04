const jwt = require('jsonwebtoken');
const passport = require('passport');
const { tryCatch } = require('../errors/tryCatch'); // Update the path to your tryCatch.js file
//const ErrorHandler = require('../errors/AppError');
const AppError = require('../errors/AppError');

exports.signUp = tryCatch(async (req, res) => {
  const body = { _id: req.user._id, email: req.user.email };
  res.json({
    message: 'Signup successful',
    user: req.user,
  });
});

exports.login = tryCatch(async (req, res) => {
  passport.authenticate('login', async (err, user, info) => {
    if (err) throw err;

    if (!user) {
      throw new AppError('Username or password is incorrect', 401);
    }

    req.login(user, { session: false }, async (error) => {
      if (error) throw error;

      const body = { _id: user._id, email: user.email };
      const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
        expiresIn: '1hr',
      });

      res.json({
        token: token,
        userID: req.user._id,
      });
    });
  })(req, res);
});

const jwt = require('jsonwebtoken');
const passport = require('passport');
const ErrorHandler = require('../middleware/errorHandler');

exports.signUp = async (req, res, next) => {
  const body = { _id: req.user._id, email: req.user.email };
  try {
    res.json({
      message: 'Signup successful',
      user: req.user,
    });
  } catch (err) {
    //handling middleware
    return next(new ErrorHandler(err.message, 500));
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err) {
        return next(err);
      }
      if (!user) {
        const error = new ErrorHandler('Username or password is incorrect', 401);
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, process.env.JWT_SECRET, {
          expiresIn: '1hr',
        });
        return res.json({
          token: token,
          userID: req.user._id,
        });
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })(req, res, next);
};

const User = require('../models/userModel');
const ErrorHandler = require('../middleware/errorHandler'); 

const createUser = async (req, res, next) => {
  try {
    // Grab details from the request
    const { firstname, lastname, email, password } = req.body;

    // Create user object
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    });

    // Save to the database
    const createdUser = await newUser.save();

    // Return response
    return res.status(201).json({
      status: true,
      data: createdUser,
    });
  } catch (error) {
    next(new ErrorHandler('Error creating user', 500)); 
  }
};

module.exports = {
  createUser,
};

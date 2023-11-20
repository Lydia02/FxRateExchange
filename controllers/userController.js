const User = require('../models/userModel');
const ErrorHandler = require('../errors/badRequest'); 

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
    throw new ErrorHandler('This user exists', 400);
   
  }
};

module.exports = {
  createUser,
};

const User = require('../models/userModel')

const createUser = async (req, res, next) => {
  try {
    // grab details from the request
    const { firstname, lastname, email, password } = req.body
    // create user object
    const newUser = new User({
      firstname,
      lastname,
      email,
      password,
    })
    // save to database
    const createdUser = await newUser.save()
    // return response
    return res.status(201).json({
      status: true,
      data: createdUser,
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  createUser,
}
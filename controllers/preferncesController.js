require('dotenv').config()
const UserPreference = require('../models/fxModel')

exports.getPreferences = async (req, res, next) => {
  try {
    // const userId = req.userId;
    const { page = 1, limit = 5 } = req.query;

    const skip = (page - 1) * limit;

    const preferences = await UserPreference.find({  })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json(preferences);
  } catch (error) {
    console.log(error);
    
  }
}
